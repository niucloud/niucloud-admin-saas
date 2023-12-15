<?php

namespace core\upload;

use core\exception\UploadFileException;
use OSS\Core\OssException;
use OSS\OssClient;

/**
 * 阿里云存储引擎 (OSS)
 */
class Aliyun extends BaseUpload
{


    protected function initialize(array $config = [])
    {
        parent::initialize($config);
    }

    public function client()
    {
        // true为开启CNAME。CNAME是指将自定义域名绑定到存储空间上。
//        $is_cname = false;
        $access_key_id = $this->config['access_key'];
        $access_key_secret = $this->config['secret_key'];

        $endpoint = $this->config['endpoint'];// yourEndpoint填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。
        return new OssClient($access_key_id, $access_key_secret, $endpoint);
    }

    /**
     * 执行上传
     * @param string $dir
     * @return true
     */
    public function upload(string $dir)
    {
        $this->validate();
        $bucket = $this->config['bucket'];
        try {
            $this->client()->uploadFile(
                $bucket,
                $this->getFullPath(),
                $this->getRealPath()
            );
            return true;
        } catch ( OssException $e ) {
            throw new UploadFileException($e->getMessage());
        }

    }

    /**
     * base64上云
     * @param string $base64_data
     * @param string|null $key
     * @return true
     */
    public function base64(string $base64_data, ?string $key = null)
    {
        $bucket = $this->config['bucket'];
        try {
            $base64_file = base64_decode($base64_data);
            if (!$base64_file) throw new UploadFileException('FILE_ERROE');
            $this->client()->putObject(
                $bucket,
                $key,
                $base64_file
            );
            return true;
        } catch ( OssException $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }
    /**
     * Notes: 抓取远程资源
     * @param string $url
     * @param string|null $key
     * @return true
     */
    public function fetch(string $url, ?string $key = null)
    {
        $bucket = $this->config['bucket'];
        try {
            $content = file_get_contents($url);
            $this->client()->putObject(
                $bucket,
                $key,
                $content
            );
            return true;
        } catch ( OssException $e ) {
            throw new UploadFileException($e->getMessage());
        }

    }

    /**
     * 删除文件
     * @param string $file_name
     * @return true
     */
    public function delete(string $file_name)
    {
        $bucket = $this->config['bucket'];
        try {
            $this->client()->deleteObject($bucket, $file_name);
            return true;
        } catch ( OssException $e ) {
            throw new UploadFileException($e->getMessage());
        }

    }

    public function thumb($file_path, $thumb_type)
    {
        $thumb_config = config('upload.thumb.thumb_type');
        $thumb_data = [];
        foreach ($thumb_config as $k => $v) {
            if ($thumb_type == 'all' || $thumb_type == $k || (is_array($thumb_type) && in_array($k, $thumb_type))) {
                $width = $v['width'];
                $height = $v['height'];
                //拼装缩略路径
                $item_thumb = $file_path . '?x-oss-process=image/resize,h_' . $height . ',w_' . $width;
                $thumb_data[$k] = $item_thumb;
            }
        }

        return $thumb_data;
    }

}
