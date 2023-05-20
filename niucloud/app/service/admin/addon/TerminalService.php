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

namespace app\service\admin\addon;


use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Config;
use think\Response;

class TerminalService extends BaseAdminService
{
    /**
     * @var object 对象实例
     */
    protected static $instance;

    /**
     * 当前执行的命令,$command 的 key
     */
    protected $commandKey = null;

    /**
     * proc_open 的参数
     */
    protected $descriptorsPec = [];

    protected $process = null;

    protected $pipes = null;

    protected $procStatus = null;

    /**
     * 命令在前台的uuid
     */
    protected $uuid = null;

    /**
     * 扩展信息
     */
    protected $extend = null;

    /**
     * 命令执行输出文件
     */
    protected $outputFile = null;

    /**
     * 命令执行实时输出内容
     */
    protected $outputContent = '';

    /**
     * 自动构建的前端文件的 outDir（相对于根目录）
     */
    protected static $distDir = 'web' . DIRECTORY_SEPARATOR . 'dist';

    /**
     * 状态标识
     */
    protected $flag = [
        // 连接成功
        'link-success'   => 'command-link-success',
        // 执行成功
        'exec-success'   => 'command-exec-success',
        // 执行完成
        'exec-completed' => 'command-exec-completed',
        // 执行出错
        'exec-error'     => 'command-exec-error',
    ];



    /**
     * 初始化
     */
    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    /**
     * 构造函数
     */
    public function __construct()
    {
        // 初始化日志文件
        $outputDir        = root_path() . 'runtime' . DIRECTORY_SEPARATOR . 'terminal';
        $this->outputFile = $outputDir . DIRECTORY_SEPARATOR . 'exec.log';
        if (!is_dir($outputDir)) {
            mkdir($outputDir, 0755, true);
        }
        file_put_contents($this->outputFile, '');

        /**
         * 命令执行结果输出到文件而不是管道
         * 因为输出到管道时有延迟，而文件虽然需要频繁读取和对比内容，但是输出实时的
         */
        $this->descriptorsPec = [0 => ['pipe', 'r'], 1 => ['file', $this->outputFile, 'w'], 2 => ['file', $this->outputFile, 'w']];
    }

    /**
     * 获取命令
     * @param string $key 命令key
     * @return array|false
     */
    public static function getCommand(string $key)
    {
        if (!$key) {
            return false;
        }

        $commands = Config::get('terminal.commands');
        if (stripos($key, '.')) {
            $key = explode('.', $key);
            if (!array_key_exists($key[0], $commands) || !is_array($commands[$key[0]]) || !array_key_exists($key[1], $commands[$key[0]])) {
                return false;
            }
            $command = $commands[$key[0]][$key[1]];
        } else {
            if (!array_key_exists($key, $commands)) {
                return false;
            }
            $command = $commands[$key];
        }
        if (!is_array($command)) {
            $command = [
                'cwd'     => dirname(root_path()) . DIRECTORY_SEPARATOR,
                'command' => $command,
            ];
        } else {
            $command = [
                'cwd'     => dirname(root_path()) . DIRECTORY_SEPARATOR . $command['cwd'],
                'command' => $command['command'],
            ];
        }
        $command['cwd'] = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $command['cwd']);
        return $command;
    }

    public function exec(array $commands = [])
    {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');

        if (ob_get_level()) ob_end_clean();
        if (!ob_get_level()) ob_start();

        $command = self::getCommand($this->commandKey);
        if (!$command) {
            $this->execError('The command was not allowed to be executed', true);
        }

        $this->beforeExecution();
        $this->outputFlag('link-success');
        $this->output('> ' . $command['command'], false);

        $this->process = proc_open($command['command'], $this->descriptorsPec, $this->pipes, $command['cwd']);
        if (!is_resource($this->process)) {
            $this->execError('Failed to execute', true);
        }
        while ($this->getProcStatus()) {
            $contents = file_get_contents($this->outputFile);
            if (strlen($contents) && $this->outputContent != $contents) {
                $newOutput = str_replace($this->outputContent, '', $contents);
                if (preg_match('/\r\n|\r|\n/', $newOutput)) {
                    $this->output($newOutput);
                    $this->outputContent = $contents;
                }
            }
            usleep(500000);
        }
        foreach ($this->pipes as $pipe) {
            fclose($pipe);
        }
        proc_close($this->process);
        $this->outputFlag('exec-completed');
    }

    public function getProcStatus(): bool
    {
        $status = proc_get_status($this->process);
        if ($status['running']) {
            $this->procStatus = 1;
            return true;
        } elseif ($this->procStatus === 1) {
            $this->procStatus = 0;
            $this->output('exitcode: ' . $status['exitcode']);
            if ($status['exitcode'] === 0) {
                if ($this->successCallback()) {
                    $this->outputFlag('exec-success');
                } else {
                    $this->output('Error: Command execution succeeded, but callback execution failed');
                    $this->outputFlag('exec-error');
                }
            } else {
                $this->outputFlag('exec-error');
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * 输出 EventSource 数据
     * @param string $data
     * @param bool   $callback
     */
    public function output(string $data, bool $callback = true)
    {
        $data = self::outputFilter($data);
        $data = [
            'data'   => $data,
            'uuid'   => $this->uuid,
            'extend' => $this->extend,
            'key'    => $this->commandKey,
        ];
        $data = json_encode($data, JSON_UNESCAPED_UNICODE);
        if ($data) {
            echo 'data: ' . $data . "\n\n";
            if ($callback) $this->outputCallback($data);
            @ob_flush();// 刷新浏览器缓冲区
        }
    }

    /**
     * 输出状态标记
     * @param string $flag
     */
    public function outputFlag(string $flag)
    {
        $this->output($this->flag[$flag], false);
    }

    /**
     * 输出后回调
     */
    public function outputCallback($data)
    {

    }

    /**
     * 成功后回调
     * @return bool
     */
    public function successCallback(): bool
    {
        if (stripos($this->commandKey, '.')) {
            $commandKeyArr = explode('.', $this->commandKey);
            $commandPKey   = $commandKeyArr[0] ?? '';
        } else {
            $commandPKey = $this->commandKey;
        }
        return true;
    }

    /**
     * 执行前埋点
     */
    public function beforeExecution()
    {
/*        if ($this->commandKey == 'test.pnpm') {
            @unlink(root_path() . 'public' . DIRECTORY_SEPARATOR . 'npm-install-test' . DIRECTORY_SEPARATOR . 'pnpm-lock.yaml');
        } elseif ($this->commandKey == 'web-install.pnpm') {
            @unlink(root_path() . 'web' . DIRECTORY_SEPARATOR . 'pnpm-lock.yaml');
        }*/
    }

    /**
     * 输出过滤
     */
    public static function outputFilter($str)
    {
        $str  = trim($str);
        $preg = '/\[(.*?)m/i';
        $str  = preg_replace($preg, '', $str);
        $str  = str_replace(["\r\n", "\r", "\n"], "", $str);
        return mb_convert_encoding($str, 'UTF-8', 'UTF-8,GBK,GB2312,BIG5');
    }

    /**
     * 执行错误
     */
    public function execError($error, $break = false)
    {
        $this->output('Error:' . $error);
        $this->outputFlag('exec-error');
        if ($break) $this->break();
    }

    /**
     * 退出执行
     */
    public function break()
    {
        throw new CommonException(Response::create()->contentType('text/event-stream'));
    }

    /**
     * 执行一个命令并以字符串的方式返回执行输出
     * 代替 exec 使用，这样就只需要解除 proc_open 的函数禁用了
     * @param $commandKey
     * @return string | bool
     */
    public static function getOutputFromProc($commandKey)
    {
        if (!function_exists('proc_open') || !function_exists('proc_close')) {
            return false;
        }
        $command = self::getCommand($commandKey);
        if (!$command) {
            return false;
        }
        $descriptorsPec = [1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
        $process        = proc_open($command['command'], $descriptorsPec, $pipes, null, null);
        if (is_resource($process)) {
            $info = stream_get_contents($pipes[1]);
            $info .= stream_get_contents($pipes[2]);
            fclose($pipes[1]);
            fclose($pipes[2]);
            proc_close($process);
            return self::outputFilter($info);
        }
        return '';
    }
}