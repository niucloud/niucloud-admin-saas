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
 * web-编辑页生成器
 * Class WebEditPageGenerator
 * @package app\service\admin\generator\core
 */
class WebEditPageGenerator extends BaseGenerator
{

    /**
     * 替换模板中的变量
     * @return false|void
     */
    public function replaceText()
    {
        if($this->table['edit_type'] != 2) {
            $this->setText('');
            return false;
        }

        $old = [
            '{FORM_VIEW}',
            '{UCASE_NAME}',
            '{FORM_DATA}',
            '{FORM_VALIDATE}',
            '{PK}',
            '{API_DIR}',
            '{UCASE_CLASS_NAME}',
            '{LCASE_CLASS_NAME}',
            '{MODULE_NAME}',
            '{API_PATH}',
            '{DICT_DATA}',
            '{DICT_LIST}',
            '{MODEL_DATA}',
            '{WITH_API_PATH}'
        ];
        $new = [
            $this->getFormView(),
            $this->getUCaseClassName(),
            $this->getFormData(),
            $this->getFormValidate(),
            $this->getPk(),
            $this->getTableName(),
            $this->getUCaseClassName(),
            $this->getLCaseClassName(),
            $this->moduleName,
            $this->getApiPath(),
            $this->getDictDataContent(),
            $this->getDictList(),
            $this->getModelData(),
            $this->getEditWithApiPath()
        ];
        $vmPath = $this->getvmPath('web_edit_page');

        // 替换内容

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }

    /**
     * 获取数据字典内容
     * @return string
     */
    public function getDictDataContent()
    {
        $content = '';
        $isExist = [];
        foreach ($this->tableColumn as $column) {
            if (empty($column['dict_type']) || $column['is_pk'] || $column['column_name'] == 'site_id') {
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
            $content.= 'let '.$column['column_name'].'List = ref([])'.PHP_EOL.'const '.$column['column_name'].'DictList = async () => {'.PHP_EOL.$column['column_name'].'List.value = await (await useDictionary(' ."'".$column['dict_type']."'".')).data.dictionary'.PHP_EOL.'}'.PHP_EOL. $column['column_name'].'DictList();'.PHP_EOL;
            if ($column['view_type'] == 'radio' || $column['view_type'] == 'select') {
                $content .= 'watch(() => '.$column['column_name'].'List.value, () => { formData.'.$column['column_name'].' = '.$column['column_name'].'List.value[0].value })'.PHP_EOL;
            }
        }

        if(!empty($content))
        {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * 表单日期处理
     * @return string
     */
    public function getFormDateContent()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (empty($column['view_type']) || $column['is_pk']) {
                continue;
            }
            if ($column['view_type'] != 'datetime' || $column['column_type'] != 'int') {
                continue;
            }
            $content .= '//@ts-ignore' . PHP_EOL;
            $content .= 'formData.' . $column['column_name'] . ' = timeFormat(formData.' . $column['column_name'] . ','."'yyyy-mm-dd hh:MM:ss'".') ' . PHP_EOL;
        }
        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * 获取表单内容
     * @return string
     */
    public function getFormView()
    {
        $content = '';

        foreach ($this->tableColumn as $column) {
            if (!$column['is_insert'] || !$column['is_update'] || $column['is_pk'] || $column['column_name'] == 'site_id') {
                continue;
            }

            $old = [
                '{COLUMN_COMMENT}',
                '{COLUMN_NAME}',
                '{LCASE_COLUMN_NAME}',
                '{PROP}',
                '{DICT_TYPE}',
                '{ITEM_LABEL}',
                '{ITEM_VALUE}'
            ];
            if(empty($column['dict_type']))
            {

                if($column['view_type'] == 'select' || $column['view_type'] == 'radio' || $column['view_type'] == 'checkbox')
                {
                    if(empty($column['model']))
                    {
                        $new = [
                            $column['column_comment'],
                            $column['column_name'],
                            Str::camel($column['column_name']),
                            $column['is_required'] ? 'prop="'.$column['column_name'].'"' : '',
                            ''
                        ];

                        $vmName = $column['view_type'].'3';
                    }else{
                        $new = [
                            $column['column_comment'],
                            $column['column_name'],
                            Str::camel($column['column_name']),
                            $column['is_required'] ? 'prop="'.$column['column_name'].'"' : '',
                            Str::camel($column['column_name']).'List',
                            $column['label_key'],
                            $column['value_key']
                        ];
                        $vmName = $column['view_type'];
                    }

                }else{
                    $new = [
                        $column['column_comment'],
                        $column['column_name'],
                        Str::camel($column['column_name']),
                        $column['is_required'] ? 'prop="'.$column['column_name'].'"' : '',
                        $column['column_name'].'List',
                    ];
                    $vmName = $column['view_type'];



                }
            }else{
                $new = [
                    $column['column_comment'],
                    $column['column_name'],
                    Str::camel($column['column_name']),
                    $column['is_required'] ? 'prop="'.$column['column_name'].'"' : '',
                    $column['column_name'].'List',
                    ''
                ];
                if(empty($column['model']))
                {
                    $vmName = $column['view_type'].'3';
                }else{
                    $vmName = $column['view_type'];
                }
            }

            $vmPath = $this->getvmPath('form/' . $vmName);
            if (!file_exists($vmPath)) {
                continue;
            }

            // 单选框值处理
            if ($column['view_type'] == 'radio' || $column['view_type'] == 'select') {
                $vmItemValue = 'item.value';
                $intFieldValue = ['tinyint', 'smallint', 'mediumint', 'int', 'integer', 'bigint'];
                if (in_array($column['column_type'], $intFieldValue)) {
                    $vmItemValue = 'item.value';
                }
                $old[] = '{ITEM_VALUE}';
                $new[] = $vmItemValue;
//                $old[] = '{ITEM_VALUE}';
//                $new[] = 'item.name';
            }
            // 数字框处理
            if ($column['view_type'] == 'number') {
                if(!empty($column['validate_type']))
                {
                    $validate = json_decode($column['validate_type'],true);
                    if($validate[0] == 'min')
                    {
                        $rule = ':min = '."'".$validate[1][0]."'";
                    }
                    if($validate[0] == 'max')
                    {
                        $rule = ':max = '."'".$validate[1][0]."'";
                    }
                    if($validate[0] == 'between')
                    {
                        $rule = ':min = "'.$validate[1][0].'"'.' :max = "'.$validate[1][1].'"';
                    }
                    $old[] = '{RULE}';
                    $new[] = $rule;
                }else{
                    $old[] = '{RULE}';
                    $new[] = '';
                }

            }
            $content .= $this->replaceFileText($old, $new, $vmPath) . PHP_EOL;

        }

        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '                ');
    }


    /**
     * 获取表单默认字段内容
     * @return string
     */
    public function getFormData()
    {
        $content = '';
        $isExist = [];

        foreach ($this->tableColumn as $column) {
            if ((!$column['is_insert'] || !$column['is_update'] || $column['column_name'] == 'site_id') && !$column['is_pk']) {
                continue;
            }
            if (in_array($column['column_name'], $isExist)) {
                continue;
            }

            if ($column['column_type'] == 'int') {
                if(empty($column['model']))
                {
                    $content .= $column['column_name'] . ': ' . "0," . PHP_EOL;
                }else{
                    $content .= $column['column_name'] . ': ' . "''," . PHP_EOL;
                }

            } else if($column['view_type'] == 'checkbox'){
                $content .= $column['column_name'] . ': ' . "''," . PHP_EOL;
            }else {
                $content .= $column['column_name'] . ': ' . "''," . PHP_EOL;
            }

            $isExist[] = $column['column_name'];
        }
        if (!empty($content)) {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');
    }


    /**
     * 表单验证内容
     *
     * @return string
     */
    public function getFormValidate()
    {
        $content = '';
        $isExist = [];
        $specDictType = ['input', 'textarea', 'editor'];

        foreach ($this->tableColumn as $column) {
            if (!$column['is_insert'] || !$column['is_update'] || $column['is_pk'] || $column['column_name'] == 'site_id') {
                continue;
            }

            if (in_array($column['column_name'], $isExist)) {
                continue;
            }

            $validateMsg = Str::camel($column['column_name']).'Placeholder';

            $old = [
                '{COLUMN_NAME}',
                '{VALIDATE_MSG}',
                '{VERIFY}'
            ];
            if(!empty($column['validate_type']))
            {
                $validate = json_decode($column['validate_type'],true);
            }else{
                $validate = [];
            }
            $new = [
                $column['column_name'],
                $validateMsg,
                $this->getVerify($validate)
            ];
            $vmPath = $this->getvmPath('other/formValidate');
            if (!file_exists($vmPath)) {
                continue;
            }

            $content.= $this->replaceFileText($old, $new, $vmPath) . ',' . PHP_EOL;
            $isExist[] = $column['column_name'];
        }
        return substr($content, 0, -2);
    }

    /**
     * 输入信息验证
     * @param $validateType
     * @return string
     */
    public function getVerify($validateType)
    {
        if(!empty($validateType))
        {
            if(!empty($validateType[1]))
            {
                if($validateType[0] == 'min')
                {
                    $min = '0,'.$validateType[1][0];
                    $content = '{ validator: (rule: any, value: string, callback: any) => { '.
                        ' if (value && !/^\d{0,'.$min.'}$/.test(value)) {'.
                        "callback(new Error(t('".'generateMin'."')))".'} else { callback() }}},';
                }
                if($validateType[0] == 'max')
                {
                    $max = '0,'.$validateType[1][0];
                    $content = '{ validator: (rule: any, value: string, callback: any) => { '.
                        ' if (value && !/^\d{0,'.$max.'}$/.test(value)) {'.
                        " callback(new Error(t('".'generateMax'."')))".' } else { callback() }}},';
                }
                if($validateType[0] == 'between')
                {
                    $between = $validateType[1][0].','.$validateType[1][1];
                    $content = '{ validator: (rule: any, value: string, callback: any) => { '.
                        ' if (value && !/^\d{'.$between.'}$/.test(value)) {'. " callback(new Error(t('".'generateBetween'."')))".'} else { callback() }}},';
                }
            }else{
                $content = '';
            }
        }else{
            $content = '';
        }

        return $content;
    }

    /**
     * 获取文件生成到模块的文件夹路径
     * @return string
     */
    public function getModuleOutDir()
    {
        if($this->table['edit_type'] != 2) {
            return '';
        }
        if(!empty($this->addonName))
        {
            $dir = dirname(app()->getRootPath()) . DIRECTORY_SEPARATOR.'admin'.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR. $this->moduleName .DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR . $this->moduleName . DIRECTORY_SEPARATOR;
        } else {
            $dir = dirname(app()->getRootPath()) . DIRECTORY_SEPARATOR.'admin'.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR . $this->moduleName . DIRECTORY_SEPARATOR;
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
        if($this->table['edit_type'] != 2) {
            return '';
        }
        if(!empty($this->addonName))
        {
            $dir = $this->outDir . DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.$this->addonName.DIRECTORY_SEPARATOR.'admin'.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR . $this->moduleName . DIRECTORY_SEPARATOR;
        }else{
            $dir = $this->outDir . 'admin'.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR . $this->moduleName . DIRECTORY_SEPARATOR;
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
        if($this->table['edit_type'] != 2) {
            return '';
        }

        if(!empty($this->addonName))
        {
            $dir = $this->rootDir . DIRECTORY_SEPARATOR.'admin'.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.$this->addonName.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR. $this->moduleName . DIRECTORY_SEPARATOR;
        }else{
            $dir = $this->rootDir . DIRECTORY_SEPARATOR.'admin'.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR. $this->moduleName . DIRECTORY_SEPARATOR;
        }

        $this->checkDir($dir);
        return $dir;
    }

    /**
     * 获取文件生成到插件中
     */
    public function getAddonObjectOutDir() {
        $dir = $this->rootDir . DIRECTORY_SEPARATOR.'niucloud'.DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.$this->addonName.DIRECTORY_SEPARATOR.'admin'.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR. $this->moduleName . DIRECTORY_SEPARATOR;
        $this->checkDir($dir);
        return $dir;
    }

    public function getFilePath()
    {
        if($this->table['edit_type'] != 2) {
            return '';
        }

        if(!empty($this->addonName))
        {
            $dir = 'addon/'.$this->addonName.'/admin/views/' . $this->moduleName . '/';
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
        if($this->table['edit_type'] != 2) {
            return '';
        }
        if($this->className){
            return Str::lower($this->className).'_edit.vue';
        }
        return 'edit.vue';
    }

    /**
     * 生成的API路径
     * @return string
     */
    public function getApiPath()
    {

        if(!empty($this->addonName))
        {
            return 'addon/'.$this->addonName.'/api/'.$this->moduleName;
        }else{
            return 'app/api/'.$this->moduleName;
        }

    }

    /**
     * 调用远程下拉方法
     * @return void
     */
    public function getModelData()
    {
        $content = '';
        foreach ($this->tableColumn as $column)
        {
            if(empty($column['model']))
            {
                continue;
            }
            $str = strripos($column['model'],'\\');
            $with = Str::camel(substr($column['model'],$str+1));
            $content.= PHP_EOL.'const '. Str::camel($column['column_name']).'List = ref([] as any[])'.PHP_EOL;
            $content.= 'const set'.Str::studly($column['column_name']).'List = async () => {'.PHP_EOL.Str::camel($column['column_name']).'List.value = await (await getWith'.Str::studly($with).'List({})).data' .PHP_EOL.'}'
                .PHP_EOL.'set'.Str::studly($column['column_name']).'List())';
        }

        if(!empty($content))
        {
            $content = substr($content, 0, -1);
        }
        return $this->setBlankSpace($content, '    ');

    }

    /**
     * 编辑远程下拉方法
     * @return void
     */
    public function getEditWithApiPath()
    {
        $content = '';
        foreach ($this->tableColumn as $column) {
            if (!empty($column['model'])) {
                $str = strripos($column['model'],'\\');
                $with = Str::camel(substr($column['model'],$str+1));
                $content.= ' getWith'.Str::studly($with).'List,';
            }
        }
        return $content;
    }
}
