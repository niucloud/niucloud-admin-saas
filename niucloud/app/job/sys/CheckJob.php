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

namespace app\job\sys;

use core\base\BaseJob;

/**
 * 校验队列是否在正常运行
 */
class CheckJob extends BaseJob
{
    public function doJob($file)
    {
        file_put_contents($file, time());
        //todo 部署一个十五秒后再校验一次删除这个文件
        CheckDeleteJob::invoke(['file' => $file], secs:8);
        return true;
    }
}
