<?php
declare (strict_types = 1);

namespace app\command;

use app\service\admin\install\InstallSystemService;
use app\service\core\menu\CoreMenuService;
use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;

class Menu extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('menu')
            ->addOption('addon', 'a', Option::VALUE_OPTIONAL)
            ->setDescription('the menu command');
    }

    protected function execute(Input $input, Output $output)
    {
        $addon = $input->getOption('addon');
        if ($addon) {
            (new CoreMenuService())->refreshAddonMenu($addon);
        } else {
            (new InstallSystemService())->installMenu();
        }
        // 指令输出
        $output->writeln('menu refresh success');
    }
}
