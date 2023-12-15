<?php

namespace yunwuxin\cron;

use app\dict\schedule\ScheduleDict;
use app\service\core\schedule\CoreScheduleService;
use Carbon\Carbon;
use Exception;
use think\App;
use think\cache\Driver;
use yunwuxin\cron\event\TaskFailed;
use yunwuxin\cron\event\TaskProcessed;
use yunwuxin\cron\event\TaskSkipped;

class Scheduler
{
    /** @var App */
    protected $app;

    /** @var Carbon */
    protected $startedAt;

    protected $tasks = [];

    /** @var Driver */
    protected $cache;

    public function __construct(App $app)
    {
        $this->app   = $app;
//        $this->tasks = $app->config->get('cron.tasks', []);
        $this->tasks = (new CoreScheduleService())->getList(['status' => ScheduleDict::ON]);

        $this->cache = $app->cache->store();
    }

    public function run()
    {
        $this->startedAt = Carbon::now();
        $file = root_path('runtime').'.schedule';
        file_put_contents($file, time());
        $taskClass = 'app\command\schedule\Schedule';
        foreach ($this->tasks as $task_value) {

            if (is_subclass_of($taskClass, Task::class)) {
                /** @var Task $task */
                $task = $this->app->invokeClass($taskClass, [$task_value]);
                if ($task->isDue()) {

                    if (!$task->filtersPass()) {
                        continue;
                    }

                    if ($task->onOneServer) {
                        $this->runSingleServerTask($task);
                    } else {
                        $this->runTask($task);
                    }

                    $this->app->event->trigger(new TaskProcessed($task));
                }
            }
        }
    }

    /**
     * @param $task Task
     * @return bool
     */
    protected function serverShouldRun($task)
    {
        $key = $task->mutexName() . $this->startedAt->format('Hi');
        if ($this->cache->has($key)) {
            return false;
        }
        $this->cache->set($key, true, 60);
        return true;
    }

    protected function runSingleServerTask($task)
    {
        if ($this->serverShouldRun($task)) {
            $this->runTask($task);
        } else {
            $this->app->event->trigger(new TaskSkipped($task));
        }
    }

    /**
     * @param $task Task
     */
    protected function runTask($task)
    {
        try {
            $task->run();
        } catch (Exception $e) {
            $this->app->event->trigger(new TaskFailed($task, $e));
        }
    }
}
