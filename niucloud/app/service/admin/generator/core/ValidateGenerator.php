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


/**
 * 验证器生成器
 * Class ValidateGenerator
 * @package app\service\admin\generator\core
 */
class ValidateGenerator extends BaseGenerator
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
            '{RULE}',
            '{MESSAGE}',
            '{SCENE}',
        ];

        $new = [
            $this->getNameSpace(),
            $this->getClassComment(),
            $this->getUCaseClassName(),
            $this->getPackageName(),
            $this->getRule(),
            $this->getMessage(),
            $this->getScene(),
        ];

        $vmPath = $this->getvmPath('validate');

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }


    /**
     * 验证规则
     * @return string
     */
    public function getRule()
    {
        $content = "";
        foreach ($this->tableColumn as $column) {
            if ($column['column_name'] == 'site_id') continue;

            if($column['is_required'] == 1){
                if(!empty($column['validate_type']))
                {
                    $column['validate_type'] = json_decode($column['validate_type'],true);
                    if($column['validate_type'][0] == 'max')
                    {
                        $content .= "'".$column['column_name']."' => 'require|".$column['validate_type'][0].":".$column['validate_type'][1][0]."',". PHP_EOL;
                    }else if($column['validate_type'][0] == 'min')
                    {
                        $content .= "'".$column['column_name']."' => 'require|".$column['validate_type'][0].":".$column['validate_type'][1][0]."',". PHP_EOL;
                    }else if($column['validate_type'][0] == 'between'){
                        $content .= "'".$column['column_name']."' => 'require|".$column['validate_type'][0].":".$column['validate_type'][1][0].','.$column['validate_type'][1][1]."',". PHP_EOL;
                    }else{
                        $content .= "'".$column['column_name']."' => 'require|".$column['validate_type'][0]."',". PHP_EOL;
                    }
                }else{
                    $content .=  "'".$column['column_name'] . "' => 'require'," . PHP_EOL;
                }
            }else{
                if(!empty($column['validate_type']))
                {
                    $column['validate_type'] = json_decode($column['validate_type'],true);
                    if($column['validate_type'][0] == 'max')
                    {
                        $content .= "'".$column['column_name']."' => '".$column['validate_type'][0].":".$column['validate_type'][1][0]."',". PHP_EOL;
                    }else if($column['validate_type'][0] == 'min')
                    {
                        $content .= "'".$column['column_name']."' => '".$column['validate_type'][0].":".$column['validate_type'][1][0]."',". PHP_EOL;
                    }else if($column['validate_type'][0] == 'between'){
                        $content .= "'".$column['column_name']."' => '".$column['validate_type'][0].":".$column['validate_type'][1][0].','.$column['validate_type'][1][1]."',". PHP_EOL;
                    }else{
                        $content .= "'".$column['column_name']."' => '".$column['validate_type'][0]."',". PHP_EOL;
                    }
                }
            }

        }
        $content = substr($content, 0, -2);
        $content = $this->setBlankSpace($content, "            ");
        return '['.PHP_EOL.$content.PHP_EOL.'        ]';
    }

    /**
     * 验证提示
     * @return string
     */
    public function getMessage()
    {
        $content = "";
        foreach ($this->tableColumn as $column) {
            if ($column['column_name'] == 'site_id') continue;

            if($column['is_required'] == 1)
            {
                $content .= "'".$column['column_name'].".require"."' => "."['".'common_validate.require'."', ['".$column['column_name']."']]".','. PHP_EOL;
            }
            if(!empty($column['validate_type']))
            {
                $column['validate_type'] = json_decode($column['validate_type'],true);
                if($column['validate_type'][0] == 'max')
                {
                    $content .= "'".$column['column_name'].".".$column['validate_type'][0]."' => "."['".'common_validate.'.$column['validate_type'][0]."', ['".$column['column_name']."','".$column['validate_type'][1][0]."']]".','. PHP_EOL;

                }else if($column['validate_type'][0] == 'min')
                {
                    $content .= "'".$column['column_name'].".".$column['validate_type'][0]."' => "."['".'common_validate.'.$column['validate_type'][0]."', ['".$column['column_name']."','".$column['validate_type'][1][0]."']]".','. PHP_EOL;

                }else if($column['validate_type'][0] == 'between'){
                    $content .= "'".$column['column_name'].".".$column['validate_type'][0]."' => "."['".'common_validate.'.$column['validate_type'][0]."', ['".$column['column_name']."','".$column['validate_type'][1][0]."','".$column['validate_type'][1][1]."']]".','. PHP_EOL;

                }else{
                    $content .= "'".$column['column_name'].".".$column['validate_type'][0]."' => "."['".'common_validate.'.$column['validate_type'][0]."', ['".$column['column_name']."']]".','. PHP_EOL;

                }
            }
        }
        $content = substr($content, 0, -2);
        $content = $this->setBlankSpace($content, "            ");
        return '['.PHP_EOL.$content.PHP_EOL.'        ]';
    }

    /**
     * 验证字段
     * @return string
     */
    public function getScene()
    {
        $content = "";
        $add_arr = [];
        $update_arr = [];
        foreach ($this->tableColumn as $column) {
            if ($column['column_name'] == 'site_id') continue;
            if ($column['is_insert'] == 1 && !$column['is_pk']) $add_arr[] = "'".$column['column_name']."'";
            if ($column['is_update'] == 1 && !$column['is_pk']) $update_arr[] = "'".$column['column_name']."'";
        }

        $content .= '"add" => ['.implode(', ', $add_arr).'],'.PHP_EOL;
        $content .= '"edit" => ['.implode(', ', $update_arr).']';
        $content = $this->setBlankSpace($content, "            ");
        return '['.PHP_EOL.$content.PHP_EOL.'        ]';
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
                return "namespace addon\\".$this->addonName."\\app\\validate\\" . $this->moduleName . ';';
            }

        }else{
            if (!empty($this->moduleName)) {
                return "namespace app\\validate\\" . $this->moduleName . ';';
            }
        }

        return "namespace app\\validate;";
    }


    /**
     * 获取类描述
     * @return string
     */
    public function getClassComment()
    {
        $tpl = $this->getNotes() . '验证器';
        return $tpl;
    }

    public function getNotes()
    {
        $end_str = substr($this->table['table_content'],-3);
        if($end_str == '表')
        {
            return substr($this->table['table_content'],0,strlen($this->table['table_content'])-3);
        }else{
            return $this->table['table_content'];
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
                return 'addon\\'.$this->addonName.'\\app\validate\\'.$this->moduleName;
            }else{
                return 'addon\\'.$this->addonName.'\\app\validate\\';
            }
        }else{
            if(!empty($this->moduleName))
            {
                return 'addon\\app\validate\\'.$this->moduleName;
            }else{
                return 'addon\\app\\validate';
            }
        }
    }


    /**
     * 获取文件生成到模块的文件夹路径
     * @return string
     */
    public function getModuleOutDir()
    {
        $dir = $this->basePath  . '/validate/';
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
            $dir = $this->outDir . '/addon/'.$this->addonName.'/app/validate/';
        }else{
            $dir = $this->outDir . 'niucloud/app/validate/';
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
            $dir = $this->rootDir . '/niucloud/addon/'.$this->addonName.'/app/validate/';
        }else{
//            $dir = '';
            $dir = $this->rootDir . '/niucloud/app/validate/';
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
            $dir = 'addon/'.$this->addonName.'/app/validate/';
        }else{
            $dir = 'niucloud/app/validate/';
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


}
