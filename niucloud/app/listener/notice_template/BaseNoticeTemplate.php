<?php

namespace app\listener\notice_template;

class BaseNoticeTemplate
{
    /**
     * @param $vars 模板变量
     * @param $to 发送对象
     * @return array
     */
    public function toReturn($vars, $to){
        return [
            'vars' => $vars,
            'to' => $to,
        ];
    }
}