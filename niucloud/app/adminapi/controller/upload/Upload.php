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

use app\service\admin\upload\UploadConfigService;
use app\service\admin\upload\UploadService;
use core\base\BaseAdminController;
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
            ['cate_id', 0],
            ['is_attachment', 1]
        ]);
        $upload_service = new UploadService();
        return success($upload_service->image($data['file'], $data['cate_id'], boolval($data['is_attachment'])));
    }

    /**
     * 视频上传
     * @return Response
     */
    public function video()
    {
        $data = $this->request->params([
            ['file', 'file'],
            ['cate_id', 0]
        ]);
        $upload_service = new UploadService();
        return success($upload_service->video($data['file'], $data['cate_id']));
    }

    /**
     * 文件上传(默认不上云)
     * @return Response
     */
    public function document($type)
    {
        $data = $this->request->params([
            ['file', 'file'],
        ]);
        $upload_service = new UploadService();
        return success($upload_service->document($data['file'], $type));
    }

    /**
     * 上传配置
     * @return Response
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
        return success('SET_SUCCESS');
    }

    /**
     * 获取上传配置
     * @return Response
     */
    public function getUploadConfig()
    {
        return success((new UploadConfigService())->getUploadConfig());
    }

}
