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

namespace app\adminapi\controller\notice;

use app\dict\sys\SmsDict;
use app\service\admin\notice\NoticeService;
use app\service\admin\notice\SmsService;
use core\base\BaseAdminController;
use core\exception\AdminException;
use think\Response;

class Notice extends BaseAdminController
{

    /**
     * 消息列表
     * @return Response
     */
    public function lists()
    {
        $res = (new NoticeService())->getList();
        return success($res);
    }

    public function info($key)
    {
        $res = (new NoticeService())->getInfo($key);
        return success($res);
    }

    /**
     * 消息启动与关闭
     * @return Response
     */
    public function editStatus()
    {
        $data = $this->request->params([
            ['key', ''],
            ['type', ''],
            ['status', 0],
        ]);
        (new NoticeService())->editMessageStatus($data['key'], $data['type'], $data['status']);
        return success();
    }

    /**
     * 短信配置列表
     */
    public function smsList()
    {
        $res = (new SmsService())->getList();
        return success($res);
    }

    /**
     * 短信配置详情
     * @param $sms_type
     * @return Response
     */
    public function smsConfig($sms_type)
    {
        $res = (new SmsService())->getConfig($sms_type);
        return success($res);
    }

    /**
     * 短信配置修改
     * @return Response
     */
    public function editSms($sms_type)
    {
        //参数获取
        $sms_type_list = SmsDict::getType();
        if (!array_key_exists($sms_type, $sms_type_list)) throw new AdminException('SMS_TYPE_NOT_EXIST');
        //数据验证
        $data = [
            ['is_use', 0]
        ];
        foreach ($sms_type_list[$sms_type]['params'] as $k_param => $v_param) {
            $data[] = [$k_param, ''];
        }

        $request_data = $this->request->params($data);
        (new SmsService())->setConfig($sms_type, $request_data);
        return success();
    }

    /**
     * 消息列表
     * @return Response
     */
    public function getLogList()
    {
        $data = $this->request->params([
            ['key', ''],
            ['receiver', ''],
        ]);

        $res = (new NoticeService())->getLogPage($data);
        return success($res);
    }

    /**
     * 消息修改
     * @return Response
     */
    public function edit()
    {
        $data = $this->request->params([
            ['key', ''],
            ['type', ''],
            ['status', ''],
            ['sms_id', ''],
            ['wechat_first', ''],
            ['wechat_remark', ''],
        ]);
        (new NoticeService())->edit($data['key'], $data['type'], $data);
        return success();
    }

}
