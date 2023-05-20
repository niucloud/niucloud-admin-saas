<?php

namespace core\util;

class Terminal
{

    private $out_file;
//    private $
    public function __construct()
    {
        parent::__construct();
        $this->error_path = runtime_path() . 'terminal'.DIRECTORY_SEPARATOR.date('Ym').DIRECTORY_SEPARATOR.date('d').'.log';
    }
    public function execute(){
//        $command = [];
        //可以使自定义指令也可以是
        $command = $this->command();

        $cwd = $command['cwd'];//程序运行的目录

//        proc_open($command['command'], $descriptorspec, $pipes, $cwd);
        //通道消息不及时
        $descriptorspec = array(
            0 => array('pipe', 'r'),  // 标准输入，子进程从此管道中读取数据
            1 => array('pipe', 'w'),  // 标准输出，子进程向此管道中写入数据
            2 => array('file', $this->out_file, 'a') // 标准错误，写入到一个文件
        );
        //放在文件中是同步的,放在管道中可能是不及时的
//        $descriptorspec = [
//            0 => ['pipe', 'r'],
//            1 => ['file', $this->out_file, 'w'],
//            2 => ['file', $this->out_file, 'w']];
//        $env_vars = array('some_option' => 'aeiou');//可以不启用其他的环境变量,使用和系统一致的环境变量
        $env_vars = null;
        $process = proc_open($command['command'], $descriptorspec, $pipes, $cwd, $env_vars);

        if (is_resource($process)) {
            // $pipes 现在看起来是这样的：
            // 0 => 可以向子进程标准输入写入的句柄
            // 1 => 可以从子进程标准输出读取的句柄
            // 错误输出将被追加到文件 /tmp/error-output.txt

            fwrite($pipes[0], '<?php print_r($_ENV); ?>');
            fclose($pipes[0]);

            echo stream_get_contents($pipes[1]);
            fclose($pipes[1]);


            // 切记：在调用 proc_close 之前关闭所有的管道以避免死锁。
            $return_value = proc_close($process);

            echo "command returned $return_value\n";
        }
    }

    public function command($key){
        //通过健名获取详细的命令字典

        return [
            'command' => '',
            'cwd' => '',
        ];
    }
}