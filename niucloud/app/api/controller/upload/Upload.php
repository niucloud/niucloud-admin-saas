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

namespace app\api\controller\upload;

use app\service\api\upload\Base64Service;
use app\service\api\upload\FetchService;
use app\service\api\upload\UploadService;
use core\base\BaseApiController;
use think\Response;

class Upload extends BaseApiController
{

    /**
     * 图片上传
     * @return Response
     */
    public function image(){
        $data = $this->request->params([
            ['file', 'file'],
        ]);
        $upload_service = new UploadService();
        return success($upload_service->image($data['file']));
    }

    /**
     * 远程图片拉取
     * @return Response
     */
    public function imageFetch(){
        $data = $this->request->params([
            ['url', ''],
        ]);
        $fetch_service = new FetchService();
        return success($fetch_service->image($data['url']));
    }


    /**
     * base64图片上传
     * @return Response
     */
    public function imageBase64(){
        $data = $this->request->params([
            ['content', ''],
        ]);
        $base64_service = new Base64Service();
        return success($base64_service->image($data['content']));
    }
}
