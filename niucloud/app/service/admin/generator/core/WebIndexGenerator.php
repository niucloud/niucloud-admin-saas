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



use app\service\core\menu\CoreMenuService;
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
     * @return void
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
            '{API_PATH}',
            '{DICT_LIST}'
        ];

        $new = [
            $this->getSearch(),
            $this->getSearchParams(),
            $this->getTable(),
            $this->getNotes(),
            $this->getUCaseClassName(),
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
            $this->getApiPath(),
//            $this->getDictDataContent(),
            $this->getDictList(),
        ];

        $vmPath = $this->getvmPath('web_index');

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
     * 编辑框路径
     * @return string
     */
    public function getEditPath()
    {
        if($this->table['edit_type'] == 2) return "import { useRouter } from 'vue-router'";
        $path = 'components/';
//        $file_name = str_replace('_', '-', Str::lower($this->getTableName())).'-edit.vue';
        $file_name = 'edit.vue';
        if($this->className){
            $file_name = str_replace('_', '-', Str::lower($this->className)) . '-edit.vue';
        }
        if(!empty($this->addonName))
        {
            return "import "."Edit from '@/".$this->addonName."/views/".$this->moduleName."/".$path.$file_name."'";
        }else{
            return "import "."Edit from '@/app/views/".$this->moduleName."/".$path.$file_name."'";
        }
    }

    /**
     * 编辑框
     * @return string
     */
    public function getEditView()
    {
        if($this->table['edit_type'] == 2) return '';
        $file_name = 'edit';
        return '<'.$file_name.' ref="edit'.$this->getUCaseClassName().'Dialog" @complete="load'.$this->getUCaseClassName().'List" />';
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
            $route = '';
            if (!empty($this->table['parent_menu'])) {
                $route = '/' .  (new CoreMenuService())->getRoutePathByMenuKey($this->table['parent_menu']);
            }
            //打开新页面
            $content = "router.push('".$route."/".$this->moduleName."/". Str::lower($this->className) ."_edit')";
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
            $route = '';
            if (!empty($this->table['parent_menu'])) {
                $route = '/' . (new CoreMenuService())->getRoutePathByMenuKey($this->table['parent_menu']);
            }
            $content = "router.push('".$route."/".$this->moduleName."/". Str::lower($this->className) ."_edit?id='+data.".$this->getPk().")";
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
            if(empty($column['dict_type']))
            {
                $new = [
                    $column['column_comment'],
                    $column['column_name'],
                    $column['dict_type'],
                    $this->getLCaseClassName(),
                    Str::camel($column['column_name']),
                ];
            }else{
                $new = [
                    $column['column_comment'],
                    $column['column_name'],
                    $column['column_name'].'List',
                    $this->getLCaseClassName(),
                    Str::camel($column['column_name']),
                ];
            }


            $searchVmType = $column['view_type'];
            if ($column['view_type'] == 'radio') {
                $searchVmType = 'select';
            }
            if(empty($column['dict_type']))
            {
                if ($column['view_type'] == 'radio' || $column['view_type'] == 'select' || $column['view_type'] == 'checkbox' ) {
                    $searchVmType = 'select2';
                }
            }else{
                if ($column['view_type'] == 'radio') {
                    $searchVmType = 'select';
                }
            }
            if ($column['query_type'] == 'BETWEEN') {
                $searchVmType = $column['view_type'] == 'datetime' ? 'datetime' :  'rangeInput';
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

        return $this->setBlankSpace($content, '                    ');
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

            if ($column['query_type'] == 'BETWEEN') {
                $content .= '"'.$column['column_name'].'":[],' . PHP_EOL;
            } else {
                $content .= '"'.$column['column_name'].'":"",' . PHP_EOL;
            }
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
                '{LANG}',
                '{DICT_TYPE}'
            ];
            $new = [
                $column['column_comment'],
                $column['column_name'],
                Str::camel($column['column_name']),
                $column['column_name'].'List'
            ];

            $vmPath = $this->getvmPath('table/default');
            if ($column['view_type'] == 'imageSelect') {
                $vmPath = $this->getvmPath('table/image');
            }

            if ($column['column_type'] == 'int' && $column['view_type'] == 'datetime') {
                $vmPath = $this->getvmPath('table/datetime');
            }

            if ($column['dict_type']) {
                $vmPath = $this->getvmPath('table/dictcolumn');
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
            if (!$column['is_pk']) {
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
     * @return string
     */
    public function getModuleOutDir()
    {
        if(!empty($this->addonName))
        {
            $dir = dirname(app()->getRootPath()) . '/admin/src/'. $this->addonName  .'/views/';
        }else{
            $dir = dirname(app()->getRootPath()) . '/admin/src/app/views/';
        }
        $this->checkDir($dir);

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
            $dir = $this->outDir . 'addon/'.$this->addonName.'/admin/views/' . $this->moduleName . '/';

        }else{
            $dir = $this->outDir . 'admin/src/app/views/' . $this->moduleName . '/';
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
            $dir = $this->rootDir . '/admin/src/'.$this->addonName.'/views/'. $this->moduleName . '/';
        }else{
            $dir = $this->rootDir . '/admin/src/app/views/' . $this->moduleName . '/';
        }

        $this->checkDir($dir);
        return $dir;
    }

    /**
     * 获取文件生成到插件中
     * @return void
     */
    public function getAddonObjectOutDir() {
        $dir = $this->rootDir . '/niucloud/addon/'.$this->addonName.'/admin/views/'. $this->moduleName . '/';
        $this->checkDir($dir);
        return $dir;
    }

    public function getFilePath()
    {
        if(!empty($this->addonName))
        {
            $dir = 'addon/'.$this->addonName.'/admin/'.$this->addonName.'/views/' . $this->moduleName . '/';

        }else{
            $dir = 'admin/app/views/' . $this->moduleName . '/';
        }
        return $dir;
    }
    /**
     * 生成的文件名
     * @return string
     */
    public function getFileName()
    {
        if($this->className) return Str::lower($this->className).'.vue';
        return 'list.vue';
    }

    /**
     * 生成的API路径
     * @return string
     */
    public function getApiPath()
    {
        if(!empty($this->addonName))
        {
            return '/'.$this->addonName.'/api/'.$this->moduleName;
        }else{
            return '/app/api/'.$this->moduleName;
        }
    }

    public function getDictDataContent()
    {
        $content = '';
        $isExist = [];
        foreach ($this->tableColumn as $column) {
            if (empty($column['dict_type']) || $column['is_pk']) {
                continue;
            }
            if (in_array($column['dict_type'], $isExist)) {
                continue;
            }
            $content .= $column['dict_type'] . ': ' . "[]," . PHP_EOL;
            $isExist[] = $column['dict_type'];
        }
        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * 调用字典方法
     * @return void
     */
    public function getDictList()
    {
        $content = '';
        foreach ($this->tableColumn as $column)
        {
            if(empty($column['dict_type']))
            {
                continue;
            }
            $content.= 'const '.$column['column_name'].'List = ref([])'.PHP_EOL.'const '.$column['column_name'].'DictList = async () => {'.PHP_EOL.$column['column_name'].'List.value = await (await useDictionary(' ."'".$column['dict_type']."'".')).data.dictionary'.PHP_EOL.'}'.PHP_EOL. $column['column_name'].'DictList();'.PHP_EOL;
        }

        if(!empty($content))
        {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }
}
