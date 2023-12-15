<?php

namespace app\command\schedule;

use app\service\core\schedule\CoreScheduleService;
use yunwuxin\cron\Task;

class Schedule extends Task
{

    public function configure()
    {
        $this->expression($this->getCrontab($this->vars['time']));
    }

    protected function getCrontab($data): string
    {
        $min = $data['min'] ?? '*';
        $hour = $data['hour'] ?? '*';
        $day = $data['day'] ?? '*';
        $week = $data['week'] ?? '*';
        $type = $data['type'] ?? '';
        switch ($type) {
            case 'min':// 每隔几分
                $crontab = '*/' . $min . ' * * * *';
                break;
            case 'hour':// 每隔几时第几分钟执行
                $crontab = $min . ' */' . $hour . ' * * *';
                break;
            case 'day':// 每隔几日几时几分几秒执行
                $crontab = $min . ' ' . $hour . ' */' . $day . ' * *';
                break;
            case 'week':// 每周一次,周几具体时间执行
                $crontab = $min . ' ' . $hour . ' * * ' . $week;
                break;
            case 'month':// 每月一次,某日具体时间执行
                $crontab = $min . ' ' . $hour . ' ' . $day . ' * *';
                break;
        }
        return $crontab ?? '* * * * *';
    }

    /**
     * 执行任务
     * @return void
     */
    protected function execute()
    {
        //...具体的任务执行
        (new CoreScheduleService())->execute($this->vars);
    }
}
