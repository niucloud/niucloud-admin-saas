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

namespace app\service\core\wechat;

use app\service\core\BaseCoreService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;

/**
 * easywechat主体提供
 * Class CoreWechatTemplateService
 * @package app\service\core\wechat
 */
class CoreWechatTemplateService extends BaseCoreService
{
    /**
     * 获取模板消息业务对象
     * @param $site_id
     * @return \EasyWeChat\OfficialAccount\TemplateMessage\Client
     * @throws InvalidArgumentException
     */
    public function template($site_id){
        return CoreWechatService::app($site_id)->template_message;
    }

    /**
     * 发送模板消息
     * @param $site_id
     * @param $open_id
     * @param $wechat_template_id
     * @param $data
     * @param $first
     * @param $remark
     * @param $url
     * @param $miniprogram
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function send(int $site_id, string $open_id, string $wechat_template_id, array $data, string $first, string $remark, string $url = '', $miniprogram = ''){
        if(!empty($first)) $data['first'] = $first;
        if(!empty($remark)) $data['remark'] = $remark;

        return $this->template($site_id)->send([
            'touser' => $open_id,
            'template_id' => $wechat_template_id,
            'url' => $url,
            'miniprogram' => $miniprogram,
            'data' => $data,
        ]);

    }

    /**
     * 删除
     * @param int $site_id
     * @param string $templateId
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function deletePrivateTemplate(int $site_id, string $templateId){
        return $this->template($site_id)->deletePrivateTemplate($templateId);
    }

    /**
     * 添加
     * @param int $site_id
     * @param string $shortId
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function addTemplate(int $site_id, string $shortId){
        return $this->template($site_id)->addTemplate($shortId);
    }

}