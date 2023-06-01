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

use app\dict\addon\AddonDict;
use app\dict\sys\AppTypeDict;
use app\job\sys\AddonInstall;
use app\service\admin\sys\MenuService;
use app\service\admin\sys\SystemService;
use app\service\core\menu\CoreMenuService;
use core\exception\AddonException;
use core\exception\CommonException;
use core\util\Terminal;
use think\db\exception\PDOException;
use think\facade\Cache;
use think\facade\Db;
use think\facade\Log;
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

    /**
     * 需要迁移的文件，用于检测是否冲突
     * @var array[]
     */
    public $install_files = [
        'admin' => [],
        'web' => [],
        'wap' => [],
    ];

    private $addon;
    private $install_addon_path;//待安装的插件目录

    //对象实例
    public static $instance;

    //状态关键字
    const WAIT_INSTALL = 'wait_install';

    const DIR_INSTALLED = 'dir_installed';

    const SQL_INSTALLED = 'sql_installed';

    const MENU_INSTALLED = 'menu_installed';

    const WAIT_DEPEND = 'wait_depend';

    const INSTALL_SUCCESS = 'install_success';

    const INSTALL_FAIL = 'install_fail';

    private $state;

    // 安装任务
    private $task = [];

    private $cache_key = '';

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
        $this->install_addon_path = $this->addon_path . $addon . DIRECTORY_SEPARATOR;

        $this->cache_key = "install_{$addon}";
        $this->task = Cache::get($this->cache_key, []);
    }

    /**
     * 安装前检测
     * @return void
     */
    public function installCheck()
    {
        $from_admin_dir = $this->install_addon_path . "admin" . DIRECTORY_SEPARATOR;
        $from_web_dir = $this->install_addon_path . "web" . DIRECTORY_SEPARATOR;
        $from_wap_dir = $this->install_addon_path . "uni-app" . DIRECTORY_SEPARATOR;
        $from_resource_dir = $this->install_addon_path . "resource" . DIRECTORY_SEPARATOR;
        // 放入的文件
        $to_admin_dir = $this->root_path . "admin" . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . "web" . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . "uni-app" . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . "addon" . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        // 配置文件
        $package_path = $this->install_addon_path . 'package' . DIRECTORY_SEPARATOR;
        $package_file = [];
        search_dir($package_path, $package_file);
        $package_file = array_map(function($file) use ($package_path) {
            return str_replace($package_path . DIRECTORY_SEPARATOR, '', $file);
        }, $package_file);

        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ],
            // 运行环境检测
            'runtime' => [],
            'job_normal' => ( new SystemService() )->checkJob(),
            'conflict_files' => $this->dirCheck()
        ];

        if (is_dir($from_admin_dir)) array_push($data[ 'dir' ][ 'is_readable' ], [ 'dir' => str_replace(project_path(), '', $from_admin_dir), 'status' => is_readable($from_admin_dir) ]);
        if (is_dir($from_web_dir)) array_push($data[ 'dir' ][ 'is_readable' ], [ 'dir' => str_replace(project_path(), '', $from_web_dir), 'status' => is_readable($from_web_dir) ]);
        if (is_dir($from_wap_dir)) array_push($data[ 'dir' ][ 'is_readable' ], [ 'dir' => str_replace(project_path(), '', $from_wap_dir), 'status' => is_readable($from_wap_dir) ]);
        if (is_dir($from_resource_dir)) array_push($data[ 'dir' ][ 'is_readable' ], [ 'dir' => str_replace(project_path(), '', $from_resource_dir), 'status' => is_readable($from_resource_dir) ]);

        if (is_dir($to_admin_dir)) array_push($data[ 'dir' ][ 'is_write' ], [ 'dir' => str_replace(project_path(), '', $to_admin_dir), 'status' => is_write($to_admin_dir) ]);
        if (is_dir($to_web_dir)) array_push($data[ 'dir' ][ 'is_write' ], [ 'dir' => str_replace(project_path(), '', $to_web_dir), 'status' => is_write($to_web_dir) ]);
        if (is_dir($to_wap_dir)) array_push($data[ 'dir' ][ 'is_write' ], [ 'dir' => str_replace(project_path(), '', $to_wap_dir), 'status' => is_write($to_wap_dir) ]);
        if (is_dir($to_resource_dir)) array_push($data[ 'dir' ][ 'is_write' ], [ 'dir' => str_replace(project_path(), '', $to_resource_dir), 'status' => is_write($to_resource_dir) ]);

        if (in_array('composer.json', $package_file)) {
            array_push($data[ 'runtime' ], [ 'name' => 'composer', 'status' => Terminal::execute(root_path(), 'composer -V') === true ]);
        }
        if (in_array('admin-package.json', $package_file) || in_array('web-package.json', $package_file) || in_array('uni-app-package.json', $package_file)) {
            array_push($data[ 'runtime' ], [ 'name' => 'npm', 'status' => Terminal::execute(root_path(), 'npm -v') === true ]);
        }

        $check_res = array_merge(
            array_column($data[ 'dir' ][ 'is_readable' ], 'status'),
            array_column($data[ 'dir' ][ 'is_write' ], 'status'),
            array_column($data[ 'runtime' ], 'status'),
            [ $data[ 'job_normal' ] ]
        );
        if (count($data['conflict_files'])) array_push($check_res, false);

        // 是否通过校验
        $data[ 'is_pass' ] = !in_array(false, $check_res);
        Cache::set($this->cache_key . '_install_check', $data[ 'is_pass' ], 120);
        return $data;
    }

    /**
     * 安装前检测冲突文件
     * @return array  //返回冲突文件，空数组表示无冲突
     */
    public function dirCheck()
    {
        $from_admin_dir = $this->install_addon_path . "admin";
        $from_web_dir = $this->install_addon_path . "web";
        $from_wap_dir = $this->install_addon_path . "uni-app";
        // 放入的文件
        $to_admin_dir = $this->root_path . "admin";
        $to_web_dir = $this->root_path . "web";
        $to_wap_dir = $this->root_path . "uni-app";

        $conflict_files = [];

        //检测admin文件
        if (is_dir($from_admin_dir)) {
            search_dir($from_admin_dir, $this->install_files[ "admin" ]);
            foreach ($this->install_files[ 'admin' ] as $admin_file) {
                $file_path = str_replace($from_admin_dir, "", $admin_file);
                if (is_file($to_admin_dir . $file_path))
                    $conflict_files[] = str_replace(project_path(), '', $admin_file);
            }
        }

        //检测web端文件
        if (is_dir($from_web_dir)) {
            search_dir($from_web_dir, $this->install_files[ "web" ]);
            foreach ($this->install_files[ 'web' ] as $web_file) {
                $file_path = str_replace($from_web_dir, "", $web_file);
                if (is_file($to_web_dir . $file_path))
                    $conflict_files[] = str_replace(project_path(), '', $web_file);
            }
        }


        //检测wap的uniapp文件
        if (is_dir($from_wap_dir)) {
            search_dir($from_wap_dir, $this->install_files[ "wap" ]);
            foreach ($this->install_files[ 'wap' ] as $wap_file) {
                $file_path = str_replace($from_wap_dir, "", $wap_file);
                if (is_file($to_wap_dir . $file_path))
                    $conflict_files[] = str_replace(project_path(), '', $wap_file);
            }
        }

        return $conflict_files;
    }

    /**
     * 插件安装
     * @return true
     */
    public function install()
    {
        $core_addon_service = new CoreAddonService();
        if (!empty($core_addon_service->getInfoByKey($this->addon))) throw new AddonException('REPEAT_INSTALL');

        if (!empty($this->task)) return $this->task;

        // 配置文件
        $package_path = $this->install_addon_path . 'package' . DIRECTORY_SEPARATOR;
        $package_file = [];
        search_dir($package_path, $package_file);
        $package_file = array_map(function($file) use ($package_path) {
            return str_replace($package_path . DIRECTORY_SEPARATOR, '', $file);
        }, $package_file);

        $this->task = [
            'installDir' => [
                'addon' => $this->addon,
                'step' => 'installDir',
                'command' => "php think addon:install {$this->addon} --step installDir",
                'desc' => '复制插件文件',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ],
            'installSql' => [
                'addon' => $this->addon,
                'step' => 'installSql',
                'command' => "php think addon:install {$this->addon} --step installSql",
                'desc' => '执行插件sql',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ],
            'installMenu' => [
                'addon' => $this->addon,
                'step' => 'installMenu',
                'command' => "php think addon:install {$this->addon} --step installMenu",
                'desc' => '安装插件菜单',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ],
            'installWap' => [
                'addon' => $this->addon,
                'step' => 'installWap',
                'command' => "php think addon:install {$this->addon} --step installWap",
                'desc' => '安装插件手机端',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ],
            'handleAddonInstall' => [
                'addon' => $this->addon,
                'step' => 'handleAddonInstall',
                'command' => "php think addon:install {$this->addon} --step handleAddonInstall",
                'desc' => '执行插件安装方法',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ],
            'installDepend' => [
                'addon' => $this->addon,
                'step' => 'installDepend',
                'command' => "php think addon:install {$this->addon} --step installDepend",
                'desc' => '合并依赖文件',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ]
        ];

        if (in_array('composer.json', $package_file)) {
            $this->task[ 'updateComposer' ] = [
                'addon' => $this->addon,
                'step' => 'updateComposer',
                'command' => "php think addon:install {$this->addon} --step updateComposer",
                'desc' => '更新composer依赖',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ];
        }
        if (in_array('admin-package.json', $package_file)) {
            $this->task[ 'updateAdminDependencies' ] = [
                'addon' => $this->addon,
                'step' => 'updateAdminDependencies',
                'command' => "php think addon:install {$this->addon} --step updateAdminDependencies",
                'desc' => '更新admin端依赖',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ];
        }
        if (in_array('uni-app-package.json', $package_file)) {
            $this->task[ 'updateWapDependencies' ] = [
                'addon' => $this->addon,
                'step' => 'updateWapDependencies',
                'command' => "php think addon:install {$this->addon} --step updateWapDependencies",
                'desc' => '更新wap端依赖',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ];
        }
        if (in_array('web-package.json', $package_file)) {
            $this->task[ 'updateWebDependencies' ] = [
                'addon' => $this->addon,
                'step' => 'updateWebDependencies',
                'command' => "php think addon:install {$this->addon} --step updateWebDependencies",
                'desc' => '更新web端依赖',
                'state' => AddonDict::INSTALL_UNEXECUTED
            ];
        }

        $this->task[ 'installComplete' ] = [
            'addon' => $this->addon,
            'step' => 'installComplete',
            'command' => "php think addon:install {$this->addon} --step installComplete",
            'desc' => '安装完成',
            'state' => AddonDict::INSTALL_UNEXECUTED
        ];

        Cache::set($this->cache_key, $this->task);
        return $this->task;
    }

    /**
     *
     * @return true
     */
    public function executeInstall()
    {
        if (empty($this->task)) throw new CommonException('ADDON_INSTALL_NOT_EXIST');

        $check_res = Cache::get($this->cache_key . '_install_check');
        if (!$check_res) throw new CommonException('INSTALL_CHECK_NOT_PASS');

        if ($this->task[ 'installDir' ][ 'state' ] == AddonDict::INSTALL_UNEXECUTED) AddonInstall::invoke([ 'addon' => $this->addon, 'task' => 'installDir' ]);
        return true;
    }

    /**
     * 执行任务
     * @param $task
     * @return \think\Response
     */
    public function executeTask(string $task)
    {
        if (empty($this->task) || !isset($this->task[ $task ])) throw new CommonException('ADDON_INSTALL_NOT_EXIST');
        if ($this->task[ $task ][ 'state' ] != AddonDict::INSTALL_UNEXECUTED) throw new CommonException('ADDON_INSTALL_EXECUTED');

        $this->setTaskState($task, AddonDict::INPROGRESS);

        $result = Terminal::execute(root_path(), $this->task[ $task ][ 'command' ]);

        // 变更任务状态
        if ($result === true) {
            if ($task != 'installComplete') {
                $this->setTaskState($task, AddonDict::INSTALL_SUCCESS);
                $task_key = array_keys($this->task);
                AddonInstall::invoke([ 'addon' => $this->addon, 'task' => $task_key[ array_search($task, $task_key) + 1 ] ]);
            } else {
                // 设置任务缓存30秒后失效
                $this->setTaskState($task, AddonDict::INSTALL_SUCCESS, '', 30);
            }
        } else {
            // 设置任务缓存30秒后失效
            $this->setTaskState($task, AddonDict::INSTALL_FAIL, $result, 30);
        }
        return $result;
    }

    /**
     * 设置任务执行状态
     * @param string $task
     * @param string $state
     * @param $error
     * @param int|null $ttl
     * @return void
     */
    public function setTaskState(string $task, string $state, $error = '', $ttl = null)
    {
        $this->task[ $task ][ 'state' ] = $state;
        if (!empty($error)) $this->task[ $task ][ 'error' ] = $error;
        Cache::set($this->cache_key, $this->task, $ttl);
    }

    /**
     * 获取安装任务
     * @return array
     */
    public function getTask()
    {
        return $this->task;
    }

    /**
     * 获取任务执行状态
     * @param string $key
     * @return array|mixed
     */
    public function getInstallState(string $key)
    {
        return $this->task[ $key ] ?? [];
    }

    /**
     * 安装迁移复制文件
     * @param $dir
     * @return bool
     */
    public function installDir()
    {
        $from_admin_dir = $this->install_addon_path . "admin" . DIRECTORY_SEPARATOR;
        $from_web_dir = $this->install_addon_path . "web" . DIRECTORY_SEPARATOR;
        $from_wap_dir = $this->install_addon_path . "uni-app" . DIRECTORY_SEPARATOR;
        $from_resource_dir = $this->install_addon_path . "resource" . DIRECTORY_SEPARATOR;
        // 放入的文件
        $to_admin_dir = $this->root_path . "admin" . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . "web" . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . "uni-app" . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . "addon" . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        // 安装admin管理端
        if (file_exists($from_admin_dir)) {
            dir_copy($from_admin_dir, $to_admin_dir, $this->files[ 'admin' ]);
        }

        // 安装电脑端
        if (file_exists($from_web_dir)) {
            dir_copy($from_web_dir, $to_web_dir, $this->files[ 'web' ]);
        }

        // 安装手机端
        if (file_exists($from_wap_dir)) {
            dir_copy($from_wap_dir, $to_wap_dir, $this->files[ 'wap' ]);
        }

        //安装资源文件
        if (file_exists($from_resource_dir)) {
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
     * 执行插件install方法
     * @return void
     */
    public function handleAddonInstall()
    {
        $core_addon_service = new CoreAddonService();
        $install_data = $this->getAddonConfig($this->addon);
        $install_data[ 'icon' ] = $this->addon . 'icon.png';
        $core_addon_service->set($install_data);
        //清理缓存
        Cache::tag(self::$cache_tag_name)->clear();
        Cache::set("local_install_addons", []);
        //执行命令
        //执行插件安装方法
        $class = "addon\\" . $this->addon . "\\" . Str::studly($this->addon);
        if (class_exists($class)) {
            ( new $class() )->install();
        }
        return true;
    }

    /**
     * 合并依赖
     * @return void
     */
    public function installDepend()
    {
        ( new CoreDependService() )->installDepend($this->addon);
    }

    /**
     * 卸载插件
     * @return true
     */
    public function uninstall()
    {
        //执行插件卸载方法
        $class = "addon\\" . $this->addon . "\\" . Str::studly($this->addon);
        if (class_exists($class)) {
            ( new $class() )->uninstall();
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
        Cache::set("local_install_addons", []);
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
        $from_admin_dir = $this->install_addon_path . "admin" . DIRECTORY_SEPARATOR;
        $from_web_dir = $this->install_addon_path . "web" . DIRECTORY_SEPARATOR;
        $from_wap_dir = $this->install_addon_path . "uni-app" . DIRECTORY_SEPARATOR;


        search_dir($from_admin_dir, $from_admin_dirs, $from_admin_dir);
        search_dir($from_web_dir, $from_web_dirs, $from_web_dir);
        search_dir($from_wap_dir, $from_wap_dirs, $from_wap_dir);


        // 将要删除的根目录
        $to_admin_dir = $this->root_path . "admin" . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . "web" . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . "uni-app" . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . "addon" . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        // 卸载admin管理端
        if (file_exists($from_admin_dir)) {
            dir_remove($to_admin_dir, $from_admin_dirs ?? []);
        }

        // 卸载pc端
        if (file_exists($from_web_dir)) {
            dir_remove($to_web_dir, $from_web_dirs ?? []);
        }

        // 卸载手机端
        if (file_exists($from_wap_dir)) {
            dir_remove($to_wap_dir, $from_wap_dirs ?? []);
        }

        //删除资源文件
        if (file_exists($to_resource_dir)) {
            search_dir($to_resource_dir, $from_resource_dirs, $to_resource_dir);
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
        ( new CoreMenuService )->refreshAddonMenu($this->addon);
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
     * 安装手机端
     * @return void
     */
    public function installWap()
    {

        // 编译 diy-group 自定义组件代码文件
        $this->compileDiyComponentsCode($this->root_path . "uni-app" . DIRECTORY_SEPARATOR);

        // 编译 pages.json 页面路由代码文件
        $this->installPageCode($this->root_path . "uni-app" . DIRECTORY_SEPARATOR);

    }

    /**
     * 卸载手机端
     * @return void
     */
    public function uninstallWap()
    {
        // 编译 diy-group 自定义组件代码文件
        $this->compileDiyComponentsCode($this->root_path . "uni-app" . DIRECTORY_SEPARATOR);

        // 编译 pages.json 页面路由代码文件
        $this->uninstallPageCode($this->root_path . "uni-app" . DIRECTORY_SEPARATOR);
    }

    public function download()
    {

    }

    public function edit()
    {

    }

    /**
     * 更新composer依赖
     * @return void
     */
    public function updateComposer()
    {
        $result = Terminal::execute(root_path(), 'composer update');
        if ($result !== true) {
            throw new CommonException($result);
        }
        return $result;
    }

    /**
     * 更新admin端依赖
     * @return void
     */
    public function updateAdminDependencies()
    {
        $result = Terminal::execute(root_path() . '../admin/', 'npm install');
        if ($result !== true) {
            throw new CommonException($result);
        }
        return $result;
    }

    /**
     * 更新手机端依赖
     * @return void
     */
    public function updateWapDependencies()
    {
        $result = Terminal::execute(root_path() . '../uni-app/', 'npm install');
        if ($result !== true) {
            throw new CommonException($result);
        }
        return $result;
    }

    /**
     * 更新web端依赖
     * @return void
     */
    public function updateWebDependencies()
    {
        $result = Terminal::execute(root_path() . '../web/', 'npm install');
        if ($result !== true) {
            throw new CommonException($result);
        }
        return $result;
    }

    /**
     * 安装完成 销毁插件实例
     * @return void
     */
    public function installComplete()
    {
        return true;
    }

}