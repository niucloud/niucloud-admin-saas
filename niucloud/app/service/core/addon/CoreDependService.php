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

namespace app\service\core\addon;

/**
 * 依赖安装管理
 */
class CoreDependService extends CoreAddonBaseService
{
    protected $server_composer_file;//服务端composer.json
    protected $admin_npm_file;//admin端npm的package.json
    protected $web_npm_file;//web端npm的package.json
    protected $wap_npm_file;//wap端npm的package.json

    public function __construct()
    {
        parent::__construct();
        $this->server_composer_file = $this->root_path. 'niucloud'. DIRECTORY_SEPARATOR. 'composer.json';
        $this->admin_npm_file = $this->root_path. 'admin'. DIRECTORY_SEPARATOR. 'package.json';
        $this->web_npm_file = $this->root_path. 'web'. DIRECTORY_SEPARATOR. 'package.json';
        $this->wap_npm_file = $this->root_path. 'uni-app'. DIRECTORY_SEPARATOR. 'package.json';
    }

    /**
     * 获取插件更新后的composer以及package
     * @param $addon
     * @return bool
     */
    public function installDepend($addon)
    {
        //composer文件扩展
        $composer_content = $this->getComposerContent();
        $addon_composer_content =  $this->getAddonComposerContent($addon);
        if(isset($addon_composer_content['require']))
        {
            $composer_content['require'] = array_merge($composer_content['require'], $addon_composer_content['require']);
        }

        if(isset($addon_composer_content['require_dev']))
        {
            $composer_content['require_dev'] = array_merge($composer_content['require_dev'], $addon_composer_content['require_dev']);
        }
        $this->setComposerContent($composer_content);
        //admin-package文件扩展
        $admin_package_array = $this->getNpmContent('admin');
        $addon_admin_package_array = $this->getAddonNpmContent($addon, 'admin');
        if(isset($addon_admin_package_array['dependencies']))
        {
            $admin_package_array['dependencies'] = array_merge($admin_package_array['dependencies'], $addon_admin_package_array['dependencies']);
        }

        if(isset($addon_admin_package_array['devDependencies']))
        {
            $admin_package_array['devDependencies'] = array_merge($admin_package_array['devDependencies'], $addon_admin_package_array['devDependencies']);
        }
        $this->setNpmContent($admin_package_array, 'admin');

        //web-package文件扩展
        $web_package_array = $this->getNpmContent('web');
        $addon_web_package_array = $this->getAddonNpmContent($addon, 'web');
        if(isset($addon_web_package_array['dependencies']))
        {
            $web_package_array['dependencies'] = array_merge($web_package_array['dependencies'], $addon_web_package_array['dependencies']);
        }

        if(isset($addon_web_package_array['devDependencies']))
        {
            $web_package_array['devDependencies'] = array_merge($web_package_array['devDependencies'], $addon_web_package_array['devDependencies']);
        }
        $this->setNpmContent($web_package_array, 'web');

        //uni-app-package文件扩展
        $wap_package_array = $this->getNpmContent('uni-app');
        $addon_wap_package_array = $this->getAddonNpmContent($addon, 'wap');
        if(isset($addon_wap_package_array['dependencies']))
        {
            $wap_package_array['dependencies'] = array_merge($wap_package_array['dependencies'], $addon_wap_package_array['dependencies']);
        }

        if(isset($addon_wap_package_array['devDependencies']))
        {
            $wap_package_array['devDependencies'] = array_merge($wap_package_array['devDependencies'], $addon_wap_package_array['devDependencies']);
        }
        $this->setNpmContent($wap_package_array, 'wap');
        return true;
    }

    /**
     * 获取composer的内容
     * @return mixed
     */
    public function getComposerContent()
    {
        return $this->jsonFileToArray($this->server_composer_file);
    }

    /**
     * 获取插件的composer内容
     * @param $addon
     * @return array|mixed
     */
    public function getAddonComposerContent(string $addon)
    {
        $composer_path = $this->getAddonConfigPath($addon). 'composer.json';
        return $this->jsonFileToArray($composer_path);
    }

    /**
     * 更新composer内容
     * @param array $content
     * @return bool
     */
    public function setComposerContent(array $content)
    {
        return $this->writeArrayToJsonFile($content, $this->server_composer_file);
    }

    /**
     * 获取npm文件内容
     * @param $type //端口类型：admin  wap web
     */
    public function getNpmContent(string $type)
    {
        if($type == 'admin')
        {
            $file_path = $this->admin_npm_file;
        }elseif($type == 'web')
        {
            $file_path = $this->web_npm_file;
        }else{
            $file_path = $this->wap_npm_file;
        }
        return $this->jsonFileToArray($file_path);
    }

    /**
     * 获取插件npm内容
     * @param string $addon
     * @param string $type 'admin  wep  uni-app'
     * @return array|mixed
     */
    public function getAddonNpmContent(string $addon, string $type)
    {
        if($type == 'admin')
        {
            $file_path = $this->getAddonConfigPath($addon).'admin-package.json';
        }elseif($type == 'web')
        {
            $file_path = $this->getAddonConfigPath($addon).'web-package.json';
        }else{
            $file_path = $this->getAddonConfigPath($addon).'uni-app-package.json';
        }
        return $this->jsonFileToArray($file_path);
    }

    /**
     * 更新npm内容
     * @param array $content
     * @return bool
     */
    public function setNpmContent(array $content, string $type)
    {
        if($type == 'admin')
        {
            $file_path = $this->admin_npm_file;
        }elseif($type == 'web')
        {
            $file_path = $this->web_npm_file;
        }else{
            $file_path = $this->wap_npm_file;
        }
        return $this->writeArrayToJsonFile($content, $file_path);
    }

}