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

namespace app\service\admin\weapp;

use app\service\admin\BaseAdminService;
use app\service\admin\message\MessageService;
use app\service\core\message\CoreMessageService;
use app\service\core\weapp\CoreWeappTemplateService;
use app\service\core\wechat\CoreWechatTemplateService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use extend\exception\MessageException;

/**
 * easywechat主体提供
 * Class WeappTemplateService
 * @package app\service\core\weapp
 */
class WeappTemplateService extends BaseAdminService
{

    /**
     * 获取订阅消息
     * @return array
     */
    public function getList()
    {
        $site_id = $this->site_id;
        $core_message_service = new CoreMessageService();
        $list = $core_message_service->getList($site_id);
        $template = [];
        foreach ($list as $k => $v){
            if(in_array('weapp', $v['support_type'])) $template[] = $v;
        }
        return $template;
    }
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
        $weapp_json = $item['wechat_json'];
        $temp_key = $weapp_json['temp_key'] ?? '';
        if(empty($temp_key)) $error = 204010;
        $weapp_template_id = $item['weapp_template_id'];
        //删除原来的消息模板
        (new CoreWeappTemplateService())->deleteTemplate($this->site_id, $weapp_template_id);
        //新的消息模板
        $tid = $weapp_json['tid'] ?? '';
        $kid_list = $weapp_json['kid_list'] ?? [];
        $scene_desc = $weapp_json['scene_desc'] ?? '';
        $res = (new CoreWeappTemplateService())->addTemplate($this->site_id, $tid, $kid_list, $scene_desc);
        $message_service = new MessageService();
        if (isset($res[ 'errcode' ]) && $res[ 'errcode' ] == 0) {
            //修改
            $message_service->modify($key, 'weapp_template_id', $res[ 'priTmplId' ]);
        } else {
            throw new MessageException($res[ 'errmsg' ]);
        }
        return true;
    }

}