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
            '{ROUTE_GROUP_NAME}',
            '{IMPORT}',
            '{BEGIN}',
            '{END}',
        ];

        $new = [
            $this->getNotes(),
            $this->getUCaseClassName(),
            strtolower($this->getLCaseClassName()),
            $this->getRouteName(),
            $this->getPk(),
            $this->getUCaseClassName(),
            $this->moduleName,
            $this->getRouteGroupName(),
            $this->getImport(),
            $this->getBegin(),
            $this->getEnd(),
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
        if(!empty($this->addonName))
        {
            $dir = dirname(app()->getRootPath()) . '/admin/src/'. $this->addonName  .'/api/';
        }else{
            $dir = dirname(app()->getRootPath()) . '/admin/src/app/api/';
        }
        $this->checkDir($dir);
        return $dir;
    }

    /**
     * 文件内容处理
     * @return string
     */
    public function getImport()
    {

        $dir = dirname(root_path());
        if(!empty($this->addonName))
        {
            $file = $dir.'\admin\src\\'.$this->addonName.'\\api\\'.$this->moduleName.'.ts';
        }else{
            $file = $dir.'\admin\src\app\api\\'.$this->moduleName.'.ts';
        }

        if(file_exists($file))
        {

            $content = file_get_contents($file);
            $code_begin = 'USER_CODE_BEGIN -- '.$this->getTableName() . PHP_EOL;
            $code_end = 'USER_CODE_END -- '.$this->getTableName(). PHP_EOL;

            if(strpos($content,$code_begin) !== false && strpos($content,$code_end) !== false)
            {
                // 清除相应对应代码块
                $pattern = "/\/\/\s+{$code_begin}[\S\s]+{$code_end}?/";
                $import = preg_replace($pattern, '', $content);

            }else{
                $import = $content;
            }
        }else{
            $import = "import request from '@/utils/request'";
        }
        return $import;

    }

    public function getBegin()
    {
        $begin = '// USER_CODE_BEGIN -- '.$this->getTableName();
        return $begin;
    }

    public function getEnd()
    {
        $end = '// USER_CODE_END -- '.$this->getTableName();
        return $end;
    }

    /**
     * 获取文件生成到runtime的文件夹路径
     * @return string
     */
    public function getRuntimeOutDir()
    {
        if(!empty($this->addonName))
        {
            $dir = $this->outDir . 'addon/'.$this->addonName.'/admin/api/';

        }else{
            $dir = $this->outDir . 'admin/src/app/api/';
        }
        $this->checkDir($dir);
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
            $dir = $this->rootDir . '/admin/src/'.$this->addonName.'/api/';
        }else{
            $dir = $this->rootDir . '/admin/src/app/api/';
        }

        $this->checkDir($dir);
        return $dir;
    }

    /**
     * 获取文件生成到插件中
     */
    public function getAddonObjectOutDir() {
        $dir = $this->rootDir . '/niucloud/addon/'.$this->addonName.'/admin/api/';
        $this->checkDir($dir);
        return $dir;
    }

    public function getFilePath()
    {
        if(!empty($this->addonName))
        {
            $dir = 'addon/'.$this->addonName.'/admin/api/';
        }else{
            $dir = 'admin/app/api/';
        }

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

    /**
     * 获取路由分组
     * @return string
     */
    public function getRouteGroupName()
    {
        if(!empty($this->addonName))
        {
            return $this->addonName;
        }else{
            return $this->moduleName;
        }
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
