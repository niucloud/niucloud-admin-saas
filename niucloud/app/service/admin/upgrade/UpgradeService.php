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

namespace app\service\admin\upgrade;

use app\dict\addon\AddonDict;
use app\model\addon\Addon;
use app\service\admin\install\InstallSystemService;
use app\service\core\addon\CoreAddonCloudService;
use app\service\core\addon\CoreAddonInstallService;
use app\service\core\addon\CoreAddonService;
use app\service\core\addon\CoreDependService;
use app\service\core\addon\WapTrait;
use app\service\core\menu\CoreMenuService;
use app\service\core\niucloud\CoreModuleService;
use app\service\core\schedule\CoreScheduleInstallService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use core\util\niucloud\BaseNiucloudClient;
use think\facade\Cache;
use think\facade\Db;

/**
 * 框架及插件升级
 * @package app\service\core\upgrade
 */
class UpgradeService extends BaseAdminService
{
    use WapTrait;
    use ExecuteSqlTrait;

    protected $upgrade_dir;

    protected $root_path;

    protected $cache_key = 'upgrade';

    protected $upgrade_task = null;

    protected $addon = '';

    private $steps = [
        'requestUpgrade' => ['step' => 'requestUpgrade', 'title' => '请求升级'],
        'downloadFile' => ['step' => 'downloadFile', 'title' => '下载更新文件'],
        'backupCode' => ['step' => 'backupCode', 'title' => '备份源码'],
        'backupSql' => ['step' => 'backupSql', 'title' => '备份数据库'],
        'coverCode' => ['step' => 'coverCode', 'title' => '合并更新文件'],
        'handleUniapp' => ['step' => 'handleUniapp', 'title' => '处理uniapp'],
        'refreshMenu' => ['step' => 'refreshMenu', 'title' => '刷新菜单'],
        'installSchedule' => ['step' => 'installSchedule', 'title' => '安装计划任务'],
        'upgradeComplete' => ['step' => 'upgradeComplete', 'title' => '升级完成']
    ];

    public function __construct()
    {
        parent::__construct();

        $this->root_path = dirname(root_path()) . DIRECTORY_SEPARATOR;
        $this->upgrade_dir = $this->root_path . 'upgrade' . DIRECTORY_SEPARATOR;
        $this->upgrade_task = Cache::get($this->cache_key);
    }

    /**
     * 升级前环境检测
     * @param string $addon
     * @return void
     */
    public function upgradePreCheck(string $addon = '') {
        $niucloud_dir = $this->root_path . 'niucloud' . DIRECTORY_SEPARATOR;
        $admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR;
        $web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR;
        $wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR;

        try {
            if (!is_dir($admin_dir)) throw new CommonException('ADMIN_DIR_NOT_EXIST');
            if (!is_dir($web_dir)) throw new CommonException('WEB_DIR_NOT_EXIST');
            if (!is_dir($wap_dir)) throw new CommonException('UNIAPP_DIR_NOT_EXIST');
        } catch (\Exception $e) {
            if (strpos($e->getMessage(), 'open basedir') !== false) {
                throw new CommonException('OPEN_BASEDIR_ERROR');
            }
            throw new CommonException($e->getMessage());
        }

        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ]
        ];

        $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $niucloud_dir), 'status' => is_readable($niucloud_dir)];
        $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $admin_dir), 'status' => is_readable($admin_dir)];
        $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $web_dir), 'status' => is_readable($web_dir)];
        $data['dir']['is_readable'][] = ['dir' => str_replace(project_path(), '', $wap_dir), 'status' => is_readable($wap_dir)];

        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $niucloud_dir), 'status' => is_write($niucloud_dir) ];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $admin_dir), 'status' => is_write($admin_dir) ];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $web_dir), 'status' => is_write($web_dir) ];
        $data['dir']['is_write'][] = ['dir' => str_replace(project_path(), '', $wap_dir), 'status' => is_write($wap_dir) ];

        $check_res = array_merge(
            array_column($data['dir']['is_readable'], 'status'),
            array_column($data['dir']['is_write'], 'status')
        );

        // 是否通过校验
        $data['is_pass'] = !in_array(false, $check_res);
        return $data;
    }

    /**
     * 升级
     * @param $addon
     * @return array
     */
    public function upgrade(string $addon = '') {
        if ($this->upgrade_task) throw new CommonException('UPGRADE_TASK_EXIST');

        $upgrade = [
            'product_key' => BaseNiucloudClient::PRODUCT,
            'framework_version' => config('version.version')
        ];
        if (!$addon) {
            $upgrade['app_key'] = AddonDict::FRAMEWORK_KEY;
            $upgrade['version'] = config('version.version');
        } else {
            $upgrade['app_key'] = $addon;
            $upgrade['version'] = (new Addon())->where([ ['key', '=', $addon] ])->value('version');
        }

        $response = (new CoreAddonCloudService())->upgradeAddon($upgrade);
        if (isset($response['code']) && $response['code'] == 0) throw new CommonException($response['msg']);

        try {
            $key = uniqid();
            $upgrade_dir = $this->upgrade_dir . $key . DIRECTORY_SEPARATOR;

            if (!is_dir($upgrade_dir)) {
                dir_mkdir($upgrade_dir);
            }

            $upgrade_tsak = [
                'key' => $key,
                'upgrade' => $upgrade,
                'step' => 'requestUpgrade',
                'executed' => ['requestUpgrade'],
                'log' => [ $this->steps['requestUpgrade']['title'] ],
                'params' => ['token' => $response['token'] ],
                'upgrade_content' => $this->getUpgradeContent($addon)
            ];

            Cache::set($this->cache_key, $upgrade_tsak);
            return $upgrade_tsak;
        } catch (\Exception $e) {
            if (strpos($e->getMessage(), 'open_basedir') !== false) {
                throw new CommonException('OPEN_BASEDIR_ERROR');
            }
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 执行升级
     * @return true
     */
    public function execute() {
        if (!$this->upgrade_task) return true;

        $steps = array_keys($this->steps);
        $index = array_search($this->upgrade_task['step'], $steps);
        $step = $steps[ $index + 1 ] ?? '';
        $params = $this->upgrade_task['params'] ?? [];

        if ($step) {
            try {
                $res = $this->$step(...$params);

                if (is_array($res)) {
                    $this->upgrade_task['params'] = $res;
                } else {
                    $this->upgrade_task['step'] = $step;
                    $this->upgrade_task['params'] = [];
                    $this->upgrade_task['executed'][] = $step;
                    $this->upgrade_task['log'][] = $this->steps[$step]['title'];
                }
                Cache::set($this->cache_key, $this->upgrade_task);
            } catch (\Exception $e) {
                $this->upgrade_task['step'] = $step;
                $this->upgrade_task['error'] = $e->getMessage();
                $this->upgradeErrorHandle();
            }
            return true;
        } else {
            return true;
        }
    }

    /**
     * 下载升级文件
     * @param string $token
     * @param string $dir
     * @param int $index
     * @param $step
     * @return true|null
     */
    public function downloadFile(string $token, string $dir = '', int $index = -1, $step = 0, $length = 0) {
        if (!$dir) {
            $dir = $this->upgrade_dir .$this->upgrade_task['key'] . DIRECTORY_SEPARATOR . 'download' . DIRECTORY_SEPARATOR;
            dir_mkdir($dir);
        }
        $res = (new CoreAddonCloudService())->downloadUpgradeFile($token, $dir, $index, $step, $length);
        return $res;
    }

    /**
     * 备份源码
     * @return true
     */
    public function backupCode() {
        (new BackupService())->backupCode();
        return true;
    }

    /**
     * 备份数据库
     * @return true
     */
    public function backupSql() {
        (new BackupService())->backupSql();
        return true;
    }

    /**
     * 覆盖更新升级的代码
     * @return void
     */
    public function coverCode($index = 0) {
        $this->upgrade_task['is_cover'] = 1;
        $addon = $this->upgrade_task['upgrade']['app_key'];

        $version_list = array_reverse($this->upgrade_task['upgrade_content']['version_list']);
        $code_dir = $this->upgrade_dir .$this->upgrade_task['key'] . DIRECTORY_SEPARATOR . 'download' . DIRECTORY_SEPARATOR . 'code' . DIRECTORY_SEPARATOR;

        $version_item = $version_list[$index];
        $version_no = $version_item['version_no'];

        $to_dir = $addon == AddonDict::FRAMEWORK_KEY ? $this->root_path : $this->root_path . 'niucloud' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $addon;

        // 获取文件变更记录
        if (file_exists($code_dir . $version_no . '.txt')) {
            $change = array_filter(explode("\n", file_get_contents($code_dir . $version_no . '.txt')));
            foreach ($change as &$item) {
                list($operation, $md5, $file) = $item = explode(' ', $item);
                if ($operation == '-') {
                    @unlink($to_dir . $file);
                }
            }
            // 合并依赖
            $this->installDepend($code_dir . $version_no, array_column($change, 2));
        }

        // 覆盖文件
        if (is_dir($code_dir . $version_no)) {
            dir_copy($code_dir . $version_no, $to_dir);
            if ($addon != AddonDict::FRAMEWORK_KEY) {
                (new CoreAddonInstallService($addon))->installDir();
            }
        }

        $upgrade_file_dir = 'v' . str_replace('.', '', $version_no);
        if ($addon == AddonDict::FRAMEWORK_KEY) {
            $class_path = "\\app\\upgrade\\{$upgrade_file_dir}\\Upgrade";
            $sql_file = root_path() . 'app' .  DIRECTORY_SEPARATOR . 'upgrade' . DIRECTORY_SEPARATOR . $upgrade_file_dir . DIRECTORY_SEPARATOR . 'upgrade.sql';
        } else {
            $class_path = "\\addon\\{$addon}\\app\\upgrade\\{$upgrade_file_dir}\\Upgrade";
            $sql_file = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR . 'app' .  DIRECTORY_SEPARATOR . 'upgrade' . DIRECTORY_SEPARATOR . $upgrade_file_dir . DIRECTORY_SEPARATOR . 'upgrade.sql';
        }

        // 执行升级sql
        if (file_exists($sql_file)) {
            $this->executeSql($sql_file);
        }

        // 执行升级方法
        if (class_exists($class_path)) {
            (new $class_path())->handle();
        }

        $index ++;
        if ($index < count($version_list)) {
            return compact('index');
        } else {
            return true;
        }
    }

    /**
     * 合并依赖
     * @param string $version_no
     * @return void
     */
    public function installDepend(string $dir, array $change_files) {
        $addon = $this->upgrade_task['upgrade']['app_key'];
        $depend_service = new CoreDependService();

        if ($addon == AddonDict::FRAMEWORK_KEY) {
            $composer = '/niucloud/composer.json';
            $admin_package = '/admin/package.json';
            $web_package = '/web/package.json';
            $uniapp_package = '/uni-app/package.json';
        } else {
            $composer = "/niucloud/addon/{$addon}/package/composer.json";
            $admin_package = "/niucloud/addon/{$addon}/package/admin-package.json";
            $web_package = "/niucloud/addon/{$addon}/package/web-package.json";
            $uniapp_package = "/niucloud/addon/{$addon}/package/uni-app-package.json";
        }

        if (in_array($composer, $change_files)) {
            $original = $depend_service->getComposerContent();
            $new = $depend_service->jsonFileToArray($dir . $composer);

            if (isset($new['require'])) $original['require'] = array_merge($original['require'], $new['require']);
            if (isset($new['require_dev'])) $original['require_dev'] = array_merge($original['require_dev'], $new['require_dev']);

            $depend_service->writeArrayToJsonFile($original, $dir . $composer);
        }
        if (in_array($admin_package, $change_files)) {
            $original = $depend_service->getNpmContent('admin');
            $new = $depend_service->jsonFileToArray($dir . $admin_package);

            if (isset($new['dependencies'])) $original['dependencies'] = array_merge($original['dependencies'], $new['dependencies']);
            if (isset($new['devDependencies'])) $original['devDependencies'] = array_merge($original['devDependencies'], $new['devDependencies']);

            $depend_service->writeArrayToJsonFile($original, $dir . $admin_package);
        }
        if (in_array($web_package, $change_files)) {
            $original = $depend_service->getNpmContent('web');
            $new = $depend_service->jsonFileToArray($dir . $web_package);

            if (isset($new['dependencies'])) $original['dependencies'] = array_merge($original['dependencies'], $new['dependencies']);
            if (isset($new['devDependencies'])) $original['devDependencies'] = array_merge($original['devDependencies'], $new['devDependencies']);

            $depend_service->writeArrayToJsonFile($original, $dir . $web_package);
        }
        if (in_array($uniapp_package, $change_files)) {
            $original = $depend_service->getNpmContent('uni-app');
            $new = $depend_service->jsonFileToArray($dir . $uniapp_package);

            if (isset($new['dependencies'])) $original['dependencies'] = array_merge($original['dependencies'], $new['dependencies']);
            if (isset($new['devDependencies'])) $original['devDependencies'] = array_merge($original['devDependencies'], $new['devDependencies']);

            $depend_service->writeArrayToJsonFile($original, $dir . $uniapp_package);
        }
    }

    /**
     * 处理手机端
     * @param string $verson_no
     * @return true
     */
    public function handleUniapp() {
        $code_dir = $this->upgrade_dir .$this->upgrade_task['key'] . DIRECTORY_SEPARATOR . 'download' . DIRECTORY_SEPARATOR . 'code' . DIRECTORY_SEPARATOR;
        dir_copy($code_dir . 'uni-app', $this->root_path . 'uni-app');

        $addon_list = (new CoreAddonService())->getInstallAddonList();
        if (!empty($addon_list)) {

            foreach ($addon_list as $addon => $item) {
                $this->addon = $addon;

                // 编译 diy-group 自定义组件代码文件
                $this->compileDiyComponentsCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $addon);

                // 编译 fixed-group 固定模板组件代码文件
                $this->compileFixedComponentsCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $addon);

                // 编译 pages.json 页面路由代码文件
                $this->installPageCode($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR);

                // 编译 加载插件标题语言包
                $this->compileLocale($this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $addon);
            }
        }
        return true;
    }

    /**
     * 执行升级sql
     * @param string $sql_file
     * @return true
     */
    private function executeSql(string $sql_file) {
        $sql_content = file_get_contents($sql_file);

        if (!empty($sql_content)) {
            $prefix = config('database.connections.mysql.prefix');
            $sql_data = array_filter($this->getSqlQuery($sql_content));

            if (!empty($sql_data)) {
                foreach ($sql_data as $sql) {
                    $sql = $prefix ? $this->handleSqlPrefix($sql, $prefix) : $sql;
                    Db::query($sql);
                }
            }
        }
        return true;
    }

    /**
     * 刷新菜单
     * @return void
     */
    public function refreshMenu() {
        if ($this->upgrade_task['upgrade']['app_key'] == AddonDict::FRAMEWORK_KEY) {
            (new InstallSystemService())->installMenu();
        } else {
            (new CoreMenuService())->refreshAddonMenu($this->upgrade_task['upgrade']['app_key']);
        }
        return true;
    }

    /**
     * 安装计划任务
     * @return true
     */
    public function installSchedule() {
        if ($this->upgrade_task['upgrade']['app_key'] == AddonDict::FRAMEWORK_KEY) {
            (new CoreScheduleInstallService())->installSystemSchedule();
        } else {
            (new CoreScheduleInstallService())->installAddonSchedule($this->upgrade_task['upgrade']['app_key']);
        }
        return true;
    }

    /**
     * 更新完成
     * @return void
     */
    public function upgradeComplete() {
        $addon = $this->upgrade_task['upgrade']['app_key'];
        if ($addon != AddonDict::FRAMEWORK_KEY) {
            $core_addon_service = new CoreAddonService();
            $install_data = $core_addon_service->getAddonConfig($addon);
            $install_data['icon'] = 'addon/' . $addon . '/icon.png';
            $core_addon_service->set($install_data);
        }
        $this->clearUpgradeTask(5);
        return true;
    }

    /**
     * 升级出错之后的处理
     * @return true|void
     */
    public function upgradeErrorHandle() {
        try {
            if (isset($this->upgrade_task['is_cover'])) {
                $restore_service = (new RestoreService());
                $restore_service->restoreCode();
                $restore_service->restoreSql();
            }
            $this->clearUpgradeTask(5);
            return true;
        } catch (\Exception $e) {
            return true;
        }
    }

    /**
     * 获取升级内容
     * @param string $addon
     * @return array|\core\util\niucloud\Response|object|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getUpgradeContent(string $addon = '') {
        $upgrade = [
            'product_key' => BaseNiucloudClient::PRODUCT
        ];
        if (!$addon) {
            $upgrade['app_key'] = AddonDict::FRAMEWORK_KEY;
            $upgrade['version'] = config('version.version');
        } else {
            $upgrade['app_key'] = $addon;
            $upgrade['version'] = (new Addon())->where([ ['key', '=', $addon] ])->value('version');
        }

        return (new CoreModuleService())->getUpgradeContent($upgrade)['data'] ?? [];
    }

    /**
     * 获取正在进行的升级任务
     * @return mixed|null
     */
    public function getUpgradeTask() {
        return $this->upgrade_task;
    }

    /**
     * 清除升级任务
     * @return true
     */
    public function clearUpgradeTask(int $delayed = 0) {
        if ($delayed) {
            Cache::set($this->cache_key, $this->upgrade_task, $delayed);
        } else {
            Cache::set($this->cache_key, null);
        }
        return true;
    }

    /**
     * 获取插件定义的package目录
     * @param string $addon
     * @return string
     */
    public function geAddonPackagePath(string $addon)
    {
        return root_path() . 'addon' .DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR;
    }
}
