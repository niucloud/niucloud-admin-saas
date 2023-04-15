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


/**
 * service生成器
 * Class ServiceGenerator
 * @package app\service\admin\generator\core
 */
class ServiceGenerator extends BaseGenerator
{

    /**
     * 替换模板中的变量
     * @return mixed|void
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
        ];

        $new = [
            $this->getNameSpace(),
            $this->getUse(),
            $this->getUCaseName(),
            $this->getPackageName(),
            $this->getPk(),
            $this->table['table_content'],
            $this->getAuthor(),
            $this->getNoteDate(),
            $this->getField(),
            $this->getSearchField(),
        ];

        $vmPath = $this->getvmPath('service');

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }


    /**
     * 字段内容
     * @return string
     */
    public function getField()
    {
        $field = [];
        foreach ($this->tableColumn as $column) {
            if ($column['is_lists'] || $column['is_insert'] || $column['is_update']) {
                $field[] = $column['column_name'];
            }
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
            if (!$column['is_search']) {
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
        if (!empty($this->moduleName)) {
            return "namespace app\\service\\admin\\" . $this->moduleName . ';';
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
        if (!empty($this->moduleName)) {
            $tpl = "use app\\model\\" . $this->moduleName . "\\" . $this->getUCaseName() . ';';
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
        $dir = $this->outDir . 'php/app/service/admin/';
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
        return $this->getUCaseName() . 'Service.php';
    }

}