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
use app\dict\sys\StorageDict;
use app\service\core\sys\CoreAttachmentService;
use core\exception\UploadFileException;

/**
 * 图片服务层
 * Class CoreUploadService
 * @package app\service\core\file
 */
class CoreImageService extends CoreFileService
{


    /**
     * @param int $site_id
     * @param string $file_path
     * @param $thumb_type  裁剪的图片规格
     * @return mixed
     * @throws \Exception
     */
    public function thumb(int $site_id, string $file_path,  $thumb_type = 'all')
    {
        $file_parse = parse_url($file_path);
        $file_domain = $file_parse['scheme'] . '://' . $file_parse['host'];
        //判断是哪个云上传的实例
        $storage_type_list = (new CoreStorageService())->getStorageConfigList();
        foreach($storage_type_list as $k => $v){
            $item_params = $v['params'] ?? [];
            $item_domain = $item_params['domain'] ?? '';
            if($item_domain == $file_domain){
                $this->upload_driver = $this->driver($site_id, $v['storage_type']);
            }
        }
        //没有云上传就用本地上传
        if(empty($this->upload_driver)){
            $this->upload_driver = $this->driver($site_id, StorageDict::LOCAL);
        }
        //如果是网络图片,可以将网络图片拉取到本地
        try {
            $thumb_list = $this->upload_driver->thumb($file_path, $thumb_type);
            return $thumb_list;
        } catch (\Throwable $e) {
            throw new UploadFileException($e->getMessage());
        }
    }


}