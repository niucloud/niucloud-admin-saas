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

namespace app\service\core\file;

use app\enum\sys\FileEnum;
use app\service\core\sys\CoreAttachmentService;
use extend\exception\UploadFileException;

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
        $this->checkFile($site_id, $file, FileEnum::IMAGE);
        //实例化上传引擎
        $this->upload_driver = $this->driver($site_id);
        //读取上传附件的信息用于后续得校验和数据写入
        $this->upload_driver->read($file);
        return $this->after($site_id, $file_dir, FileEnum::IMAGE, $cate_id);
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
        $this->checkFile($site_id, $file, FileEnum::VIDEO);
        //实例化上传引擎
        $this->upload_driver = $this->driver($site_id);
        //读取上传附件的信息用于后续得校验和数据写入
        $this->upload_driver->read($file);
        return $this->after($site_id, $file_dir, FileEnum::VIDEO, $cate_id);

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
    public function document(string $file, int $site_id, string $file_dir, bool $is_local = false, bool $is_rename = true)
    {
        //校验上传设置(todo  文件暂时不校验,后补安全性校验)
        $this->checkFile($site_id, $file, FileEnum::DOCUMENT);

        //实例化上传引擎
        $this->upload_driver = $this->driver($site_id, $is_local);

        //读取上传附件的信息用于后续得校验和数据写入
        $this->upload_driver->read($file, $is_rename);

        return $this->after($site_id, $file_dir, FileEnum::DOCUMENT);
    }

    /**
     * 根据上传文件的类型来校验文件是否符合配置
     * @param int $site_id
     * @param string $file
     * @param string $att_type
     * @return void
     */
    public function checkFile(int $site_id, string $file, string $att_type)
    {
        $file_obj = request()->file($file);
        if (empty($file_obj))
            throw new UploadFileException(100012);
//        $config = array(
//            'image_ext' => ['gif', 'jpg'],//允许的后缀
//            'video_ext' => ['gif', 'jpg'],//允许的后缀
////            'image' => [
////                'width' => 540,
////                'height' => 737,
////            ],
//            'file_size' => 1,//大小
//            'file_mime' => []
//        );
        $core_upload_config_service = new CoreUploadConfigService();
        $config= $core_upload_config_service->getUploadConfig($site_id);
        $config['file_ext'] = match ($att_type) {
            FileEnum::IMAGE => $config['image_ext'] ?? [],
            FileEnum::VIDEO => $config['video_ext'] ?? [],
            default => [],
        };
        $config['file_size'] = match ($att_type) {
            FileEnum::IMAGE => $config['image_size'] ?? 0,
            FileEnum::VIDEO => $config['video_size'] ?? 0,
            default => 0,
        };
        $rule = [];
        $file_size = $config['file_size'] ?? 0;
        if ($file_size > 0) {
            $rule[] = 'fileSize:' . $file_size * 1024 * 1024;
        }

        $file_ext = $config['file_ext'] ?? [];
        if (!empty($file_ext)) {
            $rule[] = 'fileExt:' . implode(',', $file_ext);
        }
        //验证上传文件类型
        $file_mime = $config['file_mime'] ?? [];
        if (!empty($file_mime)) {
            $rule[] = 'fileMime:' . implode(',', $file_mime);
        }


        $image_config = $config['image'] ?? [];
        if (!empty($image_config)) {
            $image_width = $image_config['width'] ?? 0;
            $image_height = $image_config['height'] ?? 0;
            $image_type = $image_config['type'] ?? [];
            $image_rule = '';
            if ($image_width > 0 && $image_height > 0) {
                $image_rule = 'image:' . $image_width . ',' . $image_height;
            }
            if (!empty($image_type)) {
                if (empty($image_rule)) {
                    $image_rule = 'image:';
                } else {
                    $image_rule .= ',';
                }
                $image_rule .= implode(',', $image_type);
            }
            if (!empty($image_type)) {
                $rule[] = $image_rule;
            }
        }
        if (!empty($rule)) {
            validate([$file => implode('|', $rule)])->check([$file => $file_obj]);
        }

    }

    /**
     * 上传后续
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
        $this->upload_driver->upload($dir);

        $file_name = $this->upload_driver->getFileName();
        $full_path = $this->upload_driver->getFullPath();
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