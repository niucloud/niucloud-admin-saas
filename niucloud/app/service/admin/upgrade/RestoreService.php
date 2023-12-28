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

namespace app\service\admin\upgrade;


use core\util\DbBackup;

/**
 * 框架及插件升级恢复备份
 * @package app\service\core\upgrade
 */
class RestoreService extends UpgradeService
{
    /**
     * 恢复代码备份
     * @return true
     */
    public function restoreCode() {
        $backup_dir = $this->upgrade_dir .$this->upgrade_task['key'] . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'code' . DIRECTORY_SEPARATOR;
        if (is_dir($backup_dir)) {
            // 删除前端文件
            if (is_dir(public_path() . 'admin')) del_target_dir(public_path() . 'admin', true);
            if (is_dir(public_path() . 'wap')) del_target_dir(public_path() . 'wap', true);
            if (is_dir(public_path() . 'web')) del_target_dir(public_path() . 'web', true);

            dir_copy($backup_dir, $this->root_path);
        }
        return true;
    }

    /**
     * 恢复数据库备份
     * @return true
     */
    public function restoreSql() {
        $backup_dir = $this->upgrade_dir .$this->upgrade_task['key'] . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'sql' . DIRECTORY_SEPARATOR;
        if (is_dir($backup_dir)) {
            $db = new DbBackup([
                'path'     => $backup_dir //数据库备份路径
            ]);
            $file_list = $db->fileList();
            if (!empty($file_list)) {
                foreach ($file_list as $file) {
                    $db->setFile($file)->import(0, $file['time']);
                }
            }
        }
        return true;
    }
}
