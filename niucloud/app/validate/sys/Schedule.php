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

namespace app\validate\sys;

use app\service\core\schedule\CoreScheduleService;
use think\facade\Lang;
use think\Validate;

/**
 * Class Schedule
 */
class Schedule extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'key' => 'require|unique:sys_schedule|checkKeyType',
    ];

    protected $message = [
        'key.require' => 'validate_schedule.schedule_require',
        'key.unique' => 'validate_schedule.schedule_unique',
    ];

    protected $scene = [
        'add' => ['key'],
        'edit' => [],
    ];

    /**
     * 自定义验证 任务类型
     * @param $value
     * @param $rule
     * @param array $data
     * @return Lang|true
     */
    protected function checkKeyType($value, $rule, $data = [])
    {
        $temp = array_column((new CoreScheduleService())->getTemplateList(), null, 'key');
        return isset($temp[$value]) ? true : get_lang("validate_schedule.not_exit_schedule_type");
    }
}