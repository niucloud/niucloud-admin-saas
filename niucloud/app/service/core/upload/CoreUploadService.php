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

use app\dict\sys\FileDict;
use app\service\core\sys\CoreAttachmentService;

/**
 * 上传服务层
 * Class CoreUploadService
 * @package app\service\core\file
 */
class CoreUploadService extends CoreFileService
{

    public function __construct($is_attachment = false)
    {
        parent::__construct($is_attachment);
    }

    /**
     * 图片上传
     * @param $site_id
     * @param $cate_id
     * @param $app_type
     * @param $file_path
     * @return array
     */
    public function image(string $file, int $site_id, string $file_dir, int $cate_id = 0)
    {
        //校验上传设置
//        $this->checkFile($site_id, $file, FileDict::IMAGE);
        //实例化上传引擎
        $this->upload_driver = $this->driver($site_id);
        //读取上传附件的信息用于后续得校验和数据写入
        $this->upload_driver->read($file);
        return $this->after($site_id, $file_dir, FileDict::IMAGE, $cate_id);
    }

    /**
     * 视频上传
     * @param $file
     * @param $site_id
     * @param $cate_id
     * @param $file_dir
     * @return array
     */
    public function video(string $file, int $site_id, string $file_dir, int $cate_id)
    {

        //校验上传设置
//        $this->checkFile($site_id, $file, FileDict::VIDEO);
        //实例化上传引擎
        $this->upload_driver = $this->driver($site_id);
        //读取上传附件的信息用于后续得校验和数据写入
        $this->upload_driver->read($file);
        return $this->after($site_id, $file_dir, FileDict::VIDEO, $cate_id);

    }


    /**
     * 上传文件
     * @param string $file
     * @param int $site_id
     * @param string $file_dir
     * @param bool $is_local 是否强制本地化
     * @param bool $is_rename  是否重命名
     * @return array
     */
    public function document(string $file, int $site_id, string $type, string $file_dir, bool $is_local = false, bool $is_rename = true)
    {
        //校验上传设置(todo  文件暂时不校验,后补安全性校验)
//        $this->checkFile($site_id, $file, $type ?: FileDict::DOCUMENT);

        //实例化上传引擎
        $this->upload_driver = $this->driver($site_id, $is_local);

        //读取上传附件的信息用于后续得校验和数据写入
        $this->upload_driver->read($file, $is_rename);

        return $this->after($site_id, $file_dir, $type);
    }



    /**
     * 上传
     * @param int $site_id
     * @param string $file_dir
     * @param $type
     * @param $cate_id
     * @return array
     */
    public function after(int $site_id, string $file_dir, string $type, $cate_id = 0){

        $file_info = $this->upload_driver->getFileInfo();

        $dir = $this->root_path .'/'.  $file_dir;
        //执行上传
        $this->upload_driver->setType($type)->setValidate(config('upload.rules')[$type])->upload($dir);

        $file_name = $this->upload_driver->getFileName();
        $full_path = $this->upload_driver->getFullPath($dir);
        $core_attachment_service = new CoreAttachmentService();
        $url = $this->upload_driver->getUrl($full_path);
        if($this->is_attachment){
            //将数据写入附件表中
            $data = array(
                'name' => $file_name,
                'dir' => $dir,
                'att_type' => $type,
                'real_name' => $file_info['name'],//附件原名可能过长
                'att_size' => $file_info['size'],
                'upload_type' => self::$storage_type,
                'path' => $full_path,
                'url' => $url,
                'cate_id' => $cate_id,
            );
            $att_id = $core_attachment_service->add($site_id, $data);

        }
        $return_array = [
            'url' => $url
        ];
        if(!empty($att_id)){
            $return_array['att_id'] = $att_id;
        }
        return $return_array;
    }

}