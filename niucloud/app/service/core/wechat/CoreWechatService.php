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

namespace app\service\core\wechat;

use core\base\BaseCoreService;
use core\exception\WechatException;
use EasyWeChat\Factory;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\OfficialAccount\Application;

/**
 * easywechat主体提供
 * Class CoreWechatService
 * @package app\service\core\wechat
 */
class CoreWechatService extends BaseCoreService
{
    /**
     * 获取公众号的handle
     * @param int $site_id
     * @return Application
     */
    public static function app(int $site_id)
    {
        $core_wechat_service = new CoreWechatConfigService();
        $wechat_config = $core_wechat_service->getWechatConfig($site_id);
        if(empty($wechat_config['app_id']) || empty($wechat_config['app_secret']))
            throw new WechatException('WECHAT_NOT_EXIST');//公众号未配置
        $config = array(
            'app_id' => $wechat_config['app_id'],
            'secret' => $wechat_config['app_secret'],
            'token' => $wechat_config['token'],
            'aes_key' => $wechat_config['encoding_aes_key'],// 明文模式请勿填写 EncodingAESKey
            'encryption_type'   => $wechat_config['encryption_type'],//消息加解密方式
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
                        'path' => app()->getRootPath() . 'runtime'.DIRECTORY_SEPARATOR.'wechat'.DIRECTORY_SEPARATOR.'dev'.DIRECTORY_SEPARATOR . date('Ym') . DIRECTORY_SEPARATOR . date('d') . '.log',
                        'level' => 'debug',
                    ],
                    // 生产环境
                    'prod' => [
                        'driver' => 'daily',
                        'path' => app()->getRootPath() . 'runtime'.DIRECTORY_SEPARATOR.'wechat'.DIRECTORY_SEPARATOR.'dev'.DIRECTORY_SEPARATOR . date('Ym') . DIRECTORY_SEPARATOR . date('d') . '.log',
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
                'throw' => true,//默认不抛出,还是有系统业务决定是否抛出
                // 'base_uri' => 'https://api.weixin.qq.com/', // 如果你在国外想要覆盖默认的 url 的时候才使用，根据不同的模块配置不同的 uri
            ],
        );
        return Factory::officialAccount($config);
    }

}