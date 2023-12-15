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
use core\base\BaseApiService;

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
     * @param array $data
     * @return array|void
     */
    public function getShare(array $data = [])
    {
        $field = 'id,title,name,page,share,is_share';
        $info = $this->model->field($field)->where([ [ 'page', '=', $data[ 'route' ] ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
        $share = [];
        if (!empty($info[ 'share' ])) {
            $share = json_decode($info[ 'share' ], true);
            $share[ 'route' ] = $info[ 'page' ];
            $share[ 'query' ] = '';
            $query = [];

            if (!empty($data[ 'params' ])) {
                $query = json_decode($data[ 'params' ], true);
            }

            if ($this->member_id > 0) {
                $query[ 'mid' ] = $this->member_id;
            }

            if (!empty($query)) {
                $str = [];
                foreach ($query as $k => $v) {
                    $str[] = $k . '=' . $v;
                }
                $share[ 'query' ] = implode('&', $str);
            }

            $share[ 'url' ] = $share[ 'route' ] . ( $share[ 'query' ] ? '?' . $share[ 'query' ] : '' );
        }
        return $share;
    }

}