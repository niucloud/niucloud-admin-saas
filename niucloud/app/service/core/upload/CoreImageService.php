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

use app\dict\sys\StorageDict;
use core\exception\UploadFileException;
use Exception;
use Throwable;

/**
 * 图片处理层
 */
class CoreImageService extends CoreFileService
{


    /**
     * @param int $site_id
     * @param string $file_path
     * @param $thumb_type  裁剪的图片规格
     * @param bool $is_throw_exception  是否要抛出错误
     * @return mixed
     * @throws Exception
     */
    public function thumb(int $site_id, string $file_path,  $thumb_type = 'all', bool $is_throw_exception = false)
    {
        //文件转url
        $file_path = path_to_url($file_path);
        $file_parse = parse_url($file_path);
        $scheme = $file_parse['scheme'] ?? '';
        $host = $file_parse['host'] ?? '';
        $file_domain = $scheme . '://' . $host;
        //判断是哪个云上传的实例
        $storage_type_list = (new CoreStorageService())->getStorageConfigList();
        foreach($storage_type_list as $k => $v){
            $item_params = $v['params'] ?? [];
            $item_domain = $item_params['domain'] ?? '';
            $item_storage_type = $v['storage_type'];
            if(str_contains($file_path, '_'.$item_storage_type)){
                $this->upload_driver = $this->driver($site_id, $item_storage_type);
            }else{
                if($item_domain == $file_domain){
                    $this->upload_driver = $this->driver($site_id, $item_storage_type);
                }
            }

        }
        //没有云上传就用本地上传
        if(empty($this->upload_driver)){
            $this->upload_driver = $this->driver($site_id, StorageDict::LOCAL);
        }
        //todo 如果是网络图片,可以将网络图片拉取到本地
        try {
            $thumb_list = $this->upload_driver->thumb($file_path, $thumb_type);
            return count($thumb_list) > 1 ? $thumb_list : $thumb_list[$thumb_type] ?? '';
        } catch ( Throwable $e) {
            if($is_throw_exception){
                throw new UploadFileException($e->getMessage());
            }else{
                return '';
            }

        }
    }


}