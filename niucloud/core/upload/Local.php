<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-02-17
 * Time: 15:58
 */

namespace core\upload;

use core\exception\UploadFileException;
use Exception;

/**
 * 文件管理驱动类
 * Class FileDriver
 * @package core\file
 */
class Local extends BaseUpload
{
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
}