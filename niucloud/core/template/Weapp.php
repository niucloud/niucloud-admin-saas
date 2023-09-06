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
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use EasyWeChat\Kernel\Support\Collection;
use EasyWeChat\MiniProgram\SubscribeMessage\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;


class Weapp extends BaseTemplate
{

    protected $site_id;

    /**
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $this->site_id = $config['site_id'] ?? '';

    }

    /**
     * 实例化订阅消息业务
     * @return Client
     */
    public function template()
    {
        return CoreWeappService::app($this->site_id)->subscribe_message;
    }

    /**
     * 消息发送
     * @param array $data
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidArgumentException
     * @throws InvalidConfigException
     */
    public function send(array $data)
    {
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
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function addTemplate(array $data)
    {
        return $this->template()->addTemplate($data['tid'], $data['kid_list'], $data['scene_desc']);
    }

    /**
     * 删除
     * @param array $data
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function delete(array $data)
    {
        return $this->template()->deleteTemplate($data['template_id']);
    }

    /**
     * 获取
     * @return void
     */
    public function get()
    {

    }
}