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

namespace app\adminapi\controller\niucloud;

use app\service\admin\niucloud\NiucloudService;
use app\service\core\niucloud\CoreAuthService;
use core\base\BaseAdminController;
use think\Response;

class Module extends BaseAdminController
{
    public function authorize()
    {
        return success((new CoreAuthService())->getAuthInfo());
    }

    /**
     * 设置 授权信息
     */
    public function setAuthorize()
    {
        $data = $this->request->params([
            ['auth_code', ''],
            ['auth_secret', '']
        ]);
        $this->validate($data, 'app\validate\niucloud\Module.set');
        return success("SUCCESS",  (new NiucloudService())->setAuthorize($data));
    }

    /**
     * 获取 授权信息
     */
    public function getAuthorize()
    {
        return success((new NiucloudService())->getAuthorize());
    }

    /**
     * 获取框架最新版本
     * @return Response
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getFrameworkLastVersion() {
        return success(data:(new NiucloudService())->getFrameworkLastVersion());
    }
}
