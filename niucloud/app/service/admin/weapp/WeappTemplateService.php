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

use app\enum\notice\NoticeTypeEnum;
use app\service\admin\notice\NoticeService;
use app\service\core\notice\CoreNoticeService;
use core\base\BaseAdminService;
use core\exception\NoticeException;
use core\template\TemplateLoader;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;

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
        $core_notice_service = new CoreNoticeService();
        $list = $core_notice_service->getList($site_id);
        $template = [];
        foreach ($list as $k => $v){
            if(in_array(NoticeTypeEnum::WEAPP, $v['support_type'])) $template[] = $v;
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
        $core_notice_service = new CoreNoticeService();
        $list = $core_notice_service->getList($site_id, $keys);
        if(empty($list)) throw new NoticeException('NOTICE_TEMPLATE_NOT_EXIST');

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
        if(empty($temp_key)) $error = 'WECHAT_TEMPLATE_NEED_NO';
        $weapp_template_id = $item['weapp_template_id'];
        //删除原来的消息模板
        $template_loader = (new TemplateLoader(NoticeTypeEnum::WEAPP, ['site_id' => $this->site_id]));
        $template_loader->delete(['template_id' => $weapp_template_id ]);
//        (new CoreWeappTemplateService())->deleteTemplate($this->site_id, $weapp_template_id);
        //新的消息模板
        $tid = $weapp_json['tid'] ?? '';
        $kid_list = $weapp_json['kid_list'] ?? [];
        $scene_desc = $weapp_json['scene_desc'] ?? '';
//        $res = (new CoreWeappTemplateService())->addTemplate($this->site_id, $tid, $kid_list, $scene_desc);
        $res = $template_loader->add(['tid' => $tid, 'kid_list' => $kid_list, 'scene_desc' => $scene_desc ]);
        $notice_service = new NoticeService();
        if (isset($res[ 'errcode' ]) && $res[ 'errcode' ] == 0) {
            //修改
            $notice_service->modify($key, 'weapp_template_id', $res[ 'priTmplId' ]);
        } else {
            throw new NoticeException($res[ 'errmsg' ]);
        }
        return true;
    }

}