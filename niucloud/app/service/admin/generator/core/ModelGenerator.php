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
            '{SEARCH_FUNCTION}',
            '{SOFT_DELETE}',
            '{DELETE_COLUMN}',
            '{DELETE_COLUMN_VALUE}',
            '{RELATION_MODEL}'
        ];
        $delete_data = $this->getSoftDeleteFunction();
        $new = [
            $this->getNameSpace(),
            $this->getClassComment(),
            $this->getUCaseClassName(),
            $this->getPackageName(),
            $this->getTableName(),
            $this->getPk(),
            $this->getSearchFunction(),
            $delete_data['softDelete'],
            $delete_data['deleteColumn'],
            $delete_data['deleteColumnValue'],
            $this->getRelationModel(),
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
        if(!empty($this->addonName))
        {
            if (!empty($this->moduleName)) {
                return "namespace addon\\".$this->addonName."\\app\\model\\" . $this->moduleName . ';';
            }
        }else{
            if (!empty($this->moduleName)) {
                return "namespace app\\model\\" . $this->moduleName . ';';
            }
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
            $end_str = substr($this->table['table_content'],-3);
            if($end_str == '表')
            {
                $table_content = substr($this->table['table_content'],0,strlen($this->table['table_content'])-3);
            }else{
                $table_content = $this->table['table_content'];
            }
            $tpl = $table_content . '模型';
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
        $end_str = substr($this->table['table_content'],-3);
        if($end_str == '表')
        {
            $table_content = substr($this->table['table_content'],0,strlen($this->table['table_content'])-3);
        }else{
            $table_content = $this->table['table_content'];
        }

        foreach ($this->tableColumn as $column) {
            if (!$column['is_search'] || $column['column_name'] == 'site_id') {
                continue;
            }
            $function_str .= '/**'.PHP_EOL.' * 搜索器:'.$table_content.$column['column_comment'].PHP_EOL.' * @param $value'.PHP_EOL.' * @param $data'.PHP_EOL.' */'.PHP_EOL;
            $function_str .= 'public function search'.Str::studly($column['column_name']).'Attr($query, $value, $data)'.PHP_EOL;
            $function_str .= '{'.PHP_EOL;
            $function_str .= $this->getSearchContent($column);
            $function_str .= '}'.PHP_EOL.PHP_EOL;
        }
        $function_str = $this->setBlankSpace($function_str, "    ");

        return ltrim($function_str);

    }

    public function getSearchContent(array $column_info){
        $type = $column_info['query_type'];
        if ($type == 'BETWEEN') {
            if ($column_info['view_type'] == 'datetime') {
                $function_str = '    $start = empty($value[0]) ? 0 : strtotime($value[0]);'.PHP_EOL;
                $function_str .= '    $end = empty($value[1]) ? 0 : strtotime($value[1]);'.PHP_EOL;
            } else {
                $function_str = '    $start = empty($value[0]) ? 0 : $value[0];'.PHP_EOL;
                $function_str .= '    $end = empty($value[1]) ? 0 : $value[1];'.PHP_EOL;
            }
            $function_str .= '    if ($start > 0 && $end > 0) {'.PHP_EOL;
            $function_str .= '         $query->where([["' . $column_info['column_name'] . '", "between", [$start, $end]]]);'.PHP_EOL;
            $function_str .= '    } else if ($start > 0 && $end == 0) {'.PHP_EOL;
            $function_str .= '        $query->where([["' . $column_info['column_name'] . '", ">=", $start]]);'.PHP_EOL;
            $function_str .= '    } else if ($start == 0 && $end > 0) {'.PHP_EOL;
            $function_str .= '        $query->where([["' . $column_info['column_name'] . '", "<=", $end]]);'.PHP_EOL;
            $function_str .= '    }'.PHP_EOL;
            return $function_str;
        } else {
            $function_str = '   if ($value) {'.PHP_EOL;
            $function_str .= '        $query->where(';
            $function_str .= match ($type) {
                '<>' => '"' . $column_info['column_name'] . '", "<>", $value',
                '!=' => '"' . $column_info['column_name'] . '", "<>", $value',
                '>' => '"' . $column_info['column_name'] . '", ">", $value',
                '>=' => '"' . $column_info['column_name'] . '", ">=", $value',
                '<' => '"' . $column_info['column_name'] . '", "<", $value',
                '<=' => '"' . $column_info['column_name'] . '", "<=", $value',
                'LIKE' => '"' . $column_info['column_name'] . '", "like", "%".$value."%"',
                default => '"' . $column_info['column_name'] . '", $value',
            };
            $function_str .= ');'.PHP_EOL;
            $function_str .= '    }'.PHP_EOL;
            return $function_str;
        }
    }

    /**
     * 获取包名
     * @return string
     */
    public function getPackageName()
    {
        if(!empty($this->addonName))
        {
            if(!empty($this->moduleName))
            {
                return 'addon\\'.$this->addonName.'\\app\model\\'.$this->moduleName;
            }else{
                return 'addon\app\model\\';
            }
        }else{
            if(!empty($this->moduleName))
            {
                return 'app\model\\'.$this->moduleName;
            }else{
                return 'app\\model\\'." ";
            }
        }
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
        if(!empty($this->addonName))
        {
            $dir = $this->outDir . '/addon/'.$this->addonName.'/app/model/';
        }else{
            $dir = $this->outDir . 'niucloud/app/model/';
        }

        $this->checkDir($dir);
        if (!empty($this->moduleName)) {
            $dir .= $this->moduleName . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }

    /**
     * 获取文件生成到项目中
     * @return string
     */
    public function getObjectOutDir()
    {
        if(!empty($this->addonName))
        {
            $dir = $this->rootDir . '/niucloud/addon/'.$this->addonName.'/app/model/';
        }else{
//            $dir = '';
            $dir = $this->rootDir . '/niucloud/app/model/';
        }

        $this->checkDir($dir);
        if (!empty($this->moduleName)) {
            $dir .= $this->moduleName . '/';
            $this->checkDir($dir);
        }
        return $dir;
    }

    public function getFilePath()
    {
        if(!empty($this->addonName))
        {
            $dir = 'addon/'.$this->addonName.'/app/model/';
        }else{
            $dir = 'niucloud/app/model/';
        }
        $dir .= $this->moduleName . '/';
        return $dir;
    }
    /**
     * 生成的文件名
     * @return string
     */
    public function getFileName()
    {
        return $this->getUCaseClassName() . '.php';
    }

    /**
     * 软删除
     * @return array
     */
    public function getSoftDeleteFunction()
    {
        $data = [];
        foreach ($this->tableColumn as $column) {
            if ($column['is_delete'] == 0) {
                $data['softDelete'] = '';
                $data['deleteColumn'] = '';
                $data['deleteColumnValue'] = '';
            }else{
                $data['softDelete'] = ' use SoftDelete;';
                $data['deleteColumn'] = '/**'.PHP_EOL.'    * 定义软删除标记字段.'.PHP_EOL.'    * @var string'.PHP_EOL.'    */'.PHP_EOL.'    protected $deleteTime = '."'".$column['column_name']."';";
                $data['deleteColumnValue'] = '/**'.PHP_EOL.'    * 定义软删除字段的默认值.'.PHP_EOL.'    * @var int'.PHP_EOL.'    */'.PHP_EOL.'    protected $defaultSoftDelete = 0;';
            }
        }
        return $data;
    }

    /**
     * 关联信息
     */
    public function getRelationModel()
    {
        $tpl = '';

        if ($this->table['relations'] == '[]') {
            return $tpl;
        }

        // 遍历关联配置
        if(!empty($this->table['relations']))
        {
            $relations = json_decode($this->table['relations'],true);

            foreach ($relations as $config) {
                if (empty($config) || empty($config['name']) || empty($config['model'])) {
                    continue;
                }

                $needReplace = [
                    '{RELATION_NAME}',
                    '{RELATION_MODEL}',
                    '{FOREIGN_KEY}',
                    '{LOCAL_KEY}',
                ];

                $waitReplace = [
                    $config['name'],
                    '\\'. $config['model'],
                    $config['foreign_key'],
                    $config['local_key'],
                ];

                $vmPath = $this->getvmPath('php/model/'.$config['type']);
                $tpl .= $this->replaceFileText($needReplace, $waitReplace, $vmPath). PHP_EOL;
            }
            return $tpl;
        }else{
            return '';
        }

    }

}
