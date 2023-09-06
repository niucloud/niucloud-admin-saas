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

use core\base\BaseCoreService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use GuzzleHttp\Exception\GuzzleException;

/**
 * 微信服务api提供
 * Class CoreWechatApiService
 * @package app\service\core\wechat
 */
class CoreWechatApiService extends BaseCoreService
{
    /**
     * 获取用户信息
     */
    public function userInfo(int $site_id, string $openid)
    {
        return CoreWechatService::app($site_id)->user->get($openid);
    }

    /**
     * 批量获取用户基本信息
     * @param int $site_id
     * @param array $openids
     * @param string $lang
     * @return mixed
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function userInfoBatchget(int $site_id, array $openids, string $lang = 'zh_CN')
    {
        return CoreWechatService::app($site_id)->user->select($openids);
    }
    
    /**
     * 用户列表(可以再外部设计一个递归查询全部的函数)  返回的是 openid
     */
    public function userGet(int $site_id, ?string $next_openid = '')
    {
        return CoreWechatService::app($site_id)->user->list($next_openid);
    }


    /**
     * 创建菜单按钮接口
     * @param int $site_id
     * @param array $buttons
     * @param array $match_rule
     * @return mixed
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function menuCreate(int $site_id, array $buttons, array $match_rule = [])
    {
//        CoreWechatService::app($site_id)->menu->current();
        return CoreWechatService::app($site_id)->menu->create($buttons, $match_rule);
    }


}