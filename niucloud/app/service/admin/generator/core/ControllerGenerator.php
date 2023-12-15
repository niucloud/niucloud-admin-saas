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

namespace app\service\admin\generator\core;

use think\helper\Str;

/**
 * 控制器生成器
 * Class ControllerGenerator
 * @package app\service\admin\generator\core
 */
class ControllerGenerator extends BaseGenerator
{
    /**
     * 替换模板中的变量
     * @return void
     */
    public function replaceText()
    {
        $old = [
            '{NAMESPACE}',
            '{USE}',
            '{UCASE_CLASS_NAME}',
            '{CLASS_COMMENT}',
            '{UCASE_NAME}',
            '{PACKAGE_NAME}',
            '{NOTES}',
            '{AUTHOR}',
            '{DATE}',
            '{VALIDATE}',
            '{ADD_FILED_NOTE}',
            '{EDIT_FILED_NOTE}',
            '{SEARCH_PARAMS}'
        ];

        $new = [
            $this->getNameSpace(),
            $this->getUse(),
            $this->getUCaseClassName(),
            $this->getClassComment(),
            $this->getUCaseClassName(),
            $this->getPackageName(),
            $this->getNotes(),
            $this->getAuthor(),
            $this->getNoteDate(),
            $this->getValidate(),
            $this->getAddField(),
            $this->getEditField(),
            $this->getSearchParams()
        ];

        $vmPath = $this->getvmPath('controller');

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }


    /**
     * 获取命名空间
     * @return string
     */
    public function getNameSpace()
    {
        if(!empty($this->addonName))
        {
            if (!empty($this->moduleName)) {
                return "namespace addon\\".$this->addonName."\\app\\adminapi\\controller\\" . $this->moduleName . ';';
            }

        }else{
            if (!empty($this->moduleName)) {
                return "namespace app\\adminapi\\controller\\" . $this->moduleName . ';';
            }
        }

        return "namespace app\\adminapi\\controller;";
    }

    /**
     * 代码验证
     * @return string
     */
    public function getValidate()
    {
        if(!empty($this->addonName))
        {
            return 'addon\\'.$this->addonName.'\\app\validate\\'.$this->moduleName.'\\' . $this->getUCaseClassName();
        }else{
            return 'app\validate\\'.$this->moduleName.'\\' . $this->getUCaseClassName();
        }

    }

    /**
     * 添加字段
     * @return string
     */
    public function getAddField()
    {
        $str = '';
        $last_field = end($this->table['fields'])['column_name'];
        foreach ($this->table['fields'] as $v){
            if(!$v['is_pk'] && $v['is_insert'] && $v['column_name'] != 'site_id'){
                $str .= '             ["'.$v['column_name'].'",'.$this->getDefault($v['column_type']).']';
                if($last_field != $v['column_name']) $str .= ','.PHP_EOL;
            }
        }
        return '['.PHP_EOL.$str.PHP_EOL.'        ]';
    }

    /**
     * 编辑字段
     * @return string
     */
    public function getEditField()
    {
        $str = '';
        $last_field = end($this->table['fields'])['column_name'];
        foreach ($this->table['fields'] as $v){
            if(!$v['is_pk'] && $v['is_update'] && $v['column_name'] != 'site_id'){
                $str .= '             ["'.$v['column_name'].'",'.$this->getDefault($v['column_type']).']';
                if($last_field != $v['column_name']) $str .= ','.PHP_EOL;
            }
        }
        return '['.PHP_EOL.$str.PHP_EOL.'        ]';
    }

    /**
     * 搜索参数
     * @return string
     */
    public function getSearchParams()
    {
        $str = '';
        $last_field = end($this->table['fields'])['column_name'];
        foreach ($this->table['fields'] as $v){
            if(!$v['is_pk'] && $v['is_search'] && $v['column_name'] != 'site_id'){
                if($v['query_type'] == 'BETWEEN'){
                    $str .= '             ["'.$v['column_name'].'",'.'["",""]'.']';
                }else{
                    $str .= '             ["'.$v['column_name'].'",'.'""'.']';
                }

                if($last_field != $v['column_name']) $str .= ','.PHP_EOL;
            }
        }
        if (!empty($str)) {
            $str = rtrim(rtrim($str), ',');
        }
        return $str;

    }


    /**
     * 获取use内容
     * @return string
     */
    public function getUse()
    {

        $tpl = "use core\\base\\BaseAdminController;" . PHP_EOL;
        if(!empty($this->addonName))
        {
            if (!empty($this->moduleName)) {
                $tpl .= "use addon\\" . $this->addonName."\\"."app\\service\\admin\\" . $this->moduleName . "\\" . $this->getUCaseClassName() . "Service;" . PHP_EOL ;
            } else {
                $tpl .= "use addon\\". $this->addonName."\\service\\admin\\".$this->getLCaseTableName().'\\' . $this->getUCaseClassName() . "Service;" . PHP_EOL ;
            }
        }else{
            if (!empty($this->moduleName)) {
                $tpl .= "use app\\service\\admin\\" . $this->moduleName . "\\" . $this->getUCaseClassName() . "Service;" . PHP_EOL ;
            } else {
                $tpl .= "use app\\service\\admin\\".$this->getLCaseTableName().'\\' . $this->getUCaseClassName() . "Service;" . PHP_EOL ;
            }
        }


        return $tpl;
    }


    /**
     * 获取类注释
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

            $tpl = $table_content . '控制器';
        } else {
            $tpl = $this->getUCaseName() . '控制器';
        }
        return $tpl;
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
                return 'addon\\'.$this->addonName.'\\app\adminapi\controller\\'.$this->moduleName;
            }else{
                return 'addon\\'.$this->addonName.'\\app\adminapi\\controller\\';
            }
        }else{
            if(!empty($this->moduleName))
            {
                return 'app\adminapi\\controller\\'.$this->moduleName;
            }else{
                return 'app\adminapi\\controller\\';
            }
        }
    }


    /**
     * 获取文件生成到模块的文件夹路径
     * @return string
     */
    public function getModuleOutDir()
    {
        $dir = $this->basePath .'/adminapi/controller/';
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
            $dir = $this->outDir . '/addon/'.$this->addonName.'/app/adminapi/controller/';
        }else{
            $dir = $this->outDir . '/niucloud/app/adminapi/controller/';
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
            $dir = $this->rootDir . '/niucloud/addon/'.$this->addonName.'/app/adminapi/controller/';
        }else{
            $dir = $this->rootDir . '/niucloud/app/adminapi/controller/';
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
            $dir = 'addon/'.$this->addonName.'/app/adminapi/controller/';
        }else{
            $dir = 'niucloud/app/adminapi/controller/';
        }
        $dir .= $this->moduleName . '/';
        return $dir;
    }

    /**
     * 生成文件名
     * @return string
     */
    public function getFileName()
    {
        if($this->className) return Str::studly($this->className) . '.php';
        return $this->getUCaseName() . '.php';
    }

    /**
     * 获取注释名称
     * @return string
     */
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


}
