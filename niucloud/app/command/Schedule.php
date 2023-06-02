<?php

namespace app\command;

use app\service\core\schedule\CoreScheduleService;
use schedule\console\Command;
use think\console\Input;
use think\console\Output;
use think\helper\Str;
use DateTimeZone;
use Workerman\Crontab\Crontab;

class Schedule extends Command
{
    protected function configure()
    {
        $this->setName('schedule:run');
    }

    protected function execute(Input $input, Output $output)
    {
        //写入计划任务最后一次执行事件,用于环境监测
        $file = root_path('runtime').'.schedule';
        file_put_contents($file, time());
        $schedules  = (new CoreScheduleService())->getList();
        foreach($schedules as $v){
            $class = $v['class'] ?: 'app\\job\\schedule\\'.Str::studly($v['key']);
            $function = $v['function'] ?: 'doJob';
            $call_back = [
                $class,
                $function
            ];

            $event = $this->call($call_back);
            switch($v['time']['type']){
                case 'min':
                    $event->everyMinute();
                    break;
                case 'hour':
                    $event->hourly();
                    break;
                case 'day':
                    $event->daily();
                    break;
                case 'week':
                    $event->weekly();
                    break;
                case 'month':
                    $event->monthly();
                    break;
            }

        }

        parent::execute($input, $output);
    }

    /**
     * 获取计划事件默认使用的时区
     */
    protected function scheduleTimezone(): DateTimeZone|string|null
    {
        return 'Asia/Shanghai';
    }

//    protected function getCrontab($data): string
//    {
//        $crontab = '';
//        switch ($data['type']) {
//            case 'sec':// 每隔几秒
//                $crontab = '*/' . $data['sec'] . ' * * * * *';
//                break;
//            case 'min':// 每隔几分
//                $crontab = '0 */' . $data['min']  . ' * * * *';
//                break;
//            case 'hour':// 每隔几时第几分钟执行
//                $crontab = '0 ' . $data['min'] . ' * * * *';
//                break;
//            case 'day':// 每日几时几分几秒
//                $crontab = $data['sec'] . ' ' . $data['min'] . ' ' . $data['hour'] . ' * * *';
//                break;
//            case 'week':// 每周一次,周几具体时间执行
//                $crontab = $data['sec'] . ' ' . $data['min'] . ' ' . $data['hour'] . ' * * ' . $data['week'];
//                break;
//            case 'month':// 每月一次,某日具体时间执行
//                $crontab = $data['sec'] . ' ' . $data['min'] . ' ' . $data['hour'] . ' ' . $data['day'] . ' * *';
//                break;
//        }
//        return $crontab;
//    }

}