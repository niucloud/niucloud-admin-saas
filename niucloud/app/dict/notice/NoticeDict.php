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

namespace app\dict\notice;
use core\dict\DictLoader;
/**
 * 消息类
 * Class NoticeDict
 * @package app\dict\sys
 */
class NoticeDict
{
    /**
     * 获取消息
     * @return array
     */
    public static function getNotice(string $key = ''){
        $addon_load = new DictLoader('Notice');
        $notice = $addon_load->load(['type' => 'notice']);
        $notice_type = NoticeTypeDict::getType();
        foreach($notice_type as $k => $v){
            $var_name = $k.'_notice';
            $$var_name = $addon_load->load(['type' => $k]);
        }

        foreach ($notice as $k => $v)
        {
            $support_type = [];
            foreach($notice_type as $notice_type_k => $notice_type_v){
                $var_name = $notice_type_k.'_notice';
                if(array_key_exists($k, $$var_name))
                {
                    $notice[$k][$notice_type_k] = $$var_name[$k];
                    $support_type[] = $notice_type_k;
                }
            }
            $notice[$k]['support_type'] = $support_type;
        }
        if(!empty($key))
        {
            return $notice[$key] ?? [];
        }
        return $notice;
    }

}