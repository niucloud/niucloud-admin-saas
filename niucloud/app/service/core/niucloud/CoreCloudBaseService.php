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

namespace app\service\core\niucloud;

use core\base\BaseCoreService;
use core\exception\CommonException;
use core\util\niucloud\http\Response;

/**
 * 云服务层
 */
class CoreCloudBaseService extends BaseCoreService
{
    protected $auth_code;

    protected $root_path;

    public function __construct()
    {
        parent::__construct();
        $config = (new CoreNiucloudConfigService())->getNiucloudConfig();
        $this->auth_code = $config['auth_code'];
        if (empty($this->auth_code)) throw new CommonException('NEED_TO_AUTHORIZE_FIRST');

        $this->root_path = dirname(root_path()) . DIRECTORY_SEPARATOR;
    }

    public function addonPath(string $addon) {
        return root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
    }
}
