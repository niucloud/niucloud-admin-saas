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

namespace core\base;


use think\facade\Db;
use think\Model;

/**
 * 基础模型
 * Class BaseModel
 * @package app\model
 */
class BaseModel extends Model
{
    public function getModelColumn()
    {
        $table_name = $this->getTable();
        $sql = 'SHOW TABLE STATUS WHERE 1=1 ';
        $tablePrefix = config('database.connections.mysql.prefix');
        if (!empty($table_name)) {
            $sql .= "AND name='" .$table_name."'";
        }
        $tables = Db::query($sql);
        $table_info = $tables[0] ?? [];
        $table_name = str_replace($tablePrefix, '', $table_info['Name']);
        return Db::name($table_name)->getFields();
    }
}
