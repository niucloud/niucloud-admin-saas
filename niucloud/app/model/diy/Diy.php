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

use app\dict\diy\TemplateDict;
use core\base\BaseModel;


/**
 * 自定义页面模型
 * Class Diy
 * @package app\model\diy
 */
class Diy extends BaseModel
{

    protected $type = [
        'create_time' => 'timestamp',
        'update_time' => 'timestamp',
    ];

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'diy_page';

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        if (!empty($data['type'])) {
            return TemplateDict::getTemplate(['type' => $data['type']])[$data['type']]['title'] ?? '';
        }
        return '';
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getShareAttr($value, $data)
    {
        if (empty($data['share'])) {
            $data['share'] = json_encode([
                'wechat' => [
                    'title' => $data['title'],
                    'desc' => '',
                    'url' => ''
                ],
                'weapp' => [
                    'title' => $data['title'],
                    'url' => ''
                ]
            ]);
        }
        return $data['share'] ?? '';
    }

    /**
     * 搜索器:自定义页面
     * @param $query
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
     * 搜索器:自定义页面站点id
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchSiteIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("site_id", $value);
        }
    }

    /**
     * 搜索器:自定义页面名称
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTitleAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("title", 'like', '%' . $value . '%');
        }
    }

    /**
     * 搜索器:自定义页面标识
     * @param $query
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
     * 搜索器:自定义页面模板
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("type", $value);
        }
    }

    /**
     * 搜索器:页面展示模式，diy：自定义，fixed：固定
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchModeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("mode", $value);
        }
    }

    /**
     * 搜索器:自定义页面数据，json格式
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchValueAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("value", $value);
        }
    }

    /**
     * 搜索器:自定义页面是否默认页面，1：是，0：否
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchIsDefaultAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("is_default", $value);
        }
    }

    /**
     * 搜索器:自定义页面访问量
     * @param $query
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
     * 搜索器:自定义页面访问量
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchVisitCountAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("visit_count", $value);
        }
    }

    /**
     * 搜索器:自定义页面创建时间
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("create_time", $value);
        }
    }

    /**
     * 搜索器:自定义页面更新时间
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchUpdateTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("update_time", $value);
        }
    }


}
