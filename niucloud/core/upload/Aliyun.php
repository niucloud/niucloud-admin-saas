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

    public function client(){
        // true为开启CNAME。CNAME是指将自定义域名绑定到存储空间上。
        $is_cname = true;
        $access_key_id = $this->config['access_key'];
        $access_key_secret = $this->config['secret_key'];

        $endpoint = $this->config['endpoint'];// yourEndpoint填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。
        $oss_client = new OssClient($access_key_id, $access_key_secret, $endpoint, $is_cname);
        return $oss_client;
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
            $this->client()->uploadFile(
                $bucket,
                $this->getFullPath(),
                $this->getRealPath()
            );
            return true;
        } catch (OssException $e) {
            throw new UploadFileException($e->getMessage());
        }

    }

    /**
     * Notes: 抓取远程资源
     * @param $url
     * @param null $key
     * @return mixed|void
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
        } catch (OssException $e) {
            throw new UploadFileException($e->getMessage());
        }

    }

    /**
     * 删除文件
     * @param $file_name
     * @return bool|mixed
     */
    public function delete(string $file_name)
    {
        $bucket = $this->config['bucket'];
        try {
            $this->client()->deleteObject($bucket, $file_name);
            return true;
        } catch (OssException $e) {
            throw new UploadFileException($e->getMessage());
        }

    }


}
