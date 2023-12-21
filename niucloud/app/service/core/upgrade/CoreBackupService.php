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

namespace app\service\core\upgrade;

use app\dict\addon\AddonDict;
use core\util\DbBackup;

/**
 * 框架及插件升级备份
 * @package app\service\core\upgrade
 */
class CoreBackupService extends CoreUpgradeService
{
    /**
     * 备份代码
     * @return void
     */
    public function backupCode() {
        $backup_dir = $this->upgrade_dir .$this->upgrade_task['key'] . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'code' . DIRECTORY_SEPARATOR;

        // 创建目录
        dir_mkdir($backup_dir);
        // 备份admin
        dir_copy($this->root_path . 'admin', $backup_dir . 'admin', exclude_dirs:[ '.vscode', 'node_modules', 'dist']);
        // 备份uni-app
        dir_copy($this->root_path . 'uni-app', $backup_dir . 'uni-app', exclude_dirs:['node_modules', 'dist']);
        // 备份web
        dir_copy($this->root_path . 'web', $backup_dir . 'web', exclude_dirs:['node_modules', '.nuxt', '.output']);

        // 备份niucloud
        $niucloud_dir = $backup_dir . 'niucloud' . DIRECTORY_SEPARATOR;
        if ($this->upgrade_task['upgrade']['app_key'] == AddonDict::FRAMEWORK_KEY) {
            dir_copy($this->root_path . 'niucloud', $niucloud_dir, exclude_dirs:['addon', 'config', 'public', 'vendor', 'runtime']);
            // 备份版本文件
            $version_file = $this->root_path . 'niucloud' .DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'version.php';
            $to_version_file = $niucloud_dir . 'config' . DIRECTORY_SEPARATOR . 'version.php';
            file_copy($version_file, $to_version_file);
        } else {
            $addon = $this->upgrade_task['upgrade']['app_key'];
            $addon_dir = $this->root_path . 'niucloud' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $addon;
            $to_addon_dir = $niucloud_dir . 'addon' . DIRECTORY_SEPARATOR . $addon;
            dir_copy($addon_dir, $to_addon_dir);
        }
        // 备份前端文件
        if (is_dir(public_path() . 'admin')) {
            dir_copy(public_path() . 'admin', $niucloud_dir . 'public' . DIRECTORY_SEPARATOR . 'admin');
        }
        if (is_dir(public_path() . 'wap')) {
            dir_copy(public_path() . 'wap', $niucloud_dir . 'public' . DIRECTORY_SEPARATOR . 'wap');
        }
        if (is_dir(public_path() . 'web')) {
            dir_copy(public_path() . 'web', $niucloud_dir . 'public' . DIRECTORY_SEPARATOR . 'web');
        }

        return true;
    }

    /**
     * 备份数据库
     * @return void
     */
    public function backupSql() {
        $backup_dir = $this->upgrade_dir .$this->upgrade_task['key'] . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'sql' . DIRECTORY_SEPARATOR;
        // 创建目录
        dir_mkdir($backup_dir);

        $db = new DbBackup([
            'path'     => $backup_dir,//数据库备份路径
            'part'     => 1048576,//数据库备份卷大小
            'compress' => 0,//数据库备份文件是否启用压缩 0不压缩 1 压缩
            'level'    => 9 //数据库备份文件压缩级别 1普通 4 一般  9最高
        ]);

        $prefix = config('database.connections.'.config('database.default'))['prefix'];
        if ($this->upgrade_task['upgrade']['app_key'] == AddonDict::FRAMEWORK_KEY) {
            // 不需要备份的表
            $noot_need_backup = ["{$prefix}sys_user_log", "{$prefix}jobs", "{$prefix}jobs_failed"];
            $tables = array_diff(array_column($db->dataList(), 'name'), $noot_need_backup);
        } else {
            $tables = [];
            $table_prefix = "{$prefix}{$this->upgrade_task['upgrade']['app_key']}";
            foreach ($db->dataList() as $table) {
                if (strpos($table['name'], $table_prefix) === 0) {
                    $tables[] = $table['name'];
                }
            }
        }

        foreach ($tables as $table) {
            $db->setFile()->backup($table);
        }
        return true;
    }
}
