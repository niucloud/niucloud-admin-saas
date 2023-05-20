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

namespace app\model\diy;

use core\base\BaseModel;


/**
 * 自定义路由表模型
 * Class DiyRoute
 * @package app\model\diy
 */
class DiyRoute extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'diy_route';

    /**
     * 搜索器:自定义路由表
     * @param $value
     * @param $data
     */
    public function searchIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("id", $value);
        }
    }

    /**
     * 搜索器:自定义路由表页面名称
     * @param $value
     * @param $data
     */
    public function searchTitleAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("title", $value);
        }
    }

    /**
     * 搜索器:自定义路由表页面标识
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("name", $value);
        }
    }

    /**
     * 搜索器:自定义路由表页面路径
     * @param $value
     * @param $data
     */
    public function searchPageAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("page", $value);
        }
    }

    /**
     * 搜索器:自定义路由表分享内容
     * @param $value
     * @param $data
     */
    public function searchShareAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("share", $value);
        }
    }
    /**
     * 搜索器:自定义路由表是否支持分享
     * @param $value
     * @param $data
     */
    public function searchIsShareAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("is_share", $value);
        }
    }

}
