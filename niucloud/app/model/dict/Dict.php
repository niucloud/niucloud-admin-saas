<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\model\dict;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 数据字典模型
 * Class Dict
 * @package app\model\dict
 */
class Dict extends BaseModel
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
    protected $name = 'sys_dict';

    protected $type = [
        'dictionary' => 'json'
    ];

    // 设置json类型字段
    protected $json = ['dictionary'];
    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 搜索器:数据字典字典名称
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
     * 搜索器:数据字典字典关键词
     * @param $value
     * @param $data
     */
    public function searchKeyAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("key", $value);
        }
    }




}
