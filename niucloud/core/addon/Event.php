<?php

namespace core\addon;


class Event extends BaseAddon
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