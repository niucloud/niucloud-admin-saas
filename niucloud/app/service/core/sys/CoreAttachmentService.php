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

use app\model\sys\SysAttachment;
use app\service\core\BaseCoreService;
use app\service\core\file\CoreStorageService;
use extend\driver\file\FileDriver;
use extend\exception\AdminException;
use extend\exception\UploadFileException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 素材管理服务层
 * Class CoreAttachmentService
 * @package app\service\core\sys
 */
class CoreAttachmentService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysAttachment();
    }

    /**
     * 新增素材
     * @param $params
     */
    public function add(int $site_id, array $data){
        $data['site_id'] = $site_id;
        $attachment = $this->model->create($data);
        if(!$attachment->att_id)
            throw new AdminException(100010);//创建失败
        return $attachment->att_id;
    }

    /**
     * 素材库模型对象
     * @param int $uid
     * @return mixed
     */
    public function find(int $site_id, int $att_id){
        $where = array(
            ['site_id', '=', $site_id],
            ['att_id', '=', $att_id]
        );
        $user = $this->model->where($where)->findOrEmpty();
        if ($user->isEmpty())
            throw new AdminException(201001);
        return $user;
    }

    /**
     * 图片列表
     * @param int $site_id
     * @param array|null $data
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList(int $site_id, ?array $data = []){
        $where = array(
            ['site_id', '=', $site_id]
        );
        $att_ids = $data['att_ids'] ?? [];
        if(!empty($att_ids)){
            $where[] = ['att_id', 'in', $att_ids];
        }
        return $this->model->where($where)->select()->toArray();
    }
    /**
     * 编辑素材
     * @param array $data
     * @param $where
     */
    public function update(int $site_id, int $att_id, array $data){
        $where = array(
            ['site_id', '=', $site_id],
            ['att_id', '=', $att_id]
        );
        $res = $this->model->update($data, $where);
        return $res;
    }

    /**
     * 删除素材
     * @param int $uid
     * @return mixed
     */
    public function del(int $site_id, int $att_id){
        //查询是否有下级菜单或按钮
        $menu = $this->find($site_id, $att_id);
        $res = $menu->delete();
        return  $res;

    }


    /**
     * 删除附件库中的文件
     * @param $site_id
     * @param $ids
     * @return void
     */
    public function delAll(int $site_id, array $att_ids){
        $core_storage_service = new CoreStorageService();
        $storage_config = $core_storage_service->getDefaultStorage($site_id);
        $storage_type = $storage_config['storage_type'];
        $file_driver = new FileDriver($storage_config, $storage_type);
        $core_attachment_service = new CoreAttachmentService();
        $list = $core_attachment_service->getList($site_id, compact('att_ids'));
        if(empty($list))
            throw new UploadFileException(203007);

        $ids = array_column($list, 'att_id');
        foreach($list as $v){
            //读取上传附件的信息用于后续得校验和数据写入,删除失败直接通过
            $file_driver->delete($v['path']);
        }
        $this->model->destroy($ids);
        return true;
    }
}