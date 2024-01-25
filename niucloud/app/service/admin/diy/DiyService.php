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

use app\dict\diy\ComponentDict;
use app\dict\diy\LinkDict;
use app\dict\diy\PagesDict;
use app\dict\diy\TemplateDict;
use app\model\diy\Diy;
use app\service\admin\sys\SystemService;
use app\service\core\addon\CoreAddonService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
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
     * 获取自定义页面分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = [ 'site_id', '=', $this->site_id ];
        $field = 'id,site_id,title,name,template,type,mode,is_default,share,visit_count,create_time,update_time';
        $order = "update_time desc";
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "title", "type", 'mode', 'addon_name' ], $where)->field($field)->order($order)->append([ 'type_name', 'type_page', 'addon_name' ]);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取自定义页面列表
     * @param array $where
     * @param string $field
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList(array $where = [], $field = 'id,title,name,template,type,mode,is_default,share,visit_count,create_time,update_time')
    {
        $order = "update_time desc";
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "title", "type", 'mode' ], $where)->field($field)->select()->order($order)->toArray();
    }

    /**
     * 获取自定义页面信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,title,name,template,type,mode,value,is_default,is_change,share,visit_count';
        return $this->model->field($field)->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
    }

    public function getInfoByName(string $name)
    {
        $field = 'id,site_id,title,name,template,type,mode,value,is_default,is_change,share,visit_count';
        return $this->model->field($field)->where([ [ 'name', '=', $name ], [ 'site_id', '=', $this->site_id ], [ 'is_default', '=', 1 ] ])->findOrEmpty()->toArray();
    }

    /**
     * 查询数量
     * @param array $where
     * @return int
     * @throws DbException
     */
    public function getCount(array $where = [])
    {
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'type' ], $where)->count();
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
    public function edit(int $id, array $data)
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
        return $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->delete();
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
            $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update([ 'is_default' => 1, 'update_time' => time() ]);
            Db::commit();
            return true;
        } catch (Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 页面加载初始化
     * @param array $params
     * @return array
     * @throws DbException
     */
    public function getInit(array $params = [])
    {
        $template = $this->getTemplate();

        $time = time();
        $data = [];
        if (!empty($params[ 'id' ])) {
            $data = $this->getInfo($params[ 'id' ]);
        } elseif (!empty($params[ 'name' ])) {
            $data = $this->getInfoByName($params[ 'name' ]);
        }

        if (!empty($params[ 'name' ])) {

            // 查询启动页配置
            $diy_config_service = new DiyConfigService();
            $start_up_page = $diy_config_service->getStartUpPageConfig($params[ 'name' ]);
            if (!empty($start_up_page)) {
                if ($start_up_page[ 'parent' ] == 'DIY_PAGE') {
                    $id = str_replace('/app/pages/index/diy?id=', '', $start_up_page[ 'page' ]);
                    $data = $this->getInfo($id);
                    if (!empty($data)) {
                        $params[ 'name' ] = $data[ 'name' ];
                        $params[ 'type' ] = $data[ 'type' ];
                    }
                } else {
                    foreach ($template as $k => $v) {
                        if ($start_up_page[ 'page' ] == $v[ 'page' ]) {
                            $data = $this->getInfoByName($k);
                            $params[ 'name' ] = $k;
                            $params[ 'type' ] = $k;
                            break;
                        }
                    }
                }
            }
        }

        if (!empty($data)) {
            // 编辑赋值

            if (isset($template[ $data[ 'type' ] ])) {
                $page = $template[ $data[ 'type' ] ];
                $data[ 'type_name' ] = $page[ 'title' ];
                $data[ 'page' ] = $page[ 'page' ];
            }
        } else {

            // 新页面赋值
            $title = $params[ 'title' ] ? : '页面' . $time;
            $type = $params[ 'type' ] ? : 'DIY_PAGE';
            $name = $type == 'DIY_PAGE' ? 'DIY_PAGE_RANDOM_' . $time : $type;
            $type_name = '';
            $template_name = ''; // 页面模板名称
            $page_route = ''; // 页面路径
            $mode = 'diy'; // 页面模式，diy：自定义，fixed：固定
            $value = '';
            $is_default = 0;

            // 查询默认第一个页面模板数据
            if (isset($template[ $params[ 'name' ] ])) {
                $page = $template[ $params[ 'name' ] ];
                $name = $params[ 'name' ];
                $type = $params[ 'name' ];
                $title = $page[ 'title' ];
                $type_name = $page[ 'title' ];
                $page_route = $page[ 'page' ];

                $page_data = $this->getFirstPageData($type);
                if (!empty($page_data)) {
                    $value = json_encode($page_data[ 'data' ], JSON_UNESCAPED_UNICODE);
                    $is_default = 1;
                    $template_name = $page_data[ 'template' ];
                    $mode = $page_data[ 'mode' ];
                }
            } else if (isset($template[ $type ])) {
                // 查询指定页面数据
                $page = $template[ $type ];
                $type_name = $page[ 'title' ];
                $page_route = $page[ 'page' ];

                // 如果页面类型一条数据也没有，那么要默认 使用中
                $count = $this->getCount([ 'type' => $type ]);
                if ($count == 0) {
                    $is_default = 1;
                }

            }

            $data = [
                'name' => $name,
                'title' => $title,
                'type' => $type,
                'type_name' => $type_name,
                'template' => $template_name,
                'page' => $page_route,
                'mode' => $mode,
                'value' => $value,
                'is_default' => $is_default
            ];

        }

        $data[ 'component' ] = $this->getComponentList($data[ 'type' ]);
        $data[ 'domain_url' ] = (new SystemService())->getUrl();

        // 查询已安装的有效的应用
        $data[ 'addon_list' ] = (new CoreAddonService())->getInstallAddonList();
        return $data;
    }

    /**
     * 获取组件列表
     * @param string $name 支持页面标识
     * @return array
     */
    public function getComponentList(string $name = '')
    {
        $data = ComponentDict::getComponent();
        foreach ($data as $k => $v) {
            // 查询组件支持的页面
            $sort_arr = [];
            foreach ($v[ 'list' ] as $ck => $cv) {
                $support_page = $cv[ 'support_page' ];
                if (!(count($support_page) == 0 || in_array($name, $support_page))) {
                    unset($data[ $k ][ 'list' ][ $ck ]);
                    continue;
                }

                $sort_arr [] = $cv[ 'sort' ];
                unset($data[ $k ][ 'list' ][ $ck ][ 'sort' ], $data[ $k ][ 'list' ][ $ck ][ 'support_page' ]);
            }
            array_multisort($sort_arr, SORT_ASC, $data[ $k ][ 'list' ]); //排序，根据 sort 排序
        }

        return $data;
    }

    /**
     * 获取自定义链接
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getLink()
    {
        $link = LinkDict::getLink();
        foreach ($link as $k => $v) {
            $link[ $k ][ 'name' ] = $k;
            if (!empty($v[ 'child_list' ])) {
                foreach ($v[ 'child_list' ] as $ck => $cv) {
                    $link[ $k ][ 'child_list' ][ $ck ][ 'parent' ] = $k;
                }
            }

            // 查询自定义页面
            if ($k == 'DIY_PAGE') {
                $diy_service = new DiyService();
                $list = $diy_service->getList([ 'type' => 'DIY_PAGE' ]);
                foreach ($list as $ck => $cv) {
                    $link[ $k ][ 'child_list' ][] = [
                        'name' => $cv[ 'name' ],
                        'title' => $cv[ 'title' ],
                        'url' => '/app/pages/index/diy?id=' . $cv[ 'id' ]
                    ];
                }

            }

            if ($k == 'DIY_LINK') {
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

    /**
     * 获取页面模板
     * @param array $params
     * @return array
     */
    public function getTemplate($params = [])
    {
        $page_template = TemplateDict::getTemplate($params);
        foreach ($page_template as $k => $v) {
            // 查询页面数据
            $page_params = [
                'type' => $k,
                'mode' => $params[ 'mode' ] ?? ''
            ];
            $page_template[ $k ][ 'template' ] = PagesDict::getPages($page_params);
        }
        return $page_template;
    }

    /**
     * 获取页面数据
     * @param $type
     * @param $name
     * @return array
     */
    public function getPageData($type, $name)
    {
        $pages = PagesDict::getPages([ 'type' => $type ]);
        return $pages[ $name ] ?? [];
    }

    /**
     * 获取默认页面数据
     * @param $type
     * @return array|mixed
     */
    public function getFirstPageData($type)
    {
        $pages = PagesDict::getPages([ 'type' => $type ]);
        if (!empty($pages)) {
            $template = array_key_first($pages);
            $page = array_shift($pages);
            $page[ 'template' ] = $template;
            $page[ 'type' ] = $type;
            return $page;
        }
        return [];
    }

    /**
     * 获取页面装修列表
     * @param $params
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getDecoratePage($params)
    {

        // 查询当前装修的页面信息
        $template = $this->getTemplate([ 'action' => 'decorate', 'type' => [ $params[ 'type' ] ] ])[ $params[ 'type' ] ];

        $template[ 'domain_url' ] = (new SystemService())->getUrl();

        // 查询默认页面数据
        $default_page_data = $this->getFirstPageData($params[ 'type' ]);

        // 查询其他页面，排除特定页面（不能分享的页面）
        $other_page = (new DiyRouteService())->getList();

        $use_template = [
            'type' => $params[ 'type' ], // 页面类型标识
            'name' => '', // 链接标识
            'parent' => '', // 链接标识
            'title' => $default_page_data[ 'title' ], // 模板名称
            'cover' => $default_page_data[ 'cover' ], // 封面图
            'url' => '', // 自定义页面链接，实时预览效果
            'page' => $template[ 'page' ], // 页面地址
            'action' => $template[ 'action' ] // 是否存在操作，decorate 表示支持装修
        ];

        // 查询启动页配置
        $diy_config_service = new DiyConfigService();
        $start_up_page = $diy_config_service->getStartUpPageConfig($params[ 'type' ]);

        // 查询页面数据
        $info = $this->getInfoByName($params[ 'type' ]);

        if (!empty($start_up_page)) {
            $use_template[ 'title' ] = $start_up_page[ 'title' ] ?? '';
            $use_template[ 'name' ] = $start_up_page[ 'name' ] ?? '';
            $use_template[ 'page' ] = $start_up_page[ 'page' ] ?? '';
            $use_template[ 'action' ] = $start_up_page[ 'action' ] ?? '';
            $use_template[ 'url' ] = $use_template[ 'page' ];
            $use_template[ 'parent' ] = $start_up_page[ 'parent' ] ?? '';
        } elseif (!empty($info)) {
            $use_template[ 'id' ] = $info[ 'id' ];
            $use_template[ 'title' ] = $info[ 'title' ];

            // 查询链接的名称标识
            foreach ($other_page as $ck => $cv) {
                if ($cv[ 'page' ] == $use_template[ 'page' ]) {
                    $use_template[ 'name' ] = $cv[ 'name' ];
                    $use_template[ 'parent' ] = $cv[ 'parent' ];
                    break;
                }
            }

            // 查询模板页面数据
            $page_data = $this->getPageData($params[ 'type' ], $info[ 'template' ]);
            if (!empty($page_data)) {
                $use_template[ 'url' ] = $template[ 'page' ] . '?id=' . $info[ 'id' ];
                // $use_template[ 'cover' ] = $page_data[ 'cover' ]; // 默认图
            } else {
                // 自定义页面，实时预览效果
                $use_template[ 'url' ] = '/app/pages/index/diy?id=' . $info[ 'id' ];
                // 清空模板信息
                $use_template[ 'cover' ] = ''; // 默认图
            }
        }

        // 如果没有预览图，并且没有地址，则赋值默认页面地址
        if (empty($use_template[ 'cover' ]) && empty($use_template[ 'url' ])) {
            $use_template[ 'url' ] = $template[ 'page' ];
        }

        $template[ 'use_template' ] = $use_template;

        return $template;
    }

    /**
     * 设置启动页
     * @param array $params
     * @return \app\model\sys\SysConfig|bool|\think\Model
     */
    public function changeTemplate(array $params = [])
    {
        $start_up_page_data = [
            'type' => $params[ 'type' ], // 页面类型
            'name' => $params[ 'name' ], // 链接名称标识
            'parent' => $params[ 'parent' ], // 链接父级名称标识
            'page' => $params[ 'page' ], // 链接路由
            'title' => $params[ 'title' ], // 链接标题
            'action' => $params[ 'action' ] // 是否存在操作，decorate 表示支持装修
        ];
        $diy_config_service = new DiyConfigService();
        $res = $diy_config_service->setStartUpPageConfig($start_up_page_data);
        return $res;
    }

    /**
     * 获取模板页面的应用插件列表
     * @return array
     */
    public function getApps()
    {
        $page_template = TemplateDict::getTemplate([
            'query' => 'addon'
        ]);
        return $page_template;
    }

}
