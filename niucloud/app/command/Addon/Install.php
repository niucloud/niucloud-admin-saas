<?php
declare (strict_types=1);

namespace app\command\Addon;

use app\service\core\addon\CoreAddonInstallService;
use Exception;
use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;

class Install extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('addon:install')
            ->addArgument('addon', Option::VALUE_REQUIRED)
            ->addOption('step', 's', Option::VALUE_REQUIRED)
            ->setDescription('the addon install command');
    }

    protected function execute(Input $input, Output $output)
    {
        $instance = CoreAddonInstallService::instance($input->getArgument('addon'));
        $step = $input->getOption('step');

        try {
            $instance->$step();
            $output->writeln("Command executed successfully");
        } catch ( Exception $e ) {
            $output->writeln("Command failed " . $e->getMessage());
        }
    }
}
