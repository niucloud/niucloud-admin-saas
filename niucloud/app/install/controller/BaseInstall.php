<?php

namespace app\install\controller;

use core\base\BaseController;
use think\App;
use think\facade\View;


class BaseInstall extends BaseController
{
    public $replace = [];
    public $lock_file;
    public $lang;
    public $install_root = '';

    public function __construct(App $app)
    {
        parent::__construct($app);

        $this->lock_file = '../install.lock';//锁定文件

        $root_url = request()->domain();
        View::assign("root_url", $root_url);
        $this->setInstallRoot();

    }
    /**
     * 加载模板输出
     * @access protected
     * @param string $template 模板文件名
     * @param array $vars 模板输出变量
     * @return string
     */
    protected function fetch($template = '', $vars = [])
    {
        return View::fetch($template, $vars);
    }
    /**
     * 模板变量赋值
     * @access protected
     * @param mixed $name 要显示的模板变量
     * @param mixed $value 变量的值
     * @return void
     */
    protected function assign($name, $value = '')
    {
        View::assign($name, $value);
    }

    public function setInstallRoot()
    {
        $this->install_root = dirname(__DIR__) . '/';
    }

    public function str_replace_first($search, $replace, $subject)
    {
        return implode($replace, explode($search, $subject, 2));
    }

    public function checkLock()
    {
        if (file_exists($this->lock_file)) {
            header("location:/index.php");
            exit;
        }
    }
}