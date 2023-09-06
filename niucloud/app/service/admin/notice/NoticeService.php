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

namespace app\service\admin\notice;

use app\dict\notice\NoticeDict;
use app\dict\notice\NoticeTypeDict;
use app\model\sys\SysNotice;
use app\service\core\notice\CoreNoticeService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\Response;

/**
 * 消息管理服务层
 */
class NoticeService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysNotice();
    }

    /**
     * 获取当前站点消息
     * @return array
     */
    public function getList()
    {
        return (new CoreNoticeService())->getList($this->site_id);
    }

    /**
     * 获取消息内容
     * @param string $key
     * @return array
     */
    public function getInfo(string $key)
    {
        return (new CoreNoticeService())->getInfo($this->site_id, $key);
    }

    /**
     * 修改消息模板字段(todo  注意  仅限程序内部调用,故不做验证)
     * @param string $key
     * @param string $field_type
     * @param $value
     * @return bool
     */
    public function modify(string $key, string $field_type, $value){
        $data = array(
            $field_type => $value
        );
        return (new CoreNoticeService())->edit($this->site_id, $key, $data);
    }

    /**
     * 修改消息状态
     * @param string $key
     * @param string $type
     * @param int $status
     * @return Response
     */
    public function editMessageStatus(string $key, string $type, int $status)
    {
        if(!array_key_exists($type, NoticeTypeDict::getType())) throw new AdminException('NOTICE_TYPE_NOT_EXIST');
        if(!array_key_exists($key, NoticeDict::getNotice())) return fail('NOTICE_TYPE_NOT_EXIST');
        return (new CoreNoticeService())->edit($this->site_id, $key, ['is_'.$type => $status]);
    }

    /**
     * 消息编辑
     * @param string $key
     * @param string $type
     * @param array $data
     * @return Response
     */
    public function edit(string $key, string $type, array $data)
    {
        if(!array_key_exists($type, NoticeTypeDict::getType())) throw new AdminException('NOTICE_TYPE_NOT_EXIST');
        if(!array_key_exists($key, NoticeDict::getNotice())) return fail('NOTICE_TYPE_NOT_EXIST');
        $save_data = ['is_'.$type => $data['status']];
        switch ($type)
        {
            case NoticeTypeDict::SMS:
                $save_data['sms_id'] = $data['sms_id'] ?? '';
                break;
            case NoticeTypeDict::WECHAT:
                $save_data['wechat_first'] = $data['wechat_first'] ?? '';
                $save_data['wechat_remark'] = $data['wechat_remark'] ?? '';
                break;
            case NoticeTypeDict::WEAPP:
                break;
        }
        return (new CoreNoticeService())->edit($this->site_id, $key, $save_data);
    }



}