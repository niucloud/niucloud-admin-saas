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

use app\model\wechat\WechatFans;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 微信粉丝
 * @todo  慎:微信粉丝比较特殊,它并没有对外的接口,只用于service内部的数据交流
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class CoreWechatFansService extends BaseCoreService
{


    public function __construct()
    {
        parent::__construct();
        $this->model = new WechatFans();
    }

    /**
     * 新增微信粉丝
     * @param $site_id
     * @param $data
     * @return void
     */
    public function add(int $site_id, array $data)
    {

        $fans = $this->model->create($data);
        return $fans->fans_id;
    }


    public function find(array|string $where)
    {
        $fans = $this->model->where($where)->findOrEmpty();
        return $fans;
    }

    /**
     * 修改微信粉丝
     * @param $site_id
     * @param $open_id  //可以是UnionID  也可以是openid
     * @param $data
     * @return void
     */
    public function edit(int $site_id, string $open_id, array $data)
    {
        $condition = [
            ['site_id', '=', $site_id],
            ['openid', '=', $open_id]
        ];
        $fans = $this->find($condition);
        $core_wechat_api_service = new CoreWechatApiService();
        $userinfo = $core_wechat_api_service->userInfo($site_id, $open_id);
        if (empty($userinfo))
            throw new CommonException('WECHAT_EMPOWER_NOT_EXIST');

        $save_data = array(
            'site_id' => $site_id,
            'subscribe' => $userinfo['subscribe'],//用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。
        );
        //用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息
        if ($userinfo['subscribe'] == 1) {
            $save_data = array_merge($save_data,
                [
                    'language' => $userinfo['language'] ?? '',//用户的语言，简体中文为zh_CN
                    'subscribe_time' => $userinfo['subscribe_time'] ?? '',//用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间
                    'unionid' => $userinfo['unionid'] ?? '',//只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
                    'remark' => $userinfo['remark'] ?? '',//公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注
                    'groupid' => $userinfo['groupid'] ?? '',//用户所在的分组ID（兼容旧的用户分组接口）
                    'subscribe_scene' => $userinfo['subscribe_scene'] ?? '',//返回用户关注的渠道来源，ADD_SCENE_SEARCH 公众号搜索，ADD_SCENE_ACCOUNT_MIGRATION 公众号迁移，ADD_SCENE_PROFILE_CARD 名片分享，ADD_SCENE_QR_CODE 扫描二维码，ADD_SCENE_PROFILE_LINK 图文页内名称点击，ADD_SCENE_PROFILE_ITEM 图文页右上角菜单，ADD_SCENE_PAID 支付后关注，ADD_SCENE_WECHAT_ADVERTISEMENT 微信广告，ADD_SCENE_REPRINT 他人转载 ，ADD_SCENE_LIVESTREAM 视频号直播， ADD_SCENE_CHANNELS 视频号, ADD_SCENE_OTHERS 其他
                    'update_time' => time(),
//                    'tagid_list' => $userinfo['tagid_list'],//用户被打上的标签ID列表 , 数据库字段为json
                ]
            );
        }
        //头像
        if (!empty($data['avatar'])) {
            $save_data['avatar'] = $data['avatar'];
        }
        //昵称
        if (!empty($data['nickname'])) {
            $save_data['nickname'] = $data['nickname'];
        }
        //取消关注时间
        if (!empty($data['unsubscribe_time'])) {
            $save_data['unsubscribe_time'] = $data['unsubscribe_time'];
        }
        // todo  qr_scene  qr_scene_str  这两个二维码自定义开发功能
        if (!$fans->isEmpty()) {
            $fans->edit($save_data);
        } else {
            $this->model->create($save_data);
        }
        return true;

    }

    /**
     * 粉丝关注事件
     * @param $site_id
     * @param $from_user_uame
     * @return void
     */
    public function subscribe(int $site_id, string $app_id, string $from_user_name)
    {
        $core_wechat_api_service = new CoreWechatApiService();
        $user_info = $core_wechat_api_service->userInfo($site_id, $from_user_name);

        $data = array(
            'app_id' => $app_id,
            'openid' => $from_user_name,
            'subscribe' => 1,
            'nickname' => $user_info['remark'],
            'subscribe_time' => $user_info['subscribe_time'],
            'subscribe_scene' => $user_info['subscribe_scene'],
            'language' => $user_info['language'],
        );
        $this->edit($site_id, $from_user_name, $data);
        return true;
    }

    /**
     * 粉丝取消关注事件
     * @param $site_id
     * @param $from_user_uame
     * @return void
     */
    public function unsubscribe(int $site_id, string $from_user_name)
    {
        $data = array(
            'subscribe' => 0,
            'unsubscribe_time' => time(),
        );
        $this->edit($site_id, $from_user_name, $data);
        return true;
    }

}