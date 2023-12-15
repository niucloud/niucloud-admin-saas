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

namespace app\service\admin\addon;


use app\service\core\addon\CoreAddonDevelopBuildService;
use app\service\core\addon\CoreAddonDevelopDownloadService;
use app\service\core\addon\CoreAddonDevelopService;
use app\service\core\addon\CoreAddonService;
use app\service\core\niucloud\CoreAppService;
use app\service\core\niucloud\CoreModuleService;
use core\base\BaseAdminService;


/**
 * 插件开发服务层
 */
class AddonDevelopService extends BaseAdminService
{
    public $core_addon_develop_service;
    public function __construct()
    {
        parent::__construct();
    }
    /**
     * 新增插件开发
     * @param array $data
     * @return mixed
     */
    public function add(string $key, array $data)
    {
        return (new CoreAddonDevelopService($key))->add($data);
    }

    /**
     * 编辑插件开发
     * @param int $id
     * @param array $data
     * @return SysAttachment
     */
    public function edit(string $key, array $data)
    {
        return (new CoreAddonDevelopService($key))->edit($data);
    }


    /**
     * 删除插件开发
     * @param int $id
     * @return mixed
     */
    public function del(string $key)
    {
        return (new CoreAddonDevelopService($key))->del();
    }


    /**
     * 开发中插件
     * @return array
     */
    public function getList(string $search = '')
    {
        return (new CoreAddonService())->getAddonDevelopList($search);
    }

    /**
     * 查询
     * @param $key
     * @return void
     */
    public function getInfo($key){
        return (new CoreAddonService())->getAddonDevelopInfo($key);
    }

    /**
     * 打包
     * @param string $key
     * @return array
     */
    public function build(string $key){
        return (new CoreAddonDevelopBuildService($key))->build();
    }


    /**
     * 下载
     * @param string $key
     * @return true
     */
    public function download(string $key){
        return (new CoreAddonDevelopDownloadService($key))->download();
    }

    /**
     * 校验key是否被占用
     * @param $key
     * @return array|\core\util\niucloud\http\Response|false|object|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function checkKey($key)
    {
        return ( new CoreModuleService() )->checkKey($key);
    }
}
