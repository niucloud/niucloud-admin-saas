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

use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use think\Model;

/**
 * 上传服务层
 * Class BaseService
 * @package app\service
 */
class CoreUploadConfigService extends BaseCoreService
{

    /**
     * 上传配置
     * @param $site_id
     * @return mixed|string[]
     */
    public function getUploadConfig(int $site_id)
    {
        $info = (new  CoreConfigService())->getConfig($site_id, ConfigKeyDict::UPLOAD)['value'] ?? [];
        if (empty($info)) {
            $info = [
                'image_ext' => [
                    'jpg', 'png', 'gif', 'jpeg', 'webp'
                ],//图片上传文件后缀
                'video_ext' => [
                    'wmv', 'avi', 'mpg', 'mpeg', '3gp', 'mov', 'mp4', 'flv', 'f4v', 'rmvb', 'mkv'
                ],//视频上传文件后缀
                'document_ext' => [
                    'crt', 'pem'
                ],
                'image_size' => 0,//图片上传大小限制
                'video_size' => 0,//视频上传大小限制
                'document_size' => 0,//文件上传大小限制
            ];
        }
        return $info;
    }

    /**
     * 文件上传设置
     * @param int $site_id
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setUploadConfig(int $site_id, array $data)
    {
        return (new  CoreConfigService())->setConfig($site_id, ConfigKeyDict::UPLOAD, $data);

    }

}