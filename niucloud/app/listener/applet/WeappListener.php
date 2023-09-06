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


namespace app\listener\applet;


class WeappListener
{
    /**
     * 返回待替换的文件以及属性
     * @param array $data
     * @return array[]|void
     */
    public function handle(array $data)
    {
        $type = $data['type'];
        if ($type == 'weapp') {
            $site_id = $data['site_id'];
            return [
                [
                    'path' => 'utils/request.js',
                    'variable' => [
                        '{{$baseUrl}}' => (string)url('/api/', [], '', true),
                        '{{$siteId}}' => $site_id
                    ],
                ],
                [
                    'path' => 'utils/common.js',
                    'variable' => [
                        '{{$imgUrl}}' => (string)url('/', [], '', true),
                    ],
                ]
            ];
        }
    }
}