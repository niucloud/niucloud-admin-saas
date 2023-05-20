<?php
// +----------------------------------------------------------------------
// | Niushop商城系统 - 团队十年电商经验汇集巨献!
// +----------------------------------------------------------------------
// | Copyright (c) 2022~2025 https://www.niushop.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed Niushop并不是自由软件，未经许可不能去掉Niushop相关版权
// +----------------------------------------------------------------------
// | Author: Niushop Team <niucloud@outlook.com>
// +----------------------------------------------------------------------

namespace app\service\core\weapp;

use core\base\BaseCoreService;
use core\exception\WechatException;
use EasyWeChat\Factory;


/**
 * easywechat主体提供
 * Class CoreWeappService
 * @package app\service\core\wechat
 */
class CoreWeappService extends BaseCoreService
{
    /**
     * 获取小程序的handle
     * @param int $site_id
     * @return \EasyWeChat\MiniProgram\Application
     */
    public static function app(int $site_id)
    {
        $core_weapp_service = new CoreWeappConfigService();
        $weapp_config = $core_weapp_service->getWeappConfig($site_id);
        if(empty($weapp_config['app_id']) || empty($weapp_config['app_secret']))
            throw new WechatException('WEAPP_NOT_EXIST');//公众号未配置
        $config = array(
            'app_id' => $weapp_config['app_id'],
            'secret' => $weapp_config['app_secret'],
            'http' => [
                'throw' => true,//默认不抛出,还是有系统业务决定是否抛出
            ],
            // 指定 API 调用返回结果的类型：array(default)/collection/object/raw/自定义类名
            'response_type' => 'array',
            /**
             * 日志配置
             * level: 日志级别, 可选为：debug/info/notice/warning/error/critical/alert/emergency
             * path：日志文件位置(绝对路径!!!)，要求可写权限
             */
            'log' => [
                'default' => env('app_debug', false) ? 'dev' : 'prod', // 默认使用的 channel，生产环境可以改为下面的 prod
                'channels' => [
                    // 测试环境
                    'dev' => [
                        'driver' => 'single',
                        'path' => app()->getRootPath() . 'runtime'.DIRECTORY_SEPARATOR.'weapp'.DIRECTORY_SEPARATOR.'dev'.DIRECTORY_SEPARATOR . date('Ym') . DIRECTORY_SEPARATOR . date('d') . '.log',
                        'level' => 'debug',
                    ],
                    // 生产环境
                    'prod' => [
                        'driver' => 'daily',
                        'path' => app()->getRootPath() . 'runtime'.DIRECTORY_SEPARATOR.'weapp'.DIRECTORY_SEPARATOR.'dev'.DIRECTORY_SEPARATOR . date('Ym') . DIRECTORY_SEPARATOR . date('d') . '.log',
                        'level' => 'info',
                    ],
                ],
            ],

            /**
             * 接口请求相关配置，超时时间等，具体可用参数请参考：
             * http://docs.guzzlephp.org/en/stable/request-config.html
             * - retries: 重试次数，默认 1，指定当 http 请求失败时重试的次数。
             * - retry_delay: 重试延迟间隔（单位：ms），默认 500
             * - log_template: 指定 HTTP 日志模板，请参考：https://github.com/guzzle/guzzle/blob/master/src/MessageFormatter.php
             */
            'http' => [
                'max_retries' => 1,
                'retry_delay' => 500,
                'timeout' => 5.0,
                // 'base_uri' => 'https://api.weixin.qq.com/', // 如果你在国外想要覆盖默认的 url 的时候才使用，根据不同的模块配置不同的 uri
            ],
        );
        $app = Factory::miniProgram($config);
        return $app;
    }

}