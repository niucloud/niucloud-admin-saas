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

namespace app\service\core\message;


use app\enum\sys\MessageEnum;
use app\model\sys\SysMessage;
use app\service\core\BaseCoreService;
use extend\exception\MessageException;


/**
 * 短信配置服务层
 * Class SmsService
 * @package app\service\admin\message
 */
class CoreMessageService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysMessage();
    }

    /**
     * 发送消息
     * @param $site_id
     * @param $key
     * @param $data
     * @param bool $is_delay 是否延时
     * @return bool
     */
    public function send($site_id, $key, $data, bool $is_delay = true, bool $is_throw = true){


        $message_data = array(
            'site_id' => $site_id,
            'key' => $key,
        );
        $message_data = array_merge($data, $message_data);
        if($is_delay){     //异步
            create_queue('message\message', $message_data);
        }else{
            (new CoreMessageEventService($is_throw))->event($message_data);
        }

        return true;
    }


    /**
     * 获取当前站点消息
     * @return array
     */
    public function getList(int $site_id, array $keys = [])
    {
        $list = $this->model->where([['site_id', '=', $site_id]])->select()->toArray();
        if(!empty($list))
        {
            $list_key = array_column($list, 'key');
            $list = array_combine($list_key, $list);
        }
        $message = MessageEnum::getMessage();
        foreach ($message as $k => $v)
        {
            if(!empty($keys) && !in_array($v['key'], $keys)){
                unset($message[$k]);
                continue;
            }
            if(array_key_exists($k, $list))
            {
                $message[$k] = array_merge($v, $list[$k]);
            }else{
                $data = [
                    'site_id' => $site_id,
                    'sms_content' => '',
                    'is_wechat' => 0,
                    'is_weapp' => 0,
                    'is_sms' => 0,
                    'wechat_template_id' => '',
                    'weapp_template_id' => '',
                    'sms_id' => '',
                    'wechat_first' => '',
                    'wechat_remark' => ''
                ];
                $message[$k] = array_merge($v, $data);

            }
        }
        return $message;
    }

    /**
     * 获取消息内容(可以做缓存)
     * @param string $key
     */
    public function getInfo(int $site_id, string $key)
    {
        if(!array_key_exists($key, MessageEnum::getMessage())) throw new MessageException(204001);
        $info = $this->model->where([['site_id', '=', $site_id], ['key', '=', $key]])->findOrEmpty()->toArray();
        if(!empty($info))
        {
            $message = array_merge(MessageEnum::getMessage($key), $info);
        }else{
            $data = [
                'site_id' => $site_id,
                'sms_content' => '',
                'is_wechat' => 0,
                'is_weapp' => 0,
                'is_sms' => 0,
                'wechat_template_id' => '',
                'weapp_template_id' => '',
                'sms_id' => '',
                'wechat_first' => '',
                'wechat_remark' => ''
            ];
            $message = array_merge(MessageEnum::getMessage($key), $data);

        }
        return $message;
    }

    public function find(int $site_id, string $key)
    {
        return $this->model->where([ ['site_id', '=', $site_id], ['key', '=', $key] ])->findOrEmpty();
    }

    /**
     * 消息公共编辑
     * @param int $site_id
     * @param string $key
     * @param array $data
     * @return bool
     */
    public function update(int $site_id, string $key, array $data)
    {
        $message = $this->find($site_id, $key);
        if($message->isEmpty()){
            $message_template = MessageEnum::getMessage($key);
            $wechat_json = $message_template['wechat_json'] ?? [];
            $this->model->create(array_merge([
                'site_id' => $site_id,
                'key' => $key,
                'sms_content' => $message_template['sms_default_content'] ?? '',
                'wechat_first' => $data['wechat_first'] ?? ($wechat_json['first'] ?? ''),
                'wechat_remark' => $data['wechat_remark'] ?? ($wechat_json['remark'] ?? ''),
            ], $data));
        }else{
            $message->save($data);
        }
        return true;

    }

}