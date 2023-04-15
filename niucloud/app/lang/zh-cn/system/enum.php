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
    'enum_app' => [
        'type_admin' => '平台管理端',
        'type_site' => '站点管理端',
        'type_api' => '客户端',
    ],
    'enum_menu' => [
        //菜单类型
        'type_list' => '目录',
        'type_menu' => '菜单',
        'type_button' => '按钮',
        //菜单状态
        'status_on' => '正常',
        'status_off' => '停用'
    ],
    'enum_user' => [
        //用户状态
        'status_on' => '正常',
        'status_off' => '停用'
    ],
    'enum_role' => [
        //角色状态
        'status_on' => '启用',
        'status_off' => '停用'
    ],
    // 站点
    'enum_site' => [
        //站点类型
        'type_cms' => 'cms',
        'status_on' => '正常',
        'status_experience' => '体验期',
        'status_expire' => '已到期'
    ],
    'enum_message' => [
        'type_sms' => '短信',
        'type_wechat' => '微信公众号',
        'type_weapp' => '微信小程序',
        'var_username' => '用户名',
        'var_nickname' => '用户昵称',
        'var_code' => '验证码',
        'var_mobile' => '手机号',
        'var_balance' => '会员余额',
        'var_point' => '会员积分',
    ],
    //上传附件相关
    'enum_file' => [
        //上传附件类型
        'type_image' => '图片',
        'type_video' => '视频',
        //存储方式
        'storage_type_local' => '本地存储',
        'storage_type_qiniu' => '七牛云',
        'storage_type_image' => '阿里云',
        'storage_type_qcloud' => '腾讯云',

    ],
    'enum_member' => [
        //会员端口
        'register_wechat' => '微信公众号',
        'register_weapp' => '微信小程序',
        'register_h5' => '手机端H5',
        'register_pc' => '电脑端PC',
        'register_app' => '手机端APP',
        'register_manual' => '手动添加',
        'register_username' => '用户名密码注册',
        'register_mobile' => '手机验证码注册',
        'account_point' => '积分',
        'account_balance' => '余额',
        'account_money' => '零钱',
        'login_username' => '用户名密码登录',
        'login_mobile' => '手机验证码登录',
        'login_wechat' => '微信公众号授权登录',
        'login_weapp' => '微信小程序授权登录',
        'account_point_adjust' => '积分调整',
        'account_point_recharge_give' => '充值赠送',
        'account_balance_adjust' => '余额调整',
        'account_balance_recharge' => '余额充值',
        'account_money_award' => '活动奖励',
        'account_money_withdraw' => '提现',

    ],
    'enum_order' => [
        //订单类型
        'order_type_recharge' => '充值订单',
        'trade_type_recharge' => '会员充值',

    ],
    //微信回复
    'enum_wechat_reply' => [
        //微信回复状态
        'status_on' => '启用',
        'status_off' => '停用'
    ],
    //自动任务时间间隔
    'enum_cron' => [
        'type_minute' => '分钟',
        'type_day' => '天',
        'type_week' => '星期',
        'type_month' => '月',

        'type_cron' => '定时任务',
        'type_crond' => '周期任务'
    ],
    //支付相关
    'enum_pay' => [
        'type_wechatpay' => '微信支付',
        'type_alipay' => '支付宝支付',
        'type_unipay' => '银联支付',
        'type_offline' => '线下支付',
        'type_balancepay' => '余额支付',

        'status_wait' => '待支付',
        'status_ing' => '支付中',
        'status_ed' => '已支付',
        'status_cancle' => '已取消',
    ],
    //转账相关
    'enum_transfer' => [
        'type_wechat' => '微信',
        'type_ali' => '支付宝',
        'type_bank' => '银行卡',
        'type_offline' => '线下转账',

        'status_wait' => '待转账',
        'status_dealing' => '处理中',
        'status_success' => '转账成功',
        'status_fail' => '转账失败',
    ],
    'enum_agreement' => [
        //菜单类型
        'service' => '服务协议',
        'privacy' => '隐私协议',
    ],
    //微信配置
    'enum_wechat_config' => [
        'not_encrypt' => '明文',
        'compatible' => '兼容',
        'safe' => '安全'
    ],
    //性别
    'enum_sex' => [
        'unknown' => '未知',
        'man' => '男',
        'woman' => '女'
    ],
    // 自定义页面类型
    'enum_diy' => [
        'page_index' => '首页',
        'page_member_index' => '个人中心',
        'page_diy' => '自定义页面',
        'component_type_basics' => '基础组件',

        'system_link' => '系统页面',
        'system_link_index' => '首页',
        'system_link_article_list' => '文章资讯',

        'member_link' => '会员页面',
        'member_index' => '个人中心',
        'member_my_balance' => '我的余额',
        'member_my_point' => '我的积分',
        'member_my_personal'=>'个人资料',

        'diy_page' => '自定义页面',
        'diy_link' => '自定义链接'
    ],
    //短信相关
    'enum_sms' => [
        'status_sending' => '发送中',
        'status_success' => '成功',
        'status_fail' => '失败',
    ],
    //渠道
    'enum_channel' => [
        //渠道端口
        'channel_wechat' => '微信公众号',
        'channel_weapp' => '微信小程序',
        'channel_h5' => '手机端H5',
        'channel_pc' => '电脑端PC',
        'channel_app' => '手机端APP',

    ],
    //会员提现
    'enum_member_withdraw' => [
        //状态
        'status_wait_audit' => '待审核',
        'status_wait_transfer' => '待转账',
        'status_transfered' => '已转账',
        'status_refuse' => '已拒绝',
        'status_cancel' => '已取消'

    ],
];
