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

namespace app\listener\site;

use app\service\admin\install\InstallArticleService;

/**
 * 添加站点成功后事件
 * Class AddSiteAfterListener
 * @package app\listener\site
 */
class AddSiteAfterListener
{
    /**
     * 初始化站点
     * @param $data
     */
    public function handle($data)
    {

        // 初始化文章数据
//        ( new InstallArticleService() )->install([ 'site_id' => $data[ 'site_id' ] ]);
        //加载插件语言包
        return;
    }
}