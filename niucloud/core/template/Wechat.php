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

namespace core\template;

use AlibabaCloud\Client\AlibabaCloud;
use app\service\core\wechat\CoreWechatService;
use core\exception\NoticeException;
use core\sms\BaseSms;
use Exception;


class Wechat extends BaseTemplate
{

    protected $site_id;
    /**
     * @param array $config
     * @return mixed|void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $this->site_id = $config['site_id'] ?? '';

    }

    /**
     * 实例化模板消息业务
     * @return \EasyWeChat\OfficialAccount\TemplateMessage\Client
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     */
    public function template(){
        return CoreWechatService::app($this->site_id)->template_message;
    }
    /**
     * 消息发送
     * @param string $templateId
     * @param array $data
     * @return mixed|void
     */
    public function send(array $data){
        $openid = $data['openid'];
        $template_id = $data['template_id'];
        $template_data = $data['data'];
        $first = $data['first'];
        $remark = $data['remark'];
        $url = $data['url'];
        $miniprogram = $data['miniprogram'];

        if(!empty($first)) $template_data['first'] = $first;
        if(!empty($remark)) $template_data['remark'] = $remark;
        return $this->template()->send([
            'touser' => $openid,
            'template_id' => $template_id,
            'url' => $url,
            'miniprogram' => $miniprogram,
            'data' => $template_data,
        ]);
    }

    /**
     * 添加模板消息
     * @param string $shortId
     * @return mixed|void
     */
    public function addTemplate(array $data){
        return $this->template()->addTemplate($data['shortId']);
    }

    /**
     * 删除
     * @param string $templateId
     * @return mixed|void
     */
    public function delete(array $data){
        return $this->template()->deletePrivateTemplate($data['templateId']);
    }

    /**
     * 获取
     * @return mixed|void
     */
    public function get(){

    }
}