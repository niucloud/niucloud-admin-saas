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

return [
    //端口管理
    'dict_app' => [
        'type_admin' => 'admin',
        'type_site' => 'site',
        'type_api' => 'api',
    ],
    'dict_menu' => [
        //菜单类型
        'type_list' => 'list',
        'type_menu' => 'menu',
        'type_button' => 'button',
        //菜单状态
        'status_on' => 'on',
        'status_off' => 'off'
    ],
    'dict_user' => [
        //用户状态
        'status_on' => 'on',
        'status_off' => 'off'
    ],
    'dict_role' => [
        //角色状态
        'status_on' => 'on',
        'status_off' => 'off'
    ],
    // 站点
    'dict_site' => [
        //站点类型
        'type_cms' => 'cms',
        'status_on' => 'on',
        'status_experience' => 'experience',
        'status_expire' => 'expire'
    ],
    'dict_notice' => [
        'type_sms' => 'sms',
        'type_wechat' => 'wechat',
        'type_weapp' => 'weapp',
        'var_username' => 'username',
        'var_nickname' => 'nickname',
        'var_code' => 'code',
        'var_mobile' => 'mobile',
        'var_balance' => 'balance',
        'var_point' => 'point',
    ],
    //上传附件相关
    'dict_file' => [
        //上传附件类型
        'type_image' => 'image',
        'type_video' => 'video',
        //存储方式
        'storage_type_local' => 'local',
        'storage_type_qiniu' => 'qiniu',
        'storage_type_ali' => 'aliyun',
        'storage_type_qcloud' => 'tencent',

    ],
    'dict_member' => [
        //会员端口
        'terminal_wechat' => 'wechat',
        'terminal_weapp' => 'weapp',
        'terminal_h5' => 'H5',
        'terminal_pc' => 'PC',
        'terminal_app' => 'APP',
        'terminal_manual' => 'add',
        'account_point' => 'point',
        'account_balance' => 'balance',
        'login_username' => 'username login',
        'login_mobile' => 'mobile login',
        'login_wechat' => 'wechat login',
        'login_weapp' => 'weapp login',
        'account_point_adjust' => 'adjust point',
        'account_point_recharge_give' => 'recharge give',
        'account_balance_adjust' => 'adjust balance',
        'account_balance_recharge' => 'recharge',

    ],
    'dict_order' => [
        //订单类型
        'order_type_recharge' => 'recharge order',

    ],
    //微信回复
    'dict_wechat_reply' => [
        //微信回复状态
        'status_on' => 'on',
        'status_off' => 'off'
    ],
    //自动任务时间间隔
    'dict_cron' => [
        'type_minute' => 'minute',
        'type_day' => 'day',
        'type_week' => 'week',
        'type_month' => 'month',

        'type_cron' => 'time work',
        'type_crond' => 'period work'
    ],
    //支付相关
    'dict_pay' => [
        'type_wechatpay' => 'wechatpay',
        'type_alipay' => 'alipay',
        'type_unipay' => 'unipay',
        'type_offline' => 'offlinepay',
    ],
    'dict_agreement' => [
        //菜单类型
        'service' => 'service agreement',
        'privacy' => 'privacy agreement',
    ],
    //微信配置
    'dict_wechat_config' => [
        'not_encrypt' => 'not encrypt',
        'compatible' => 'compatible',
        'safe' => 'safe'
    ],
    //性别
    'dict_sex' => [
        'unknown' => 'unknown',
        'man' => 'man',
        'woman' => 'woman'
    ],
    // 自定义页面
    'dict_diy' => [
        'page_index' => 'index',
        'page_member_index' => 'member index',
        'page_diy' => 'diy page',
        'component_type_basic' => 'base component'
    ],
    //短信相关
    'dict_sms' => [
        'status_sending' => 'sending',
        'status_success' => 'success',
        'status_fail' => 'fail',
    ],
];
