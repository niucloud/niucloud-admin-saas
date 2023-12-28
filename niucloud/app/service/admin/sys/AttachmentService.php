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

namespace app\service\admin\sys;

use app\dict\sys\FileDict;
use app\dict\sys\IconDict;
use app\model\sys\SysAttachment;
use app\model\sys\SysAttachmentCategory;
use app\service\core\sys\CoreAttachmentService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 附件服务层
 * Class CoreAgreementService
 * @package app\service\core\sys
 */
class AttachmentService extends BaseAdminService
{
    public $core_attachment_service;

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysAttachment();
        $this->core_attachment_service = new CoreAttachmentService();
    }

    /**
     * 新增素材
     * @param array $data
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        return $this->core_attachment_service->add($data);
    }

    /**
     *
     * /**
     * 编辑素材
     * @param int $att_id
     * @param array $data
     * @return SysAttachment
     */
    public function edit(int $att_id, array $data)
    {
        return $this->core_attachment_service->edit($this->site_id, $att_id, $data);
    }

    /**
     * 修改附件分组
     * @param $att_id
     * @param $cate_id
     * @return bool
     */
    public function modifyCategory($att_id, $cate_id)
    {
        $where = array (
            [ 'att_id', '=', $att_id ],
            [ 'site_id', '=', $this->site_id ],
        );
        $this->model->where($where)->update([ 'cate_id' => $cate_id, 'update_time' => time() ]);
        return true;
    }

    /**
     * 批量更新附件分组
     * @param $att_ids
     * @param $cate_id
     * @return bool
     */
    public function batchModifyCategory($att_ids, $cate_id)
    {

        $where = array (
            [ 'att_id', 'in', is_string($att_ids) ? explode($att_ids) : $att_ids ],
            [ 'site_id', '=', $this->site_id ],
        );
        $this->model->where($where)->update([ 'cate_id' => $cate_id, 'update_time' => time() ]);
        return true;
    }

    /**
     * 删除素材
     * @param int $att_id
     * @return mixed
     */
    public function del(int $att_id)
    {
        return $this->core_attachment_service->del($this->site_id, $att_id);
    }

    /**
     * 批量删除
     * @param $data
     * @return true|null
     */
    public function delAll($data)
    {
        return $this->core_attachment_service->delAll($this->site_id, $data);
    }

    /**
     * 管理端获取附件列表
     * @param array $data
     * @return array
     */
    public function getPage(array $data)
    {
        $where = array (
            [ 'site_id', '=', $this->site_id ]
        );
        if (!empty($data[ 'att_type' ])) {
            $where[] = [ 'att_type', '=', $data[ 'att_type' ] ];
        }
        if (!empty($data[ 'cate_id' ])) {
            $where[] = [ 'cate_id', '=', $data[ 'cate_id' ] ];
        }
        if (!empty($data[ 'real_name' ])) {
            $where[] = [ 'real_name', 'like', '%' . $data[ 'real_name' ] . '%' ];
        }
        return $this->getPageList($this->model, $where, 'att_id,path,real_name,att_type,url', 'att_id desc', each:function($item, $key)
    {
        $item[ 'thumb' ] = get_thumb_images($this->site_id, $item[ 'url' ], FileDict::SMALL);
    });
    }

    /**
     * 新增素材组
     * @param array $data
     * @return mixed
     */
    public function addCategory(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $category_model = new SysAttachmentCategory();
        $attachment = $category_model->create($data);
        if (!$attachment->id)
            throw new AdminException('ADD_FAIL');//创建失败
        return $attachment->att_id;
    }

    /**
     * 素材组模型对象
     * @param int $site_id
     * @param int $id
     * @return mixed
     */
    public function findCategory(int $site_id, int $id)
    {
        $where = array (
            [ 'site_id', '=', $site_id ],
            [ 'id', '=', $id ]
        );
        $category_model = new SysAttachmentCategory();
        $category = $category_model->where($where)->findOrEmpty();
        if ($category->isEmpty())
            throw new AdminException('ATTACHMENT_GROUP_NOT_EXIST');
        return $category;
    }

    /**
     * 编辑素材组
     * @param int $id
     * @param array $data
     * @return SysAttachmentCategory
     */
    public function editCategory(int $id, array $data)
    {
        $where = array (
            [ 'site_id', '=', $this->site_id ],
            [ 'id', '=', $id ]
        );
        $category_model = new SysAttachmentCategory();
        return $category_model->where($where)->update($data);
    }

    /**
     * 删除素材组
     * @param int $id
     * @return mixed
     * @throws DbException
     */
    public function delCategory(int $id)
    {
        //查询是否有下级菜单或按钮
        $category = $this->findCategory($this->site_id, $id);
        if ($this->model->where([ [ 'cate_id', '=', $id ] ])->count() > 0)
            throw new AdminException('ATTACHMENT_GROUP_HAS_IMAGE');

        //下级存在图片不能删除
        return $category->delete();

    }

    /**
     * 管理端获取附件组列表
     * @param array $data
     * @return array
     * @throws DbException
     */
    public function getCategoryPage(array $data)
    {
        $where = array (
            [ 'site_id', '=', $this->site_id ]
        );
        if (!empty($data[ 'type' ])) {
            $where[] = [ 'type', '=', $data[ 'type' ] ];
        }
        if (!empty($data[ 'name' ])) {
            $where[] = [ 'name', 'like', '%' . $data[ 'name' ] . '%' ];
        }
        return $this->getPageList(( new SysAttachmentCategory() ), $where, 'id,name', 'id desc');
    }

    /**
     * 获取分组列表
     * @param array $data
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getCategoryList(array $data)
    {
        $where = array (
            [ 'site_id', '=', $this->site_id ]
        );
        if (!empty($data[ 'type' ])) {
            $where[] = [ 'type', '=', $data[ 'type' ] ];
        }
        if (!empty($data[ 'name' ])) {
            $where[] = [ 'name', 'like', '%' . $data[ 'name' ] . '%' ];
        }
        return SysAttachmentCategory::where($where)->field('id,name,type')->order('id desc')->select()->toArray();
    }

    /**
     * 获取图标库分类列表
     * @param array $data
     * @return array|null
     */
    public function getIconCategoryList(array $data)
    {
        $icon_list = IconDict::getIcon();
        foreach ($icon_list as $k => $v) {
            unset($icon_list[ $k ][ 'glyphs' ]);
            if (!empty($data[ 'name' ]) && !str_contains($v['name'], $data['name'])) {
                unset($icon_list[ $k ]);
            }
        }
        return array_values($icon_list);
    }

    /**
     * 获取图标库列表
     * @param array $data
     * @return array|null
     */
    public function getIconList(array $data)
    {
        $icon_list = IconDict::getIcon();

        $res = [
            'current_page' => intval($data[ 'page' ]),
            'per_page' => intval($data[ 'limit' ]),
            'data' => [],
            'total' => 0
        ];

        $temp_data = [];

        foreach ($icon_list as $v) {

            $icon = $v[ 'glyphs' ]; // 图标列表

            foreach ($icon as $ck => $cv) {
                // 素材表中数据保持要一致
                $icon[ $ck ][ 'att_id' ] = $cv[ 'icon_id' ];
                $icon[ $ck ][ 'url' ] = $v[ 'font_family' ] . '-' . $v[ 'css_prefix_text' ] . $cv[ 'font_class' ];
                $icon[ $ck ][ 'real_name' ] = $cv[ 'name' ];

                // 查询名称
                if (!empty($data[ 'real_name' ]) && !str_contains($cv['name'], $data['real_name'])) {
                    unset($icon[ $ck ]);
                }
            }

            $icon = array_values($icon);

            if (!empty($data[ 'cate_id' ]) && $data[ 'cate_id' ] == $v[ 'id' ]) {
                // 查询指定分类下的图标
                $temp_data = $icon;
                break;
            } else {
                // 查询全部图标
                $temp_data = array_merge($temp_data, $icon);
            }
        }

        // 手动分页
        $res[ 'total' ] = count($temp_data); // 总数量
        $start = ( $res[ 'current_page' ] - 1 ) * $res[ 'per_page' ]; // 数组下标从0 开始
        $icon_list = array_slice($temp_data, $start, $res[ 'per_page' ]);

        $res[ 'data' ] = $icon_list;

        return $res;
    }

}