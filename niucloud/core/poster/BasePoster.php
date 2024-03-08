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

namespace core\poster;

use core\loader\Storage;

/**
 * Class BasePoster
 * @package
 */
abstract class BasePoster extends Storage
{
    /**
     * 初始化
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {

    }

    /**
     * 创建海报
     * @param array $poster
     * @param string $dir
     * @param string $file_path
     * @return mixed
     */
    abstract public function createPoster(array $poster, string $dir, string $file_path);




}
