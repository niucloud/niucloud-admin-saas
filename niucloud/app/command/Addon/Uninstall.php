<?php
declare (strict_types=1);

namespace app\command\Addon;

use think\console\Command;
use think\console\Input;
use think\console\Output;

class Uninstall extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('addon')
            ->setDescription('the addon uninstall command');
    }

    protected function execute(Input $input, Output $output)
    {
        // 指令输出
        $output->writeln('uninstall');
    }
}
