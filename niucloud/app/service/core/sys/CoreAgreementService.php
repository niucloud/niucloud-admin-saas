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

namespace app\service\core\sys;

use app\enum\sys\AgreementEnum;
use app\model\sys\SysAgreement;
use app\service\core\BaseCoreService;
use extend\exception\CommonException;

/**
 * 配置服务层
 * Class CoreAgreementService
 * @package app\service\core\sys
 */
class CoreAgreementService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysAgreement();
    }

    /**
     * 获取协议内容
     * @param int $site_id
     * @param string $key
     * @return array
     */
    public function getAgreement(int $site_id, string $key)
    {
        if(!array_key_exists($key, AgreementEnum::getType())) throw new CommonException(100017);
        $where = array(
            ['agreement_key', '=', $key],
            ['site_id', '=', $site_id]
        );
        $info = $this->model->where($where)->field('site_id, agreement_key, title, content, create_time, update_time')->append(['agreement_key_name'])->findOrEmpty()->toArray();
        if(empty($info))
        {
            $info = [
                'site_id' => $site_id,
                'agreement_key' => $key,
                'agreement_key_name' => AgreementEnum::getType()[$key] ?? '',
                'title' => '',
                'content' => '',
                'create_time' => '',
                'update_time' => ''
            ];
        }
        return $info;
    }

    public function find(int $site_id, string $key)
    {
        if(!array_key_exists($key, AgreementEnum::getType())) throw new CommonException(100017);
        $where = array(
            ['agreement_key', '=', $key],
            ['site_id', '=', $site_id]
        );
        $agreement = $this->model->where($where)->findOrEmpty();
        return $agreement;
    }
    /**
     * 设置协议
     * @param int $site_id
     * @param string $key
     * @param string $title
     * @param string $content
     * @return bool
     */
    public function setAgreement(int $site_id, string $key, string $title, string $content)
    {
        if(!array_key_exists($key, AgreementEnum::getType())) throw new CommonException(100017);
        $where = array(
            ['agreement_key', '=', $key],
            ['site_id', '=', $site_id]
        );
        $data = array(
            'site_id' => $site_id,
            'agreement_key' => $key,
            'title' => $title,
            'content' => $content
        );
        $agreement = $this->find($site_id, $key);
        if($agreement->isEmpty()){
            $data['create_time'] = time();
            $res = $this->model->create($data);
        }else{
            $data['update_time'] = time();
            $res = $this->model->where($where)->save($data);
        }

        return $res;
    }
}