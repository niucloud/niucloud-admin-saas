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

use app\model\wechat\WechatReply;
use app\service\core\wechat\CoreWechatReplyService;
use core\base\BaseAdminService;


/**
 * 微信回复
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WechatReplyService extends BaseAdminService
{
    protected  CoreWechatReplyService $core_wechat_reply_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_wechat_reply_service = new CoreWechatReplyService();
    }

    /**
     *关键字回复列表
     * @return void
     */
    public function getKeywordPage(array $data = []){

        return $this->core_wechat_reply_service->getKeywordPage($this->site_id, $data);
    }

    /**
     * 获取关键词回复信息
     * @param $id
     * @return array
     */
    public function getKeywordInfo(int $id){
        return $this->core_wechat_reply_service->getKeywordInfo($this->site_id, $id);
    }

    /**
     * 新增关键词回复
     * @param $data
     * @return WechatReply
     */
    public function addKeyword(array $data){
        return $this->core_wechat_reply_service->addKeyword($this->site_id, $data);
    }

    /**
     * 更新关键词回复
     * @param $data
     * @return void
     */
    public function editKeyword(int $id, array $data){
        return $this->core_wechat_reply_service->editKeyword($this->site_id, $id, $data);
    }

    /**
     * 删除关键词回复
     * @return void
     */
    public function delKeyword(int $id){
        return $this->core_wechat_reply_service->delKeyword($this->site_id, $id);
    }

    /**
     * 获取默认回复
     * @return void
     */
    public function getDefault(){
        return $this->core_wechat_reply_service->delKeyword($this->site_id);
    }

    /**
     * 更新默认回复
     * @param $data
     * @return void
     */
    public function editDefault(array $data){
        return $this->core_wechat_reply_service->editDefault($this->site_id, $data);
    }


    /**
     * 获取关注回复
     * @return void
     */
    public function getSubscribe(){
        return $this->core_wechat_reply_service->getSubscribe($this->site_id);

    }

    /**
     * 更新关注回复
     * @param $data
     * @return void
     */
    public function editSubscribe(array $data){
        return $this->core_wechat_reply_service->editSubscribe($this->site_id, $data);
    }
}