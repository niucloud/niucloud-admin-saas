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
 * web-index生成器
 * Class WebIndexGenerator
 * @package app\service\admin\generator\core
 */
class WebIndexGenerator extends BaseGenerator
{

    /**
     * 替换模板中的变量
     * @return mixed|void
     */
    public function replaceText()
    {

        $old = [
            '{SEARCH_VIEW}',
            '{SEARCH_PARAM}',
            '{LISTS_VIEW}',
            '{NOTES}',
            '{UCASE_NAME}',
            '{LCASE_NAME}',
            '{UCASE_CLASS_NAME}',
            '{LCASE_CLASS_NAME}',
            '{MODULE_NAME}',
            '{EDIT_PATH}',
            '{PK}',
            '{EDIT_VIEW}',
            '{EDIT_DIALOG}',
            '{ADD_EVENT}',
            '{EDIT_EVENT}',

        ];

        $new = [
            $this->getSearch(),
            $this->getSearchParams(),
            $this->getTable(),
            $this->table['table_content'],
            $this->getUCaseName(),
            $this->getLCaseName(),
            $this->getUCaseClassName(),
            $this->getLCaseClassName(),
            $this->moduleName,
            $this->getEditPath(),
            $this->getPk(),
            $this->getEditView(),
            $this->getEditDialog(),
            $this->getAddEvent(),
            $this->getEditEvent(),
        ];

        $vmPath = $this->getvmPath('web_index');

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }

    /**
     * 编辑框路径
     * @return string
     */
    public function getEditPath()
    {
        if($this->table['edit_type'] == 2) return "import { useRouter } from 'vue-router'";
        $path = 'components/';
        $file_name = str_replace('_', '-', Str::lower($this->getTableName())).'-edit.vue';
        if($this->className){
            $file_name = Str::lower($this->className) . '-edit.vue';
        }
        return "import ".$this->getUCaseClassName()."Edit from '@/views/".$this->moduleName."/".$path.$file_name."'";
    }

    /**
     * 编辑框
     * @return string
     */
    public function getEditView()
    {
        if($this->table['edit_type'] == 2) return '';

        $file_name = str_replace('_', '-', Str::lower($this->getTableName())).'-edit';
        if($this->className){
            $file_name = Str::lower($this->className) . '-edit';;
        }

        return '<'.$file_name.' ref="edit'.$this->getUCaseClassName().'Dialog" @complete="load'.$this->getUCaseName().'List" />';
    }

    /**
     * 编辑框Dialog
     * @return string
     */
    public function getEditDialog()
    {
        if($this->table['edit_type'] == 2) return 'const router = useRouter()';
        return 'const edit'.$this->getUCaseClassName().'Dialog: Record<string, any> | null = ref(null)';
    }

    /**
     * 添加操作
     * @return string
     */
    public function getAddEvent()
    {
        $class_name = $this->className ? '/'.Str::lower($this->className) : '';
        if($this->table['edit_type'] == 2){
            //打开新页面
            $content = "router.push('/".$this->moduleName.$class_name."/edit')";
        }else{
            $content = 'edit'.$this->getUCaseClassName().'Dialog.value.setFormData()'.PHP_EOL.'edit'.$this->getUCaseClassName().'Dialog.value.showDialog = true';
        }

        return $this->setBlankSpace($content, '    ');

    }

    /**
     * 编辑
     * @return string
     */
    public function getEditEvent()
    {
        $class_name = $this->className ? '/'.Str::lower($this->className) : '';
        if($this->table['edit_type'] == 2){
            $content = "router.push('/".$this->moduleName.$class_name."/edit?id='+data.".$this->getPk().")";
        }else{
            $content = 'edit'.$this->getUCaseClassName().'Dialog.value.setFormData(data)'.PHP_EOL.'edit'.$this->getUCaseClassName().'Dialog.value.showDialog = true';
        }
        return $this->setBlankSpace($content, '    ');
    }

    /**
     * 获取搜索内容
     * @return string
     */
    public function getSearch()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (!$column['is_search'] || $column['is_pk']) {
                continue;
            }

            $old = [
                '{COLUMN_COMMENT}',
                '{COLUMN_NAME}',
                '{DICT_TYPE}',
                '{LCASE_CLASS_NAME}',
                '{LCASE_COLUMN_NAME}',
            ];
            $new = [
                $column['column_comment'],
                $column['column_name'],
                $column['dict_type'],
                $this->getLCaseClassName(),
                Str::camel($column['column_name']),
            ];

            $searchVmType = $column['view_type'];
            if ($column['view_type'] == 'radio') {
                $searchVmType = 'select';
            }

            $vmPath = $this->getvmPath('search/' . $searchVmType);
            if (!file_exists($vmPath)) {
                continue;
            }

            $content .= $this->replaceFileText($old, $new, $vmPath) . PHP_EOL;

        }

        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }

        $content = $this->setBlankSpace($content, '                    ');
        return $content;
    }

    /**
     * 搜索参数
     * @return string
     */
    public function getSearchParams()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (!$column['is_search'] || $column['is_pk']) {
                continue;
            }

            $content .= '"'.$column['column_name'].'":"",' . PHP_EOL;
        }

        if (!empty($content)) {
            $content = trim(trim($content), ',');
        }
        return $this->setBlankSpace($content, '      ');

    }


    /**
     * 获取列表内容
     * @return string
     */
    public function getTable()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (!$column['is_lists']) {
                continue;
            }

            $old = [
                '{COLUMN_COMMENT}',
                '{COLUMN_NAME}',
                '{LANG}'
            ];
            $new = [
                $column['column_comment'],
                $column['column_name'],
                Str::camel($column['column_name'])
            ];

            $vmPath = $this->getvmPath('table/default');
            if ($column['view_type'] == 'imageSelect') {
                $vmPath = $this->getvmPath('table/image');
            }

            if ($column['column_type'] == 'int' && $column['view_type'] == 'datetime') {
                $vmPath = $this->getvmPath('table/datetime');
            }
            if (!file_exists($vmPath)) {
                continue;
            }

            $content .= $this->replaceFileText($old, $new, $vmPath) . PHP_EOL;
        }

        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '                    ');
    }


    /**
     * 获取查询条件
     * @return string
     */
    public function getQueryParams()
    {
        $content = '';
        $queryDate = false;
        foreach ($this->tableColumn as $column) {
            if (!$column['is_query'] || $column['is_pk']) {
                continue;
            }
            $content .= $column['column_name'] . ": ''," . PHP_EOL;
            if ($column['query_type'] == 'between' && $column['view_type'] == 'datetime') {
                $queryDate = true;
            }
        }
        if ($queryDate) {
            $content .= "start_time: ''," . PHP_EOL;
            $content .= "end_time: ''," . PHP_EOL;
        }
        $content = substr($content, 0, -2);
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * 获取文件生成到模块的文件夹路径
     * @return mixed|void
     */
    public function getModuleOutDir()
    {
        $dir = dirname(app()->getRootPath()) . '/admin/src/views/' . $this->moduleName . '/';
        $this->checkDir($dir);

        return $dir;
    }


    /**
     * 获取文件生成到runtime的文件夹路径
     * @return string
     */
    public function getRuntimeOutDir()
    {
        $dir = $this->outDir . 'vue/src/views/' . $this->moduleName . '/';
        $this->checkDir($dir);

        return $dir;
    }


    /**
     * 生成的文件名
     * @return string
     */
    public function getFileName()
    {
        if($this->className) return Str::lower($this->className).'.vue';
        return Str::lower($this->getTableName()).'.vue';
    }


}