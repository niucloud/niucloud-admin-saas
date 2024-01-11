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
use app\model\addon\Addon;
use app\service\admin\site\SiteGroupService;
use app\service\core\niucloud\CoreModuleService;
use think\db\exception\DbException;
use Throwable;

/**
 * 安装服务层
 * Class CoreInstallService
 * @package app\service\core\install
 */
class CoreAddonService extends CoreAddonBaseService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Addon();
    }

    /**
     * 获取已下载的插件
     * @return array
     */
    public function getLocalAddonList()
    {
        $list = [];
        $online_app_list = [];
        $install_addon_list = $this->model->append(['status_name'])->column('title, icon, key, desc, status, author, version, install_time, update_time, cover', 'key');
        try {
            $niucloud_module_list = (new CoreModuleService())->getModuleList()['data'] ?? [];
            foreach ($niucloud_module_list as $v) {
                $data = array(
                    'title' => $v['app']['app_name'],
                    'desc' => $v['app']['app_desc'],
                    'key' => $v['app']['app_key'] ?? '',
                    'version' => $v['version'] ?? '',
                    'author' => $v['app']['app_name'],
                    'type' => $v['app']['app_type'],
                    'support_app' => $v['app']['support_channel'] ?? [],
                    'is_download' => false,
                    'is_local' => false,
                    'icon' => $v['app']['app_logo'],
                    'cover' => $v['app']['window_logo'][0],
                );
                $data['install_info'] = $install_addon_list[$v['app']['app_key']] ?? [];
                $list[$v['app']['app_key']] = $data;
            }
            $online_app_list = array_column($list, 'key');
        } catch ( Throwable $e ) {
            $error = $e->getMessage();
        }
        $files = get_files_by_dir($this->addon_path);
        if (!empty($files)) {
            foreach ($files as $path) {
                $data = $this->getAddonConfig($path);
                if (isset($data['key'])) {
                    $data['icon'] = is_file($data['icon']) ? image_to_base64($data['icon']) : '';
                    $data['cover'] = is_file($data['cover']) ? image_to_base64($data['cover']) : '';
                    $key = $data['key'];
                    $data['install_info'] = $install_addon_list[$key] ?? [];
                    $data['is_download'] = true;
                    $data['is_local'] = in_array($data['key'], $online_app_list) ? false : true;
                    $data['version'] = isset($list[ $data['key'] ]) ? $list[ $data['key'] ]['version'] : $data['version'];
                    $list[$key] = $data;
                }
            }
        }
        return ['list' => $list, 'error' => $error ?? ''];
    }

    /**
     * 已下载的插件数量
     * @return int
     */
    public function getLocalAddonCount()
    {
        $files = get_files_by_dir($this->addon_path);
        return count($files);
    }

    /**
     * 获取已安装插件数量
     * @param array $where
     * @return int
     * @throws DbException
     */
    public function getCount(array $where = [])
    {

        return $this->model->where($where)->count();
    }

    /**
     * 安装的插件分页
     * @param array $where
     * @return array
     * @throws DbException
     * @throws DbException
     */
    public function getPage(array $where)
    {
        $field = 'id, title, key, desc, version, status, icon, create_time, install_time';
        $search_model = $this->model->where([])->withSearch(['title'], $where)->field($field)->order('id desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 插件详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        return $this->model->where([['id', '=', $id]])->findOrEmpty()->toArray();
    }

    /**
     * 设置插件(安装或更新)
     * @param array $params
     * @return true
     */
    public function set(array $params)
    {
        $title = $params['title'];
        $key = $params['key'];
        $addon = $this->model->where([
            ['key', '=', $key],
        ])->findOrEmpty();
        $version = $params['version'];//版本号
        $desc = $params['desc'];
        $icon = $params['icon'];
        $data = array(
            'title' => $title,
            'version' => $version,
            'status' => 1,
            'desc' => $desc,
            'icon' => $icon,
            'key' => $key,
            'compile' => $params['compile'] ?? [],
            'type' => $params['type'],
            'support_app' => $params['support_app'] ?? ''
        );
        if ($addon->isEmpty()) {
            $data['install_time'] = time();
            $this->model->create($data);
        } else {
            $data['update_time'] = time();
            $addon->save($data);
        }
        return true;
    }

    /**
     * 通过key查询插件
     * @param string $key
     * @return array
     */
    public function getInfoByKey(string $key)
    {
        return $this->model->where([['key', '=', $key]])->findOrEmpty()->toArray();
    }

    /**
     * 通过插件名删除插件
     * @param string $key
     * @return true
     */
    public function delByKey(string $key)
    {
        $this->model->where([['key', '=', $key]])->delete();
        return true;
    }

    /**
     * 修改插件状态
     * @param int $id
     * @param int $status
     * @return true
     */
    public function setStatus(int $id, int $status)
    {
        $this->model->where([['id', '=', $id]])->update(['status' => $status]);
        return true;
    }

    public function getAppList()
    {
        return event('addon', []);
    }

    /**
     * 查询已安装的有效的应用
     * @return array
     */
    public function getInstallAddonList(){
        return $this->model->where([['status', '=', AddonDict::ON]])->append(['status_name'])->column('title, icon, key, desc, status, type, support_app', 'key');
    }

    /**
     * 开发者插件
     * @return array
     */
    public function getAddonDevelopList(string $search = '')
    {
        $list = [];

        $install_addon_list = (new Addon())->append(['status_name', 'type_name'])->column('title, icon, key, desc, status, author, version, install_time, update_time, cover, type', 'key');
        $files = get_files_by_dir($this->addon_path);
        if (!empty($files)) {
            $core_addon_service = new CoreAddonService();
            foreach ($files as $path) {
                $data = $core_addon_service->getAddonConfig($path);
                if (isset($data['key'])) {
                    $key = $data['key'];
                    $data['install_info'] = $install_addon_list[$key] ?? [];
                    $data['icon'] = is_file($data['icon']) ? image_to_base64($data['icon']) : '';
                    $data['cover'] = is_file($data['cover']) ? image_to_base64($data['cover']) : '';
                    $data['is_download'] = true;
                    $data['type_name'] = empty($data['type']) ? '' : AddonDict::getType()[$data['type']] ?? '';
                    $list[$key] = $data;
                }
            }
        }

        if ($search) {
            foreach ($list as $k => $v) {
                if (!str_contains($v['title'], $search)) unset($list[$k]);
            }
        }
        return array_values($list);
    }

    /**
     * 应用详情
     * @param string $key
     * @return array
     */
    public function getAddonDevelopInfo(string $key)
    {
        $dir = $this->addon_path . $key . DIRECTORY_SEPARATOR;
        if (!is_dir($dir)) return [];
        $core_addon_service = new CoreAddonService();

        $data = $core_addon_service->getAddonConfig($key);
        if (isset($data['key'])) {
            $data['icon'] = is_file($data['icon']) ? image_to_base64($data['icon']) : '';
            $data['cover'] = is_file($data['icon']) ? image_to_base64($data['cover']) : '';
            $data['type_name'] = empty($data['type']) ? '' : AddonDict::getType()[$data['type']] ?? '';
        }
        if(isset($data['support_app']) && !empty($data['support_app']))
        {
            $data['support_type'] = 2;
        }else{
            $data['support_type'] = 1;
        }
        return $data;
    }

}
