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
 * service生成器
 * Class ServiceGenerator
 * @package app\service\admin\generator\core
 */
class ServiceGenerator extends BaseGenerator
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
            '{UCASE_NAME}',
            '{PACKAGE_NAME}',
            '{PK}',
            '{NOTES}',
            '{AUTHOR}',
            '{DATE}',
            '{FIELDS}',
            '{SEARCH_FIELDS}',
            '{ORDER}'
        ];

        $new = [
            $this->getNameSpace(),
            $this->getUse(),
            $this->getUCaseClassName(),
            $this->getPackageName(),
            $this->getPk(),
            $this->getNotes(),
            $this->getAuthor(),
            $this->getNoteDate(),
            $this->getField(),
            $this->getSearchField(),
            $this->getOrderString(),
        ];

        $fileds = array_column($this->tableColumn, 'column_name');
        if (in_array('site_id', $fileds)) {
            $vmPath = $this->getvmPath('site_service');
        } else {
            $vmPath = $this->getvmPath('service');
        }

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
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

    /**
     * 字段内容
     * @return string
     */
    public function getField()
    {
        $field = [];
        foreach ($this->tableColumn as $column) {
            $field[] = $column['column_name'];
        }

        return implode(',', $field);
    }

    /**
     * 搜索字段内容
     * @return string
     */
    public function getSearchField()
    {
        $field = [];
        foreach ($this->tableColumn as $column) {
            if (!$column['is_search'] || $column['column_name'] == 'site_id') {
                continue;
            }
            $field[] = '"'.$column['column_name'].'"';
        }
        return implode(',', $field);
    }

    /**
     * 获取命名空间内容
     * @return string
     */
    public function getNameSpace()
    {
        if(!empty($this->addonName))
        {
            if (!empty($this->moduleName)) {
                return "namespace addon\\".$this->addonName."\\app\\service\\admin\\" . $this->moduleName . ';';
            }
        }else{
            if (!empty($this->moduleName)) {
                return "namespace app\\service\\admin\\" . $this->moduleName . ';';
            }
        }

        return "namespace app\\service\\admin;";
    }


    /**
     * 获取use内容
     * @return string
     */
    public function getUse()
    {
        $tpl = "use app\\model\\" . $this->getUCaseName() . ';';
        if(!empty($this->addonName))
        {
            if (!empty($this->moduleName)) {
                $tpl = "use addon\\".$this->addonName."\\app\\model\\" . $this->moduleName . "\\" . $this->getUCaseClassName() . ';';
            }

        }else{
            if (!empty($this->moduleName)) {
                $tpl = "use app\\model\\" . $this->moduleName . "\\" . $this->getUCaseClassName() . ';';
            }
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
                return 'addon\\'.$this->addonName.'\\app\service\\admin\\'.$this->moduleName;
            }else{
                return 'addon\\'.$this->addonName.'\\app\service\\admin\\';
            }
        }else{
            if(!empty($this->moduleName))
            {
                return 'app\service\\admin\\'.$this->moduleName;
            }else{
                return 'app\\service\\admin';
            }
        }
    }


    /**
     * 获取文件生成到模块的文件夹路径
     * @return string
     */
    public function getModuleOutDir()
    {
        $dir = $this->basePath . '/service/admin/';
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
            $dir = $this->outDir . '/addon/'.$this->addonName.'/app/service/admin/';
        }else{
            $dir = $this->outDir . 'niucloud/app/service/admin/';
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
            $dir = $this->rootDir . '/niucloud/addon/'.$this->addonName.'/app/service/admin/';
        }else{
//            $dir = '';
            $dir = $this->rootDir . '/niucloud/app/service/admin/';
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
            $dir = 'addon/'.$this->addonName.'/app/service/admin/';
        }else{
            $dir = 'niucloud/app/service/admin/';
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
        return $this->getUCaseClassName() . 'Service.php';
    }

    /**
     * 排序
     * return string
     */
    public function getOrderString()
    {
        if(!empty($this->table['order_type']))
        {
            if($this->table['order_type'] == 1)
            {
                $type = 'asc';
            }else if($this->table['order_type'] == 2)
            {
                $type = 'desc';
            }
            foreach ($this->tableColumn as $column) {
                if (!$column['is_order']) {
                    continue;
                }
                $order[] = ''.$column['column_name'].' '.$type.'';
            }

        }else{
            $order = [];
        }
        return implode(',', $order);
    }

}
