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

use app\model\diy\DiyRoute;
use app\service\api\BaseApiService;

/**
 * 自定义路由表服务层
 * Class DiyRouteService
 * @package app\service\api\diy
 */
class DiyRouteService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new DiyRoute();
    }

    /**
     * 获取页面分享信息
     * @param array $params
     * @return array|void
     */
    public function getShare(array $params = [])
    {
        $field = 'id,title,name,page,share,is_share';
        $info = $this->model->field($field)->where([ [ 'page', '=', $params[ 'route' ] ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
        $share = [];
        if (!empty($info[ 'share' ])) {
            $share = json_decode($info[ 'share' ], true);
            $share[ 'route' ] = $info[ 'page' ];
            $share[ 'query' ] = '';
            $query = [];

            if (!empty($params[ 'params' ])) {
                $param = explode(',', $params[ 'params' ]);
                foreach ($param as $k => $v) {
                    $query[] = $v;
                }
            }

            if ($this->member_id > 0) {
                $query[] = 'mid=' . $this->member_id;
            }

            if (!empty($query)) {
                $share[ 'query' ] = implode('&', $query);
            }

            $share[ 'url' ] = $share[ 'route' ] . ( $share[ 'query' ] ? '?' . $share[ 'query' ] : '' );
        }
        return $share;
    }

}