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

namespace app\service\core\addon;

use app\enum\sys\AppTypeEnum;
use app\service\admin\sys\MenuService;
use app\service\core\menu\CoreMenuService;
use core\exception\AddonException;
use think\db\exception\PDOException;
use think\facade\Cache;
use think\facade\Db;
use think\helper\Str;

/**
 * 安装服务层
 * Class CoreInstallService
 * @package app\service\core\install
 */
class CoreAddonInstallService extends CoreAddonBaseService
{
    use WapTrait;
    private $files = [
        'niucloud' => [],
        'admin' => [],
        'web' => [],
        'wap' => [],
        'resource' => []
    ];
    //安装流程
    private $flow_path = [
        'file',
        'sql',
        'menu',
        'diy',
        ''
    ];
    private $addon;
    private $install_addon_path;//待安装的插件目录

    //对象实例
    protected static $instance;

    //状态关键字
    const WAIT_INSTALL = 'wait_install';

    const DIR_INSTALLED = 'dir_installed';

    const SQL_INSTALLED = 'sql_installed';

    const MENU_INSTALLED = 'menu_installed';

    const WAIT_DEPEND = 'wait_depend';

    const INSTALL_SUCCESS = 'install_success';

    const INSTALL_FAIL = 'install_fail';

    private $state;
    /**
     * 初始化实例
     * @param string $uid
     * @return static
     */
    public static function instance(string $addon)
    {
        if (is_null(self::$instance)) {
            self::$instance = new static($addon);
        }
        return self::$instance;
    }


    public function __construct($addon)
    {
        parent::__construct();
        $this->addon = $addon;
        $this->install_addon_path = $this->addon_path. $addon. DIRECTORY_SEPARATOR;
    }
    /**
     * 插件安装
     * @return true
     */
    public function install()
    {
        $core_addon_service = new CoreAddonService();
        if (!empty($core_addon_service->getInfoByKey($this->addon))) throw new AddonException('REPEAT_INSTALL');
        $dir = $this->addon_path . $this->addon . DIRECTORY_SEPARATOR;
        //安装文件
        if (!$this->installDir()) throw new AddonException();
        if (!$this->installSql()) throw new AddonException();

        // 安装菜单
        $this->installMenu();

        // 安装wap
        $this->installWap();

        $install_data = $this->getAddonConfig($this->addon);
        $install_data[ 'icon' ] = $dir . 'icon.png';
        $core_addon_service->set($install_data);
        //清理缓存
        Cache::tag(self::$cache_tag_name)->clear();
        //执行命令
        //执行插件安装方法
        $class = "addon\\".$this->addon."\\".Str::studly($this->addon);
        if(class_exists($class))
        {
            (new $class())->install();
        }
        //组装依赖文件
         (new CoreDependService())->installDepend($this->addon);

        $this->state = self::WAIT_DEPEND;
        //执行命令行
        //命令行实例
        //4条命令行


        return true;
    }

    public function getInstallState()
    {
        return $this->state;
    }

    /**
     * 安装迁移复制文件
     * @param $dir
     * @return bool
     */
    public function installDir()
    {
        $from_admin_dir = $this->install_addon_path."admin". DIRECTORY_SEPARATOR;
        $from_web_dir = $this->install_addon_path."web". DIRECTORY_SEPARATOR;
        $from_wap_dir = $this->install_addon_path."uni-app". DIRECTORY_SEPARATOR;
        $from_resource_dir = $this->install_addon_path."resource". DIRECTORY_SEPARATOR;
        // 放入的文件
        $to_admin_dir = $this->root_path ."admin". DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path ."web". DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . "uni-app". DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . "addon". DIRECTORY_SEPARATOR. $this->addon. DIRECTORY_SEPARATOR;

        // 安装admin管理端
        if(file_exists($from_admin_dir))
        {
            dir_copy($from_admin_dir, $to_admin_dir, $this->files[ 'admin' ]);
        }

        // 安装电脑端
        if(file_exists($from_web_dir))
        {
            dir_copy($from_web_dir, $to_web_dir, $this->files[ 'web' ]);
        }

        // 安装手机端
        if(file_exists($from_wap_dir))
        {
            dir_copy($from_wap_dir, $to_wap_dir, $this->files[ 'wap' ]);
        }

        //安装资源文件
        if(file_exists($from_resource_dir))
        {
            dir_copy($from_resource_dir, $to_resource_dir, $this->files[ 'resource' ]);
        }
        $this->state = self::DIR_INSTALLED;
        return true;
    }

    public function installSql()
    {
        $sql = $this->install_addon_path . 'sql' . DIRECTORY_SEPARATOR . 'install.sql';
        $this->executeSql($sql);
        $this->state = self::SQL_INSTALLED;
        return true;
    }

    /**
     * 执行sql
     * @param string $sql_file
     * @return bool
     */
    public static function executeSql(string $sql_file) : bool
    {
        if (is_file($sql_file)) {
            $sql = file_get_contents($sql_file);
            // 执行sql
            $sql_arr = parse_sql($sql);
            if (!empty($sql_arr)) {
                $prefix = config('database.connections.mysql.prefix');
                Db::startTrans();
                try {
                    foreach ($sql_arr as $sql_line) {
                        $sql_line = trim($sql_line);
                        if (!empty($sql_line)) {
                            $sql_line = str_ireplace('{{prefix}}', $prefix, $sql_line);
                            $sql_line = str_ireplace('INSERT INTO ', 'INSERT IGNORE INTO ', $sql_line);
                            Db::execute($sql_line);
                        }
                    }
                    Db::commit();
                    // 返回订单信息
                    return true;
                } catch (PDOException $e) {
                    Db::rollback();
                    throw new AddonException($e->getMessage());
                }
            }
        }
        return true;
    }

    /**
     * 卸载插件
     * @return true
     */
    public function uninstall()
    {
        //执行插件卸载方法
        $class = "addon\\".$this->addon."\\".Str::studly($this->addon);
        if(class_exists($class))
        {
            (new $class())->uninstall();
        }
        $core_addon_service = new CoreAddonService();
        if (empty($core_addon_service->getInfoByKey($this->addon))) throw new AddonException('NOT_UNINSTALL');
        if (!$this->uninstallSql()) throw new AddonException();
        if (!$this->uninstallDir()) throw new AddonException();
        // 卸载菜单
        $this->uninstallMenu();

        // 卸载wap
        $this->uninstallWap();

        $core_addon_service = new CoreAddonService();
        $core_addon_service->delByKey($this->addon);

        //清理缓存
        Cache::tag(self::$cache_tag_name)->clear();
        return true;
    }

    /**
     * 卸载插件
     * @param $dir
     * @return true
     */
    public function uninstallDir()
    {
        $from_admin_dir = $this->install_addon_path."admin". DIRECTORY_SEPARATOR;
        $from_web_dir = $this->install_addon_path."web". DIRECTORY_SEPARATOR;
        $from_wap_dir = $this->install_addon_path."uni-app". DIRECTORY_SEPARATOR;
        $from_resource_dir = $this->install_addon_path."resource". DIRECTORY_SEPARATOR;


        search_dir($from_admin_dir, $from_admin_dirs, $from_admin_dir);
        search_dir($from_web_dir, $from_web_dirs, $from_web_dir);
        search_dir($from_wap_dir, $from_wap_dirs, $from_wap_dir);
        search_dir($from_resource_dir, $from_resource_dirs, $from_resource_dir);

        // 将要删除的根目录
        $to_admin_dir = $this->root_path ."admin". DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path ."web". DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . "uni-app". DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . "addon". DIRECTORY_SEPARATOR. $this->addon. DIRECTORY_SEPARATOR;

        // 卸载admin管理端
        if(file_exists($from_admin_dir))
        {
            dir_remove($to_admin_dir, $from_admin_dirs ?? []);
        }

        // 卸载pc端
        if(file_exists($from_web_dir))
        {
            dir_remove($to_web_dir, $from_web_dirs ?? []);
        }

        // 卸载手机端
        if(file_exists($from_wap_dir))
        {
            dir_remove($to_wap_dir, $from_wap_dirs ?? []);
        }

        //删除资源文件
        if(file_exists($from_resource_dir))
        {
            dir_remove($to_resource_dir, $from_resource_dirs ?? []);
            rmdir($to_resource_dir);
        }

        //todo  卸载插件目录涉及到的空文件
        return true;
    }

    /**
     * 卸载数据库
     * @param $dir
     * @return true
     */
    public function uninstallSql()
    {
        $sql = $this->install_addon_path . 'sql' . DIRECTORY_SEPARATOR . 'uninstall.sql';
        $this->executeSql($sql);
        return true;
    }

    /**
     * 安装插件菜单
     * @return true
     */
    public function installMenu()
    {
        (new CoreMenuService)->refreshAddonMenu($this->addon);
        Cache::tag(MenuService::$cache_tag_name)->clear();
        $this->state = self::MENU_INSTALLED;

        return true;
    }

    /**
     * 卸载菜单
     * @return true
     */
    public function uninstallMenu()
    {
        $core_menu_service = new CoreMenuService();
        $core_menu_service->deleteByAddon($this->addon);
        Cache::tag(MenuService::$cache_tag_name)->clear();
        return true;
    }

    /**
     * 添加uniapp pages
     */
    public function installUniappPages()
    {
        $addon_pages_array = $this->jsonFileToArray($this->getAddonConfigPath($this->addon). 'uni-app-pages.json');
        $pages_array = $this->jsonFileToArray($this->root_path . "uni-app". DIRECTORY_SEPARATOR. "pages.json");
        $pages_array['pages'] = array_merge($pages_array['pages'], $addon_pages_array['pages']);
        return $this->writeArrayToJsonFile($pages_array, $this->root_path . "uni-app". DIRECTORY_SEPARATOR. "pages.json");
    }
    /**
     * 安装手机端
     * @return void
     */
    public function installWap()
    {
        // 编译 diy-group 自定义组件代码文件
        $this->compileDiyComponentsCode($this->install_addon_path. "uni-app". DIRECTORY_SEPARATOR);

        // 编译 pages.json 页面路由代码文件
        $this->compileRoutesCode($this->install_addon_path . "uni-app". DIRECTORY_SEPARATOR);
    }

    /**
     * 卸载手机端
     * @return void
     */
    public function uninstallWap()
    {
        // 编译 diy-group 自定义组件代码文件
        $this->compileDiyComponentsCode($this->root_path . "uni-app". DIRECTORY_SEPARATOR);

        // 编译 pages.json 页面路由代码文件
        $this->compileRoutesCode($this->root_path . "uni-app". DIRECTORY_SEPARATOR);
    }

    public function download()
    {

    }

    public function edit()
    {

    }

}