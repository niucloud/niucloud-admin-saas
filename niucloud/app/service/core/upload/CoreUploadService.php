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
use Exception;

/**
 * 上传服务层
 */
class CoreUploadService extends CoreFileService
{

    public function __construct($is_attachment = false)
    {
        parent::__construct($is_attachment);
    }

    /**
     * 图片上传
     * @param string $file
     * @param int $site_id
     * @param string $file_dir
     * @param int $cate_id
     * @return array
     * @throws Exception
     */
    public function image(string $file, int $site_id, string $file_dir, int $cate_id = 0)
    {
        //实例化上传引擎
        $this->upload_driver = $this->driver($site_id);
        //读取上传附件的信息用于后续得校验和数据写入
        $this->upload_driver->read($file);
        //生成缩略图....
        return $this->after($site_id, $file_dir, FileDict::IMAGE, $cate_id);
    }

    /**
     * 上传
     * @param int $site_id
     * @param string $file_dir
     * @param string $type
     * @param int $cate_id
     * @return array
     */
    public function after(int $site_id, string $file_dir, string $type, int $cate_id = 0)
    {
        $file_info = $this->upload_driver->getFileInfo();
        $dir = $this->root_path . '/' . $file_dir;
        //执行上传
        $this->upload_driver->setType($type)->setValidate($this->validate)->upload($dir);
        $file_name = $this->upload_driver->getFileName();
        $full_path = $this->upload_driver->getFullPath($dir);
        $core_attachment_service = new CoreAttachmentService();
        $url = $this->upload_driver->getUrl($full_path);
        if ($this->is_attachment) {
            //将数据写入附件表中
            $data = array(
                'name' => $file_name,
                'dir' => $dir,
                'att_type' => $type,
                'real_name' => $file_info['name'],//附件原名可能过长
                'att_size' => $file_info['size'],
                'storage_type' => self::$storage_type,
                'path' => $full_path,
                'url' => $url,
                'cate_id' => $cate_id,
            );
            $att_id = $core_attachment_service->add($site_id, $data);
        }
        $return_array = [
            'url' => $url
        ];
        if (!empty($att_id)) {
            $return_array['att_id'] = $att_id;
        }
        return $return_array;
    }

    /**
     * 视频上传
     * @param string $file
     * @param int $site_id
     * @param string $file_dir
     * @param int $cate_id
     * @return array
     * @throws Exception
     */
    public function video(string $file, int $site_id, string $file_dir, int $cate_id)
    {
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
     * @param string $type
     * @param string $file_dir
     * @param string $storage_type
     * @return array
     * @throws Exception
     */
    public function document(string $file, int $site_id, string $type, string $file_dir, string $storage_type)
    {
        //实例化上传引擎
        $this->upload_driver = $this->driver($site_id, $storage_type);
        //读取上传附件的信息用于后续得校验和数据写入
        $this->upload_driver->read($file);
        return $this->after($site_id, $file_dir, $type);
    }

}