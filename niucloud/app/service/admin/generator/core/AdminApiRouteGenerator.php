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

namespace app\service\admin\generator\core;

use think\helper\Str;

/**
 * adminapi路由生成器
 * Class AdminApiRouteGenerator
 * @package app\service\admin\generator\core
 */
class AdminApiRouteGenerator extends BaseGenerator
{
    /**
     * 替换模板中的变量
     * @return mixed|void
     */
    public function replaceText()
    {
        $old = [
            '{CLASS_COMMENT}',
            '{UCASE_CLASS_NAME}',
            '{NOTES}',
            '{PK}',
            '{MODULE_NAME}',
            '{ROUTE_NAME}',
        ];

        $new = [
            $this->getClassComment(),
            $this->getUCaseClassName(),
            $this->table['table_content'],
            $this->getPk(),
            $this->moduleName,
            $this->getRouteName(),
        ];

        $vmPath = $this->getvmPath('admin_api_route');

        $text = $this->replaceFileText($old, $new, $vmPath);

        $this->setText($text);
    }

    /**
     * 获取表主键
     * @return mixed|string
     */
    public function getPk()
    {
        $pk = 'id';
        if (empty($this->tableColumn)) {
            return $pk;
        }

        foreach ($this->tableColumn as $item) {
            if ($item['is_pk']) {
                $pk = $item['column_name'];
            }
        }
        return $pk;
    }


    /**
     * 获取类注释
     * @return string
     */
    public function getClassComment()
    {
        if (!empty($this->table['table_content'])) {
            $tpl = $this->table['table_content'] . '控制器';
        } else {
            $tpl = $this->getUCaseName() . '控制器';
        }
        return $tpl;
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
        $dir = $this->basePath . '/route/';
        $this->checkDir($dir);
        return $dir;
    }


    /**
     * 获取文件生成到runtime的文件夹路径
     * @return string
     */
    public function getRuntimeOutDir()
    {
        $dir = $this->outDir . 'niucloud/app/adminapi/route/';
        $this->checkDir($dir);
        return $dir;
    }

    /**
     * 生成文件名
     * @return string
     */
    public function getFileName()
    {
        //如果是某个模块下的功能，公用一个路由
        if($this->moduleName && ($this->getLCaseTableName() != $this->moduleName)){
            return Str::lower($this->moduleName) . '.php';
        }else{
            return $this->getLCaseTableName() . '.php';
        }
    }
}