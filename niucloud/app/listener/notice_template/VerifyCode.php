<?php

namespace app\listener\notice_template;

/**
 * 注册
 */
class VerifyCode extends BaseNoticeTemplate
{
//    private $var = array(
//        'code' => '验证码'
//    );
    private $key = 'verify_code';
//    private $title = '';
//    public $name = '';
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