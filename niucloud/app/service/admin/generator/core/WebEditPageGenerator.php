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
        ];

        $new = [
            $this->getFormView(),
            $this->getUCaseName(),
            $this->getFormData(),
            $this->getFormValidate(),
            $this->getPk(),
            $this->getTableName(),
            $this->getUCaseClassName(),
            $this->getLCaseClassName(),
            $this->moduleName,
        ];
        $vmPath = $this->getvmPath('web_edit_page');

        // 替换内容

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
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
            if (!$column['is_insert'] || !$column['is_update'] || $column['is_pk']) {
                continue;
            }
            $old = [
                '{COLUMN_COMMENT}',
                '{COLUMN_NAME}',
                '{LCASE_COLUMN_NAME}',
                '{PROP}',
            ];
            $new = [
                $column['column_comment'],
                $column['column_name'],
                Str::camel($column['column_name']),
                $column['is_required'] ? 'prop="'.$column['column_name'].'"' : ''
            ];

            $vmPath = $this->getvmPath('form/' . $column['view_type']);
            if (!file_exists($vmPath)) {
                continue;
            }

            // 单选框值处理
            if ($column['view_type'] == 'radio' || $column['view_type'] == 'select') {
                $vmItemValue = 'item.value';
                $intFieldValue = ['tinyint', 'smallint', 'mediumint', 'int', 'integer', 'bigint'];
                if (in_array($column['column_type'], $intFieldValue)) {
                    $vmItemValue = 'parseInt(item.value)';
                }
                $old[] = '{ITEM_VALUE}';
                $new[] = $vmItemValue;
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
            if ((!$column['is_insert'] || !$column['is_update']) && !$column['is_pk']) {
                continue;
            }
            if (in_array($column['column_name'], $isExist)) {
                continue;
            }

            if ($column['column_type'] == 'int') {
                $content .= $column['column_name'] . ': ' . "0," . PHP_EOL;
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
     * @return string
     */
    public function getFormValidate()
    {
        $content = '';
        $isExist = [];
        $specDictType = ['input', 'textarea', 'editor'];

        foreach ($this->tableColumn as $column) {
            if (!$column['is_required'] || $column['is_pk']) {
                continue;
            }
            if (!$column['is_insert'] || !$column['is_update'] ) {
                continue;
            }
            if (in_array($column['column_name'], $isExist)) {
                continue;
            }

            $validateMsg = Str::camel($column['column_name']).'Placeholder';

            $old = [
                '{COLUMN_NAME}',
                '{VALIDATE_MSG}',
            ];
            $new = [
                $column['column_name'],
                $validateMsg,
            ];
            $vmPath = $this->getvmPath('other/formValidate');
            if (!file_exists($vmPath)) {
                continue;
            }

            $content .= $this->replaceFileText($old, $new, $vmPath) . ',' . PHP_EOL;

            $isExist[] = $column['column_name'];
        }
        return substr($content, 0, -2);
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
        if($this->table['edit_type'] != 2) {
            return '';
        }
        $dir = $this->outDir . 'admin/src/views/' . $this->moduleName . '/';

        $this->checkDir($dir);

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

}