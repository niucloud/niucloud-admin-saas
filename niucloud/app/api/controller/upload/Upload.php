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

use app\api\controller\BaseApiController;
use app\BaseController;
use app\service\api\file\Base64Service;
use app\service\api\file\FetchService;
use app\service\api\file\UploadService;
use app\service\api\weapp\WeappAuthService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use think\Response;

class Upload extends BaseApiController
{

    public function image(){
        $data = $this->request->params([
            ['file', 'file'],
        ]);
        $upload_service = new UploadService();
        return success($upload_service->image($data['file']));
    }

    public function imageFetch(){
        $data = $this->request->params([
            ['url', ''],
        ]);
        $fetch_service = new FetchService();
        return success($fetch_service->image($data['url']));
    }



    public function imageBase64(){
        $data = $this->request->params([
            ['content', ''],
        ]);
        $base64_service = new Base64Service();
        return success($base64_service->image($data['content']));
    }
}
