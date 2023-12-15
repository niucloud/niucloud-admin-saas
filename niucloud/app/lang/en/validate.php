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
        'menu_name_require' => 'menu_name is require',
        'router_path_requireif' => 'router path is require',
        'view_path_requireif' => 'view path is require',
        'methods_requirewith' => 'methods is require',
        'not_exist_menu_type' => 'menu_type is not exist',
        'not_exist_request_type' => 'request_type is not exist',
        'exist_menu_key' => 'key must be unique'
    ],
    //角色
    'validate_role' => [
        'role_name_require' => 'role_name is require',
    ],
    'validate_page' => [
        'page_error' => 'page must be number',
        'limit_number' => 'limit must be positive number',
        'limit_between' => 'limit must be positive number and not be exceed 120 ',
    ],
    'validate_user' => [
        'username_require' => 'username is require',
        'username_unique' => 'username must be unique',
        'username_max' => 'username is not exceed 15 points',
        'real_name_require' => 'real_name is require',
        'password_require' => 'password is require',
    ],
    //站点
    'validate_site' => [
        'site_name_require' => 'site_name is require',
        'site_name_max' => 'site_name is not exceed 120 points',
        'keywords_require' => 'keywords is require',
        'keywords_max' => 'site_name is not exceed 30 points',
        'group_id_require' => 'group_id is require',
        'group_id_number' => 'group_id must be a number',
        'expire_time_number' => 'expire_time must be a number',
        'group_name_require' => 'group_name is require',
        'group_name_max' => 'group_name is not exceed 120 points',
        'group_roles_require' => 'group_roles is require'
    ],
    //附件
    'validate_attachment' => [
        'name_require' => 'name is require',
        'not_exist_type' => 'attachment_type is not exist',
    ],
    'validate_member' => [
        'username_is_exist' => 'username is exist',
        'password_require' => 'password is require',
        'nickname_require' => 'nickname is require',
        'nickname_max'     => 'nickname must not be exceed 120 points',
        'username_require' => 'username is require',
        'username_max'     => 'suername must not be exceed 120 points',
        'mobile_require'   => 'mobile is require',
        'mobile_mobile'   => 'mobile format error',
        'sex_bot_exist'     => 'sex is not exist',
        'label_name_require' =>'label_name is require',
        'birthday_format' => 'birthday format error',
        'label_name_max' => 'label_name must not be exceed 120 points',
        'memo_max' => 'memo must not be exceed 200 points',
        'sort_number' => 'sort must not be a number',
        'is_username_number' => 'is_username must be a number',
        'is_username_between' => 'is_username must be 0 or 1',
        'is_mobile_number' => 'is_mobile must be a number',
        'is_mobile_between' => 'is_mobile must be 0 or 1',
        'is_auth_register_number' => 'is_auth_register must be a number',
        'is_auth_register_between' => 'is_auth_register must be 0 or 1',
        'is_bind_mobile_number' => 'is_bind_mobile must be a number',
        'is_bind_mobile_between' => 'is_bind_mobile must be 0 or 1',
        'username_cannot_pure_number' => 'The account cannot be a pure number'
    ],
    'validate_article' => [
        'title_require' => 'title is require',
        'title_max' => 'title must not be exceed 20 points',
        'intro_max' => 'intro must not be exceed 50 points',
        'summary_max' => 'summary must not be exceed 50 points',
        'image_max' => 'image is exceed max',
        'author_max' => 'author must not be exceed 20 points',
        'is_show_number' => 'is_show must be a number',
        'is_show_between' => 'is_show must be 0 or 1',
        'sort_number' => 'sort must be a number',
        'sort_between' => 'sort must not be exceed 10000',
        'cate_name_require' => 'cate_name is require',
        'cate_name_max' => 'cate_name must not be exceed 120 points',
    ],
    'validate_generate' => [
        'id_require' => 'id is require'
    ],
    //支付验证相关
    'validate_pay' => [
        //支付宝
        'app_id_requireif' => 'app_id is require',
        'app_secret_cert_requireif' => 'app_secret_cert is require',
        'app_public_cert_path_requireif' => 'app_public_cert_path is require',
        'alipay_public_cert_path_requireif' => 'alipay_public_cert_path is require',
        'alipay_root_cert_path_requireif' => 'alipay_root_cert_path is require',
        //微信
        'mch_id_requireif' => 'mch_id is require',
        'mch_secret_key_requireif' => 'mch_secret_key is require',
        'mch_secret_cert_requiremch_secret_cert_requireif' => 'mch_secret_cert_requiremch_secret_cert is require',
        'mch_public_cert_path_requireif' => 'mch_public_cert_path is require',
        'not_exist_pay_type' => 'not exist pay type',
    ],
    'validate_agreement' => [
        'title_require' => 'title is require',
        'content_require' => 'content is require',
        'title_max' => 'title must not be exceed 20 points',
    ],
    'validate_generator' => [
        'table_name_require' => 'table_name is require',
        'table_name_max' => 'table_name must not be exceed 30 points',
        'table_content_require' => 'table_content is require',
        'table_content_max' => 'table_content must not be exceed 30 points'
    ],
    //微信公众号
    'validate_wechat' => [
        'appid_require' => 'appid is require',
        'appsecret_require' => 'appsecret is require',
    ],
    //微信小程序
    'validate_weapp' => [
        'appid_require' => 'appid is require',
        'appsecret_require' => 'appsecret is require',
    ],
    //计划任务
    'validate_schedule' => [
        'schedule_require' => 'schedule is require',
        'schedule_unique' => 'schedule is exist',
        'not_exit_schedule_type' => 'not exit schedule type',
    ],
];
