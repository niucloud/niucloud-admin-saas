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
 * 验证器生成器
 * Class ValidateGenerator
 * @package app\service\admin\generator\core
 */
class ValidateGenerator extends BaseGenerator
{

    /**
     * 替换模板中的变量
     * @return mixed|void
     */
    public function replaceText()
    {

        $old = [
            '{NAMESPACE}',
            '{CLASS_COMMENT}',
            '{UCASE_NAME}',
            '{PACKAGE_NAME}',
            '{RULE}',
            '{MESSAGE}',
            '{SCENE}',
        ];

        $new = [
            $this->getNameSpace(),
            $this->getClassComment(),
            $this->getUCaseName(),
            $this->getPackageName(),
            $this->getRule(),
            $this->getMessage(),
            $this->getScene(),
        ];

        $vmPath = $this->getvmPath('validate');

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }


    /**
     * 验证规则
     * @return mixed|string
     */
    public function getRule()
    {
        $content = "";
        foreach ($this->tableColumn as $column) {
            if (!$column['is_pk']) {
                $content .= "'" . $column['column_name'] . "' => 'require'," . PHP_EOL;
            }
        }
        $content = substr($content, 0, -2);
        $content = $this->setBlankSpace($content, "            ");
        return '['.PHP_EOL.$content.PHP_EOL.'        ]';
    }

    /**
     * 验证提示
     * @return mixed|string
     */
    public function getMessage()
    {
        return '[]';
    }

    /**
     * 验证字段
     * @return mixed|string
     */
    public function getScene()
    {
        $content = "";
        $add_arr = [];
        $update_arr = [];
        foreach ($this->tableColumn as $column) {
            if ($column['is_insert'] == 1 && !$column['is_pk']) $add_arr[] = "'".$column['column_name']."'";
            if ($column['is_update'] == 1 && !$column['is_pk']) $update_arr[] = "'".$column['column_name']."'";
        }

        $content .= '"add" => ['.implode(',', $add_arr).'],'.PHP_EOL;
        $content .= '"update" => ['.implode(',', $update_arr).']';
        $content = $this->setBlankSpace($content, "            ");
        return '['.PHP_EOL.$content.PHP_EOL.'        ]';
    }


    /**
     * 获取命名空间模板内容
     * @return string
     */
    public function getNameSpace()
    {
        if (!empty($this->moduleName)) {
            return "namespace app\\validate\\" . $this->moduleName . ';';
        }
        return "namespace app\\validate;";
    }


    /**
     * 获取类描述
     * @return string
     */
    public function getClassComment()
    {
        if (!empty($this->table['table_content'])) {
            $tpl = $this->table['table_content'] . '验证器';
        } else {
            $tpl = $this->getUCaseName() . '验证器';
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
        $dir = $this->basePath  . '/validate/';
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
        $dir = $this->outDir . 'php/app/validate/';
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
        return $this->getUCaseName() . '.php';
    }


}