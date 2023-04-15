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

namespace app\adminapi\controller\upload;

use app\adminapi\controller\BaseAdminController;
use app\adminapi\controller\sys\AdminException;
use app\enum\sys\StorageEnum;
use app\service\admin\file\UploadConfigService;
use app\service\admin\file\UploadService;
use think\Response;

class Upload extends BaseAdminController
{
    /**
     * 图片上传
     * @return Response
     */
    public function image()
    {

        $data = $this->request->params([
            ['file', 'file'],
            ['cate_id', '=', 0]
        ], true);
        $upload_service = new UploadService();
        return success($upload_service->image($data['file'], $data['cate_id']));
    }

    /**
     * 视频上传
     * @return Response
     */
    public function video()
    {
        $data = $this->request->params([
            ['file', 'file'],
            ['cate_id', '=', 0]
        ], true);
        $upload_service = new UploadService();
        return success($upload_service->video($data['file'], $data['cate_id']));
    }

    /**
     * 文件上传(默认不上云)
     * @return Response
     */
    public function document(){
        $data = $this->request->params([
            ['file', 'file'],
        ], true);
        $upload_service = new UploadService();
        return success($upload_service->document($data['file'], true));
    }



    /**
     * 上传配置
     * @return void
     */
    public function setUploadConfig()
    {
        $data = $this->request->params(
            [
                ['image_size', 0],
                ['video_size', 0],
                ['image_ext', ''],
                ['video_ext', ''],
            ]
        );
        (new UploadConfigService())->setUploadConfig($data);
        return success(100016);
    }

    /**
     * 获取上传配置
     * @return Response
     */
    public function getUploadConfig()
    {
        return success((new UploadConfigService())->getUploadConfig());
    }

    /**
     * 证书上传
     * @param $type
     * @return void
     */
    public function cert($type){
        $data = $this->request->params([
            ['file', 'file'],
        ], true);
        $upload_service = new UploadService();
        return success($upload_service->cert($data['file'], $type));
    }

}
