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

namespace app\service\core\notice;


use app\enum\pay\PayEnum;
use app\job\notice\Message;
use app\job\notice\Notice;
use app\model\pay\PayChannel;
use app\model\sys\SysMessage;
use app\model\sys\SysNotice;
use app\service\core\message\CoreMessageService;
use core\base\BaseCoreService;
use core\exception\NoticeException;
use think\Model;


/**
 * 支付渠道服务层
 */
class NoticeService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysNotice();

    }

    /**
     * 消息发送
     * @param $site_id
     * @param $key
     * @param $data
     * @return false|mixed
     */
    public static function send($site_id, $key, $data){

        $template = (new CoreNoticeService())->getInfo($site_id, $key);
        if(empty($template)) return false;

        return Notice::invoke(['site_id' => $site_id, 'key' => $key, 'data' => $data, 'template' => $template], is_open:$template['async']);
    }
}