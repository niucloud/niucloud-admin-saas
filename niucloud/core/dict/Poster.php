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
namespace core\dict;


class Poster extends BaseDict
{
    /**
     * 加载海报模板配置
     * @param array $data
     * @return array|mixed
     */
    public function load(array $data = [])
    {
        $addon = $data['addon'] ?? '';
        $schedule_files = [];
        if (empty($addon)) {
            $system_path = $this->getDictPath() . 'poster' . DIRECTORY_SEPARATOR . 'template.php';
            if (is_file($system_path)) {
                $schedule_files[] = $system_path;
            }
            $addons = $this->getLocalAddons();
            foreach ($addons as $v) {
                $addon_path = $this->getAddonDictPath($v) . 'poster' . DIRECTORY_SEPARATOR . 'template.php';
                if (is_file($addon_path)) {
                    $schedule_files[] = $addon_path;
                }
            }
        } else {
            $schedule_files = [];
            if ($addon == 'system') {
                $system_path = $this->getDictPath() . 'poster' . DIRECTORY_SEPARATOR . 'template.php';
                if (is_file($system_path)) {
                    $schedule_files[] = $system_path;
                }
            } else {
                $addon_path = $this->getAddonDictPath($addon) . 'poster' . DIRECTORY_SEPARATOR . 'template.php';
                if (is_file($addon_path)) {
                    $schedule_files[] = $addon_path;
                }
            }

        }
        $schedule_files_data = $this->loadFiles($schedule_files);
        $schedule_data_array = [];
        foreach ($schedule_files_data as $file_data) {
            $schedule_data_array = empty($schedule_data_array) ? $file_data : array_merge($schedule_data_array, $file_data);
        }
        return $schedule_data_array;

    }

    /**
     * 获取海报模板动态变量
     * @param array $data
     * @return array|mixed
     */
    public function loadVars(array $data = [])
    {
        $addon = $data['addon'] ?? '';
        $schedule_files = [];
        if (empty($addon)) {
            $system_path = $this->getDictPath() . 'poster' . DIRECTORY_SEPARATOR . 'vars.php';
            if (is_file($system_path)) {
                $schedule_files[] = $system_path;
            }
            $addons = $this->getLocalAddons();
            foreach ($addons as $v) {
                $addon_path = $this->getAddonDictPath($v) . 'poster' . DIRECTORY_SEPARATOR . 'vars.php';
                if (is_file($addon_path)) {
                    $schedule_files[] = $addon_path;
                }
            }
        } else {
            $schedule_files = [];
            if ($addon == 'system') {
                $system_path = $this->getDictPath() . 'poster' . DIRECTORY_SEPARATOR . 'vars.php';
                if (is_file($system_path)) {
                    $schedule_files[] = $system_path;
                }
            } else {
                $addon_path = $this->getAddonDictPath($addon) . 'poster' . DIRECTORY_SEPARATOR . 'vars.php';
                if (is_file($addon_path)) {
                    $schedule_files[] = $addon_path;
                }
            }

        }
        $schedule_files_data = $this->loadFiles($schedule_files);
        $schedule_data_array = [];
        foreach ($schedule_files_data as $file_data) {
            $schedule_data_array = empty($schedule_data_array) ? $file_data : array_merge($schedule_data_array, $file_data);
        }
        return $schedule_data_array;

    }
}