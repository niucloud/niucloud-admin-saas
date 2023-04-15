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
/**
 * 语言包说明:
 * 系统相关system:
 * 返回值语言文件： exception.php
 * 枚举相关文件：enum.php
 * 验证语言文件:validate.php
 *
 * 扩展开发相关plugin
 *
 */
use extend\util\ConfigUtil;

/**
 * 初始化语言
 */
$lang_data = [

];
$config_util = new ConfigUtil(root_path().str_replace('/', DIRECTORY_SEPARATOR, "app/lang/en"), $lang_data, true);
$lang = $config_util->loadConfig();
return $lang;
