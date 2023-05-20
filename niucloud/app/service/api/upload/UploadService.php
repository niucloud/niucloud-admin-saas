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

namespace app\service\api\upload;

use app\service\core\upload\CoreUploadService;
use core\base\BaseApiService;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class UploadService extends BaseApiService
{
    private $root_path = 'file';
    private $cate_id = 0;

    /**
     * 附件库上传图片
     * @param int $cate_id
     * @param string $dir
     * @return array
     */
    public function image($file)
    {
        $dir = $this->root_path . '/' . 'image' . '/' . $this->site_id . '/' . date('Ym') . '/' . date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->image($file, $this->site_id, $dir, $this->cate_id);
    }

    /**
     * 附件库上传视频
     * @param $file
     * @param int $cate_id
     * @return array
     */
    public function video($file)
    {
        $dir = $this->root_path . '/' . 'video' . '/' . $this->site_id . '/' . date('Ym') . '/' . date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->video($file, $this->site_id, $dir, $this->cate_id);
    }

    /**
     * 文件上传
     * @param $file
     * @param bool $is_local
     * @return array
     */
    public function document($file, bool $is_local = false)
    {
        $dir = $this->root_path . '/' . 'document' . '/' . $this->site_id . '/' . date('Ym') . '/' . date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->document($file, $this->site_id, '', $dir, $is_local);
    }
}