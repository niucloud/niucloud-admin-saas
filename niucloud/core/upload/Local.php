<?php

namespace core\upload;

use core\exception\UploadFileException;
use Exception;
use Grafika\Color;
use Grafika\Grafika;
use Grafika\Position;

/**
 * 文件管理驱动类
 */
class Local extends BaseUpload
{
    //位置
    private $position = array(
        'top-left' => 'top-left',
        'top-center' => 'top-center',
        'top-right' => 'top-right',
        'center-left' => 'center-left',
        'center' => 'center',
        'center-right' => 'center-right',
        'bottom-left' => 'bottom-left',
        'bottom-center' => 'bottom-center',
        'bottom-right' => 'bottom-right',
    );

    protected function initialize(array $config = [])
    {
        parent::initialize($config);

    }

    public function upload(string $dir)
    {
        $this->validate();

        mkdirs_or_notexist($dir, 0777);
        $this->file->move($dir, $this->file_name);
        //错误一般是已经被抛出了
        return true;
    }


    /**
     * 远程获取图片
     * @param string $url
     * @param string|null $key
     * @return true
     */
    public function fetch(string $url, ?string $key)
    {
        try {
            mkdirs_or_notexist(dirname($key), 0777);
            $content = @file_get_contents($url);
            if (!empty($content)) {
                file_put_contents($key, $content);
//                $fp = fopen($key, "w");
//                fwrite($fp, $content);
//                fclose($fp);
            } else {
                throw new UploadFileException(203006);
            }
            return true;
        } catch ( Exception $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }

    /**
     * base64转图片
     * @param string $content
     * @param string|null $key
     * @return true
     */
    public function base64(string $content, ?string $key = null)
    {

        mkdirs_or_notexist(dirname($key));
        file_put_contents(url_to_path($key), base64_decode($content));
        return true;
    }

    /**
     * 删除本地附件
     * @param string $file_name
     * @return bool
     */
    public function delete(string $file_name)
    {
        $file_path = url_to_path($file_name);
        if (file_exists($file_path)) {
            $result = unlink($file_path);
//            throw new UploadFileException(100013);
        }else{
            $result = true;
        }
        //顺便删除相关的缩略图
        $dirname = dirname($file_name);
        $file_list = [];
        search_dir($dirname, $file_list);
        if(!empty($file_list)){
            $file_arr = explode('/', $file_name);
            $only_file_name = end($file_arr);
            foreach($file_list as $v){
                if(str_contains($v, $only_file_name) && file_exists($v)){
                    unlink($v);
                }
            }
        }
        return $result;
    }

    /**
     * 缩略图
     * @param $file_path
     * @param $thumb_type
     * @return array
     * @throws Exception
     */
    public function thumb($file_path, $thumb_type)
    {
        //todo  判断缩略图是否存在
        $thumb_config = config('upload.thumb.thumb_type');
        //  ……
        //获取文件原名  获取
        $file_arr = explode('/', $file_path);
        $file_name = end($file_arr);
        $thumb_list = [];
        //获取文件后缀
        foreach ($thumb_config as $k => $v) {
            if ($thumb_type == 'all' || $thumb_type == $k || (is_array($thumb_type) && in_array($k, $thumb_type))) {
                $new_width = $v['width'];
                $new_height = $v['height'];
                $new_thumb_path = str_replace($file_name, $new_width . 'x' . $new_height . '_' . $file_name, $file_path);

                if (!file_exists($new_thumb_path)) {
                    $editor = Grafika::createEditor();
                    $editor->open($image, $file_path);
                    $editor->resizeFit($image, $new_width, $new_height);
                    //新缩略图文件名称
                    $editor->save($image, $new_thumb_path, null, null, false, 0777);
                }
                $thumb_list[$k] = $new_thumb_path;
            }

        }
        return $thumb_list;
    }

    /**
     * 图片水印
     * @param $file_path
     * @return mixed
     * @throws Exception
     */
    public function water($file_path)
    {
        $water_config = [];
        if (!empty($water_config)) {
            $status = $water_config['status'];//是否启用
            if ($status) {
                $editor = Grafika::createEditor();
                $editor->open($image, $file_path);
                if ($water_config['type'] == 'image') {
                    $water_image = $water_config['image'];
                    if (!empty($water_image)) {
                        //判断水印图片是否是本地图片
                        if (check_file_is_remote($water_image)) {
                            $file_arr = explode('.', $water_image);
                            $ext_name = end($file_arr);
                            $name = $this->createFileName($water_image, $ext_name);
                            $watermark_image = 'upload/water/' . $name;
                            $this->fetch($water_image, $watermark_image);
                        }
                        if (file_exists($water_image)) {

                        }
                        $editor->open($image1, $water_config['image']);
                        $editor->blend($image, $image1, 'normal', $water_config['opacity'], $this->position[$water_config['position']], $water_config['offset_x'], $water_config['offset_y']);
                    }
                } else {
                    if ($water_config['text']) {
                        $position = $this->position[$water_config['position']];
                        $offset_x = $water_config['offset_x'];//水平偏移值
                        $offset_y = $water_config['offset_y'];//垂直偏移值
                        $width = $image->getWidth();
                        $height = $image->getHeight();

                        //获取文字信息
                        $info = imagettfbbox($water_config['size'], $water_config['angle'], $water_config['font'], $water_config['text']);
                        $minx = min($info[0], $info[2], $info[4], $info[6]);
                        $maxx = max($info[0], $info[2], $info[4], $info[6]);
                        $miny = min($info[1], $info[3], $info[5], $info[7]);
                        $maxy = max($info[1], $info[3], $info[5], $info[7]);
                        /* 计算文字初始坐标和尺寸 */
                        $x = $minx;
                        $y = abs($miny);
                        $w = $maxx - $minx;
                        $h = $maxy - $miny;
                        //转化坐标
                        $position = new Position($position, $offset_x, $offset_y);
                        // Position is for $image2. $image1 is canvas.
                        list($offset_x, $offset_y) = $position->getXY($width, $height, $w, $h);

                        $editor->text($image, $water_config['text'], $water_config['size'], $offset_x, $offset_y, new Color($water_config['color']), $water_config['font'], $water_config['angle']);
                    }
                    $editor->save($image, $file_path);


                }
            }
            return $file_path;
        }
    }
}
