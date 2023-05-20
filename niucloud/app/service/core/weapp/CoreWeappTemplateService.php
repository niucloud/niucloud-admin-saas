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

namespace app\service\core\weapp;

use core\base\BaseCoreService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;

/**
 * 微信小程序服务提供
 * Class CoreWeappTemplateService
 * @package app\service\core\weapp
 */
class CoreWeappTemplateService extends BaseCoreService
{

    public function template($site_id){
        return CoreWeappService::app($site_id)->subscribe_message;
    }


    /**
     * 订阅消息发送
     * @param $site_id
     * @param $data
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|ResponseInterface|string
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function send(int $site_id, string $template_id, string $touser, array $data, string $page = ''){

        return $this->template($site_id)->send([
            'template_id' => $template_id, // 所需下发的订阅模板id
            'touser' => $touser,     // 接收者（用户）的 openid
            'page' => $page,       // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
            'data' => $data,
        ]);
    }

    /**
     * 组合模板并添加至帐号下的个人模板库
     * @param int $site_id
     * @param $tid
     * @param $kidList
     * @param $sceneDesc
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|ResponseInterface|string
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function addTemplate(int $site_id, $tid, $kidList, $sceneDesc){
//        $tid = 563;     // 模板标题 id，可通过接口获取，也可登录小程序后台查看获取
//        $kidList = [1, 2];      // 开发者自行组合好的模板关键词列表，可以通过 `getTemplateKeywords` 方法获取
//        $sceneDesc = '提示用户图书到期';    // 服务场景描述，非必填

        return $this->template($site_id)->addTemplate($tid, $kidList, $sceneDesc);
    }

    /**
     * 删除帐号下的个人模板
     * @param int $site_id
     * @param $template_id
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|ResponseInterface|string
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function deleteTemplate(int $site_id, $template_id){
        return $this->template($site_id)->deleteTemplate($template_id);
    }

}