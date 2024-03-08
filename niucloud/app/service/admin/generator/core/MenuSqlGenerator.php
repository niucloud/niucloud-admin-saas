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
            $file = $dir.DIRECTORY_SEPARATOR.'niucloud'.DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.$this->addonName.DIRECTORY_SEPARATOR.'sql'.DIRECTORY_SEPARATOR.'install.sql';
            $res = $this->getMenuSql();
            $addSql = $res['sql'];

//            $sql = PHP_EOL . $this->getBegin() . PHP_EOL;
//            $sql .= $addSql . PHP_EOL;
//            $sql .= $this->getEnd() . PHP_EOL;
//
//            if (file_exists($file)) {
//                $content = file_get_contents($file);
//                $code_begin = '-- USER_CODE_BEGIN -- '.$this->getTableName() . PHP_EOL;
//                $code_end = '-- USER_CODE_END -- '.$this->getTableName() . PHP_EOL;
//                if(strpos($content,$code_begin) !== false && strpos($content,$code_end) !== false)
//                {
//                    $pattern = "/\s+{$code_begin}[\S\s]+{$code_end}?/";
//                    $replace_sql = preg_replace($pattern, $sql, $content);
//                    file_put_contents($file, $replace_sql);
//                    return;
//                }
//            }
//            file_put_contents($file, $sql, FILE_APPEND);
        }
    }

    public function getBegin()
    {
        $begin = '-- USER_CODE_BEGIN -- '.$this->getTableName();
        return $begin;
    }

    public function getEnd()
    {
        $end = '-- USER_CODE_END -- '.$this->getTableName();
        return $end;
    }

    /**
     * 获取文件生成到模块的文件夹路径
     * @return string
     */
    public function getModuleOutDir()
    {
        $dir = $this->basePath .DIRECTORY_SEPARATOR.'adminapi'.DIRECTORY_SEPARATOR.'controller'.DIRECTORY_SEPARATOR;
        if (!empty($this->moduleName)) {
            $dir .= $this->moduleName . DIRECTORY_SEPARATOR;
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
            $dir = $this->outDir . DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.$this->addonName.DIRECTORY_SEPARATOR.'sql'.DIRECTORY_SEPARATOR;
        }else{
            $dir = $this->outDir . DIRECTORY_SEPARATOR.'niucloud'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'sql'.DIRECTORY_SEPARATOR;
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
            $dir = $this->rootDir . DIRECTORY_SEPARATOR.'niucloud'.DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.$this->addonName.DIRECTORY_SEPARATOR.'sql'.DIRECTORY_SEPARATOR;
            $this->checkDir($dir);
            return $dir;
        }else{
            return '';
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
        return '';
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
            $key = $this->addonName.'_'.$this->moduleName.'_'.$name;
        }else{
            $key = $this->moduleName.'_'.$name;
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
                'router_path' => $this->moduleName.'/'.($this->className ? Str::lower($this->className) : 'list'),
                'view_path' => $this->moduleName.'/'.($this->className ? Str::lower($this->className) : 'list'),
                'methods' => 'get',
                'sort' => 90,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'添加',
                'menu_key' => $key.'_add',
                'parent_key' => $key,
                'menu_type' => $this->table['edit_type'] == 1 ? 2 : 1,
                'icon' => '',
                'api_url' => $this->getRouteName(),
                'router_path' => $this->table['edit_type'] == 2 ? $this->moduleName.'/'.($this->className ? Str::lower($this->className) . '_edit' : 'edit') : '',
                'view_path' => $this->table['edit_type'] == 2 ? $this->moduleName.'/'.($this->className ? Str::lower($this->className) . '_edit' : 'edit') : '',
                'methods' => 'post',
                'sort' => 70,
                'status' => 1,
                'is_show' => 0,
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
                'menu_type' => $this->table['edit_type'] == 1 ? 2 : 1,
                'icon' => '',
                'api_url' => $this->getRouteName().'/<id>',
                'router_path' => $this->table['edit_type'] == 2 ? $this->moduleName.'/'.($this->className ? Str::lower($this->className) . '_edit' : 'edit') : '',
                'view_path' => $this->table['edit_type'] == 2 ? $this->moduleName.'/'.($this->className ? Str::lower($this->className) . '_edit' : 'edit') : '',
                'methods' => 'put',
                'sort' => 60,
                'status' => 1,
                'is_show' => 0,
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
                'api_url' => $this->getRouteName().'/<id>',
                'router_path' => '',
                'view_path' => '',
                'methods' => 'delete',
                'sort' => 50,
                'status' => 1,
                'is_show' => 0,
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
            'sql' => $sql . ';'
        ];
        return $res;
    }

    /**
     * 路由名称
     * @return string
     */
    public function getRouteName()
    {
        $group_name = !empty($this->addonName) ? $this->addonName : $this->moduleName;

        if($this->moduleName && ($this->getLCaseTableName() != $this->moduleName) && $this->className){
            $route_name = Str::lower($this->className);
        }else{
            $route_name = $this->getLCaseTableName();
        }
        return $group_name .'/' . $route_name;
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
                'router_path' => $this->moduleName.'/'.($this->className ? Str::lower($this->className) : 'list'),
                'view_path' => $this->moduleName.'/'.($this->className ? Str::lower($this->className) : 'list'),
                'methods' => 'get',
                'sort' => 90,
                'status' => 1,
                'is_show' => 1,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
            [
                'app_type' => 'site',
                'menu_name' => $table_content.'添加',
                'menu_key' => $key.'_add',
                'parent_key' => $key,
                'menu_type' => $this->table['edit_type'] == 1 ? 2 : 1,
                'icon' => '',
                'api_url' => $this->getRouteName(),
                'router_path' => $this->table['edit_type'] == 2 ? $this->moduleName.'/'.($this->className ? Str::lower($this->className) . '_edit' : 'edit') : '',
                'view_path' => $this->table['edit_type'] == 2 ? $this->moduleName.'/'.($this->className ? Str::lower($this->className) . '_edit' : 'edit') : '',
                'methods' => 'post',
                'sort' => 70,
                'status' => 1,
                'is_show' => 0,
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
                'menu_type' => $this->table['edit_type'] == 1 ? 2 : 1,
                'icon' => '',
                'api_url' => $this->getRouteName().'/<id>',
                'router_path' => $this->table['edit_type'] == 2 ? $this->moduleName.'/'.($this->className ? Str::lower($this->className) . '_edit' : 'edit') : '',
                'view_path' => $this->table['edit_type'] == 2 ? $this->moduleName.'/'.($this->className ? Str::lower($this->className) . '_edit' : 'edit') : '',
                'methods' => 'put',
                'sort' => 60,
                'status' => 1,
                'is_show' => 0,
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
                'api_url' => $this->getRouteName().'/<id>',
                'router_path' => '',
                'view_path' => '',
                'methods' => 'delete',
                'sort' => 50,
                'status' => 1,
                'is_show' => 0,
                'create_time' => time(),
                'delete_time' => 0,
                'addon' => $this->addonName,
                'source' => MenuDict::GENERATOR
            ],
        ];
        $menu_model = new SysMenu();

        (new SysMenu())->where([['app_type', '=', 'site'],['menu_key','in', array_column($data, 'menu_key') ]])->select()->delete();

        (new $menu_model())->saveAll($data);
        $cache_tag_name = 'menu_cache';
        Cache::tag($cache_tag_name)->clear();

        return true;
    }
}
