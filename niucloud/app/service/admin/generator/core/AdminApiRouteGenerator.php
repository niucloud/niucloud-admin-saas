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
use think\facade\Cache;
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
     * @return void
     */
    public function replaceText()
    {
        $old = [
            '{ROUTE_GROUP_NAME}',
            '{CLASS_COMMENT}',
            '{UCASE_CLASS_NAME}',
            '{NOTES}',
            '{PK}',
            '{MODULE_NAME}',
            '{ROUTE_NAME}',
            '{ROUTE_PATH}',
            '{WITH_ROUTE}',
            '{ROUTE}',
            '{BEGIN}',
            '{END}',

        ];

        $new = [
            $this->getRouteGroupName(),
            $this->getClassComment(),
            $this->getUCaseClassName(),
            $this->getNotes(),
            $this->getPk(),
            $this->moduleName,
            $this->getRouteName(),
            $this->getRoutePath(),
            $this->getWithRoute(),
            $this->getRoute(),
            $this->getBegin(),
            $this->getEnd(),
        ];

        $vmPath = $this->getvmPath('admin_api_route');

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

    public function getRoute()
    {
        $dir = dirname(root_path());
        if(!empty($this->addonName))
        {
            $file = $dir.DIRECTORY_SEPARATOR.'niucloud'.DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.$this->addonName.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'adminapi'.DIRECTORY_SEPARATOR.'route'.DIRECTORY_SEPARATOR.'route.php';
        }else{
            $file = $dir.DIRECTORY_SEPARATOR.'niucloud'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'adminapi'.DIRECTORY_SEPARATOR.'route'.DIRECTORY_SEPARATOR."$this->moduleName".'php';
        }

        if(file_exists($file))
        {
            $content = file_get_contents($file);
            $code_begin = 'USER_CODE_BEGIN -- '.$this->getTableName() . PHP_EOL;
            $code_end = 'USER_CODE_END -- '.$this->getTableName() . PHP_EOL;
            if(strpos($content,$code_begin) !== false && strpos($content,$code_end) !== false)
            {
                // 清除相应对应代码块
                $pattern = "/\/\/\s+{$code_begin}[\S\s]+{$code_end}?/";
                $route = preg_replace($pattern, '', $content);
            }else{
                $route = $content;
            }
        }else{
            $route = "<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

use think\\facade\\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;";
        }
        return $route;
    }

    public function getBegin()
    {
        $begin = '// USER_CODE_BEGIN -- '.$this->getTableName();
        return $begin;
    }

    public function getEnd()
    {
        $end = '// USER_CODE_END -- '.$this->getTableName();
        return $end;
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
        if(!empty($this->addonName))
        {
            $tpl = $this->addonName . '路由';
        }else{
            if (!empty($this->table['table_content'])) {
                $tpl = $this->table['table_content'] . '路由';
            } else {
                $tpl = $this->getUCaseName() . '路由';
            }
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
        $dir = $this->basePath . DIRECTORY_SEPARATOR.'route'.DIRECTORY_SEPARATOR;
        $this->checkDir($dir);
        return $dir;
    }


    /**
     * 获取文件生成到runtime的文件夹路径（download）
     * @return string
     */
    public function getRuntimeOutDir()
    {
        if(!empty($this->addonName))
        {
            $dir = $this->outDir . DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.'.$this->addonName.'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'adminapi'.DIRECTORY_SEPARATOR.'route'.DIRECTORY_SEPARATOR;
        }else{
            $dir = $this->outDir . 'niucloud'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'adminapi'.DIRECTORY_SEPARATOR.'route'.DIRECTORY_SEPARATOR;
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
            $dir = $this->rootDir . DIRECTORY_SEPARATOR.'niucloud'.DIRECTORY_SEPARATOR.'addon'.DIRECTORY_SEPARATOR.$this->addonName.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'adminapi'.DIRECTORY_SEPARATOR.'route'.DIRECTORY_SEPARATOR;
        }else{
            $dir = $this->rootDir . DIRECTORY_SEPARATOR.'niucloud'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'adminapi'.DIRECTORY_SEPARATOR.'route'.DIRECTORY_SEPARATOR;
        }
        $this->checkDir($dir);
        return $dir;
    }


    public function getFilePath()
    {
        if(!empty($this->addonName))
        {
            $dir = 'addon/'.$this->addonName.'/app/adminapi/route/';
        }else{
            $dir = 'niucloud/app/adminapi/route/';
        }
        return $dir;
    }

    /**
     * 生成文件名
     * @return string
     */
    public function getFileName()
    {
        if(!empty($this->addonName))
        {
            return 'route.php';
        }else{
            return Str::lower($this->moduleName) . '.php';
//            //如果是某个模块下的功能，公用一个路由
//            if($this->moduleName && ($this->getLCaseTableName() != $this->moduleName)){
//                return Str::lower($this->moduleName) . '.php';
//            }else{
//                return 'route.php';
//            }
        }

    }

    /**
     * 获取路由分组
     * @return string
     */
    public function getRouteGroupName()
    {
        if(!empty($this->addonName))
        {
            return $this->addonName;
        }else{
            return $this->moduleName;
        }
    }

    /**
     * 获取路由地址
     * @return string
     */
    public function getRoutePath()
    {
        if(!empty($this->addonName))
        {
             return 'addon\\'.$this->addonName.'\\app\adminapi\\controller\\'.$this->moduleName.'\\'.$this->getUCaseClassName().'@';
        }else{
            return $this->moduleName.'.'.$this->getUCaseClassName().'/';
        }
    }

    /**
     * 远程下拉Route
     * @return string
     */
    public function getWithRoute()
    {
        if(!empty($this->addonName))
        {
            $route_path = 'addon\\'.$this->addonName.'\\app\adminapi\\controller\\'.$this->moduleName.'\\'.$this->getUCaseClassName().'@';
        }else{
            $route_path = $this->moduleName.'.'.$this->getUCaseClassName().'/';
        }

        $content = '';
        foreach ($this->tableColumn as $column) {
            if (!empty($column['model'])) {
                $str = strripos($column['model'],'\\');
                $with = Str::camel(substr($column['model'],$str+1));
                $content.= PHP_EOL.'    Route::get('."'".$with."'".','."'".$route_path.'get'.Str::studly($with).'All'."'".');'.PHP_EOL;
            }
        }
        return $content;
    }


    /**
     * use
     * @return string
     */

}
