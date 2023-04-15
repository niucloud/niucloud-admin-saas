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

namespace app\service\admin\generator;

use think\App;
use ZipArchive;

use app\service\admin\generator\core\ControllerGenerator;
use app\service\admin\generator\core\ServiceGenerator;
use app\service\admin\generator\core\AdminApiRouteGenerator;
use app\service\admin\generator\core\ModelGenerator;
use app\service\admin\generator\core\ValidateGenerator;
use app\service\admin\generator\core\WebIndexGenerator;
use app\service\admin\generator\core\WebEditGenerator;
use app\service\admin\generator\core\WebEditPageGenerator;
use app\service\admin\generator\core\WebApiGenerator;
use app\service\admin\generator\core\WebLangGenerator;
use app\service\admin\generator\core\WebEditLangGenerator;


/**
 * 代码生成器
 * Class GenerateService
 * @package app\service\generator
 */
class Generate
{
    // 生成文件路径
    protected $outPath;

    // runtime目录
    protected $runtimePath;

    // 压缩包名称
    protected $zipName;

    // 压缩包临时路径
    protected $zipPath;

    // 代码生成标记
    protected $flag;


    public function __construct()
    {
        $this->outPath = root_path() . 'public/upload/generator/';
        $this->runtimePath = root_path() . 'public/upload/';
    }


    /**
     * 删除生成文件
     */
    public function delOutFiles()
    {
        // 删除runtime目录制定文件夹
        !is_dir($this->outPath) && mkdir($this->outPath, 0755, true);
        del_target_dir($this->outPath, false);
    }


    /**
     * 设置生成状态
     * @param $name
     * @param false $status
     */
    public function setFlag($name, $status = false)
    {
        $this->flag = $name;
        cache($name, (int)$status, 3600);
    }


    /**
     * 获取生成状态标记
     * @return mixed|object|App
     */
    public function getFlag()
    {
        return cache($this->flag);
    }


    /**
     * 删除标记时间
     */
    public function delFlag()
    {
        cache($this->flag, null);
    }


    /**
     * 生成器相关类
     * @return string[]
     */
    public function getClassGenerator()
    {
        return [
            ControllerGenerator::class,
            ServiceGenerator::class,
            ModelGenerator::class,
            ValidateGenerator::class,
            AdminApiRouteGenerator::class,
            WebIndexGenerator::class,
            WebEditGenerator::class,
            WebEditPageGenerator::class,
            WebApiGenerator::class,
            WebLangGenerator::class,
            WebEditLangGenerator::class
        ];
    }


    /**
     * 压缩文件
     */
    public function zipFile()
    {
        $fileName = 'niucloud-' . date('YmdHis') . '.zip';
        $this->zipName = $fileName;
        $this->zipPath = $this->outPath . $fileName;
        $zip = new ZipArchive();
        $zip->open($this->zipPath, ZipArchive::CREATE);
        $this->addFileZip($this->runtimePath, 'generator', $zip);
        $zip->close();
    }


    /**
     * 往压缩包写入文件
     * @param $basePath
     * @param $dirName
     * @param $zip
     */
    public function addFileZip($basePath, $dirName, $zip)
    {
        $handler = opendir($basePath . $dirName);
        while (($filename = readdir($handler)) !== false) {
            if ($filename != '.' && $filename != '..') {
                if (is_dir($basePath . $dirName . '/' . $filename)) {
                    // 当前路径是文件夹
                    $this->addFileZip($basePath, $dirName . '/' . $filename, $zip);
                } else {
                    // 写入文件到压缩包
                    $zip->addFile($basePath . $dirName . '/' . $filename, $dirName . '/' . $filename);
                }
            }
        }
        closedir($handler);
    }

    /**
     * 返回压缩包临时路径
     * @return string
     */
    public function getDownloadUrl()
    {
        return 'upload/generator/' .$this->zipName;
    }


    /**
     * 生成文件
     * @param array $table
     */
    public function generate(array $table)
    {
        foreach ($this->getClassGenerator() as $item) {
            $generator = app()->make($item);
            $generator->init($table);
            $generator->generate();
            $this->setFlag($this->flag, true);
        }
    }


    /**
     * 预览文件
     * @param array $table
     * @return array
     */
    public function preview(array $table)
    {
        $data = [];
        foreach ($this->getClassGenerator() as $item) {
            $generator = app()->make($item);
            $generator->init($table);
            $data[] = $generator->fileInfo();
        }
        return $data;
    }


}