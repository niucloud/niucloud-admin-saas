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

namespace app\service\core\upload;

use core\base\BaseCoreService;
use core\exception\UploadFileException;
use core\upload\FileDriver;
use core\upload\UploadLoader;
use Exception;

/**
 * 上传服务层
 * Class CoreFileService
 * @package app\service\core\file
 */
class CoreFileService extends BaseCoreService
{

    protected $root_path = 'upload';

    protected $validate = [];

    public function __construct(protected $is_attachment = false)
    {
        parent::__construct();
    }

    /**
     * 设置上传根目录
     * @param $root_path
     * @return void
     */
    public function setRootPath($root_path){
        $this->root_path = $root_path;
        return $this;
    }

    /**
     * 设置上传规则
     * @param array $validate  ['ext' => [], 'mime' => [], 'size' => 0]
     * @return void
     */
    public function setValidate(array $validate){
        $this->validate = $validate;
        return $this;
    }

    /**
     * 设置重命名
     * @param $rename
     * @return $this
     */
    public function setRename($rename = ''){
        $this->rename = $rename;
        return $this;
    }

    /**
     * @var FileDriver
     */
    protected $upload_driver;
    protected static $storage_type;

    /**
     * 实例化上传引擎
     * @param int $site_id
     * @param string $storage_type
     * @return UploadLoader
     * @throws Exception
     */
    public function driver(int $site_id, string $storage_type = ''){
        if(!empty($storage_type)){
            self::$storage_type = $storage_type;
            $core_storage_service = new CoreStorageService();
            $storage_config = $core_storage_service->getStorageByType($site_id, $storage_type);
        }else{
            $core_storage_service = new CoreStorageService();
            $storage_config = $core_storage_service->getDefaultStorage($site_id);
            if(empty($storage_config)) throw new UploadFileException('UPLOAD_STORAGE_TYPE_ALL_CLOSE');
            self::$storage_type = $storage_config['storage_type'];
        }
        $storage_config = $storage_config ?? [];
        $storage_config['storage_type'] = self::$storage_type;
        //查询启用的上传方式
        return new UploadLoader(self::$storage_type, $storage_config ?? []);
    }
}
