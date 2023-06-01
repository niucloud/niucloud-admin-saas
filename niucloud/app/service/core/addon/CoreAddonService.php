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

use app\model\addon\Addon;

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
        $files = get_files_by_dir($this->addon_path);
        $list = [];
        if(!empty($files)){
            $install_addon_list = $this->model->append(['status_name'])->column('title, icon, key, desc, status, author, version, install_time, update_time, cover', 'key');
            foreach($files as $path) {
                $data = $this->getAddonConfig($path);
                if(isset($data['key']))
                {
                    $icon = addon_resource($data['key'], "icon.png");
                    $data['icon'] = is_file($icon) ? $icon : '';
                    $cover = addon_resource($data['key'], "cover.png");
                    $data['cover'] = is_file($cover) ? $cover : '';
                    $key = $data['key'];
                    $data['install_info'] = $install_addon_list[$key] ?? [];
                    $list[] = $data;
                }

            }
        }
        return $list;
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
     * @throws \think\db\exception\DbException
     */
    public function getCount(array $where = []){

        return $this->model->where($where)->count();
    }
    /**
     * 安装的插件分页
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where){
        $field = 'id, title, key, desc, version, status, icon, create_time, install_time';
        $search_model = $this->model->where([])->withSearch(['title'],$where)->field($field)->order('id desc');
        $data = $this->pageQuery($search_model);
        return $data;
    }

    /**
     * 插件详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id){
        return $this->model->where([['id', '=', $id]])->findOrEmpty()->toArray();
    }

    /**
     * 设置插件(安装或更新)
     * @param array $params
     * @return true
     */
    public function set(array $params){
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
            'key' => $key
        );
        if($addon->isEmpty()){
            $data['install_time'] = time();
            $this->model->create($data);
        }else{
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
    public function getInfoByKey(string $key){
        return $this->model->where([['key', '=', $key]])->findOrEmpty()->toArray();
    }
    /**
     * 通过插件名删除插件
     * @param string $key
     * @return true
     */
    public function delByKey(string $key){
        $this->model->where([['key', '=', $key]])->delete();
        return true;
    }

    /**
     * 修改插件状态
     * @param int $id
     * @param int $status
     * @return void
     */
    public function setStatus(int $id, int $status){
        $this->model->where([['id', '=', $id]])->update(['status' => $status]);
        return true;
    }

    public function getAppList(){
        return event('addon', []);
    }
}