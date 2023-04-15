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

namespace app\adminapi\controller\sys;

use app\adminapi\controller\BaseAdminController;
use app\service\admin\sys\AgreementService;
use think\Response;

/**
 * 协议控制器
 * Class Agreement
 * @package app\adminapi\controller\sys
 */
class Agreement extends BaseAdminController
{
    /**
     * 协议列表
     * @return Response
     */
    public function lists()
    {
        $res = (new AgreementService())->getList();
        return success($res);
    }

    /**
     * 协议内容
     * @param string $key
     * @return Response
     */
    public function info(string $key)
    {
        $res = (new AgreementService())->getAgreement($key);
        return success($res);
    }

    /**
     * 协议更新
     * @param string $key
     * @return Response
     */
    public function update(string $key){
        $data = $this->request->params([
            ['title', ''],
            ['content', ''],
        ], false);
        $this->validate($data, 'app\validate\sys\Agreement.update');
        (new AgreementService())->setAgreement($key, $data['title'], $data['content']);
        return success(100004);
    }


}
