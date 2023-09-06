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
            $this->getUCaseName(),
            $this->getPackageName(),
            $this->table['table_content'],
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
        if (!empty($this->moduleName)) {
            return "namespace app\\adminapi\\controller\\" . $this->moduleName . ';';
        }
        return "namespace app\\adminapi\\controller;";
    }

    /**
     * 代码验证
     * @return string
     */
    public function getValidate()
    {
        return 'app\validate\\'.$this->moduleName.'\\' . $this->getUCaseName();
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
            if(!$v['is_pk'] && $v['is_insert']){
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
            if(!$v['is_pk'] && $v['is_update']){
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
            if(!$v['is_pk'] && $v['is_search']){
                if($v['view_type'] == 'datetime'){
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
        if (!empty($this->moduleName)) {
            $tpl .= "use app\\service\\admin\\" . $this->moduleName . "\\" . $this->getUCaseName() . "Service;" . PHP_EOL ;
        } else {
            $tpl .= "use app\\service\\admin\\".$this->getLCaseTableName().'\\' . $this->getUCaseName() . "Service;" . PHP_EOL ;
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
            $tpl = $this->table['table_content'] . '控制器';
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
        return !empty($this->moduleName) ? '\\' . $this->moduleName : '';
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
        $dir = $this->outDir . 'niucloud/app/adminapi/controller/';
        $this->checkDir($dir);
        if (!empty($this->moduleName)) {
            $dir .= $this->moduleName . '/';
            $this->checkDir($dir);
        }
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


}