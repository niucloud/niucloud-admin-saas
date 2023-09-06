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
    //菜单
    'validate_menu' => [
        'menu_name_require' => '菜单名称必须填写',
        'router_path_requireif' => '路由地址必须填写',
        'view_path_requireif' => '菜单路径必须填写',
        'methods_requirewith' => '请求类型必须填写',
        'not_exit_menu_type' => '不存在的菜单类型',
        'not_exit_request_type' => '不存在的菜单类型',
        'exit_menu_key' => '菜单key不可重复'
    ],
    //角色
    'validate_role' => [
        'role_name_require' => '角色名称必须填写',
    ],
    'validate_page' => [
        'page_error' => 'page必须是正整数',
        'limit_number' => 'limit必须是正整数',
        'limit_between' => 'limit必须是正整数并且不能超过120',
    ],
    'validate_user' => [
        'username_require' => '用户名必须填写',
        'username_unique' => '用户名必须是惟一的',
        'username_max' => '用户名最多不能超过15个字符',
        'real_name_require' => '实际姓名必须填写',
        'password_require' => '用户密码必须填写',
    ],
    //站点
    'validate_site' => [
        'site_name_require' => '网站名称必须填写',
        'site_name_max' => '网站名称最多不能超过20个字符',
        'keywords_require' => '关键字必须填写',
        'keywords_max' => '关键字最多不能超过30个字符',
        'group_id_require' => '站点分组必须填写',
        'group_id_number' => '站点分组必须是整数',
        'expire_time_number' => '到期时间必须是时间戳',
        'group_name_require' => '站点分组名称必须填写',
        'group_name_max' => '站点分组名称不能超过20字符',
        'group_roles_require' => '分组权限必须填写',
        'front_end_name_require' => '前台名称必须填写',
        'front_end_name_max' => '前台名称最多不能超过20个字符',
    ],
    //附件
    'validate_attachment' => [
        'name_require' => '附件组名称必须填写',
        'not_exit_type' => '请选择有效的附件分组类型',
    ],
    'validate_member' => [
        'username_require' => '账号必须填写',
        'username_is_exist' => '账号已存在',
        'password_require' => '密码必须填写',
        'nickname_require' => '会员昵称必须填写',
        'nickname_max' => '昵称不能超过30个字符',
        'username_max' => '用户名不能超过30个字符',
        'mobile_require' => '手机号必须填写',
        'mobile_mobile' => '手机号格式错误',
        'sex_bot_exist' => '不存在的性别',
        'label_name_require' => '会员标签必须填写',
        'birthday_format' => '生日日期格式有误',
        'label_name_max' => '会员标签不能超过30个字符',
        'memo_max' => '备注不能超过200个字符',
        'sort_number' => '排序号必须是数字',
        'is_username_number' => '用户名密码登录参数必须是整数',
        'is_username_between' => '用户名密码登录参数必须是0或1',
        'is_mobile_number' => '手机验证码登录参数必须是整数',
        'is_mobile_between' => '手机验证码登录参数必须是0或1',
        'is_auth_register_number' => '第三方自动注册参数必须是整数',
        'is_auth_register_between' => '第三方自动注册参数必须是0或1',
        'is_bind_mobile_number' => '强制绑定手机参数必须是整数',
        'is_bind_mobile_between' => '强制绑定手机参数必须是0或1',
        'cash_out_is_open_in' => '是否启用必须是0或者1',
        'cash_out_min_min' => '最小提现金额必须是正数',
        'cash_out_rate_between' => '提现手续费必须是0到100之间',
        'cash_out_is_auto_verify_in' => '是否启用审核必须是0或1',
        'cash_out_is_auto_transfer_in' => '是否启用转账必须是0或1',
        'status_require' => '会员状态必须填写',
        'not_exit_status' => '不存在的会员状态',
        'username_cannot_pure_number' => '账号不能是纯数字'
    ],
    'validate_member_config' => [
        'length_number' => '会员编码必须是整数',
        'length_min' => '会员编码长度不能小于10',
        'length_max' => '会员编码长度不能大于于20',
        'length_between' => '会员编码长度去除前缀后最少不能低于4位,最多不能超过30位',
    ],
    'validate_article' => [
        'title_require' => '文章标题必须填写',
        'title_max' => '文章标题不能超过20个字符',
        'intro_max' => '文章简介不能超过50个字符',
        'summary_max' => '文章摘要不能超过50个字符',
        'image_max' => '图片路径太长',
        'author_max' => '文章作者不能超过20个字符',
        'is_show_number' => '是否显示必须是数字',
        'is_show_between' => '是否显示只能是0或者1',
        'sort_number' => '排序号必须是数字',
        'sort_between' => '排序号不能超过10000',
        'cate_name_require' => '栏目名称必须填写',
        'cate_name_max' => '栏目不能超过20个字符',
        'category_id_require' => '文章栏目必须填写',
        'category_id_num' => '文章栏目必须是整数',
        'content_require' => '文章内容必须填写',
    ],
    'validate_generate' => [
        'id_require' => '请传入正确的数据'
    ],
    //支付验证相关
    'validate_pay' => [
        //支付宝
        'app_id_requireif' => '请填写支付宝分配的app_id',
        'app_secret_cert_requireif' => '请填写应用私钥',
        'app_public_cert_path_requireif' => '请填写应用公钥证书',
        'alipay_public_cert_path_requireif' => '请填写支付宝公钥证书',
        'alipay_root_cert_path_requireif' => '请填写支付宝根证书',
        //微信
        'mch_id_requireif' => '请填写商户号',
        'mch_secret_key_requireif' => '请填写商户秘钥',
        'mch_secret_cert_requiremch_secret_cert_requireif' => '请填写商户私钥',
        'mch_public_cert_path_requireif' => '请填写商户公钥证书路径',

        'not_exit_pay_type' => '不存在的支付类型',
        'name_require' => '模板名称不能为空',
    ],
    'validate_agreement' => [
        'title_require' => '协议标题必须填写',
        'content_require' => '协议内容必须填写',
        'title_max' => '协议标题不能超过20个字符',
    ],
    'validate_generator' => [
        'table_name_require' => '表名称必须填写',
        'table_name_max' => '表名称不能超过64个字符',
        'table_content_require' => '描述必须填写',
        'table_content_max' => '描述不能超过64个字符'
    ],
    //微信公众号
    'validate_wechat' => [
        'appid_require' => 'appid必须填写',
        'appsecret_require' => 'appsecret必须填写',
    ],
    //微信小程序
    'validate_weapp' => [
        'appid_require' => 'appid必须填写',
        'appsecret_require' => 'appsecret必须填写',
    ],
    //会员提现配置
    'validate_member_cash_out_config' => [
        'transfer_type_require' => '至少需选择一种转账方式',
    ],
    // 自定义
    'validate_diy' => [
        'type_not_exist' => '不存在的页面模板',
    ],
    // 会员提现账号
    'validate_member_cash_out_account' => [
        'not_support_transfer_type' => '不支持的提现方式',
        'bank_name_require' => '银行名称必须填写',
        'account_no_require' => '账号必须填写',
        'realname_require' => '真实姓名必须填写',
    ],
    // 会员提现
    'validate_member_cash_out' => [
        'apply_money_min' => '提现金额需大于0元',
        'not_support_account_type' => '该账户不支持提现',
        'not_support_transfer_type' => '不支持该提现方式',
        'account_id_require' => '请选择提现账户'
    ],
    //计划任务
    'validate_schedule' => [
        'schedule_require' => '计划任务必须选择',
        'schedule_unique' => '当前计划任务已存在',
        'not_exit_schedule_type' => '不是有效的任务类型',
    ],
];
