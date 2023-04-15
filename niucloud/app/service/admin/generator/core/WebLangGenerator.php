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
 * web-语言包生成器
 * Class WebLangGenerator
 * @package app\service\admin\generator\core
 */
class WebLangGenerator extends BaseGenerator
{

    /**
     * 替换模板中的变量
     * @return mixed|void
     */
    public function replaceText()
    {
        $text = $this->getLang();
        $this->setText($text);
    }

    /**
     * 语言包
     * @return string
     */
    public function getLang()
    {
        $lang = '';
        foreach ($this->tableColumn as $column) {
            if($column['is_lists'] || $column['is_search']) {
                $lang .= '"' . Str::camel($column['column_name']) . '":"' . $column['column_comment'] . '",' . PHP_EOL;
            }
            if($column['is_search']){
                $placeholder_text = '请输入';
                $lang .= '"'.Str::camel($column['column_name']) .'Placeholder":"'.$placeholder_text.$column['column_comment'].'",'.PHP_EOL;
            }

            if($this->table['edit_type'] == 1 && ($column['is_insert'] || $column['is_update'])){
                if(strpos($lang, '"'.Str::camel($column['column_name']).'"') === false){
                    $lang .= '"' . Str::camel($column['column_name']) . '":"' . $column['column_comment'] . '",' . PHP_EOL;
                }
                $placeholder_text = '请输入';
                if(strpos($lang, '"'.Str::camel($column['column_name']).'Placeholder"') === false){
                    $lang .= '"'.Str::camel($column['column_name']) .'Placeholder":"'.$placeholder_text.$column['column_comment'].'",'.PHP_EOL;
                }

            }
        }

        $lang .= '"add'.$this->getUCaseClassName() .'":"添加'.$this->table['table_content'].'",'.PHP_EOL;
        $lang .= '"update'.$this->getUCaseClassName() .'":"编辑'.$this->table['table_content'].'",'.PHP_EOL;
        $lang .= '"'.$this->getLCaseClassName() .'DeleteTips":"确定要删除该'.$this->table['table_content'].'吗？",'.PHP_EOL;
        $lang = trim(trim($lang), ',');
        return '{'.PHP_EOL.$this->setBlankSpace($lang, "      ").PHP_EOL.'}';
    }

    /**
     * 获取文件生成到模块的文件夹路径
     * @return mixed|void
     */
    public function getModuleOutDir()
    {
        $dir = dirname(app()->getRootPath()) . '/admin/src/lang/zh-cn/';
        $this->checkDir($dir);
        return $dir;
    }


    /**
     * 获取文件生成到runtime的文件夹路径
     * @return string
     */
    public function getRuntimeOutDir()
    {
        $dir = $this->outDir . 'vue/src/lang/zh-cn/';
        $this->checkDir($dir);
        return $dir;
    }


    /**
     * 生成的文件名
     * @return string
     */
    public function getFileName()
    {
        if($this->className){
            return $this->moduleName.'.'.Str::lower($this->className).'.json';
        }
        return $this->moduleName.'.list.json';
    }


}