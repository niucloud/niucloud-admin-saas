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

namespace app\service\admin\upgrade;

/**
 * 执行sql文件
 */
trait ExecuteSqlTrait
{
    public function getSqlQuery($sql_data)
    {
        $sql_data = preg_replace("/TYPE=(InnoDB|MyISAM|MEMORY)( DEFAULT CHARSET=[^; ]+)?/", "ENGINE=\\1 DEFAULT CHARSET=utf8", $sql_data);

        $sql_data = str_replace("\r", "\n", $sql_data);
        $sql_query = [];
        $num = 0;
        $sql_arr = explode(";\n", trim($sql_data));
        unset($sql);
        foreach ($sql_arr as $sql) {
            $sql_query[ $num ] = '';
            $sqls = explode("\n", trim($sql));
            $sqls = array_filter($sqls);
            foreach ($sqls as $query) {
                $str1 = $query[0] ?? '';
                if ($str1 != '#' && $str1 != '-')
                    $sql_query[ $num ] .= $query;
            }
            $num++;
        }
        return $sql_query;
    }

    /**
     * 处理sql增加表前缀
     * @param $sql
     * @return void
     */
    public function handleSqlPrefix($sql, $prefix) {
        if (str_contains($sql, 'CREATE TABLE')) {
            $match_item = preg_match('/CREATE TABLE [`]?(\\w+)[`]?/is', $sql, $match_data);
        } elseif (str_contains($sql, 'ALTER TABLE')) {
            $match_item = preg_match('/ALTER TABLE [`]?(\\w+)[`]?/is', $sql, $match_data);
        } elseif (str_contains($sql, 'INSERT INTO')) {
            $match_item = preg_match('/INSERT INTO [`]?(\\w+)[`]?/is', $sql, $match_data);
        } elseif (str_contains($sql, 'DELETE FROM')) {
            $match_item = preg_match('/DELETE FROM [`]?(\\w+)[`]?/is', $sql, $match_data);
        } elseif (str_contains($sql, 'UPDATE')) {
            $match_item = preg_match('/UPDATE [`]?(\\w+)[`]?/is', $sql, $match_data);
        } elseif (str_contains($sql, 'DROP TABLE')) {
            $match_item = preg_match('/DROP TABLE [`]?(\\w+)[`]?/is', $sql, $match_data);
        } else {
            $match_item = 0;
        }
        if ($match_item > 0) {
            $table_name = $match_data[ 1 ];
            $new_table_name = $prefix . $table_name;
            $sql = implode($new_table_name, explode($table_name, $sql, 2));
        }
        return $sql;
    }
}
