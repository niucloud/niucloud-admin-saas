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

namespace app\model\sys;

use app\enum\sys\MenuEnum;
use app\enum\sys\MenuTypeEnum;
use app\model\BaseModel;
use think\model\concern\SoftDelete;

/**
 * 菜单模型
 * Class SysMenu
 * @package app\model\sys
 */
class SysMenu extends BaseModel
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
    protected $name = 'sys_menu';
    /**
     * 追加字段
     * @var array
     */
    protected $append = ['status_name', 'menu_type_name'];
    /**
     * 菜单类型
     * @param $value
     * @param $data
     * @return string
     */
    public function getMenuTypeNameAttr($value,$data)
    {
        return MenuTypeEnum::getMenuType()[$data['menu_type'] ?? ''] ?? '';
    }

    /**
     * 菜单状态
     * @param $value
     * @param $data
     * @return string
     */
    public function getStatusNameAttr($value,$data)
    {
        return MenuEnum::getStatus()[$data['status'] ?? ''] ?? '';
    }
}
