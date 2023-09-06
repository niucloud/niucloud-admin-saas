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
    'SUCCESS' => '操作成功',
    'EDIT_SUCCESS' => '编辑成功',
    'DELETE_SUCCESS' => '删除成功',
    'MODIFY_SUCCESS' => '更新成功',
    'FAIL' => '操作失败',
    'SAVE_FAIL' => '保存失败',
    'EDIT_FAIL' => '修改失败',
    'DELETE_FAIL' => '删除失败',
    'MODIFY_FAIL' => '更新失败',
    'ADD_FAIL' => '添加失败',
    'ADD_SUCCESS' => '添加成功',
    'UPLOAD_FAIL' => '上传失败',
    'ATTACHMENT_DELETE_FAIL' => '附件删除失败',
    'DATA_NOT_EXIST' => '数据不存在',
    'DOWNLOAD_FAIL' => '下载失败',
    'SET_SUCCESS' => '设置成功',
    'AGREEMENT_TYPE_NOT_EXIST' => '协议类型不存在',
    'FIELD_NOT_FOUND' => '找不到要修改的字段',
    'REFRESH_SUCCESS' => '刷新成功',
    'CAPTCHA_ERROR' => '验证码有误',
    'ADDON_INSTALL_SUCCESS' => '插件安装成功',
    'ADDON_UNINSTALL_SUCCESS' => '插件卸载成功',
    'DATA_GET_FAIL' => '数据获取失败',
    'SERVER_CROSS_REQUEST_FAIL' => '服务器跨域请求异常',
    'ADDON_INSTALL_NOT_EXIST' => '未找到插件安装任务',
    'ADDON_INSTALL_EXECUTED' => '插件安装任务已执行',
    'INSTALL_CHECK_NOT_PASS' => '安装校验未通过',
    'SITE_INDEX_VIEW_PATH_NOT_EXIST' => '当前首页路径不存在',
    'ADMIN_INDEX_VIEW_PATH_NOT_EXIST' => '当前首页路径不存在',
    'ADDON_SQL_FAIL' => '插件sql执行失败',
    'ADDON_DIR_FAIL' => '插件文件操作失败',
    'LAYOUT_NOT_EXIST' => '该布局不存在',
    'ZIP_FILE_NOT_FOUND' => '找不到可用的压缩文件',
    'DOWNLOAD_SUCCESS' => '下载成功',
    //登录注册重置账号....

    'LOGIN_SUCCESS' => '登录成功',
    'MUST_LOGIN' => '请登录',
    'LOGIN_EXPIRE' => '登录过期,请重新登录',
    'LOGIN_STATE_ERROR' => '登录状态有误,请重新登录',
    'USER_LOCK' => '账号被锁定',
    'USER_ERROR' => '账号或密码错误',
    'NO_SITE_PERMISSION' => '您没有当前站点的访问权限',
    'SITE_NOT_EXIST' => '站点不存在',
    'LOGOUT' => '登陆退出',
    'OLD_PASSWORD_ERROR' => '原始密码不正确',
    'MOBILE_LOGIN_UNOPENED' => '手机号登录注册未开启',
    'SITE_USER_CAN_NOT_LOGIN_IN_ADMIN' => '站点用户无法在平台端进行登录',
    'ADMIN_USER_CAN_NOT_LOGIN_IN_SITE' => '平台用户无法在站点端进行登录',
    'APP_TYPE_NOT_EXIST' => '无效的登录端口',

    //用户组权限

    'NO_PERMISSION' => '您没有访问权限',

    //插件安装相关
    'REPEAT_INSTALL' => '当前插件已安装,不能重复安装',
    'NOT_UNINSTALL' => '当前插件未安装,不能进行卸载操作',

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
    'OSS_FILE_URL_NOT_EXIST' => '远程资源文件地址不能为空',
    'BASE_IMAGE_FILE_NOT_EXIST' => 'base图片资源不能为空',
    'UPLOAD_TYPE_NOT_SUPPORT' => '不支持的上传类型',
    'FILE_ERROE' => '无效的资源',
    'UPLOAD_STORAGE_TYPE_ALL_CLOSE' => '至少要有一个启用的存储方式',
    'STORAGE_NOT_HAS_HTTP_OR_HTTPS' => '空间域名请补全http://或https://',


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
    'NOTICE_NOT_OPEN_SMS' => '当前消息未开启短信发送',
    'NOTICE_SMS_EMPTY' => '手机号为空',
    'NOTICE_SMS_NOT_OPEN' => '短信未启用',
    'NOTICE_TEMPLATE_IS_NOT_EXIST' => '消息不存在',

    //会员相关
    'MOBILE_IS_EXIST' => '当前手机号已绑定账号',
    'ACCOUNT_INSUFFICIENT' => '账户余额不足',
    'ACCOUNT_OR_PASSWORD_ERROR' => '账号或密码错误',
    'MEMBER_LOCK' => '账号被锁定',
    'MEMBER_NOT_EXIST' => '账号不存在',
    'MEMBER_LOGOUT' => '账号退出',
    'MEMBER_TYPE_NOT_EXIST' => '账户类型不存在',
    'MEMBER_IS_EXIST' => '账号已存在',
    'MEMBER_NO_IS_EXIST' => '会员编号已存在',
    'REG_CHANNEL_NOT_EXIST' => '无效的注册渠道',
    'MEMBER_USERNAME_LOGIN_NOT_OPEN' => '未开始账号登录注册',
    'AUTH_LOGIN_NOT_OPEN' => '未开启第三方登录注册',
    'MOBILE_NEEDED' => '手机号必须填写',
    'MOBILE_CAPTCHA_ERROR' => '手机验证码有误',
    'MEMBER_IS_BIND_AUTH' => '当前账号已绑定授权',
    'MEMBER_MOBILE_CAPTCHA_ERROR' => '无效的短信验证码',
    'AUTH_LOGIN_TAG_NOT_EXIST' => '第三方授权标识不能为空',
    'PASSWORD_RESET_SUCCESS' => '密码重置成功',
    'MOBILE_NOT_BIND_MEMBER' => '当前填写的手机号没有绑定此账号',
    'MOBILE_NOT_EXIST_MEMBER' => '当前填写的手机号不存在账号',
    'MOBILE_IS_BIND_MEMBER' => '当前账号已绑定手机号',
    'QRCODE_EXPIRE' => '登录二维码失效',

    //会员提现
    'CASHOUT_NOT_OPEN' => '会员提现业务未开启',
    'CASHOUT_TYPE_NOT_OPEN' => '当前会员提现方式未启用',
    'CASHOUT_LOG_NOT_EXIST' => '提现记录不存在',
    'CASHOUT_AUDITED' => '当前提现记录已被审核',
    'TRANSFER_TYPE_NOT_EXIST' => '存在未定义的转账方式',
    'CASHOUT_IS_REFUSE' => '提现被拒绝,返还零钱',
    'MEMBER_APPLY_CASHOUT' => '会员申请提现,扣除零钱',
    'CASHOUT_MONEY_TOO_LITTLE' => '会员提现金额不能小于最低提现金额',
    'CASHOUT_STATUS_NOT_IN_WAIT_TRANSFER' => '当前提现申请未处于待转账状态',
    'CASHOUT_STATUS_NOT_IN_WAIT_AUDIT' => '当前提现申请未处于待审核状态',
    'MEMBER_CASHOUT_TRANSFER' => '会员提现转账',
    'CASH_OUT_ACCOUNT_NOT_EXIST' => '提现账户不存在',


    //渠道相关  占用 4******
    //微信
    'WECHAT_NOT_EXIST' => '微信公众号未配置完善',
    'KEYWORDS_NOT_EXIST' => '关键词回复不存在',
    'WECHAT_EMPOWER_NOT_EXIST' => '微信授权信息不存在',
    'SCAN_SUCCESS' => '扫码成功',
    //小程序
    'WEAPP_NOT_EXIST' => '微信小程序未配置完善',
    'WEAPP_EMPOWER_NOT_EXIST' => '微信小程序授信信息不存在',
    'WEAPP_EMPOWER_TEL_NOT_EXIST' => '微信小程序授信手机号不存在',

    //站点相关
    'SITE_GROUP_IS_EXIST' => '当前套餐存在站点，请调整站点对应套餐后重试',
    'SITE_EXPIRE' => '站点已过期',
    'SITE_EXPIRE_NOT_ALLOW' => '站点已打烊，续费后可继续使用此项功能',
    'SITE_CLOSE_NOT_ALLOW' => '站点已停止',

    //支付相关(todo  注意:7段不共享)
    'ALIPAY_TRANSACTION_NO_NOT_EXIST' => '无效的支付交易号',
    'PAYMENT_METHOD_NOT_SUPPORT' => '您选择到支付方式不受业务支持',
    'PAYMENT_LOCK' => '支付中,请稍后再试',
    'PAY_SUCCESS' => '当前支付已完成',
    'PAY_IS_REMOVE' => '当前支付已取消',
    'PAYMENT_METHOD_NOT_EXIST' => '你选择的支付方式未启用',
    'PAYMENT_METHOD_NOT_SCENE'=> '你选择的支付方式不适用于当前场景',
    'TREAT_PAYMENT_IS_OPEN' => '只有待支付时可以关闭',
    'TRANFER_STATUS_NOT_IN_WAIT_TANSFER' => '当前转账未处于待转账状态',
    'TRANSFER_ORDER_INVALID' => '无效的转账单据',
    'TRANFER_CONFIG_ERROR' => '参数有误或未开通转账业务',
    'IS_PAY_REMOVE_NOT_RESETTING' => '已支付和已取消的单据不可以重置',
    'DOCUMENT_IS_PAY_REMOVE' => '当前单据已支付或已取消',
    'PATMENT_METHOD_INVALID' => '无效的支付方式',
    'CHANNEL_MARK_INVALID' => '无效的渠道标识',
    'TEMPLATE_NOT_EXIST' => '模板不存在',
    'IS_EXIST_TEMPLATE_NOT_MODIFY' => '已存在的支付模板不支持修改支付类型',
    'ONLY_PAYING_CAN_PAY' => '只有待支付的订单可以支付',
    'VOUCHER_NOT_EMPTY' => '支付单据不能为空',
    'ONLY_PAYING_CAN_AUDIT' => '只有待支付的订单才可以操作',
    'ONLY_OFFLINEPAY_CAN_AUDIT' => '只有线下支付的单据才可以审核',
    //退款相关
    'REFUND_NOT_EXIST' => '退款单据不存在',
    //订单相关  8***
    'ORDER_NOT_EXIST' => '订单不存在',
    'ORDER_CLOSED' => '订单已关闭',
    'DOCUMENT_IS_PAID' => '单据已支付',
    'REFUND_IS_CHANGE' => '退款状态已发生变化',
    'TRANFER_IS_CHANGE' => '转账状态已发生变化',

    // 退款相关
    'NOT_ALLOW_APPLY_REFUND' => '该订单不允许退款',
    'ITEM_REFUND_NOT_EXIST' => '退款单不存在',
    'REFUND_STATUS_ABNORMAL' => '退款单状态异常',
    'NO_REFUNDABLE_AMOUNT' => '会员账户金额为0不允许进行退款',
    'REFUND_HAD_APPLIED' => '订单已申请退款',
    'ORDER_UNPAID_NOT_ALLOW_APPLY_REFUND' => '订单尚未支付不能进行退款',


    // 缓存相关
    'CLEAR_MYSQL_CACHE_SUCCESS' => '数据表缓存清除成功',

    //任务队列相关
    'JOB_NOT_EXISTS' => '任务类不存在',
    'JOB_CREATE_FAIL' => '任务创建失败',
    'SCHEDULE_NOT_EXISTS' => '人物不存在',
    //小程序版本
    'APPLET_VERSION_NOT_EXISTS' => '小程序版本不存在',
    'APPLET_VERSION_PACKAGE_NOT_EXIST' => '小程序版本包不存在',
    //验证码
    'CAPTCHA_INVALID' => '无效的验证码',

];
