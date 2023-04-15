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

namespace app\service\admin\file;

use app\enum\channel\CertEnum;
use app\service\admin\BaseAdminService;
use app\service\core\file\CoreUploadService;
use extend\exception\UploadFileException;

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
     * @param int $cate_id
     * @param string $dir
     * @return array
     */
    public function image($file, int $cate_id = 0){
        $dir = $this->root_path.'/'.'image'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService(true);
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
     * @param bool $is_local
     * @return array
     */
    public function document($file,bool $is_local = false){
        $dir = $this->root_path.'/'.'document'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->document($file, $this->site_id, $dir, $is_local);
    }


    /**
     * 微信相关证书
     * @param $file
     * @param bool $is_local
     * @return array
     */
    public function cert($file, string $type){
        if(!in_array($type, CertEnum::getCertType()))
            throw new UploadFileException(203008);
        $dir = $this->root_path.'/cert/'.$type.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->document($file, $this->site_id, $dir, true, false);
    }

    /**
     * 小程序证书
     * @param $file
     * @return array
     */
    public function weapp($file){
        $dir = $this->root_path.'/cert/'.'weapp'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->document($file, $this->site_id, $dir, true, false);
    }


    /**
     * 微信支付相关证书
     * @param $file
     * @return array
     */
    public function wechatpay($file){
        $dir = $this->root_path.'/cert/'.'wechatpay'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->document($file, $this->site_id, $dir, true, false);
    }

    /**
     * 阿里云相关证书
     * @param $file
     * @return array
     */
    public function aliyun($file){
        $dir = $this->root_path.'/cert/'.'aliyun'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService();
        return $core_upload_service->document($file, $this->site_id, $dir, true, false);
    }


}