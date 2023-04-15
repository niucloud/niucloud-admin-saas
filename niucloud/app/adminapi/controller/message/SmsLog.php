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

namespace app\adminapi\controller\message;

use app\adminapi\controller\BaseAdminController;
use app\service\admin\message\MessageLogService;
use app\service\admin\message\MessageSmsLogService;
use think\Response;

class SmsLog extends BaseAdminController
{

    /**
     * 短信发送记录列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'mobile', '' ],
            [ 'sms_type', '' ],
            [ 'key', '' ],
        ]);

        $res = ( new MessageSmsLogService() )->getPage($data);
        return success($res);
    }

    public function info($id)
    {
        $res = ( new MessageLogService() )->getInfo($id);
        return success($res);
    }

}
