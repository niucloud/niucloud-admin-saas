<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

return [
    //端口管理
    'dict_app' => [
        'type_admin' => '平台管理端',
        'type_api' => '客户端',
    ],
    'dict_menu' => [
        //菜单类型
        'type_list' => '目录',
        'type_menu' => '菜单',
        'type_button' => '按钮',
        //菜单状态
        'status_on' => '正常',
        'status_off' => '停用',
        'source_system' => '系统文件',
        'source_create' => '新建菜单',
        'source_generator' => '代码生成器'
    ],
    'dict_user' => [
        //用户状态
        'status_on' => '正常',
        'status_off' => '锁定'
    ],
    'dict_role' => [
        //角色状态
        'status_on' => '启用',
        'status_off' => '停用'
    ],
    // 站点
    'dict_site' => [
        //站点类型
        'type_cms' => 'cms',
        'status_on' => '正常',
        'status_experience' => '体验期',
        'status_expire' => '已到期',
        'status_close' => '已停止',
        'pay' => '支付',
        'refund' => '退款',
        'transfer' => '转账',
    ],
    // 站点
    'dict_site_index' => [
        //站点类型
        'system' => '框架首页',
    ],
    // 平台首页
    'dict_admin_index' => [
        //站点类型
        'system' => '框架首页',
    ],
    // 手机端首页
    'dict_wap_index' => [
        //站点类型
        'system' => '框架首页',
        'system_desc' => '系统默认首页',
    ],
    'dict_notice' => [
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
    'dict_file' => [
        //上传附件类型
        'type_image' => '图片',
        'type_video' => '视频',
        //存储方式
        'storage_type_local' => '本地存储',
        'storage_type_qiniu' => '七牛云',
        'storage_type_image' => '阿里云',
        'storage_type_qcloud' => '腾讯云',

    ],
    'dict_member' => [
        //会员端口
        'register_wechat' => '公众号',
        'register_weapp' => '微信小程序',
        'register_h5' => 'H5',
        'register_pc' => '电脑端',
        'register_app' => 'APP',
        'register_manual' => '商家添加',
        'register_username' => '用户名密码注册',
        'register_mobile' => '手机验证码注册',
        'account_point' => '积分',
        'account_balance' => '余额',
        'account_money' => '可提现余额',
        'account_commission' => '佣金',
        'login_username' => '用户名密码登录',
        'login_mobile' => '手机验证码登录',
        'login_wechat' => '微信公众号授权登录',
        'login_weapp' => '微信小程序授权登录',
        'account_point_adjust' => '账户调整',
        'account_balance_adjust' => '账户调整',
        'account_money_award' => '活动奖励',
        'account_money_cash_out' => '账户提现',
        'account_money_adjust' => '账户调整',
        'account_commission_award' => '活动奖励',
        'account_commission_cash_out' => '账户提现',
        'status_on' => '正常',
        'status_off' => '锁定',

        'account_balance_order' => '订单消费',
        'account_balance_order_refund' => '订单退款',
    ],
    'dict_order' => [


    ],
    'dict_refund' => [
        //订单类型
        'wait' => '待审核',
        'wait_transfer' => "待转账",
        "success" => "退款成功",
        "fail" => "退款失败",
        'all' => '累计退款',
        'have' => '退款中金额',

    ],
    //微信回复
    'dict_wechat_reply' => [
        //微信回复状态
        'status_on' => '启用',
        'status_off' => '停用'
    ],
    //自动任务时间间隔
    'dict_schedule' => [
        'type_cron' => '定时任务',
        'type_crond' => '周期任务',
        'on' => '启用',
        'off' => '关闭',

        'min' => '每隔几分钟',
        'hour' => '每隔几小时',
        'day' => '每隔几天',
        'week' => '每周',
        'month' => '每月',

    ],
    //支付相关
    'dict_pay' => [
        'type_wechatpay' => '微信支付',
        'type_alipay' => '支付宝支付',
        'type_unipay' => '银联支付',
        'type_offline' => '线下支付',
        'type_balancepay' => '余额支付',

        'status_wait' => '待支付',
        'status_ing' => '支付中',
        'status_finish' => '已支付',
        'status_cancle' => '已取消',
        'status_audit' => '待审核',
        'pay' => '收款',
        'refund' => '退款',
        'transfer' => '转账',
    ],
    //转账相关
    'dict_transfer' => [
        'type_wechat' => '微信',
        'type_ali' => '支付宝',
        'type_bank' => '银行卡',
        'type_offline' => '线下转账',

        'status_wait' => '待转账',
        'status_dealing' => '处理中',
        'status_success' => '转账成功',
        'status_fail' => '转账失败',
    ],
    'dict_agreement' => [
        //菜单类型
        'service' => '服务协议',
        'privacy' => '隐私协议',
    ],
    //微信配置
    'dict_wechat_config' => [
        'not_encrypt' => '明文',
        'compatible' => '兼容',
        'safe' => '安全'
    ],
    //性别
    'dict_sex' => [
        'unknown' => '未知',
        'man' => '男',
        'woman' => '女'
    ],
    // 自定义页面
    'dict_diy' => [
        'page_index' => '首页',
        'page_member_index' => '个人中心',
        'page_diy' => '自定义页面',
        'component_type_basic' => '基础组件',

        'system_title' => '系统',
        'system_link' => '启动页',
        'system_link_index' => '首页',

        'member_link' => '会员页面',
        'member_index' => '个人中心',
        'member_my_balance' => '我的余额',
        'member_my_point' => '我的积分',
        'member_my_commission' => '我的佣金',
        'member_my_personal' => '个人资料',
        'member_my_address' => '收货地址',

        'diy_page' => '自定义页面',
        'diy_link' => '自定义链接'
    ],
    //短信相关
    'dict_sms' => [
        'status_sending' => '发送中',
        'status_success' => '成功',
        'status_fail' => '失败',
    ],
    //渠道
    'dict_channel' => [
        //渠道端口
        'channel_wechat' => '公众号',
        'channel_weapp' => '微信小程序',
        'channel_h5' => 'H5',
        'channel_pc' => '电脑端',
        'channel_app' => 'APP',

    ],
    //会员提现
    'dict_member_cash_out' => [
        //状态
        'status_wait_audit' => '待审核',
        'status_wait_transfer' => '待转账',
        'status_transfered' => '已转账',
        'status_refuse' => '已拒绝',
        'status_cancel' => '已取消'

    ],
    //插件操作
    'dict_addon' => [
        //状态
        'install' => '安装',
        'uninstall' => '卸载',
        'update' => '更新',
        'status_on' => '启用',
        'status_off' => '关闭',

        'type_app' => '应用',
        'type_addon' => '插件',

        'install_after_admin_update' => '该插件admin端引用了新的依赖需在项目根目录下admin目录执行 npm install 更新依赖',
        'install_after_composer_update' => '该插件引用了新的composer依赖需在项目根目录下niucloud目录执行 composer update 更新依赖',
        'install_after_wap_update' => '该插件wap端引用了新的依赖需在项目根目录下uni-app目录执行 npm install 更新依赖',
        'install_after_web_update' => '该插件web端引用了新的依赖需在项目根目录下web目录执行 npm install 更新依赖',
        'install_after_update' => '本地安装成功后会将admin，web，wap端的插件代码进行安装，但是不会进行编译，请手动编译对应admin，web，wap端的代码',
    ],
    // 退款支付状态
    'dict_pay_refund' => [
        'success' => '退款成功',
        'dealing' => '退款中',
        'wait' => '待退款',
        'fail' => '退款失败',
        'wechatpay' => '微信原路退款',
        'alipay' => '支付宝原路退款',
        'unipay' => '银联原路退款',
        'offline' => '线下退款',
        'balance' => '退款到余额',
        'back' => '原路退款',
        'status_success' => '退款成功',
        'status_dealing' => '退款中',
        'status_wait' => '待退款',
        'status_fail' => '退款失败',
    ],
    'dict_order_refund' => [
        'refunding' => '退款中',
        'refund_complete' => '退款完成',
        'refund_fail' => '退款失败'
    ],
    'dict_app_manage' => [
        'system_app' => '基础应用',
        'message_manage' => '消息管理',
    ],
    'dict_setting' => [
        'server_system' => '服务器系统',
        'server_setting' => '服务器web环境',
        'php_version' => 'PHP版本',
        'mysql_version' => 'mysql版本',
        'php_ask' => '大于等于8.0.0',
        'mysql_ask' => '大于等于5.7',
        'php_authority_ask' => '开启',
        'file_authority_ask' => '可读可写'
    ],
    //日期
    'dict_date' => [
        //星期
        'mon' => '周一',
        'tue' => '周二',
        'wed' => '周三',
        'thur' => '周四',
        'fri' => '周五',
        'sat' => '周六',
        'sun' => '周日',
        //月份
        'jan' => '1月',
        'feb' => '2月',
        'mar' => '3月',
        'apr' => '4月',
        'may' => '5月',
        'jun' => '6月',
        'jul' => '7月',
        'aug' => '8月',
        'sept' => '9月',
        'oct' => '10月',
        'nov' => '11月',
        'dec' => '12月',

    ],
    'dict_site_layout' => [
        'default' => '默认'
    ],
    'dict_cloud_applet' => [
        'uploading' => '上传中',
        'upload_success' => '上传成功',
        'upload_fail' => '上传失败',
    ]
];
