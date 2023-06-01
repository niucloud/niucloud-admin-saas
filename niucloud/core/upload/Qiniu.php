<?php
namespace core\upload;

use core\exception\UploadFileException;
use Exception;
use Qiniu\Auth;
use Qiniu\Config;
use Qiniu\Storage\BucketManager;
use Qiniu\Storage\UploadManager;
use function core\upload\storage\str_contains;

/**
 * 文件管理驱动类
 */
class Qiniu extends BaseUpload
{

    protected function initialize(array $config = [])
    {
        parent::initialize($config);
    }
    /**
     * 获取一个鉴权对象
     * @return Auth
     */
    public function auth(){
        $access_key = $this->config['access_key'];
        $secret_key = $this->config['secret_key'];
        return new Auth($access_key, $secret_key);
    }
    public function upload(string $dir)
    {
        $this->validate();
        $bucket = $this->config['bucket'];
        //todo 这儿可以定义凭证的过期时间
        $up_token = $this->auth()->uploadToken($bucket);
        // 初始化 UploadManager 对象并进行文件的上传。
        $upload_mgr = new UploadManager();
        list($ret, $err) = $upload_mgr->putFile($up_token, $this->getFullPath(), $this->getRealPath());
        if ($err !== null)
            throw new UploadFileException($err->message());
        return true;
    }

    /**
     * 抓取网络资源到空间
     * @param $url
     * @param $key
     * @return true
     * @throws Exception
     */
    public function fetch(string $url, ?string $key = null)
    {
        $bucket = $this->config['bucket'];
        $auth = $this->auth();
        if(!str_contains($url, 'http://') && !str_contains($url, 'https://')){
            $token = $auth->uploadToken($bucket);
            $upload_mgr = new UploadManager();
            list($ret, $err) = $upload_mgr->putFile($token, $key, $url);
        }else{
            //抓取网络资源到空间
            $bucket_manager = new BucketManager($auth);
            list($ret, $err) = $bucket_manager->fetch($url, $bucket, $key);//不指定key时，以文件内容的hash作为文件名
        }

        if ($err !== null)
            throw new UploadFileException($err->message());
        return true;
    }

    /**
     * 删除空间中的文件
     * @param $file_name
     * @return bool|mixed
     */
    public function delete(string $file_name)
    {
        $bucket = $this->config['bucket'];
        $auth = $this->auth();
        $config = new Config();
        $bucket_manager = new BucketManager($auth, $config);
        $err = $bucket_manager->delete($bucket, $file_name);
        if ($err !== null)
            throw new UploadFileException($err->message());
        return true;
    }
}