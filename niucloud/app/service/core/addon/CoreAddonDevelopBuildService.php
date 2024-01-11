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

namespace app\service\core\addon;

use app\dict\sys\MenuDict;
use app\model\addon\Addon;
use app\model\addon\AddonDevelop;
use app\model\sys\SysMenu;
use app\service\admin\sys\MenuService;
use core\base\BaseCoreService;
use core\exception\AddonException;
use think\helper\Arr;

/**
 * 插件开发服务层
 */
class CoreAddonDevelopBuildService extends BaseCoreService
{
    protected $root_path;

    protected $addon_path;

    protected $addon;
    protected $build_path;

    public function __construct()
    {
        parent::__construct();
        $this->root_path = project_path();
    }

    /**
     * 插件打包
     * @param string $addon
     * @return void
     */
    public function build(string $addon)
    {
        $this->addon = $addon;
        $this->addon_path = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
        $this->build_path = runtime_path() . 'build' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;

        if (!is_dir($this->addon_path)) throw new AddonException('ADDON_IS_NOT_EXIST');//当前目录中不存在此项插件

        if (is_dir($this->build_path)) {
            del_target_dir($this->build_path, true);
        } else {
            dir_mkdir($this->build_path);
        }

        // 拷贝插件文件
        dir_copy($this->addon_path, $this->build_path, exclude_dirs:['admin', 'uni-app', 'web']);

        $this->admin();
        $this->uniapp();
        $this->web();
        $this->menu('admin');
        $this->menu('site');

        $zip_file = runtime_path() . 'build' . DIRECTORY_SEPARATOR . $addon . '.zip';
        if (file_exists($zip_file)) unlink($zip_file);
        (new CoreAddonDevelopDownloadService(''))->compressToZip($this->build_path, $zip_file);
        // 删除打包文件
        del_target_dir($this->build_path, true);

        return true;
    }

    /**
     * 下载
     * @param string $addon
     * @return \think\response\File
     */
    public function download(string $addon) {
        $zip_file = runtime_path() . 'build' . DIRECTORY_SEPARATOR . $addon . '.zip';

        if (!file_exists($zip_file)) throw new AddonException('ADDON_ZIP_ERROR');//下载失败
        $content = file_get_contents($zip_file);
        @unlink($zip_file);
        return download($content, $addon . '.zip', true);
    }

    /**
     * 同步菜单
     * @param string $app_type
     * @return true
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function menu(string $app_type) {
        $where = [ ['app_type', '=', $app_type], ['addon', '=', $this->addon] ];
        $field = 'menu_name,menu_key,menu_type,icon,api_url,router_path,view_path,methods,sort,status,is_show,parent_key';
        $menu = (new SysMenu())->where($where)->field($field)->order('sort', 'desc')->select()->toArray();
        if (!empty($menu)) {
            $menu = (new MenuService())->menuToTree($menu, 'menu_key', 'parent_key', 'children');
            (new SysMenu())->where($where)->update(['source' => MenuDict::SYSTEM]);
        }

        $build_dict = $this->build_path . 'app' . DIRECTORY_SEPARATOR . 'dict' . DIRECTORY_SEPARATOR . 'menu' . DIRECTORY_SEPARATOR . $app_type . '.php';
        $addon_dict = $this->addon_path . 'app' . DIRECTORY_SEPARATOR . 'dict' . DIRECTORY_SEPARATOR . 'menu' . DIRECTORY_SEPARATOR . $app_type . '.php';

        $content = '<?php' . PHP_EOL;
        $content .= 'return [' . PHP_EOL;
        $content .= $this->arrayFormat($menu);
        $content .= '];';
        file_put_contents($build_dict, $content);
        file_put_contents($addon_dict, $content);

        return true;
    }

    private function arrayFormat($array, $level = 1) {
        $tab = '';
        for ($i = 0; $i < $level; $i++) {
            $tab .= '    ';
        }
        $content = '';
        foreach ($array as $k => $v) {
            if (is_array($v)) {
                $content .= $tab;
                if (is_string($k)) {
                    $content .= "'{$k}' => ";
                }
                $content .= '[' . PHP_EOL . $this->arrayFormat($v, $level + 1);
                $content .= $tab . '],' . PHP_EOL;
            } else {
                $content .= $tab ."'{$k}' => '{$v}'," . PHP_EOL;
            }
        }
        return $content;
    }

    /**
     * admin打包
     * @return void
     */
    public function admin()
    {
        $admin_path = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $build_admin_path = $this->build_path . 'admin' . DIRECTORY_SEPARATOR;
        dir_copy($admin_path, $build_admin_path);
        return true;
    }

    /**
     * wap打包
     * @return void
     */
    public function uniapp()
    {
        $uniapp_path = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $build_uniapp_path = $this->build_path . 'uni-app' . DIRECTORY_SEPARATOR;
        dir_copy($uniapp_path, $build_uniapp_path);
        return true;
    }

    /**
     * web打包
     * @return void
     */
    public function web()
    {
        return true;
    }
}
