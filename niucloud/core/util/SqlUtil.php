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

namespace core\util;

use think\db\exception\PDOException;
use think\facade\Config;
use think\facade\Db;
use think\facade\Env;

/**
 * 数据库工具类
 * Class SqlUtil
 * @package core\util
 */
class SqlUtil
{


    public function executeSql(string $sql_file): bool
    {
        $dbprefix = Config::get('database.connections.mysql.prefix');
        $sql_data = file_get_contents($sql_file);

        $sql_query = $this->getSqlQuery($sql_data);
        $query_count = count($sql_query);
        for ($i = 0; $i < $query_count; $i++) {
            $sql = trim($sql_query[ $i ]);
            $is_write = false;
            if (strstr($sql, 'CREATE TABLE')) {
                $match_item = preg_match('/CREATE TABLE [`]?(\\w+)[`]?/is', $sql, $match_data);
                $is_write = true;
            } elseif (strstr($sql, 'ALTER TABLE')) {
                $match_item = preg_match('/ALTER TABLE [`]?(\\w+)[`]?/is', $sql, $match_data);

            } elseif (strstr($sql, 'INSERT INTO')) {
                $match_item = preg_match('/INSERT INTO [`]?(\\w+)[`]?/is', $sql, $match_data);
            } else {
                $match_item = 0;
            }
            if ($match_item > 0) {
                try {
                    $table_name = $match_data[ 1 ];
                    $new_table_name = $dbprefix . $table_name;
                    $sql_item = $this->strReplaceFirst($table_name, $new_table_name, $sql);
                    Db::execute($sql_item);
                } catch (\Exception $e) {
                    return $e->getMessage();
                }
            }
        }
    }

    /**
     * @param $sql_data
     * @return array
     */
    public function getSqlQuery($sql_data)
    {
        $sql_data = preg_replace("/TYPE=(InnoDB|MyISAM|MEMORY)( DEFAULT CHARSET=[^; ]+)?/", "ENGINE=\\1 DEFAULT CHARSET=utf8", $sql_data);

        $sql_data = str_replace("\r", "\n", $sql_data);
        $sql_query = [];
        $num = 0;
        $sql_array = explode(";\n", trim($sql_data));
        unset($sql);
        foreach ($sql_array as $sql) {
            $sql_query[ $num ] = '';
            $sqls = explode("\n", trim($sql));
            $sqls = array_filter($sqls);
            foreach ($sqls as $query) {
                $str1 = substr($query, 0, 1);
                if ($str1 != '#' && $str1 != '-')
                    $sql_query[ $num ] .= $query;
            }
            $num++;
        }
        return $sql_query;
    }

    /**
     * 代码切换
     * @param $search
     * @param $replace
     * @param $subject
     * @return string
     */
    public function strReplaceFirst($search, $replace, $subject)
    {
        return implode($replace, explode($search, $subject, 2));
    }

}
