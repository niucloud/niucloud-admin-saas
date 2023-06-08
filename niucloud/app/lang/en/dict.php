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
    'dict_menu_admin' => [
        'overview' => 'overview',
        'site' => 'site',
        'site_list' => 'site list',
        'site_info' => 'site info',
        'site_group' => 'site package',
        'site_user' => 'site user',
        'auth' => 'auth',
        'menu_list' => 'menu manage',
        'auth_menu' => 'admin menu',
        'auth_menu_add' => 'add',
        'auth_menu_update' => 'edit',
        'auth_menu_del' => 'delete',
        'auth_menu_info' => 'info',
        'auth_site_menu' => 'site menu',
        'auth_site_menu_add' => 'add',
        'auth_site_menu_update' => 'edit',
        'auth_site_menu_del' => 'delete',
        'auth_site_menu_info' => 'info',
        'auth_user' => 'manager',
        'auth_user_add' => 'add',
        'auth_user_update' => 'edit',
        'auth_user_del' => 'delete',
        'auth_user_info' => 'info',
        'auth_role' => 'role manage',
        'auth_role_add' => 'add',
        'auth_role_update' => 'edit',
        'auth_role_del' => 'delete',
        'auth_log' => 'log',
        'setting' => 'system config',
        'setting_system' => 'web config',
        'setting_copyright' => 'copyright config',
        'setting_login' => 'login config',
        'setting_storage' => 'storage config',
        'setting_oplatform' => 'wechat platform',
        'tool' => 'develop tools',
        'code' => 'generator',
        'code_edit' => 'table edit',
        'tools_Update_cache' => 'update cache',
        'tools_check_environment' => 'check environment',
        'app_store' => 'app market'

    ],
    'dict_menu_site' => [
        'overview' => 'overview',
        'diy' => 'diy manage',
        'diy_page_index' => 'diy index',
        'diy_page_member' => 'diy member',
        'diy_page_update' => 'save',
        'diy_page_list' => 'page manage',
        'diy_bottom' => 'bottom config',
        'diy_tabbar_update' => 'save',
        'attachment' => 'attachment',
        'decorate' => 'decorate',
        'page_decorate' => 'page decorate',
        'article' => 'article',
        'article_list' => 'article list',
        'article_edit' => 'article edit',
        'article_category' => 'article category',
        'member' => 'member',
        'member_list' => 'member list',
        'member_update' => 'edit',
        'member_info' => 'member detail',
        'member_label' => 'member label',
        'member_label_update' => 'edit label',
        'member_label_add' => 'add label',
        'member_label_delete' => 'delete label',
        'member_point' => 'member point',
        'member_balance' => 'member balance',
        'member_commission' => 'member commission',
        'order' => 'order',
        'recharge_order' => 'recharge order',
        'recharge_order_list' => 'order list',
        'recharge_refund' => 'refund',
        'recharge_order_detail' => 'order detail',
        'recharge_refund_list' => 'refund list',
        'recharge_refund_detail' => 'refund detail',
        'finance' => 'finance manage',
        'cash_out_list' => 'member cashout',
        'addon' => 'app manage',
        'addon_list' => 'addon list',
        'channel' => 'channel manage',
        'channel_pc' => 'pc manage',
        'pc_config' => 'pc config',
        'channel_h5' => 'h5 manage',
        'h5_config' => 'h5 config',
        'channel_wechat' => 'wechat manage',
        'wechat_config' => 'wechat config',
        'wechat_menu' => 'wechat menu',
        'wechat_template_message' => 'template manage',
        'channel_weapp' => 'weapp manage',
        'weapp_config' => 'weapp config',
        'weapp_template_message' => 'weapp message',
        'channel_aliapp' => 'aliapp manage',
        'aliapp_config' => 'aliapp config',
        'auth' => 'auth manage',
        'auth_user' => 'manager',
        'auth_user_add' => 'add',
        'auth_user_update' => 'edit',
        'auth_user_del' => 'delete',
        'auth_user_info' => 'detail',
        'auth_role' => 'role manage',
        'auth_role_add' => 'add',
        'auth_role_update' => 'edit',
        'auth_role_del' => 'delete',
        'auth_log' => 'log',
        'setting' => 'system config',
        'setting_system' => 'web config',
        'system_agreement' => 'agreement manage',
        'system_agreement_edit' => 'edit agreement',
        'setting_login_register' => 'login config',
        'setting_member' => 'member config',
        'setting_pay' => 'pay manage',
        'setting_pay_channel' => 'pay config',
        'setting_pay_channel_set' => 'config',
        'setting_pay_transfer' => 'transfer config',
        'setting_pay_transfer_set' => 'config',
        'cash_out_config' => 'cashout config',
        'setting_notice' => 'notice manage',
        'setting_notice_template' => 'notice template',
        'setting_notice_records' => 'send log',
        'sms_notice' => 'sms manage',
        'sms_setting' => 'sms config',
        'sms_notice_records' => 'send log',
        'map_setting' => 'map config',
    ],
];
