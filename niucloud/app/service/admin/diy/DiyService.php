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
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "title", "type", 'mode' ], $where)->field($field)->order($order)->append([ 'type_name' ]);
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
        } catch ( Exception $e) {
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

        if (!empty($data)) {
            // 编辑赋值
            if (isset($template[ $data[ 'type' ] ])) {
                $page = $template[ $data[ 'type' ] ];
                $data[ 'type_name' ] = $page[ 'title' ];
                $data[ 'page' ] = $page[ 'page' ];
            }
        } else {

            // 新页面赋值
            $title = $params[ 'title' ] ?: '页面' . $time;
            $type = $params[ 'type' ] ?: 'DIY_PAGE';
            $name = $type == 'DIY_PAGE' ? 'DIY_PAGE_RANDOM_' . $time : $type;
            $type_name = '';
            $template_name = $params[ 'template' ] ?? ''; // 页面模板名称
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

                if (!empty($params[ 'template' ])) {
                    $page_template = $page[ 'template' ][ $params[ 'template' ] ];
                    $mode = $page_template[ 'mode' ];
                    $page_data = $page_template[ 'data' ];
                    $page_data[ 'global' ][ 'title' ] = $title;
                    $value = json_encode($page_data, JSON_UNESCAPED_UNICODE);
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
        $data[ 'domain_url' ] = ( new SystemService() )->getUrl();
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
                if (!( count($support_page) == 0 || in_array($name, $support_page) )) {
                    unset($data[ $k ][ 'list' ][ $ck ]);
                    continue;
                }

                $sort_arr [] = $cv[ 'sort' ];
                unset($data[$k]['list'][$ck]['sort'], $data[$k]['list'][$ck]['support_page']);
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
                        'url' => '/pages/index/diy?id=' . $cv[ 'id' ]
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
        return $pages[$name] ?? [];
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
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getDecoratePage()
    {

        // 查询可装修的页面
        $template = $this->getTemplate([ 'action' => 'decorate', 'type' => [ 'DIY_INDEX', 'DIY_MEMBER_INDEX' ] ]);
        $specific_page = array_column($template, 'page');

        // 查询其他页面，排除特定页面
        $other_page = ( new DiyRouteService() )->getList();
        foreach ($other_page as $ck => $cv) {
            if (in_array(substr($cv[ 'page' ], 1), $specific_page) || $cv[ 'is_share' ] == 0) {
                unset($other_page[ $ck ]);
            }
        }
        $other_page = array_values($other_page);

        $diy_config_service = new DiyConfigService();

        // 遍历查询页面数据，使用了那套模板
        foreach ($template as $k => $v) {

            $template[ $k ][ 'domain_url' ] = ( new SystemService() )->getUrl();

            // 查询我的微页面
            $template[ $k ][ 'my_page' ] = $this->getList([ 'type' => $k ], 'id,title,name,template,type,is_default,mode');

            // 查询其他页面，排除特定页面
            $template[ $k ][ 'other_page' ] = $other_page;

            // 查询默认页面数据
            $default_page_data = $this->getFirstPageData($k);
            $use_template = [
                'id' => 0,
                'name' => $k,
                'title' => $default_page_data[ 'title' ], // 模板名称
                'template' => $default_page_data[ 'template' ], // 模板标识
                'cover' => $default_page_data[ 'cover' ], // 封面图
                'preview' => $default_page_data[ 'preview' ], // 预览图
                'desc' => $default_page_data[ 'desc' ], // 模板描述
                'mode' => $default_page_data[ 'mode' ], // 页面模式：diy：自定义，fixed：固定
                'hope' => 'template', // 默认选中 模板
                'url' => '', // 自定义页面链接，实时预览效果
                'page' => $v[ 'page' ], // 页面地址
                'action' => '' // 是否存在操作，decorate 表示支持装修
            ];

            // 查询启动页配置
            $start_up_page = $diy_config_service->getStartUpPageConfig($k);
            if (!empty($start_up_page)) {
                $use_template[ 'name' ] = $k;
                if ($start_up_page[ 'mode' ] == 'other') {
                    if (empty($start_up_page[ 'name' ])) {
                        // 查询页面的名称标识
                        foreach ($other_page as $ck => $cv) {
                            if ($cv[ 'page' ] == $start_up_page[ 'page' ]) {
                                $use_template[ 'name' ] = $cv['name'];
                                break;
                            }
                        }
                    }
                }
                $use_template[ 'hope' ] = $start_up_page[ 'mode' ];
                $use_template[ 'mode' ] = $start_up_page[ 'mode' ];
                $use_template[ 'page' ] = $start_up_page[ 'page' ];
                $use_template[ 'action' ] = $start_up_page[ 'action' ] ?? '';
                if ($use_template[ 'hope' ] == 'other') {
                    // 其他页面没有预览图
                    $use_template[ 'url' ] = $use_template[ 'page' ];
                    $use_template[ 'cover' ] = ''; // 默认图
                    $use_template[ 'template' ] = '';
                    $use_template[ 'desc' ] = '将 ' . $start_up_page[ 'title' ] . ' 设为首页';
                }
            } else {

                // 查询页面数据
                $info = $this->getInfoByName($k);

                if (!empty($info)) {
                    $use_template[ 'id' ] = $info[ 'id' ];
                    $use_template[ 'name' ] = $info[ 'name' ];
                    $use_template[ 'title' ] = $info[ 'title' ];
                    $use_template[ 'template' ] = $info[ 'template' ];
                    $use_template[ 'mode' ] = $info[ 'mode' ];
                    $use_template[ 'hope' ] = $info[ 'mode' ] == 'fixed' ? 'template' : $info[ 'mode' ];
                    $use_template[ 'preview' ] = ''; // 默认图
                    $use_template[ 'desc' ] = '通过自定义装修的页面';

                    // 查询模板页面数
                    $page_data = $this->getPageData($k, $use_template[ 'template' ]);
                    if (!empty($page_data)) {
                        if ($info[ 'is_change' ] == 1) {
                            // 修改过模板，预览实际内容
                            $use_template[ 'url' ] = $v[ 'page' ] . '?id=' . $info[ 'id' ];
                        } else {
                            $use_template[ 'cover' ] = $page_data[ 'cover' ]; // 默认图
                            $use_template[ 'desc' ] = $page_data[ 'desc' ];
                            if (empty($page_data[ 'cover' ])) {
                                $use_template[ 'url' ] = $v[ 'page' ] . '?id=' . $info[ 'id' ];
                            }
                        }
                    } else {
                        // 自定义页面，实时预览效果
                        $use_template[ 'url' ] = '/app/pages/index/diy?id=' . $info[ 'id' ];
                        // 清空模板信息
                        $use_template[ 'cover' ] = ''; // 默认图
                        $use_template[ 'template' ] = '';
                        $use_template[ 'mode' ] = 'diy';
                        $use_template[ 'hope' ] = $use_template[ 'mode' ];
                    }
                }
            }

            // 如果没有预览图，并且没有地址，则赋值
            if (empty($use_template[ 'cover' ]) && empty($use_template[ 'url' ])) {
                $use_template[ 'url' ] = $v[ 'page' ];
            }

            $template[ $k ][ 'use_template' ] = $use_template;
        }

        return $template;
    }

    public function changeTemplate(array $params = [])
    {

        $info = [];
        if ($params[ 'mode' ] == 'diy') {
            // 自定义页面

            // 查询
            if (!empty($params[ 'id' ])) {
                // 使用了微页面
                $info = $this->getInfo($params[ 'id' ]);
                if (!empty($info)) {
                    // 状态 变为 使用中
                    $this->setUse($info[ 'id' ]);
                }
            } elseif ($params[ 'template' ]) {

                // 查询表中未修改的模板数据
                $field = 'id,title,type';
                $condition = [
                    [ 'site_id', '=', $this->site_id ],
                    [ 'type', '=', $params[ 'type' ] ],
                    [ 'template', '=', $params[ 'template' ] ],
                    [ 'mode', '=', $params[ 'mode' ] ],
                    [ 'is_change', '=', 0 ]
                ];
                $info = $this->model->field($field)->where($condition)->findOrEmpty()->toArray();
                if (!empty($info)) {
                    // 状态 变为 使用中
                    $this->setUse($info[ 'id' ]);
                } else {
                    // 新增 数据

                    // 查询模板信息
                    $page_data = $this->getPageData($params[ 'type' ], $params[ 'template' ]);

                    $data = [
                        'title' => $page_data[ 'title' ],
                        'name' => $params[ 'type' ],
                        'type' => $params[ 'type' ],
                        'value' => json_encode($page_data[ 'data' ], JSON_UNESCAPED_UNICODE),
                        'template' => $params[ 'template' ],
                        'mode' => $params[ 'mode' ]
                    ];
                    $res = $this->add($data);
                    $this->setUse($res);
                    $info = $data;
                }

            }

            $page_template = TemplateDict::getTemplate([ 'type' => [ $info[ 'type' ] ] ])[ $info[ 'type' ] ];
            $info[ 'page' ] = $page_template[ 'page' ];

        } elseif ($params[ 'mode' ] == 'fixed') {
            // 固定模板

            // 查询模板信息
            $page_data = $this->getPageData($params[ 'type' ], $params[ 'template' ]);

            // 检查表里是否存在数据
            $field = 'id,title,type';
            $condition = [
                [ 'type', '=', $params[ 'type' ] ],
                [ 'template', '=', $params[ 'template' ] ],
                [ 'mode', '=', $params[ 'mode' ] ]
            ];
            $info = $this->model->field($field)->where($condition)->findOrEmpty()->toArray();
            if (!empty($info)) {
                // 状态 变为 使用中
                $this->setUse($info[ 'id' ]);
            } else {
                // 新增 数据
                $data = [
                    'title' => $page_data[ 'title' ],
                    'name' => $params[ 'type' ],
                    'type' => $params[ 'type' ],
                    'value' => json_encode($page_data[ 'data' ], JSON_UNESCAPED_UNICODE),
                    'template' => $params[ 'template' ],
                    'mode' => $params[ 'mode' ]
                ];
                $res = $this->add($data);
                $this->setUse($res);
                $info = $data;
            }

            $page_template = TemplateDict::getTemplate([ 'type' => [ $info[ 'type' ] ] ])[ $info[ 'type' ] ];
            $info[ 'page' ] = $page_template[ 'page' ];

        } else if ($params[ 'mode' ] == 'other') {
            // 其他页面
            $info[ 'title' ] = $params[ 'title' ];
            $info[ 'page' ] = $params[ 'page' ];
        }

        // 设置启动页
        $start_up_page_data = [
            'type' => $params[ 'type' ], // 页面类型
            'name' => $params[ 'name' ], // 页面名称标识
            'mode' => $params[ 'mode' ], // 模式：diy：自定义页面，fixed：模板，other：其他页面
            'title' => $info[ 'title' ],
            'page' => $info[ 'page' ],
            'action' => $params[ 'action' ]
        ];
        $diy_config_service = new DiyConfigService();
        $diy_config_service->setStartUpPageConfig($start_up_page_data);
        return $info;
    }

    /**
     * 获取页面预览数据
     * @param array $params
     * @return array
     */
    public function getPreviewData(array $params = [])
    {
        $info = [];
        if (!empty($params[ 'id' ])) {
            $info = $this->getInfo($params[ 'id' ]);
        } elseif (!empty($params[ 'name' ])) {
            $info = $this->getInfoByName($params[ 'name' ]);
        }

        $res = [
            'page' => $this->getTemplate([ 'type' => 'DIY_PAGE' ])[ 'DIY_PAGE' ][ 'page' ]
        ];

        if (!empty($info)) {
            if ($info[ 'is_default' ] == 1) {
                $template = $this->getTemplate([ 'type' => $info[ 'type' ] ])[ $info[ 'type' ] ];
                $res[ 'page' ] = $template[ 'page' ] . '?id=' . $info[ 'id' ];
            }
        }

        return $res;
    }

}
