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

namespace app\dict\sys;

class MethodDict
{

    const GET = 'get';
    const POST = 'post';
    const DELETE = 'delete';
    const PUT = 'put';

    public static function getMethodType(){
        return [
            self::GET => 'GET',
            self::POST => 'POST',
            self::PUT => 'PUT',
            self::DELETE => 'DELETE',
        ];
    }

}