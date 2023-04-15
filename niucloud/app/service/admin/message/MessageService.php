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

namespace app\service\admin\message;

use app\enum\sys\MessageEnum;
use app\enum\sys\MessageTypeEnum;
use app\model\sys\SysMessage;
use app\model\sys\SysMessageLog;
use app\service\admin\BaseAdminService;
use app\service\core\message\CoreMessageService;
use extend\exception\AdminException;

/**
 * 消息管理服务层
 * Class MessageService
 * @package app\service\admin\message
 */
class MessageService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysMessage();
    }

    /**
     * 获取当前站点消息
     * @return array
     */
    public function getList()
    {
        return (new CoreMessageService())->getList($this->site_id);
    }

    /**
     * 获取消息内容
     * @param string $key
     */
    public function getInfo(string $key)
    {
        return (new CoreMessageService())->getInfo($this->site_id, $key);
    }

    /**
     * 修改消息模板字段(todo  注意  仅限程序内部调用,故不做验证)
     * @param string $key
     * @param string $field_type
     * @param $value
     * @return void
     */
    public function modify(string $key, string $field_type, $value){
        $data = array(
            $field_type => $value
        );
        return (new CoreMessageService())->update($this->site_id, $key, $data);
    }

    /**
     * 修改消息状态
     * @param string $key
     * @param string $type
     * @param int $status
     * @return \think\Response
     */
    public function updateMessageStatus(string $key, string $type, int $status)
    {
        if(!array_key_exists($type, MessageTypeEnum::getType())) throw new AdminException(204001);
        if(!array_key_exists($key, MessageEnum::getMessage())) return fail(204001);
        return (new CoreMessageService())->update($this->site_id, $key, ['is_'.$type => $status]);
    }

    /**
     * 消息编辑
     * @param string $key
     * @param string $type
     * @param array $data
     * @return \think\Response
     */
    public function update(string $key, string $type, array $data)
    {
        if(!array_key_exists($type, MessageTypeEnum::getType())) throw new AdminException(204001);
        if(!array_key_exists($key, MessageEnum::getMessage())) return fail(204001);
        $save_data = ['is_'.$type => $data['status']];
        switch ($type)
        {
            case MessageTypeEnum::SMS:
                $save_data['sms_id'] = $data['sms_id'] ?? '';
                break;
            case MessageTypeEnum::WECHAT:
                $save_data['wechat_first'] = $data['wechat_first'] ?? '';
                $save_data['wechat_remark'] = $data['wechat_remark'] ?? '';
                break;
            case MessageTypeEnum::WEAPP:
                break;
        }
        return (new CoreMessageService())->update($this->site_id, $key, $save_data);
    }



}