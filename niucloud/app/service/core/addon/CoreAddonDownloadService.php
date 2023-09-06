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

use app\model\addon\Addon;
use app\service\core\niucloud\CoreModuleService;
use core\exception\AddonException;
use GuzzleHttp\Exception\GuzzleException;
use ZipArchive;

/**
 * 安装服务层
 * Class CoreInstallService
 * @package app\service\core\install
 */
class CoreAddonDownloadService extends CoreAddonBaseService
{

    protected $addon_download_path;

    public function __construct()
    {
        parent::__construct();
        $this->model = new Addon();
        $this->addon_download_path = 'upload/download/';
    }

    /**
     * 下载文件
     * @param $app_key
     * @return true
     * @throws GuzzleException
     * @throws GuzzleException
     */
    public function download($app_key)
    {
        $app_path = $this->addon_path . $app_key . '/';
        //先判断当前的应用在本地是否存在
//        if(is_dir($app_path)) throw new NiucloudException();
        $app_download_path = $this->addon_download_path . $app_key . '/';
        //下载文件到本地
        $zip_file = (new CoreModuleService())->downloadModule($app_key, $app_download_path);
        //解压到应用addon下
        //删除旧版本文件
        del_target_dir($app_path, true);
        //解压文件
        $this->unzip($zip_file, $this->addon_path);
        //删除压缩包
        @unlink($zip_file);
        return true;
    }

    /**
     * 解压压缩包
     * @param $file
     * @param $dir
     * @return mixed|string
     */
    public function unzip($file, $dir)
    {
        if (!file_exists($file)) throw new AddonException('ZIP_FILE_NOT_FOUND');
        $zip = new ZipArchive();
        if ($zip->open($file) === TRUE) {
            // 对Zip文件进行解压缩操作
            $zip->extractTo($dir);
            $zip->close();
        } else {
            throw new AddonException('ZIP_FILE_NOT_FOUND');
        }
        return $dir;
    }

    public function update()
    {

    }
}