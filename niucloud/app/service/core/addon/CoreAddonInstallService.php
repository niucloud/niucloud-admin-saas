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

use app\dict\addon\AddonDict;
use app\job\sys\AddonInstall;
use app\model\site\Site;
use app\service\admin\sys\MenuService;
use app\service\admin\sys\SystemService;
use app\service\core\menu\CoreMenuService;
use app\service\core\schedule\CoreScheduleInstallService;
use core\exception\AddonException;
use core\exception\CommonException;
use core\util\Terminal;
use think\db\exception\DbException;
use think\db\exception\PDOException;
use think\facade\Cache;
use think\facade\Db;
use think\Response;

/**
 * 安装服务层
 * Class CoreInstallService
 * @package app\service\core\install
 */
class CoreAddonInstallService extends CoreAddonBaseService
{
    use WapTrait;

    public static $instance;
    /**
     * 需要迁移的文件，用于检测是否冲突
     * @var array[]
     */
    public $install_files = [
        'admin' => [],
        'web' => [],
        'wap' => [],
    ];
    private $files = [
        'niucloud' => [],
        'admin' => [],
        'web' => [],
        'wap' => [],
        'resource' => []
    ];
    private $flow_path = [
        'file',
        'sql',
        'menu',
        'diy'
    ];
    private $addon;
    private $install_addon_path;

    private $cache_key = '';

    private $install_task = null;

    public function __construct($addon)
    {
        parent::__construct();
        $this->addon = $addon;
        $this->install_addon_path = $this->addon_path . $addon . DIRECTORY_SEPARATOR;

        $this->cache_key = "install_{$addon}";

        $this->install_task = Cache::get('install_task');
    }

    /**
     * 初始化实例
     * @param string $addon
     * @return static
     */
    public static function instance(string $addon)
    {
        if (is_null(self::$instance)) {
            self::$instance = new static($addon);
        }
        return self::$instance;
    }

    /**
     * 安装前检测
     * @return array
     */
    public function installCheck()
    {
        $from_admin_dir = $this->install_addon_path . 'admin' . DIRECTORY_SEPARATOR;
        $from_web_dir = $this->install_addon_path . 'web' . DIRECTORY_SEPARATOR;
        $from_wap_dir = $this->install_addon_path . 'uni-app' . DIRECTORY_SEPARATOR;
        $from_resource_dir = $this->install_addon_path . 'resource' . DIRECTORY_SEPARATOR;

        // 放入的文件
        $to_admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon'. DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon'. DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        $to_resource_dir = public_path() . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        try {
            if (!is_dir($this->root_path . 'admin' . DIRECTORY_SEPARATOR)) throw new CommonException('ADMIN_DIR_NOT_EXIST');
            if (!is_dir($this->root_path . 'web' . DIRECTORY_SEPARATOR)) throw new CommonException('WEB_DIR_NOT_EXIST');
            if (!is_dir($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR)) throw new CommonException('UNIAPP_DIR_NOT_EXIST');
        } catch (\Exception $e) {
            if (strpos($e->getMessage(), 'open basedir') !== false) {
                throw new CommonException('OPEN_BASEDIR_ERROR');
            }
            throw new CommonException($e->getMessage());
        }

        // 配置文件
        $package_path = $this->install_addon_path . 'package' . DIRECTORY_SEPARATOR;
        $package_file = [];
        search_dir($package_path, $package_file);
        $package_file = array_map(function ($file) use ($package_path) {
            return str_replace($package_path . DIRECTORY_SEPARATOR, '', $file);
        }, $package_file);

        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ]
        ];

        if (is_dir($from_admin_dir)) $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $from_admin_dir), 'status' => is_readable($from_admin_dir)];
        if (is_dir($from_web_dir)) $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $from_web_dir), 'status' => is_readable($from_web_dir)];
        if (is_dir($from_wap_dir)) $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $from_wap_dir), 'status' => is_readable($from_wap_dir)];
        if (is_dir($from_resource_dir)) $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $from_resource_dir), 'status' => is_readable($from_resource_dir)];

        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_admin_dir), 'status' => is_dir($to_admin_dir) ? is_write($to_admin_dir) : mkdir($to_admin_dir, 0777, true)];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_web_dir), 'status' => is_dir($to_web_dir) ? is_write($to_web_dir) : mkdir($to_web_dir, 0777, true)];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_wap_dir), 'status' => is_dir($to_wap_dir) ? is_write($to_wap_dir) : mkdir($to_wap_dir, 0777, true)];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_resource_dir), 'status' => is_dir($to_resource_dir) ? is_write($to_resource_dir) : mkdir($to_resource_dir, 0777, true)];

        $check_res = array_merge(
            array_column($data['dir']['is_readable'], 'status'),
            array_column($data['dir']['is_write'], 'status')
        );

        // 是否通过校验
        $data['is_pass'] = !in_array(false, $check_res);
        Cache::set($this->cache_key . '_install_check', $data['is_pass']);
        return $data;
    }

    /**
     * 插件安装
     * @return true
     */
    public function install(string $mode = 'local')
    {
        $core_addon_service = new CoreAddonService();
        if (!empty($core_addon_service->getInfoByKey($this->addon))) throw new AddonException('REPEAT_INSTALL');

        $install_data = $this->getAddonConfig($this->addon);
        if (empty($install_data)) throw new AddonException('ADDON_INFO_FILE_NOT_EXIST');

        $check_res = Cache::get($this->cache_key . '_install_check');
        if (!$check_res) throw new CommonException('INSTALL_CHECK_NOT_PASS');

        if ($this->install_task) throw new CommonException('ADDON_INSTALLING');
        $this->install_task = [ 'mode' => $mode, 'addon' => $this->addon, 'step' => [], 'timestamp' => time() ];
        Cache::set('install_task', $this->install_task);

        set_time_limit(0);

        $install_step = ['installDir','installWap','installDepend'];

        if (!empty($install_data['compile']) || $mode == 'cloud') {
            // 备份前端目录
            $install_step[] = 'backupFrontend';
        }

        // 检测插件是否存在编译内容
        if (!empty($install_data['compile'])) {
            $install_step[] = 'coverCompile';
        }

        if ($mode == 'cloud') {
            $install_step[] = 'cloudInstall';
        } else {
            $install_step[] = 'handleAddonInstall';
        }

        try {
            foreach ($install_step as $step) {
                $this->install_task['step'][] = $step;
                $this->$step();
                if ($step != 'handleAddonInstall') Cache::set('install_task', $this->install_task);
            }

            if ($mode != 'cloud') {
                // 配置文件
                $package_path = $this->install_addon_path . 'package' . DIRECTORY_SEPARATOR;
                $package_file = [];
                search_dir($package_path, $package_file);
                $package_file = array_map(function ($file) use ($package_path) {
                    return str_replace($package_path . DIRECTORY_SEPARATOR, '', $file);
                }, $package_file);

                $tips = [get_lang('dict_addon.install_after_update')];
                if (in_array('admin-package.json', $package_file)) $tips[] = get_lang('dict_addon.install_after_admin_update');
                if (in_array('composer.json', $package_file)) $tips[] = get_lang('dict_addon.install_after_composer_update');
                if (in_array('uni-app-package.json', $package_file)) $tips[] = get_lang('dict_addon.install_after_wap_update');
                if (in_array('web-package.json', $package_file)) $tips[] = get_lang('dict_addon.install_after_web_update');
                return $tips;
            }
            return true;
        } catch (\Exception $e) {
            Cache::set('install_task', $this->install_task);
            $this->installExceptionHandle();
            if (strpos($e->getMessage(), 'open basedir') !== false) {
                throw new CommonException('OPEN_BASEDIR_ERROR');
            }
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 安装异常处理
     * @return void
     */
    public function installExceptionHandle() {
        $install_task = Cache::get('install_task');

        if (in_array('installDir', $install_task['step'])) {
            @$this->uninstallDir();
        }

        if (in_array('installWap', $install_task['step'])) {
            @$this->uninstallWap();
        }

        if (in_array('backupFrontend', $install_task['step'])) {
            @$this->revertFrontendBackup();
        }

        Cache::set('install_task', null);
    }

    /**
     * 取消安装任务
     * @return void
     */
    public function cancleInstall() {
        if (Cache::get('install_task')) $this->installExceptionHandle();
    }

    /**
     * 获取安装任务
     * @return mixed
     */
    public function getInstallTask() {
        return $this->install_task;
    }

    /**
     * 安装迁移复制文件
     * @return bool
     */
    public function installDir()
    {
        $from_admin_dir = $this->install_addon_path . 'admin' . DIRECTORY_SEPARATOR;
        $from_web_dir = $this->install_addon_path . 'web' . DIRECTORY_SEPARATOR;
        $from_wap_dir = $this->install_addon_path . 'uni-app' . DIRECTORY_SEPARATOR;
        $from_resource_dir = $this->install_addon_path . 'resource' . DIRECTORY_SEPARATOR;

        // 放入的文件
        $to_admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        // 安装admin管理端
        if (file_exists($from_admin_dir)) {
            dir_copy($from_admin_dir, $to_admin_dir, $this->files['admin']);
            // 编译后台图标库文件
            $this->compileAdminIcon();
        }

        // 安装电脑端
        if (file_exists($from_web_dir)) {
            // 安装布局文件
            $layout = $from_web_dir . 'layouts';
            if (is_dir($layout)) {
                dir_copy($layout, $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'layouts');
                del_target_dir($layout, true);
            }
            dir_copy($from_web_dir, $to_web_dir, $this->files['web']);
        }

        // 安装手机端
        if (file_exists($from_wap_dir)) {
            dir_copy($from_wap_dir, $to_wap_dir, $this->files['wap']);
        }

        //安装资源文件
        if (file_exists($from_resource_dir)) {
            dir_copy($from_resource_dir, $to_resource_dir, $this->files['resource']);
        }

        return true;
    }

    /**
     * 编译后台图标库文件
     * 图标开发注意事项，不能占用  iconfont、icon 关键词（会跟系统图标冲突），建议增加业务前缀，比如 旅游业：recharge
     * @return bool
     */
    public function compileAdminIcon()
    {
        $compile_path = $this->root_path . str_replace('/', DIRECTORY_SEPARATOR, 'admin/src/styles/icon/');

        $content = "";
        $root_path = $compile_path . 'addon'; // 插件图标根目录
        $file_arr = getFileMap($root_path);
        if (!empty($file_arr)) {
            foreach ($file_arr as $ck => $cv) {
                if (str_contains($cv, '.css')) {
                    $path = str_replace($root_path . '/', '', $ck);
                    $path = str_replace('/.css', '', $path);
                    $content .= "@import \"addon/{$path}\";\n";
                }
            }
        }
        file_put_contents($compile_path . 'addon-iconfont.css', $content);
        return true;
    }

    public function installSql()
    {
        $sql = $this->install_addon_path . 'sql' . DIRECTORY_SEPARATOR . 'install.sql';
        $this->executeSql($sql);
        return true;
    }

    /**
     * 执行sql
     * @param string $sql_file
     * @return bool
     */
    public static function executeSql(string $sql_file): bool
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
                    return true;
                } catch ( PDOException $e ) {
                    Db::rollback();
                    throw new AddonException($e->getMessage());
                }
            }
        }
        return true;
    }

    /**
     * 执行插件install方法
     * @return true
     */
    public function handleAddonInstall()
    {
        // 执行安装sql
        $this->installSql();
        // 安装菜单
        $this->installMenu();
        // 安装计划任务
        $this->installSchedule();

        $core_addon_service = new CoreAddonService();
        $install_data = $this->getAddonConfig($this->addon);
        $install_data['icon'] = 'addon/' . $this->addon . '/icon.png';
        $core_addon_service->set($install_data);
        //清理缓存
        Cache::tag(self::$cache_tag_name)->clear();
        Cache::set("local_install_addons", []);
        //执行命令
        //执行插件安装方法
        $class = "addon\\" . $this->addon . "\\" . 'Addon';
        if (class_exists($class)) {
            (new $class())->install();
        }
        // 清除插件安装中标识
        Cache::delete('install_task');
        Cache::delete($this->cache_key . '_install_check');
        return true;
    }

    /**
     * 合并依赖
     * @return void
     */
    public function installDepend()
    {
        (new CoreDependService())->installDepend($this->addon);
    }

    /**
     * 备份前端页面
     * @return void
     */
    public function backupFrontend() {
        $backup_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR;
        if (is_dir($backup_dir)) del_target_dir($backup_dir, true);

        foreach (['admin', 'wap', 'web'] as $port) {
            $to_dir = public_path() . $port;
            if (is_dir($to_dir)) {
                if (is_dir($backup_dir . $port)) del_target_dir($backup_dir . $port, true);
                // 备份原目录
                dir_copy($to_dir, $backup_dir . $port);
            }
        }
    }

    /**
     * 还原被覆盖前的文件
     * @return void
     */
    public function revertFrontendBackup() {
        $backup_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR;
        $backup_file = [];

        search_dir($backup_dir, $backup_file);

        if (!empty($backup_file)) {
            dir_copy(public_path(), $backup_dir);
            @del_target_dir($backup_dir, true);
        }
    }

    /**
     * 插件编译文件覆盖
     * @return void
     */
    public function coverCompile() {
        $compile = $this->getAddonConfig($this->addon)['compile'];
        foreach ($compile as $port) {
            $to_dir = public_path() . $port;
            $from_dir = $this->addon_path . 'compile' . DIRECTORY_SEPARATOR . $port;

            if (is_dir($from_dir) && is_dir($to_dir)) {
                // 删除后覆盖目录
                del_target_dir($to_dir, true);
                dir_copy($from_dir, $to_dir . $port);
            }
        }
    }

    /**
     * 云安装
     * @return void
     */
    public function cloudInstall() {
        (new CoreAddonCloudService())->cloudBuild($this->addon);
    }

    /**
     * 插件卸载环境检测
     * @param string $addon
     * @return void
     */
    public function uninstallCheck() {
        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ]
        ];

        // 将要删除的根目录
        $to_admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        if (is_dir($to_admin_dir)) $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_admin_dir), 'status' => is_write($to_admin_dir)];
        if (is_dir($to_web_dir)) $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_web_dir), 'status' => is_write($to_web_dir)];
        if (is_dir($to_wap_dir)) $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_wap_dir), 'status' => is_write($to_wap_dir)];
        if (is_dir($to_resource_dir)) $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $to_resource_dir), 'status' => is_write($to_resource_dir)];

        $check_res = array_merge(
            array_column($data['dir']['is_readable'], 'status'),
            array_column($data['dir']['is_write'], 'status')
        );

        // 是否通过校验
        $data['is_pass'] = !in_array(false, $check_res);
        return $data;
    }

    /**
     * 卸载插件
     * @return true
     */
    public function uninstall()
    {
        $site_num = (new Site())->where([ ['app', '=', $this->addon] ])->count('site_id');
        if ($site_num) throw new CommonException('APP_NOT_ALLOW_UNINSTALL');

        //执行插件卸载方法
        $class = "addon\\" . $this->addon . "\\" . 'Addon';
        if (class_exists($class)) {
            (new $class())->uninstall();
        }
        $core_addon_service = new CoreAddonService();
        $addon_info = $core_addon_service->getInfoByKey($this->addon);
        if (empty($addon_info)) throw new AddonException('NOT_UNINSTALL');
        if (!$this->uninstallSql()) throw new AddonException('ADDON_SQL_FAIL');
        if (!$this->uninstallDir()) throw new AddonException('ADDON_DIR_FAIL');

        // 卸载菜单
        $this->uninstallMenu();

        // 卸载计划任务
        $this->uninstallSchedule();

        // 卸载wap
        $this->uninstallWap();

        // 还原备份
        if (!empty($addon_info['compile'])) (new CoreAddonCompileHandleService())->revertBackup();

        $core_addon_service = new CoreAddonService();
        $core_addon_service->delByKey($this->addon);
        Cache::set("local_install_addons", []);

        //清理缓存
        Cache::tag(self::$cache_tag_name)->clear();
        return true;
    }

    /**
     * 卸载数据库
     * @return true
     */
    public function uninstallSql()
    {
        $sql = $this->install_addon_path . 'sql' . DIRECTORY_SEPARATOR . 'uninstall.sql';
        $this->executeSql($sql);
        return true;
    }

    /**
     * 卸载插件
     * @return true
     */
    public function uninstallDir()
    {
        // 将要删除的根目录
        $to_admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_web_layouts = $this->root_path . 'web' . DIRECTORY_SEPARATOR . 'layouts' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;
        $to_resource_dir = public_path() . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR;

        // 卸载admin管理端
        if (is_dir($to_admin_dir)) del_target_dir($to_admin_dir, true);
        // 编译后台图标库文件
        $this->compileAdminIcon();

        // 卸载pc端
        if (is_dir($to_web_dir)) del_target_dir($to_web_dir, true);
        if (is_dir($to_web_layouts)) del_target_dir($to_web_layouts, true);

        // 卸载手机端
        if (is_dir($to_wap_dir)) del_target_dir($to_wap_dir, true);

        //删除资源文件
        if (is_dir($to_resource_dir)) del_target_dir($to_resource_dir, true);

        //todo  卸载插件目录涉及到的空文件
        return true;
    }

    /**
     * 卸载菜单
     * @return true
     * @throws DbException
     */
    public function uninstallMenu()
    {
        $core_menu_service = new CoreMenuService();
        $core_menu_service->deleteByAddon($this->addon);
        Cache::tag(MenuService::$cache_tag_name)->clear();
        return true;
    }

    /**
     * 卸载计划任务
     * @return true
     */
    public function uninstallSchedule()
    {
        (new CoreScheduleInstallService())->uninstallAddonSchedule($this->addon);
        return true;
    }

    /**
     * 卸载手机端
     * @return void
     */
    public function uninstallWap()
    {
        // 编译 diy-group 自定义组件代码文件
        $this->compileDiyComponentsCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon);

        // 编译 fixed-group 固定模板组件代码文件
        $this->compileFixedComponentsCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon);

        // 编译 pages.json 页面路由代码文件
        $this->uninstallPageCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR);

        // 编译 加载插件标题语言包
        $this->compileLocale($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon);

    }

    /**
     * 安装插件菜单
     * @return true
     */
    public function installMenu()
    {
        (new CoreMenuService)->refreshAddonMenu($this->addon);
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
        $this->compileDiyComponentsCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon);

        // 编译 fixed-group 固定模板组件代码文件
        $this->compileFixedComponentsCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon);

        // 编译 pages.json 页面路由代码文件
        $this->installPageCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR);

        // 编译 加载插件标题语言包
        $this->compileLocale($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $this->addon);

    }

    public function download()
    {

    }

    public function edit()
    {

    }

    /**
     * 更新composer依赖
     * @return true
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
     * @return true
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
     * @return true
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
     * @return true
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
     * @return true
     */
    public function installComplete()
    {
        return true;
    }

    /**
     * 安装计划任务
     * @return true
     */
    public function installSchedule()
    {
        (new CoreScheduleInstallService())->installAddonSchedule($this->addon);
        return true;
    }

    /**
     * 处理编译之后的文件
     * @return void
     */
    public function handleBuildFile() {
        return true;
    }
}
