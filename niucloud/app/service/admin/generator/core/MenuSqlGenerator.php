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

namespace app\service\admin\generator\core;

use app\dict\sys\MenuDict;
use app\model\sys\SysMenu;
use think\facade\Db;
use think\facade\Cache;
use think\helper\Str;

/**
 * 菜单SQL生成器
 * Class ControllerGenerator
 * @package app\service\admin\generator\core
 */
class MenuSqlGenerator extends BaseGenerator
{
    /**
     * 替换模板中的变量
     * @return void
     */
    public function replaceText()
    {
        $old = [
            '{SQL}',
        ];
        $res = $this->getMenuSql();
        $new = [$res['sql'],];

        if($this->table['generate_type'] == 3)
        {
            $this->addMenuList();
            $this->addInstallSql();
        }

        $vmPath = $this->getvmPath('menu_sql');

        $text = $this->replaceFileText($old, $new, $vmPath);
        $this->setText($text);
    }

    /**
     * 增加SQL语句
     */
    public function addInstallSql()
    {
        if(!empty($this->addonName))
        {
            $dir = dirname(root_path());
            $file = $dir.'\niucloud\addon\\'.$this->addonName.'\\sql\\install.sql';
            $res = $this->getMenuSql();
            $key = $res['data'][0]['menu_key'];
            $result = (new SysMenu())->where([['menu_key','=',$key]])->find()->toArray();
            if(!$result){
                $addSql = $res['sql'];
                file_put_contents($file,$addSql,FILE_APPEND);
            }

        }
    }
    /**
     * 获取文件生成到模块的文件夹路径
     * @return string
     */
    public function getModuleOutDir()
    {
        $dir = $this->basePath .'/adminapi/controller/';
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
            $dir = $this->outDir . '/addon/'.$this->addonName.'/sql/';
        }else{
            $dir = $this->outDir . '/niucloud/app/sql/';
        }
        $this->checkDir($dir);
        if (!empty($this->moduleName)) {
//            $dir .= $this->moduleName . '/';
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
            $dir = $this->rootDir . '/niucloud/addon/'.$this->addonName.'/sql/';
            $this->checkDir($dir);
            return $dir;
        }
    }


    public function getFilePath()
    {
        if(!empty($this->addonName))
        {
            $dir = 'addon/'.$this->addonName.'/sql/';
        }else{
            $dir = 'niucloud/app/sql/';
        }
        return $dir;
    }

    /**
     * 生成文件名
     * @return string
     */
    public function getFileName()
    {
        return 'menu.sql';
    }

    public function getMenuSql()
    {
        if (!empty($this->table['table_content'])) {
            $end_str = substr($this->table['table_content'],-3);
            if($end_str == '表')
            {
                $table_content = substr($this->table['table_content'],0,strlen($this->table['table_content'])-3);
            }else{
                $table_content = $this->table['table_content'];
            }

        } else {
            $table_content = '';
        }

        if(!empty($this->className))
        {
            $name = $this->className;
        }else{
            $name = $this->table['table_name'];
        }
        if(!empty($this->addonName))
        {
            $key = $this->addonName.'_'.$this->table['table_name'].'_'.$this->moduleName.'_'.$name;
        }else{
            $key = $this->table['table_name'].'_'.$this->moduleName.'_'.$name;
        }
        $data = [
            [
                'app_type' => 'site',
                'menu_name' => $table_content,
                'menu_key' => $key,
                'parent_key' => $this->table['parent_menu'],
                'menu_type' => 0,
                'icon' => '',
                'api_url' => '',
                'router_path' => $this->moduleName,
                'view_path' => '',
                'methods' => '',
                'sort' => 100,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'列表',
                'menu_key' => $key.'_list',
                'parent_key' => $key,
                'menu_type' => 1,
                'icon' => '',
                'api_url' => $this->getRouteName(),
                'router_path' => 'list',
                'view_path' => $this->moduleName.'/'.'list',
                'methods' => 'get',
                'sort' => 90,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
//            [
//                'menu_name' => $table_content.'详情',
//                'menu_key' => $key.'_info',
//                'parent_key' => $key,
//                'menu_type' => 1,
//                'icon' => '',
//                'api_url' => $this->getRouteName().'/<'.'id>',
//                'router_path' => $this->moduleName,
//                'view_path' => $this->moduleName.'/'.$this->className.'_list',
//                'methods' => 'get',
//                'sort' => 80,
//                'status' => 1,
//                'is_show' => 1,
//                'create_time' => time(),
//                'delete_time' => 0,
//                'addon' => $this->addonName,
//                'source' => MenuDict::GENERATOR
//            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'添加',
                'menu_key' => $key.'_add',
                'parent_key' => $key,
                'menu_type' => 2,
                'icon' => '',
                'api_url' => $this->getRouteName(),
                'router_path' => 'edit',
                'view_path' => $this->moduleName.'/'.'edit',
                'methods' => 'post',
                'sort' => 70,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'编辑',
                'menu_key' => $key.'_edit',
                'parent_key' => $key,
                'menu_type' => 2,
                'icon' => '',
                'api_url' => $this->getRouteName().'/<'.'id>',
                'router_path' => 'edit',
                'view_path' => $this->moduleName.'/'.'edit',
//                'router_path' => $this->className.'_edit',
//                'view_path' => $this->moduleName.'/'.$this->className.'_edit',
                'methods' => 'put',
                'sort' => 60,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'删除',
                'menu_key' => $key.'_delete',
                'parent_key' => $key,
                'menu_type' => 2,
                'icon' => '',
                'api_url' => $this->getRouteName().'/<'.'id>',
                'router_path' => '',
                'view_path' => '',
                'methods' => 'delete',
                'sort' => 50,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
        ];

        $sql = Db::name('sys_menu')->fetchSql(true)->insertAll($data);
        $sql = str_replace(' (', PHP_EOL.'(', $sql);
        $res = [
            'data' => $data,
            'sql' => $sql
        ];
        return $res;


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
     * 增加菜单
     * @return true
     * @throws \Exception
     */
    public function addMenuList()
    {
        if (!empty($this->table['table_content'])) {
            $end_str = substr($this->table['table_content'],-3);
            if($end_str == '表')
            {
                $table_content = substr($this->table['table_content'],0,strlen($this->table['table_content'])-3);
            }else{
                $table_content = $this->table['table_content'];
            }

        } else {
            $table_content = '';
        }
        if(!empty($this->className))
        {
            $name = $this->className;
        }else{
            $name = $this->table['table_name'];
        }
        if(!empty($this->addonName))
        {
            $key = $this->addonName.'_'.$this->table['table_name'].'_'.$this->moduleName.'_'.$name;
        }else{
            $key = $this->table['table_name'].'_'.$this->moduleName.'_'.$name;
        }
        $data = [
            [
                'app_type' => 'site',
                'menu_name' => $table_content,
                'menu_key' => $key,
                'parent_key' => $this->table['parent_menu'],
                'menu_type' => 0,
                'icon' => '',
                'api_url' => '',
                'router_path' => $this->moduleName,
                'view_path' => '',
                'methods' => '',
                'sort' => 100,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'列表',
                'menu_key' => $key.'_list',
                'parent_key' => $key,
                'menu_type' => 1,
                'icon' => '',
                'api_url' => $this->getRouteName(),
                'router_path' => 'list',
                'view_path' => $this->moduleName.'/'.'list',
                'methods' => 'get',
                'sort' => 90,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
//            [
//                'menu_name' => $table_content.'详情',
//                'menu_key' => $key.'_info',
//                'parent_key' => $key,
//                'menu_type' => 1,
//                'icon' => '',
//                'api_url' => $this->getRouteName().'/<'.'id>',
//                'router_path' => $this->moduleName,
//                'view_path' => $this->moduleName.'/'.$this->className.'_list',
//                'methods' => 'get',
//                'sort' => 80,
//                'status' => 1,
//                'is_show' => 1,
//                'create_time' => time(),
//                'delete_time' => 0,
//                'addon' => $this->addonName,
//                'source' => MenuDict::GENERATOR
//            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'添加',
                'menu_key' => $key.'_add',
                'parent_key' => $key,
                'menu_type' => 2,
                'icon' => '',
                'api_url' => $this->getRouteName(),
                'router_path' => 'edit',
                'view_path' => $this->moduleName.'/'.'edit',
                'methods' => 'post',
                'sort' => 70,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'编辑',
                'menu_key' => $key.'_edit',
                'parent_key' => $key,
                'menu_type' => 2,
                'icon' => '',
                'api_url' => $this->getRouteName().'/<'.'id>',
                'router_path' => 'edit',
                'view_path' => $this->moduleName.'/'.'edit',
//                'router_path' => $this->className.'_edit',
//                'view_path' => $this->moduleName.'/'.$this->className.'_edit',
                'methods' => 'put',
                'sort' => 60,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'删除',
                'menu_key' => $key.'_delete',
                'parent_key' => $key,
                'menu_type' => 2,
                'icon' => '',
                'api_url' => $this->getRouteName().'/<'.'id>',
                'router_path' => '',
                'view_path' => '',
                'methods' => 'delete',
                'sort' => 50,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
        ];
        $menu_model = new SysMenu();

        $result = (new SysMenu())->where([['menu_key','=',$key]])->find();

        if(empty($result)){
            (new $menu_model())->saveAll($data);
            $cache_tag_name = 'menu_cache';
            Cache::tag($cache_tag_name)->clear();
        }

        return true;
    }
}
