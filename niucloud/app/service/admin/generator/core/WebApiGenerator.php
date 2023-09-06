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
 * web-api生成器
 * Class WebApiGenerator
 * @package app\service\admin\generator\core
 */
class WebApiGenerator extends BaseGenerator
{

    /**
     * 替换模板中的变量
     * @return void
     */
    public function replaceText()
    {

        $old = [
            '{NOTES}',
            '{UCASE_CLASS_NAME}',
            '{LCASE_CLASS_NAME}',
            '{ROUTE_NAME}',
            '{PK}',
            '{UCASE_NAME}',
            '{MODULE_NAME}',
        ];

        $new = [
            $this->table['table_content'],
            $this->getUCaseClassName(),
            strtolower($this->getLCaseClassName()),
            $this->getRouteName(),
            $this->getPk(),
            $this->getUCaseName(),
            $this->moduleName,
        ];
        $vmPath = $this->getvmPath('web_api');

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }
    /**
     * 路由名称
     * @return string
     */
    public function getRouteName()
    {
        //如果是某个模块下的功能，公用一个路由
        if($this->moduleName && ($this->getLCaseTableName() != $this->moduleName) && $this->className){
            return Str::lower($this->className);
        }else{
            return $this->getLCaseTableName();
        }
    }
    /**
     * 获取文件生成到模块的文件夹路径
     * @return string
     */
    public function getModuleOutDir()
    {
        $dir = dirname(app()->getRootPath()) . '/admin/src/api/';
        $this->checkDir($dir);
        return $dir;
    }


    /**
     * 获取文件生成到runtime的文件夹路径
     * @return string
     */
    public function getRuntimeOutDir()
    {
        $dir = $this->outDir . 'admin/src/api/';
        $this->checkDir($dir);
        return $dir;
    }

    /**
     * 生成的文件名
     * @return string
     */
    public function getFileName()
    {
        if($this->moduleName && ($this->getLCaseTableName() != $this->moduleName)){
            return Str::lower($this->moduleName) . '.ts';
        }else{
            return $this->getLCaseTableName() . '.ts';
        }
    }

}