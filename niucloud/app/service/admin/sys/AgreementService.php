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

namespace app\service\admin\sys;


use app\enum\sys\AgreementEnum;
use app\service\admin\BaseAdminService;
use app\service\core\sys\CoreAgreementService;

/**
 * 协议服务类
 * Class AgreementService
 * @package app\service\admin\sys
 */
class AgreementService extends BaseAdminService
{

    /**
     * 协议列表（不分页）
     * @return array
     */
    public function getList()
    {
        $type = AgreementEnum::getType();
        $list = [];
        foreach ($type as $k => $v)
        {
            $list[$k] = $this->getAgreement($k);
            $list[$k]['type_name'] = $v;
        }
        return $list;
    }
    /**
     * 获取协议内容
     * @param string $key
     * @return array
     */
    public function getAgreement(string $key)
    {
        return (new CoreAgreementService())->getAgreement($this->site_id, $key);
    }

    /**
     * 设置协议
     * @param string $key
     * @param string $title
     * @param string $content
     * @return bool
     */
    public function setAgreement(string $key, string $title, string $content)
    {
        return (new CoreAgreementService())->setAgreement($this->site_id, $key, $title, $content);
    }
}