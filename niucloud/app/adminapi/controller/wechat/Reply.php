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

namespace app\adminapi\controller\wechat;

use app\service\admin\wechat\WechatReplyService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 微信公众号管理回复
 */
class Reply extends BaseAdminController
{

    /**
     * 关键词回复
     * @return Response
     */
    public function keyword($id)
    {
        $wechat_reply_service = new WechatReplyService();
        return success($wechat_reply_service->getKeywordInfo($id));
    }

    public function getKeywordLists()
    {
        $data = $this->request->params([
            ['keyword', ''],
            ['name', '']
        ]);
        $wechat_reply_service = new WechatReplyService();
        return success($wechat_reply_service->getKeywordPage($data));
    }

    /**
     * 新增关键词回复
     * @return Response
     */
    public function addKeyword()
    {
        $wechat_reply_service = new WechatReplyService();
        $data = $this->request->params([
            ['name', ''],
            ['keyword', ''],
            ['matching_type', ''],
            ['content_type', ''],
            ['content', ''],
            ['status', 0],
            ['sort', ''],
        ]);
        return success($wechat_reply_service->addKeyword($data));
    }

    /**
     * 更新关键词回复
     * @return Response
     */
    public function editKeyword($id)
    {
        $wechat_reply_service = new WechatReplyService();
        $data = $this->request->params([
            ['name', ''],
            ['keyword', ''],
            ['matching_type', ''],
            ['content_type', ''],
            ['content', ''],
            ['status', 0],
            ['sort', ''],
        ]);
        return success($wechat_reply_service->editKeyword($id, $data));
    }

    /**
     * 删除关键字回复
     * @return Response
     */
    public function delKeyword($id)
    {
        $wechat_reply_service = new WechatReplyService();
        return success($wechat_reply_service->delKeyword($id));
    }

    /**
     * 获取默认回复
     * @return Response
     */
    public function default()
    {
        $wechat_reply_service = new WechatReplyService();
        return success($wechat_reply_service->getDefault());
    }

    /**
     * 更新默认回复
     * @return Response
     */
    public function editDefault()
    {
        $data = $this->request->params([
            ['content_type', ''],
            ['content', ''],
            ['status', 0],
        ]);
        $wechat_reply_service = new WechatReplyService();
        return success($wechat_reply_service->editDefault($data));
    }

    /**
     * 获取关注回复
     * @return Response
     */
    public function subscribe()
    {
        $wechat_reply_service = new WechatReplyService();
        return success($wechat_reply_service->getSubscribe());
    }

    /**
     * 更新关注回复
     * @return Response
     */
    public function editSubscribe()
    {
        $data = $this->request->params([
            ['content_type', ''],
            ['content', ''],
            ['status', 0],
        ]);
        $wechat_reply_service = new WechatReplyService();
        return success($wechat_reply_service->editSubscribe($data));
    }


}
