<?php

namespace app\listener\notice_template;

use app\service\core\order\CoreOrderRefundService;
use app\service\core\order\CoreOrderService;
use core\exception\NoticeException;

/**
 * 会员验证码
 */
class MemberVerifySuccess extends BaseNoticeTemplate
{

    private $key = 'member_verify_code';

    public function handle(array $params)
    {
        if ($this->key == $params['key']){
            $data = $params['data'];
            return $this->toReturn(
                [
                    'code' => $data['code'],
                ],
                [
                    'mobile' => $data['mobile'],
                ]
            );
        }

    }

}