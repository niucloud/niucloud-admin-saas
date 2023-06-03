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

namespace app\service\admin\sys;

use core\base\BaseAdminService;

/**
 * 应用管理
 */
class AppService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * 获取应用列表
     * @return array
     */
    public function getAppList()
    {
        $data = event('AppManage');
        //
        $category_list = [];
        $list = [];
        foreach ($data as $k => $v)
        {
            if(isset($v['category']))
            {
                $category_list = empty($category_list) ? $v['category'] : array_merge($category_list, $v['category']);

                unset($v['category']);
            }

            $list = empty($list) ? $v : array_merge($list, $v);
        }


        foreach ($category_list as $k_category => $category)
        {
            $category_list[$k_category]['sort'] = $category['sort'] ?? 100;
            $category_list[$k_category]['app_list'] = [];
            foreach ($list as $k => $app)
            {
                $app_category = $app['category'] ?? "basic";

                if($app_category == $category['key'])
                {
                    $category_list[$k_category]['app_list'][] = $app;
                }

            }
        }

        $sort = array_column($category_list, 'sort');
        array_multisort($category_list, $sort);

        return $category_list;
    }


}