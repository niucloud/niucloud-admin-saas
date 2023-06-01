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

use app\api\middleware\ApiChannel;
use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\middleware\AllowCrossDomain;
use think\facade\Route;


/**
 * 会员个人信息管理
 */
Route::group('file', function () {

    /***************************************************** 会员管理 ****************************************************/
    //上传图片
    Route::post('image', 'upload.Upload/image');
    //拉取图片
    Route::post('image/fetch', 'upload.Upload/imageFetch');
    //base64图片
    Route::post('image/base64', 'upload.Upload/imageBase64');

})->middleware(AllowCrossDomain::class)->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)
    ->middleware(ApiLog::class);