<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud-admin.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\core\upload;

use core\exception\UploadFileException;
use Exception;

/**
 * 上传服务层
 * Class CoreFetchService
 * @package app\service\core\file
 */
class CoreFetchService extends CoreFileService
{

    public function __construct($is_attachment = false)
    {
        parent::__construct($is_attachment);
    }

    /**
     * 图片上传
     * @param string $url
     * @param int $site_id
     * @param string $file_dir
     * @return array
     * @throws Exception
     */
    public function image(string $url, int $site_id, string $file_dir)
    {
        if(empty($url)) throw new UploadFileException('OSS_FILE_URL_NOT_EXIST');
        $this->upload_driver = $this->driver($site_id);
        [$link, $ext] = explode('.', $url);
        $ext = empty($ext) ? $ext : 'jpg';
        $file_path = $this->upload_driver->createFileName($link, $ext);

        $dir = $this->root_path .'/'.  $file_dir.'/'.$file_path;
        $result = $this->upload_driver->fetch($url, $dir);

        //读取上传附件的信息用于后续得校验和数据写入
        if($result){
            return [
                'url' => $this->upload_driver->getUrl($dir)
            ];
        }
        else{
            throw new UploadFileException($result);
        }

    }



}