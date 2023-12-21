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

namespace app\service\core\upgrade;

use app\dict\addon\AddonDict;
use app\model\addon\Addon;
use app\service\core\addon\CoreAddonCloudService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use core\util\niucloud\BaseNiucloudClient;
use think\facade\Cache;

/**
 * 框架及插件升级
 * @package app\service\core\upgrade
 */
class CoreUpgradeService extends BaseCoreService
{
    protected $upgrade_dir;

    protected $root_path;
    protected $cache_key = 'upgrade';

    protected $upgrade_task = null;

    private $steps = [
        'downloadFile' => ['step' => 'downloadFile', 'title' => '下载更新文件'],
        'backupCode' => ['step' => 'backupCode', 'title' => '备份源码'],
        'backupSql' => ['step' => 'backupSql', 'title' => '备份数据库'],
        'coverCode' => ['step' => 'coverCode', 'title' => '合并更新文件'],
        'executeUpgrade' => ['step' => 'executeUpgrade', 'title' => '执行升级方法']
    ];

    public function __construct()
    {
        parent::__construct();

        $this->root_path = dirname(root_path()) . DIRECTORY_SEPARATOR;
        $this->upgrade_dir = $this->root_path . 'upgrade' . DIRECTORY_SEPARATOR;
        $this->upgrade_task = Cache::get($this->cache_key);
    }

    /**
     * 升级
     * @param $addon
     * @return array
     */
    public function upgrade(string $addon = '') {
//        if ($this->upgrade_task) throw new CommonException('UPGRADE_TASK_EXIST');

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
                'step' => 'downloadFile',
                'executed' => ['downloadFile'],
                'log' => [ $this->steps['downloadFile']['title'] ]
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
        $steps = array_keys($this->steps);
        $index = array_search($this->upgrade_task['step'], $steps);
        $step = $steps[ $index + 1 ] ?? '';
        if ($step) {
            try {
                $this->$step();

                $this->upgrade_task['step'] = $step;
                $this->upgrade_task['executed'][] = $step;
            } catch (\Exception $e) {
                $this->upgrade_task['error'] = $e->getMessage();
            }
            Cache::set($this->cache_key, $this->upgrade_task);
            return true;
        } else {
            return true;
        }
    }

    /**
     * 备份源码
     * @return true
     */
    public function backupCode() {
        (new CoreBackupService())->backupCode();
        return true;
    }

    /**
     * 备份数据库
     * @return true
     */
    public function backupSql() {
        (new CoreBackupService())->backupSql();
        return true;
    }

    public function coverCode() {

    }

    public function executeUpgrade() {

    }

    /**
     * 升级出错之后的处理
     * @return true|void
     */
    public function upgradeErrorHandle() {
        try {
            $restore_service = (new CoreRestoreService());
            $restore_service->restoreCode();
            $restore_service->restoreSql();
            return true;
        } catch (\Exception $e) {
            return true;
        }
    }
}
