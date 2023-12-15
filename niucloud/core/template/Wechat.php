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

use app\service\core\wechat\CoreWechatService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use EasyWeChat\Kernel\Support\Collection;
use EasyWeChat\OfficialAccount\TemplateMessage\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;


class Wechat extends BaseTemplate
{

    protected $site_id;

    /**
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $this->site_id = $config[ 'site_id' ] ?? '';

    }

    /**
     * 实例化模板消息业务
     * @return Client
     */
    public function template()
    {
        return CoreWechatService::app($this->site_id)->template_message;
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
        $openid = $data[ 'openid' ];
        $template_id = $data[ 'template_id' ];
        $template_data = $data[ 'data' ];
        $first = $data[ 'first' ];
        $remark = $data[ 'remark' ];
        $url = $data[ 'url' ];
        $miniprogram = $data[ 'miniprogram' ];

        if (!empty($first)) $template_data[ 'first' ] = $first;
        if (!empty($remark)) $template_data[ 'remark' ] = $remark;
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
     * @param array $data
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function addTemplate(array $data)
    {
        return $this->template()->addTemplate($data[ 'shortId' ], $data[ 'keyword_name_list' ]);
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
        return $this->template()->deletePrivateTemplate($data[ 'templateId' ]);
    }

    /**
     * 获取
     * @return void
     */
    public function get()
    {

    }
}