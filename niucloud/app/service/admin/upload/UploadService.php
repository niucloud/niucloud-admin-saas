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

namespace app\service\admin\upload;

use app\dict\sys\FileDict;
use app\dict\sys\StorageDict;
use app\service\core\upload\CoreUploadService;
use core\base\BaseAdminService;
use core\exception\UploadFileException;
use Exception;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class UploadService extends BaseAdminService
{
    private $root_path = 'attachment';


    /**
     * 附件库上传图片
     * @param $file
     * @param int $cate_id
     * @return array
     */
    public function image($file, int $cate_id = 0, $is_attachment = true){
        $dir = $this->root_path.'/'.'image'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService($is_attachment);
        //如果没有选择相册分组的话,就选择第一个相册分组
        return $core_upload_service->image($file, $this->site_id, $dir, $cate_id);
    }

    /**
     * 附件库上传视频
     * @param $file
     * @param int $cate_id
     * @return array
     */
    public function video($file, int $cate_id = 0){
        $dir = $this->root_path.'/'.'video'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService(true);
        return $core_upload_service->video($file, $this->site_id, $dir, $cate_id);
    }

    /**
     * 文件上传
     * @param $file
     * @param string $type
     * @return array
     * @throws Exception
     */
    public function document($file, string $type){
        if(!in_array($type, FileDict::getSceneType()))
            throw new UploadFileException('UPLOAD_TYPE_ERROR');
        $dir = $this->root_path.'/document/'.$type.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->document($file, $this->site_id, $type, $dir, StorageDict::LOCAL);
    }
}