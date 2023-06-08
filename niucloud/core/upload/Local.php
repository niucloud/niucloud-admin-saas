<?php
namespace core\upload;

use core\exception\UploadFileException;
use Exception;
use Grafika\Grafika;
use Intervention\Image\Image;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;

/**
 * 文件管理驱动类
 */
class Local extends BaseUpload
{
    //位置
    private $position = array(
        0 => 'top-left',
        1 => 'op-center',
        2 => 'top-right',
        3 => 'center-left',
        4 => 'center',
        5 => 'center-right',
        6 => 'bottom-left',
        7 => 'bottom-center',
        8 => 'bottom-right',
        9 => 'smart'
    );
    protected function initialize(array $config = [])
    {
        parent::initialize($config);

    }

    public function upload(string $dir)
    {
        $this->validate();
        mkdirs($dir);
        $this->file->move($dir, $this->file_name);
        //错误一般是已经被抛出了
        return true;
    }


    /**
     * 远程获取图片
     * @param $url
     * @param $key
     * @return true
     */
    public function fetch(string $url, ?string $key)
    {
        try {
            mkdirs($key);
            $content = @file_get_contents($url);
            if (!empty($content)) {
                file_put_contents($key, $content);
//                $fp = fopen($key, "w");
//                fwrite($fp, $content);
//                fclose($fp);
            }else{
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
     * @return void
     */
    public function base64(string $content, ?string $key){

        mkdirs($key);
        file_put_contents(url_to_path($key), base64_decode($content));
        return true;
    }

    /**
     * 删除本地附件
     * @param $file_name
     * @return bool|mixed
     */
    public function delete(string $file_name)
    {
        $file_path = url_to_path($file_name);
        if (!file_exists($file_path)) {
            return true;
//            throw new UploadFileException(100013);
        }
        return unlink($file_path);
    }

    /**
     * 缩略图
     * @param $file_path
     * @param array $type
     * @return array
     * @throws Exception
     */
    public function thumb($file_path, $thumb_type){
        //todo  判断缩略图是否存在
        $thumb_config = config('upload.thumb.thumb_type');
        //  ……
        //获取文件原名  获取
        $file_arr = explode(DIRECTORY_SEPARATOR, $file_path);
        $file_name = end($file_arr);
        $thumb_list = [];
        //获取文件后缀
        foreach($thumb_config as $k => $v){
            if($thumb_type == 'all' || $thumb_type == $k){
                $new_thumb_path = str_replace($file_name, $k.'_'.$file_name, $file_path);
                if(!file_exists($new_thumb_path)){
                    $editor = Grafika::createEditor();
                    $editor->open( $image, $file_path);
                    $new_width = $v['width'];
                    $new_height = $v['height'];
                    $editor->resizeFit( $image, $new_width,$new_height );
                    //新缩略图文件名称
                    $editor->save($image, $new_thumb_path, null, null, false, 0777);
                }
                $thumb_list[$k] = $new_thumb_path;
            }

        }
        return $thumb_list;
    }

    public function water(){

    }
}