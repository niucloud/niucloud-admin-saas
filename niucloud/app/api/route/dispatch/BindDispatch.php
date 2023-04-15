<?php

namespace app\api\route\dispatch;

use app\enum\member\MemberLoginTypeEnum;
use app\enum\common\ChannelEnum;
use think\App;
use think\helper\Str;
use think\route\Dispatch;
use think\route\dispatch\Controller;

class BindDispatch extends Controller
{
    /**
     * 多场景授权绑定调度类
     * @param App $app
     * @return void
     */
    public function init(App $app)
    {
        $this->app = $app;
        $this->doRouteAfter();
        $channel = $this->request->getChannel();

        if($this->request->param('channel', '')){
            $channel = $this->request->param('channel');
        }

        switch ($channel) {
            case MemberLoginTypeEnum::WECHAT:
                $controller = 'wechat.Wechat';
                $action = 'register';
                break;
            case MemberLoginTypeEnum::WEAPP:
                $controller = 'weapp.Weapp';
                $action = 'register';
                break;
        };


        $this->controller = $controller ?? '';
        $this->actionName = $action ?? '';
        $this->request
            ->setController($this->controller ?? '')
            ->setAction($this->actionName);
    }

}