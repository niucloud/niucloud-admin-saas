<?php

namespace core\upload;

use core\exception\UploadFileException;
use Exception;
use Qcloud\Cos\Client;

/**
 * 腾讯云存储引擎 (COS)
 */
class Tencent extends BaseUpload
{
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
    }

    /**
     * 获取服务主体
     * @return Client
     */
    public function client()
    {
        $secret_id = $this->config['access_key']; //替换为用户的 secretId，请登录访问管理控制台进行查看和管理，https://console.tencentcloud.com/cam/capi
        $secret_key = $this->config['secret_key']; //替换为用户的 secretKey，请登录访问管理控制台进行查看和管理，https://console.tencentcloud.com/cam/capi
        $region = $this->config['region']; //替换为用户的 region，已创建桶归属的region可以在控制台查看，https://console.tencentcloud.com/cos5/bucket

        return new Client(
            array(
                'region' => $region,
//                'schema' => 'https', //协议头部，默认为http
                'credentials' => array(
                    'secretId' => $secret_id,
                    'secretKey' => $secret_key)
            )
        );
    }


    /**
     * 执行上传
     * @param $save_dir (保存路径)
     * @return bool|mixed
     */
    public function upload(string $dir)
    {
        $this->validate();
        $bucket = $this->config['bucket'];
        try {
            $result = $this->client()->putObject(array(
                'Bucket' => $bucket, //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.tencentcloud.com/cos5/bucket
                'Key' => $this->getFullPath(),
                'Body' => fopen($this->getRealPath(), 'rb'),
            ));
            // 请求成功
            return true;
        } catch ( Exception $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }

    /**
     * notes: 抓取远程资源(最大支持上传5G文件)
     * @param $url
     * @param null $key
     * @return mixed|void
     */
    public function fetch(string $url, ?string $key = null)
    {

        $bucket = $this->config['bucket'];
        try {
            $result = $this->client()->putObject(array(
                'Bucket' => $bucket, //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.tencentcloud.com/cos5/bucket
                'Key' => $key,
                'Body' => fopen($url, 'rb'),
            ));
            // 请求成功
            return true;
        } catch ( Exception $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }

    /**
     * 删除一个简单对象
     * @param $file_name
     * @return bool|mixed
     */
    public function delete(string $file_name)
    {
        $bucket = $this->config['bucket'];
        try {
            $this->client()->deleteObject(array(
                'Bucket' => $bucket,
                'Key' => $file_name
            ));
            return true;
        } catch ( Exception $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }

    public function thumb($file_path, $thumb_type)
    {
        //腾讯云缩略图地址

        $thumb_config = config('upload.thumb.thumb_type');
        $thumb_data = [];
        foreach($thumb_config as $k => $v){
            if($thumb_type == 'all' || $thumb_type == $k){
//                ?x-oss-process=image/resize,m_fill,w_200,h_600,quality,q_60
                $width = $v['width'];
                $height = $v['height'];
                //拼装缩略路径
                $item_thumb = $file_path.'?imageMogr2/thumbnail/' . $width . 'x' . $height;
                $thumb_data[] = $item_thumb;
            }
        }

        return $thumb_data;
    }
}
