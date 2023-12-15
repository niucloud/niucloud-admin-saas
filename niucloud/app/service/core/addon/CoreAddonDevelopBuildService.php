<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\core\addon;

use app\model\addon\Addon;
use app\model\addon\AddonDevelop;
use core\exception\AddonException;

/**
 * 插件开发服务层
 */
class CoreAddonDevelopBuildService extends CoreAddonBaseService
{


    public $base_addon_dir;


    private $key;

    public function __construct(string $key)
    {
        parent::__construct();
        $this->model = new Addon();
        $this->key = $key;
        $this->base_addon_dir = $this->addon_path . DIRECTORY_SEPARATOR . $this->key;

    }

    //生成


    public function build()
    {
        if (!is_dir($this->base_addon_dir)) throw new AddonException('ADDON_IS_NOT_EXIST');//当前目录中不存在此项插件
        $this->admin();
        $this->uniapp();
        $this->web();
    }

    /**
     * admin打包
     * @return void
     */
    public function admin()
    {
        $form_dir = $this->root_path . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $this->key;
        $to_dir = $this->base_addon_dir . DIRECTORY_SEPARATOR . 'admin';
        //删除目录文件
        del_target_dir($to_dir, true);
        dir_copy($form_dir, $to_dir);
    }

    /**
     * wap打包
     * @return void
     */
    public function uniapp()
    {
        $form_dir = $this->root_path . DIRECTORY_SEPARATOR . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $this->key;
        $to_dir = $this->base_addon_dir . DIRECTORY_SEPARATOR . 'uni-app';
        //删除目录文件
        del_target_dir($to_dir, true);
        dir_copy($form_dir, $to_dir);
    }

    /**
     * web打包
     * @return void
     */
    public function web()
    {
        $form_dir = $this->root_path . DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . $this->key;
        $to_dir = $this->base_addon_dir . DIRECTORY_SEPARATOR . 'web';
        //删除目录文件
        del_target_dir($to_dir, true);
        dir_copy($form_dir, $to_dir);
    }
}
