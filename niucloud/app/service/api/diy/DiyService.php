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

namespace app\service\api\diy;

use app\model\diy\Diy;
use app\service\api\BaseApiService;

/**
 * 自定义页面服务层
 * Class DiyService
 * @package app\service\api\diy
 */
class DiyService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Diy();
    }

    /**
     * 获取自定义页面信息
     * @param array $params
     * @return array
     */
    public function getInfo(array $params = [])
    {
        $condition = [
            [ 'site_id', '=', $this->site_id ]
        ];
        if (!empty($params[ 'id' ])) {
            $condition[] = [ 'id', '=', $params[ 'id' ] ];
        } elseif (!empty($params[ 'name' ])) {
            $condition[] = [ 'name', '=', $params[ 'name' ] ];
            $condition[] = [ 'is_default', '=', 1 ];
        }
        $field = 'id,site_id,title,name,type,value,is_default,share,visit_count';

        $info = $this->model->field($field)->where($condition)->findOrEmpty()->toArray();
        return $info;
    }

}