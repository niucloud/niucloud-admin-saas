<?php

namespace app\listener\notice_template;


/**
 * 会员验证码
 */
class MemberVerifySuccess extends BaseNoticeTemplate
{

    private $key = 'member_verify_code';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
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