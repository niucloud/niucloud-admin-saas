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

namespace app\model\generator;

use core\base\BaseModel;


/**
 * 代码生成模型
 * Class GenerateTable
 * @package app\model\generator
 */
class GenerateTable extends BaseModel
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
    protected $name = 'generate_table';


    /**
     * 表名搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTableNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('table_name', 'like', '%' . $value . '%');
        }
    }

    /**
     * 描述搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTableContentAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('table_content', 'like', '%' . $value . '%');
        }
    }


}
