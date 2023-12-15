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
    //系统常用
    'SUCCESS' => 'success',
    'EDIT_SUCCESS' => 'update success',
    'DELETE_SUCCESS' => 'delete success',
    'MODIFY_SUCCESS' => 'modify success',
    'FAIL' => 'fail',
    'SAVE_FAIL' => 'save fail',
    'EDIT_FAIL' => 'update fail',
    'DELETE_FAIL' => 'delete fail',
    'MODIFY_FAIL' => 'refresh fail',
    'ADD_FAIL' => 'add fail',
    'ADD_SUCCESS' => 'add success',
    'UPLOAD_FAIL' => 'upload fail',
    'ATTACHMENT_DELETE_FAIL' => 'file delete fail',
    'DATA_NOT_EXIST' => 'data is not exit',
    'DOWNLOAD_FAIL' => 'download fail',
    'SET_SUCCESS' => 'set success',
    'AGREEMENT_TYPE_NOT_EXIST' => 'agreement type is not exit',
    'FIELD_NOT_FOUND' => 'cloumn is not exit',
    'REFRESH_SUCCESS' => 'refresh success',
    'CAPTCHA_ERROR' => 'captcha fail',


    //登录注册重置账号....

    'LOGIN_SUCCESS' => 'login success',
    'MUST_LOGIN' => 'place login',
    'LOGIN_EXPIRE' => 'login expire',
    'LOGIN_STATE_ERROR' => 'login expire',
    'USER_LOCK' => 'account is not auth',
    'USER_ERROR' => 'account or password error',
    'NO_SITE_PERMISSION' => 'you do not have auth',
    'SITE_NOT_EXIST' => 'site is not exit',
    'LOGOUT' => 'logout',
    'OLD_PASSWORD_ERROR' => 'password error',
    'MOBILE_LOGIN_UNOPENED' => 'mobile login is not open',

    //用户组权限

    'NO_PERMISSION' => 'you do not have auth',



    //菜单管理
    'MENU_NOT_EXIST' => '菜单不存在',
    'MENU_NOT_ALLOW_DELETE' => '存在子级菜单的目录或菜单不允许删除',

    //用户管理
    'USER_NOT_EXIST' => '用户不存在',
    'NO_SITE_USER_ROLE' => '用户不存在关联权限',
    'ADMIN_NOT_ALLOW_EDIT_ROLE' => '超级管理员不允许改动权限',
    'USERNAME_REPEAT' => '用户名重复',


    //角色管理
    'USER_ROLE_NOT_EXIST' => '角色不存在',
    'USER_ROLE_NOT_ALLOW_DELETE' => '存在管理员使用当前角色,不允许删除',

    //素材管理
    'ATTACHMENT_GROUP_NOT_EXIST' => '附件组不存在',
    'ATTACHMENT_GROUP_NOT_ALLOW_DELETE' => '当前分组,不允许删除',
    'ATTACHMENT_NOE_EXIST' => '附件不存在',
    'ATTACHMENT_GROUP_HAS_IMAGE' => '附件组中存在图片不允许删除',
    'OSS_TYPE_NOT_EXIST' => '云存储类型不存在',
    'URL_FILE_NOT_EXIST' => '获取不到网址指向的文件',
    'PLEACE_SELECT_IMAGE' => '请选择要删除的图片',
    'UPLOAD_TYPE_ERROR' => '不是有效的上传类型',


    //消息管理
    'NOTICE_TYPE_NOT_EXIST' => '消息类型不存在',
    'SMS_TYPE_NOT_EXIST' => '短信类型不存在',
    'SMS_DRIVER_NOT_EXIST' => '短信驱动不存在',
    'NO_SMS_DRIVER_OPEN' => '没有启用的短信',
    'SMS_DRIVER_NOT_OPEN' => '短信没有启用',
    'WECHAT_TEMPLATE_NOTICE_NOT_OPEN' => '微信模板消息没有启用',
    'WEAPP_TEMPLATE_NOTICE_NOT_OPEN' => '微信小程序订阅没有启用',
    'SMS_TYPE_NOT_OPEN' => '没有启用的短信方式',
    'NOTICE_TEMPLATE_NOT_EXIST' => '消息模板不存在',
    'WECHAT_TEMPLATE_NEED_NO' => '微信消息模板缺少模板编号',

    //会员相关
    'MOBILE_IS_EXIST' => '手机号已存在',
    'ACCOUNT_INSUFFICIENT' => '账户余额不足',
    'ACCOUNT_OR_PASSWORD_ERROR' => '账号或密码错误',
    'MEMBER_LOCK' => '账号被锁定',
    'MEMBER_NOT_EXIST' => '账号不存在',
    'MEMBER_LOGOUT' => '账号退出',
    'MEMBER_TYPE_NOT_EXIST' => '账户类型不存在',
    'MEMBER_IS_EXIST' => '账号已存在',
    'REG_CHANNEL_NOT_EXIST' => '无效的注册渠道',
    'MEMBER_USERNAME_LOGIN_NOT_OPEN' => '未开始账号登录注册',
    'AUTH_LOGIN_NOT_OPEN' => '未开启第三方登录注册',
    'MOBILE_NEEDED' => '手机号必须填写',
    'MOBILE_CAPTCHA_ERROR' => '手机验证码有误',




    //渠道相关  占用 4******
    //微信
    'WECHAT_NOT_EXIST' => '微信公众号未配置完善',
    'KEYWORDS_NOT_EXIST' => '关键词回复不存在',
    'WECHAT_EMPOWER_NOT_EXIST' => '微信授信信息不存在',
    //小程序
    'WEAPP_NOT_EXIST' => '微信小程序未配置完善',

    //支付相关
    500000 => '你选择的支付方式未启用',
    //站点相关
    'SITE_GROUP_IS_EXIST' => '站点分组已存在站点，请调整站点后重试',
    //小程序版本
    'APPLET_VERSION_NOT_EXISTS' => 'applet version not exists',
];
