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
namespace core\dict;


class Event extends BaseDict
{
    /**
     * 加载事件
     * @param array $system_event 系统事件
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons  = $this->getLocalAddons();
        $event_files = [];

        foreach ($addons as $k => $v)
        {
            $event_path = $this->getAddonAppPath($v)."event.php";
            if(is_file($event_path))
            {
                $event_files[] = $event_path;
            }
        }
        $files_data = $this->loadFiles($event_files);

        $files_data[1] = $data;

        $events = [];
        foreach ($files_data as $file_data) {
            $events = empty($events) ? $file_data : array_merge2($events, $file_data);
        }
        return $events;
    }
}