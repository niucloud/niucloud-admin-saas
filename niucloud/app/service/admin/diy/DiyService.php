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

namespace app\service\admin\diy;

use app\enum\diy\ComponentBasicsEnum;
use app\enum\diy\ComponentTypeEnum;
use app\enum\diy\LinkEnum;
use app\enum\diy\PageEnum;
use app\model\diy\Diy;
use app\service\admin\BaseAdminService;
use Exception;
use think\facade\Db;

/**
 * 自定义页面服务层
 * Class DiyService
 * @package app\service\admin\diy
 */
class DiyService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Diy();
    }

    /**
     * 获取自定义页面列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = [ 'site_id', '=', $this->site_id ];
        $field = 'id,site_id,title,name,type,is_default,share,visit_count,create_time,update_time';
        $order = "is_default desc,update_time desc";
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "title", "type" ], $where)->field($field)->order($order)->append([ 'type_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * @param array $where
     * @return array
     */
    public function getList(array $where = [])
    {
        $where[] = [ 'site_id', '=', $this->site_id ];
        $field = 'id,site_id,title,name,type,is_default,share,visit_count,create_time,update_time';
        $order = "is_default desc,update_time desc";
        $list = $this->model->where($where)->field($field)->select()->order($order)->toArray();
        return $list;

    }

    /**
     * 获取自定义页面信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,title,name,type,value,is_default,share,visit_count';

        $info = $this->model->field($field)->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    public function getInfoByName(string $name)
    {
        $field = 'id,site_id,title,name,type,value,is_default,share,visit_count';
        $info = $this->model->field($field)->where([ [ 'name', '=', $name ], [ 'site_id', '=', $this->site_id ], [ 'is_default', '=', 1 ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加自定义页面
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'create_time' ] = time();
        $data[ 'update_time' ] = time();

        //  添加新页面，默认为1
        if (!empty($data[ 'type' ]) && $data[ 'type' ] == 'DIY_PAGE') {
            $data[ 'is_default' ] = 1;
        }

        // 将同类型页面的默认值改为0，默认页面只有一个
        if (!empty($data[ 'is_default' ])) {
            $this->model->where([ [ 'name', '=', $data[ 'name' ] ], [ 'site_id', '=', $data[ 'site_id' ] ] ])->update([ 'is_default' => 0 ]);
        }
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 自定义页面编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data)
    {
        $data[ 'update_time' ] = time();
        $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除自定义页面
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->delete();
        return $res;
    }

    /**
     * 设为使用
     * @param int $id
     * @return bool
     * @throws Exception
     */
    public function setUse(int $id)
    {
        try {
            $info = $this->getInfo($id);
            if (empty($info)) {
                return false;
            }
            Db::startTrans();
            $this->model->where([ [ 'name', '=', $info[ 'name' ] ], [ 'site_id', '=', $this->site_id ] ])->update([ 'is_default' => 0 ]);
            $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update([ 'is_default' => 1 ]);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new Exception($e->getMessage());
        }
    }

    /**
     * 页面加载初始化
     * @param array $params
     * @return array
     */
    public function getInit(array $params = [])
    {
        $page_type = PageEnum::getPageType();

        $time = time();
        $data = [];
        if (!empty($params[ 'id' ])) {
            $data = $this->getInfo($params[ 'id' ]);
        } elseif (!empty($params[ 'name' ])) {
            $data = $this->getInfoByName($params[ 'name' ]);
        }

        if (!empty($data)) {
            if (isset($page_type[ $data[ 'type' ] ])) {
                $page = $page_type[ $data[ 'type' ] ];
                $data[ 'type_name' ] = $page[ 'type_name' ];
                $data[ 'page' ] = $page[ 'page' ];
            }
        } else {
            // 空页面赋值
            $type = 'DIY_PAGE';
            $type_name = '';
            $name = $params[ 'name' ];
            $page_route = '';
            if (isset($page_type[ $params[ 'type' ] ])) {
                $page = $page_type[ $params[ 'type' ] ];
                $name = $page[ 'type' ] == 'DIY_PAGE' ? 'DIY_PAGE_RANDOM_' . $time : $page[ 'type' ];
                $type = $page[ 'type' ];
                $type_name = $page[ 'type_name' ];
                $page_route = $page[ 'page' ];
            }
            $data = [
                'name' => $name,
                'title' => $params[ 'title' ] ? $params[ 'title' ] : '页面' . $time,
                'type' => $type,
                'type_name' => $type_name,
                'page' => $page_route,
                'value' => '',
            ];

            if (isset($page_type[ $params[ 'name' ] ])) {
                $page = $page_type[ $params[ 'name' ] ];
                $data[ 'name' ] = $page[ 'type' ];
                $data[ 'title' ] = $page[ 'type_name' ];
                $data[ 'type_name' ] = $page[ 'type_name' ];
                $data[ 'page' ] = $page[ 'page' ];
            }
        }
        $data[ 'component' ] = $this->getComponentList($data[ 'name' ]);
        return $data;
    }

    /**
     * 获取组件列表
     * @param string $name 支持页面标识
     * @return array
     */
    public function getComponentList(string $name = '')
    {
        $type_list = ComponentTypeEnum::getType();
        $diy_view_utils = [];
        foreach ($type_list as $k => $v) {
            $value = [
                'type' => $k,
                'type_name' => $v,
                'list' => []
            ];
            if ($k == 'BASICS') {
                $list = ComponentBasicsEnum::getComponent();
                if (!empty($list)) {
                    $sort_arr = [];
                    foreach ($list as $ck => $cv) {
                        // 查询组件支持的页面
                        if (count($cv[ 'support_page' ]) == 0 || in_array($name, $cv[ 'support_page' ])) {
                            $sort_arr [] = $cv[ 'sort' ];
                            unset($cv[ 'sort' ]);
                            unset($cv[ 'support_page' ]);
                            $value[ 'list' ][] = $cv;
                        }
                    }

                    array_multisort($sort_arr, SORT_ASC, $value[ 'list' ]); //排序，根据num 排序
                }
            }
            $diy_view_utils[] = $value;
        }

        return $diy_view_utils;
    }

    /**
     * 获取自定义链接
     * @return array
     */
    public function getLink()
    {
        $link = LinkEnum::getLink();
        foreach ($link as $k => $v) {
            if (!empty($v[ 'child_list' ])) {
                foreach ($v[ 'child_list' ] as $ck => $cv) {
                    $link[ $k ][ 'child_list' ][ $ck ][ 'parent' ] = $v[ 'name' ];
                }
            }

            // 查询自定义页面
            if ($v[ 'name' ] == 'DIY_PAGE') {
                $diy_service = new DiyService();
                $list = $diy_service->getList([ [ 'type', '=', 'DIY_PAGE' ] ]);
                foreach ($list as $ck => $cv) {
                    $link[ $k ][ 'child_list' ][] = [
                        'name' => $cv[ 'name' ],
                        'title' => $cv[ 'title' ],
                        'url' => '/pages/index/diy?id=' . $cv[ 'id' ]
                    ];
                }

            }

            if ($v[ 'name' ] == 'DIY_LINK') {
                $link[ $k ][ 'parent' ] = 'DIY_LINK';
            }

        }
        return $link;
    }

    /**
     * 修改分享内容
     * @param int $id
     * @param $data
     * @return bool
     */
    public function modifyShare(int $id, $data)
    {
        $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update([ 'share' => $data[ 'share' ] ]);
        return true;
    }


}