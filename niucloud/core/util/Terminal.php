<?php

namespace core\util;


class Terminal
{
    /**
     * 执行命令
     * @param string $cwd 要执行命令的初始工作目录
     * @param string $command 要执行的命令
     * @return \think\Response
     */
    public static function execute(string $cwd, string $command){
        if (!function_exists('proc_open') || !function_exists('proc_close')) return 'Function proc_open or proc_close disabled';

        // 设置执行时长
        set_time_limit(0);

        // 执行命令，并将输出保存到变量中
        $descriptorspec = array(
            0 => array("pipe", "r"),  // 标准输入，我们不需要
            1 => array("pipe", "w"),  // 标准输出，我们需要将其捕获
            2 => array("pipe", "w")   // 标准错误，我们也需要将其捕获
        );
        $process = proc_open($command, $descriptorspec, $pipes, $cwd);

        // 检查进程是否成功创建
        if (!is_resource($process)) {
            return "Could not execute command: $command";
        }

        // 从管道中获取命令的输出
        $output = '';
        while (!feof($pipes[1])) {
            $output .= fgets($pipes[1]);
        }
        while (!feof($pipes[2])) {
            $output .= fgets($pipes[2]);
        }

        // 关闭管道和进程
        fclose($pipes[0]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        $status = proc_close($process);

        // 判断命令的执行结果
        if ($status === 0) {
            return strpos($output, 'Command failed') !== false ? $output : true;
        } else {
            return $output;
        }
    }
}