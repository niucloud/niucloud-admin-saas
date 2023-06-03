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

use app\service\core\weapp\CoreWeappService;


class Weapp extends BaseTemplate
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
     * 实例化订阅消息业务
     * @return \EasyWeChat\MiniProgram\SubscribeMessage\Client
     */
    public function template(){
        return CoreWeappService::app($this->site_id)->subscribe_message;
    }
    /**
     * 消息发送
     * @param string $templateId
     * @param array $data
     * @return mixed|void
     */
    public function send(array $data){
        return $this->template()->send([
            'template_id' => $data['template_id'],
            'touser' => $data['openid'],
            'page' => $data['page'],
            'data' => $data['data'],
        ]);
    }

    /**
     * 添加模板消息
     * @param array $data
     * @return mixed|void
     */
    public function addTemplate(array $data){
        return $this->template()->addTemplate($data['tid'], $data['kidList'], $data['sceneDesc']);
    }

    /**
     * 删除
     * @param array $data
     * @return mixed|void
     */
    public function delete(array $data){
        return $this->template()->deleteTemplate($data['template_id']);
    }

    /**
     * 获取
     * @return mixed|void
     */
    public function get(){

    }
}