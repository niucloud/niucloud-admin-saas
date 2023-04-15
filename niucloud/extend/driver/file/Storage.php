<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-02-17
 * Time: 15:58
 */

namespace extend\driver\file;

/**
 * 文件管理驱动类
 * Class FileDriver
 * @package extend\driver\file
 */
abstract class Storage
{
    //导入附件管理工具类
    use ToolTrait;

    protected function __construct(){}


    /**
     * 附件上传
     * @param $save_dir
     * @return mixed
     */
    abstract protected function upload(string $dir);

    /**
     * 抓取远程附件
     * @param $url
     * @param $key
     * @return mixed
     */
    abstract protected function fetch(string $url, ?string $key);

    /**
     * 附件删除
     * @param $fileName
     * @return mixed
     */
    abstract protected function delete(string $file_name);

}