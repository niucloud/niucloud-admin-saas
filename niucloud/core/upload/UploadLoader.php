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

namespace core\upload;

use core\loader\Loader;

/**
 * @see \core\upload\UploadLoader
 * @package think\facade
 * @mixin \core\upload\BaseUpload
 * @method  string|null upload(string $dir) 附件上传
 * @method  array fetch(string $url, ?string $key) 抓取远程附件
 * @method  mixed delete(string $file_name) 附件删除
 * @method  mixed thumb(string $file_path, $thumb_type) 附件删除
 */
class UploadLoader extends Loader
{
    /**
     * 空间名
     * @var string
     */
    protected $namespace = '\\core\\upload\\';

    protected $config_name = 'upload';
    /**
     * 默认驱动
     * @return mixed
     */
    protected function getDefault()
    {
        return config('upload.default');
    }
}