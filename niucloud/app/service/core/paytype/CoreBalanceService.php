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

namespace app\service\core\paytype;

use app\service\core\member\CoreMemberService;
use core\base\BaseCoreService;

/**
 * 支付服务层
 * Class CorePayEventService
 * @package app\service\core\pay
 */
class CoreBalanceService extends BaseCoreService
{

    private $site_id;//站点id
    private $config;//支付配置
    private $type;//支付类型
    private $channel;//支付渠道  (特殊点,转账也算是一种)

    public function __construct()
    {
        parent::__construct();
    }


    public function pay($params){
        $password = $params['password'];
        if(empty($password)){

        }
        $member_id = $params['main_id'];
        $core_member_service = new CoreMemberService();
//        $core_member_service->
        //业务主体id
        //查询一下余额是否足够
        //生成账户变动记录,
//        if($member_id > 0){
//
//        }
        //可能会锁定一部分余额

    }

}