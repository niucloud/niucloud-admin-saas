<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-02-17
 * Time: 15:58
 */

namespace extend\driver\pay;

use app\enum\pay\PayEnum;
use think\Response;
use Yansongda\Pay\Exception\ContainerException;

/**
 * 文件管理驱动类
 * Class FileDriver
 * @package extend\driver\file
 */
abstract class BasePay
{
    protected $config;//配置
//    protected function __construct(){
//
//
//    }


//    /**
//     * 网页支付
//     * @param $save_dir
//     * @return mixed
//     */
//    abstract protected function web(array $params);
//
//    /**
//     * 手机网站支付
//     * @param $dir
//     * @return mixed
//     */
//    abstract protected function wap(array $params);
//
//    /**
//     * app支付
//     * @param $dir
//     * @return mixed
//     */
//    abstract protected function app(array $params);
//
//    /**
//     * 小程序支付
//     * @param $dir
//     * @return mixed
//     */
//    abstract protected function mini(array $params);
//    /**
//     * 付款码支付
//     * @param $dir
//     * @return mixed
//     */
//    abstract protected function pos(array $params);
//    /**
//     * 扫码支付
//     * @param $dir
//     * @return mixed
//     */
//    abstract protected function scan(array $params);
//    /**
//     * 转账
//     * @param $dir
//     * @return mixed
//     */
//    abstract protected function transfer(array $params);
//    /**
//     * 公众号支付
//     * @param $dir
//     * @return mixed
//     */
//    abstract protected function mp(array $params);
//


    /**
     * 初始化
     * @param array $config
     * @param string $type
     * @return mixed
     */
    protected function payConfig(array $config, string $type){

//        $return_url = url('api/pay/return/'.$type, [],'',true);//一般是传入的
//        $notify_url = url('api/pay/notify/'.$type, [],'',true);
//        $config['notify_url'] = $notify_url;
        return array_merge(
            [
                'logger' => [
                    'enable' => true,
                    'file' => runtime_path() . 'paylog'.DIRECTORY_SEPARATOR.date('Ym').DIRECTORY_SEPARATOR.date('d').'.log',
                    'level' => env('app_debug') ? 'debug' : 'info', // 建议生产环境等级调整为 info，开发环境为 debug
                    'type' => 'single', // optional, 可选 daily.
                    'max_file' => 30, // optional, 当 type 为 daily 时有效，默认 30 天
                ],
                'http' => [ // optional
                        'timeout' => 5.0,
                ]
            ],
            [
                $type => [
                    'default' => $config
                ]
            ]


        );
    }

    public function returnFormat($param){
        if($param instanceof \Psr\Http\Message\MessageInterface){
            return $param->getBody()->getContents();
        }else if($param instanceof \Yansongda\Supports\Collection){
            return $param->all();
        }else{
            return $param;
        }
    }




}