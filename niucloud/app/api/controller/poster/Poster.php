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

namespace app\api\controller\poster;

use core\base\BaseApiController;

/**
 * 海报
 */
class Poster extends BaseApiController
{

    /**
     * 获取海报
     * @return void|null
     */
    public function poster()
    {
        $data = $this->request->params([
            ['type', ''],//业务类型
            ['param', []],//参数1
        ]);
        $data['channel'] = $this->request->getChannel();
        return success(data: poster($this->request->siteId(), ...$data));
    }


}
