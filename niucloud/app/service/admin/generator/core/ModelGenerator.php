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

declare(strict_types=1);

namespace app\service\admin\generator\core;


use think\helper\Str;

/**
 * 模型生成器
 * Class ModelGenerator
 * @package app\service\admin\generator\core
 */
class ModelGenerator extends BaseGenerator
{

    /**
     * 替换模板中的变量
     * @return void
     */
    public function replaceText()
    {
        $old = [
            '{NAMESPACE}',
            '{CLASS_COMMENT}',
            '{UCASE_NAME}',
            '{PACKAGE_NAME}',
            '{TABLE_NAME}',
            '{PK}',
            '{SEARCH_FUNCTION}'
        ];

        $new = [
            $this->getNameSpace(),
            $this->getClassComment(),
            $this->getUCaseName(),
            $this->getPackageName(),
            $this->getTableName(),
            $this->getPk(),
            $this->getSearchFunction(),
        ];

        $vmPath = $this->getvmPath('model');

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }


    /**
     * 获取命名空间模板内容
     * @return string
     */
    public function getNameSpace()
    {
        if (!empty($this->moduleName)) {
            return "namespace app\\model\\" . $this->moduleName . ';';
        }
        return "namespace app\\model;";
    }


    /**
     * 获取表主键
     * @return mixed|string
     */
    public function getPk()
    {
        $pk = 'id';
        if (empty($this->tableColumn)) {
            return $pk;
        }

        foreach ($this->tableColumn as $item) {
            if ($item['is_pk']) {
                $pk = $item['column_name'];
            }
        }
        return $pk;
    }

    /**
     * 获取类描述
     * @return string
     */
    public function getClassComment()
    {
        if (!empty($this->table['table_content'])) {
            $tpl = $this->table['table_content'] . '模型';
        } else {
            $tpl = $this->getUCaseName() . '模型';
        }
        return $tpl;
    }

    /**
     * 获取搜索方法
     * @return string
     */
    public function getSearchFunction()
    {
        $function_str = '';
        foreach ($this->tableColumn as $column) {
            if (!$column['is_search']) {
                continue;
            }
            $function_str .= '/**'.PHP_EOL.' * 搜索器:'.$this->table['table_content'].$column['column_comment'].PHP_EOL.' * @param $value'.PHP_EOL.' * @param $data'.PHP_EOL.' */'.PHP_EOL;
            $function_str .= 'public function search'.Str::studly($column['column_name']).'Attr($query, $value, $data)'.PHP_EOL;
            $function_str .= '{'.PHP_EOL;
            $function_str .= '    if ($value) {'.PHP_EOL;
            $function_str .= '        $query->where('.$this->getSearchContent($column).');'.PHP_EOL;
            $function_str .= '    }'.PHP_EOL;
            $function_str .= '}'.PHP_EOL.PHP_EOL;
        }
        $function_str = $this->setBlankSpace($function_str, "    ");

        return ltrim($function_str);

    }

    public function getSearchContent(array $column_info){

        $type = $column_info['query_type'];
        return match ($type) {
            '<>' => '"' . $column_info['column_name'] . '", "<>", $value',
            '!=' => '"' . $column_info['column_name'] . '", "<>", $value',
            '>' => '"' . $column_info['column_name'] . '", ">", $value',
            '>=' => '"' . $column_info['column_name'] . '", ">=", $value',
            '<' => '"' . $column_info['column_name'] . '", "<", $value',
            '<=' => '"' . $column_info['column_name'] . '", "<=", $value',
            'LIKE' => '"' . $column_info['column_name'] . '", "like", "%".$value."%"',
            'BETWEEN' => '"' . $column_info['column_name'] . '", $value[0], $value[1] ',
            default => '"' . $column_info['column_name'] . '", $value',
        };
    }

    /**
     * 获取包名
     * @return string
     */
    public function getPackageName()
    {
        return !empty($this->moduleName) ? '\\' . $this->moduleName : '';
    }


    /**
     * 获取文件生成到模块的文件夹路径
     * @return string
     */
    public function getModuleOutDir()
    {
        $dir = $this->basePath . 'model/';
        if (!empty($this->moduleName)) {
            $dir .= $this->moduleName . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    /**
     * 获取文件生成到runtime的文件夹路径
     * @return string
     */
    public function getRuntimeOutDir()
    {
        $dir = $this->outDir . 'niucloud/app/model/';
        $this->checkDir($dir);
        if (!empty($this->moduleName)) {
            $dir .= $this->moduleName . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }


    /**
     * 生成的文件名
     * @return string
     */
    public function getFileName()
    {
        return $this->getUCaseName() . '.php';
    }


}