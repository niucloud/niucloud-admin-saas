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

namespace app\service\core\scan;

use app\enum\member\MemberLoginTypeEnum;
use app\enum\scan\ScanEnum;
use app\enum\sys\AppTypeEnum;
use app\enum\sys\SmsEnum;
use app\model\member\Member;
use app\service\api\BaseApiService;
use app\service\api\captcha\CaptchaService;
use app\service\api\member\MemberConfigService;
use app\service\api\member\MemberService;
use app\service\api\message\MessageService;
use app\service\core\BaseCoreService;
use Exception;
use extend\exception\ApiException;
use extend\exception\AuthException;
use extend\exception\CommonException;
use extend\util\TokenUtil;
use think\facade\Cache;
use think\facade\Log;

/**
 * 登录服务层
 * Class BaseService
 * @package app\service
 */
class CoreScanService extends BaseCoreService
{
    public static $cache_name = 'scan';
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * 扫码生成
     * @param int $site_id
     * @param array $data
     * @param int|null $expire
     * @return array|string|string[]
     */
    public function scan(int $site_id, string $action, array $data, int $expire = null){
        $key = str_replace('==','', md5(uniqid(null, true)));
        $cache_name = self::$cache_name.$key;
        $data['status'] = ScanEnum::WAIT;
        $data['is_scan'] =  false;//是否被扫描
        $data['action'] = $action;
        $data['expire'] = $expire ? time() + $expire : 0;
        Cache::set($cache_name, $data, $expire);
        return $key;
    }

    /**
     * 更新扫码信息
     * @param int $site_id
     * @param string $key
     * @param array $data
     * @return true
     */
    public function actionByScan(int $site_id, string $key, array $data){
        $cache_name = self::$cache_name.$key;
        $cache =  Cache::get($cache_name);
        Log::write('scan_log_'.$key);
        if(!empty($cache)){
            $cache['is_scan'] = true;
            Cache::set($cache_name, event('scan', array_merge($cache, $data))[0]);
        }
        return true;
    }


    /**
     * 校验扫码状态
     * @param int $site_id
     * @param string $key
     * @return mixed
     */
    public function checkScan(int $site_id, string $key){
        $cache_name = self::$cache_name.$key;
        $cache =  Cache::get($cache_name);
        if(empty($cache)) throw new CommonException(301021);
        return $cache;
    }

}