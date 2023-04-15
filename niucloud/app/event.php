<?php

/**
 * 事件定义在event文件夹中(app/event)
 * 扩展功能通过定义单独的事件文件
 * 系统事件文件在system.php定义
 *
 */
use extend\util\ConfigUtil;
// 事件定义文件
$event_util = new ConfigUtil(root_path().str_replace('/', DIRECTORY_SEPARATOR, "app/event"));
$files = $event_util->loadFiles();
$events = [];
foreach ($files as $file)
{
    $event = include $file;
    $events = empty($events) ? $event : array_merge2($events, $event);
}

return $events;
