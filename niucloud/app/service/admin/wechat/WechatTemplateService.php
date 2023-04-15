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

namespace app\service\admin\wechat;

use app\service\admin\BaseAdminService;
use app\service\admin\message\MessageService;
use app\service\core\BaseCoreService;
use app\service\core\message\CoreMessageService;
use app\service\core\wechat\CoreWechatService;
use app\service\core\wechat\CoreWechatTemplateService;
use EasyWeChat\Factory;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use extend\exception\MessageException;
use extend\exception\WechatException;

/**
 * easywechat主体提供
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WechatTemplateService extends BaseAdminService
{


    /**
     * 同步微信公众号消息模板
     * @param array $keys
     * @return true
     */
    public function syncAll(array $keys = []){
        $site_id = $this->site_id;
        $core_message_service = new CoreMessageService();
        $list = $core_message_service->getList($site_id, $keys);
        if(empty($list)) throw new MessageException(204009);

        foreach($list as $v){
            $this->syncItem($v);
        }
        return true;
    }

    /**
     * @param $item
     * @return true
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function syncItem($item){
        $key = $item['key'];
        $wechat_json = $item['wechat_json'];
        $temp_key = $wechat_json['temp_key'] ?? '';
        if(empty($temp_key)) $error = 204010;
        $wechat_template_id = $item['wechat_template_id'];
        //删除原来的消息模板
        (new CoreWechatTemplateService())->deletePrivateTemplate($this->site_id, $wechat_template_id);
        //新的消息模板
        $res = (new CoreWechatTemplateService())->addTemplate($this->site_id, $temp_key);
        $message_service = new MessageService();
        if (isset($res[ 'errcode' ]) && $res[ 'errcode' ] == 0) {
            //修改
            $message_service->modify($key, 'wechat_template_id', $res[ 'template_id' ]);
        } else {
            throw new MessageException($res[ 'errmsg' ]);
        }
        return true;
    }

    /**
     * 获取模板消息
     * @return array
     */
    public function getList()
    {
        $site_id = $this->site_id;
        $core_message_service = new CoreMessageService();
        $list = $core_message_service->getList($site_id);
        $template = [];
        foreach ($list as $k => $v){
            if(in_array('wechat', $v['support_type'])) $template[] = $v;
        }
        return $template;
    }

}