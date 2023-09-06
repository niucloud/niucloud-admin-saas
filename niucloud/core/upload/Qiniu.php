<?php

namespace core\upload;

use core\exception\UploadFileException;
use Exception;
use Qiniu\Auth;
use Qiniu\Config;
use Qiniu\Storage\BucketManager;
use Qiniu\Storage\UploadManager;

/**
 * 文件管理驱动类
 */
class Qiniu extends BaseUpload
{

    private $position = array(
        'top-left' => 'NorthWest',
        'top-center' => 'North',
        'top-right' => 'NorthEast',
        'center-left' => 'West',
        'center' => 'Center',
        'center-right' => 'East',
        'bottom-left' => 'SouthWest',
        'bottom-center' => 'South',
        'bottom-right' => 'SouthEast',
    );

    protected function initialize(array $config = [])
    {
        parent::initialize($config);
    }

    /**
     * 获取一个鉴权对象
     * @return Auth
     */
    public function auth()
    {
        $access_key = $this->config['access_key'];
        $secret_key = $this->config['secret_key'];
        return new Auth($access_key, $secret_key);
    }

    /**
     * @throws Exception
     */
    public function upload(string $dir)
    {
        $this->validate();
        $bucket = $this->config['bucket'];
        //todo 这儿可以定义凭证的过期时间
        $up_token = $this->auth()->uploadToken($bucket);
        // 初始化 UploadManager 对象并进行文件的上传。
        $upload_mgr = new UploadManager();
        [$ret, $err] = $upload_mgr->putFile($up_token, $this->getFullPath(), $this->getRealPath());
        if ($err !== null)
            throw new UploadFileException($err->message());
        return true;
    }

    /**
     * 抓取网络资源到空间
     * @param string $url
     * @param string|null $key
     * @return true
     * @throws Exception
     */
    public function fetch(string $url, ?string $key = null)
    {
        $bucket = $this->config['bucket'];
        $auth = $this->auth();
        if (!str_contains($url, 'http://') && !str_contains($url, 'https://')) {
            $token = $auth->uploadToken($bucket);
            $upload_mgr = new UploadManager();
            [$ret, $err] = $upload_mgr->putFile($token, $key, $url);
        } else {
            //抓取网络资源到空间
            $bucket_manager = new BucketManager($auth);
            [$ret, $err] = $bucket_manager->fetch($url, $bucket, $key);//不指定key时，以文件内容的hash作为文件名
        }

        if ($err !== null)
            throw new UploadFileException($err->message());
        return true;
    }

    /**
     * base64资源上传
     * @param string $base64_data
     * @param string|null $key
     * @return true
     */
    public function base64(string $base64_data, ?string $key = null)
    {
        $bucket = $this->config['bucket'];
        $auth = $this->auth();
        $up_token = $this->auth()->uploadToken($bucket);
        // 初始化 UploadManager 对象并进行文件的上传。
        $upload_mgr = new UploadManager();
        //将 base64 编码的图片数据解码
        $base64_file = base64_decode($base64_data);
        if (!$base64_file) throw new UploadFileException('FILE_ERROE');
        // 初始化 UpLoadManager 对象并进行文件的上传
        list($ret, $err) = $upload_mgr->put($up_token, $key, $base64_file);
        if ($err !== null) throw new UploadFileException($err->message);
        return true;
    }

    /**
     * 删除空间中的文件
     * @param string $file_name
     * @return true
     */
    public function delete(string $file_name)
    {
        $bucket = $this->config['bucket'];
        $auth = $this->auth();
        $config = new Config();
        $bucket_manager = new BucketManager($auth, $config);
        [$ret, $err] = $bucket_manager->delete($bucket, $file_name);
        if ($err !== null)
            throw new UploadFileException($err->message());
        return true;
    }

    public function thumb($file_path, $thumb_type)
    {
//       mageView2/1/w/400/h/600/q/85
        $thumb_config = config('upload.thumb.thumb_type');
        $thumb_data = [];
        foreach ($thumb_config as $k => $v) {
            if ($thumb_type == 'all' || $thumb_type == $k || (is_array($thumb_type) && in_array($k, $thumb_type))) {
//                ?x-oss-process=image/resize,m_fill,w_200,h_600,quality,q_60
                $width = $v['width'];
                $height = $v['height'];
                //拼装缩略路径
                $item_thumb = $file_path . '?imageView2/2/w/' . $width . '/h/' . $height;
                $thumb_data[$k] = $item_thumb;
            }
        }

        return $thumb_data;
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
        $water_path = $file_path;
        if (!empty($water_config)) {
            $status = $water_config['status'];//是否启用
            if ($status) {
                //判断当前的云图片是否存在?,存在符号的话需要用|连接
                if (str_contains($file_path, '?')) {
                    $water_path .= '|watermark';
                } else {
                    $water_path .= '?watermark';
                }
                if ($water_config['type'] == 'image') {
                    $water_image = $water_config['image'];
                    if (!empty($water_image)) {
                        $water_path .= '/1/image/' . base64_encode($water_image) . '/gravity/' . $this->position[$water_config['position']] . '/dissolve/' . $water_config['opacity'] . '/dx/' . $water_config['offset_x'] . '/dy/' . $water_config['offset_y'];
                    }
                } else {
                    $water_path .= '/2/text/' . base64_encode($water_config['text']) . '/font/' . base64_encode($water_config['font']) . '/fill/' . base64_encode($water_config['color']) . '/fontsize/' . $water_config['size'] . '/gravity/' . $this->position[$water_config['position']] . '/dx/' . $water_config['offset_x'] . '/dy/' . $water_config['offset_y'];
                }
            }
        }
        return $water_path;
    }

}