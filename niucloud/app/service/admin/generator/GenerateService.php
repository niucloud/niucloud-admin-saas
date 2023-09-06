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

namespace app\service\admin\generator;

use app\model\generator\GenerateColumn;
use app\model\generator\GenerateTable;
use core\base\BaseAdminService;
use core\exception\AdminException;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;
use think\Model;
use think\model\relation\HasOne;


/**
 * 代码生成器
 * Class Generator
 * @package app\service\admin\generator
 */
class GenerateService extends BaseAdminService
{

    /**
     * 获取代码生成列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,table_name,table_content,class_name,edit_type,create_time';
        $order = 'create_time desc';
        $search_model = (new GenerateTable())->withSearch(['table_name', 'table_content'], $where)->field($field)->order($order);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取代码生成信息
     * @param int $id
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getInfo(int $id)
    {
        $field = 'id,table_name,table_content,class_name,module_name,edit_type';

        $info = (new GenerateTable())->field($field)->where([['id', '=', $id]])->findOrEmpty()->toArray();
        $info['table_column'] = (new GenerateColumn())->where([['table_id', '=', $id]])->select()->toArray();
        return $info;
    }

    /**
     * 添加代码生成
     * @param array $data
     * @return GenerateTable|Model
     * @throws Exception
     */
    public function add(array $data)
    {
        Db::startTrans();
        try {
            $sql = 'SHOW TABLE STATUS WHERE 1=1 ';
            $tablePrefix = config('database.connections.mysql.prefix');
            if (!empty($data['table_name'])) {
                $sql .= "AND name='" . $data['table_name']."'";
            }

            $tables = Db::query($sql);
            $table_info = $tables[0] ?? [];
            if(empty($table_info)) throw new AdminException('DATA_NOT_EXIST');

            $table_name = str_replace($tablePrefix, '', $table_info['Name']);
            $fields = Db::name($table_name)->getFields();

            $add_table_data = [
                'table_name' => $table_name,
                'table_content' => $table_info['Comment'],
                'class_name' => '',
                'create_time' => time(),
                'module_name' => $table_name
            ];

            $res = (new GenerateTable())->create($add_table_data);

            $table_id = $res->id;
            $add_column_data = [];
            $default_column = ['id', 'create_time', 'update_time'];
            foreach ($fields as $k => $v){
                $required = 0;
                if ($v['notnull'] && !$v['primary'] && !in_array($v['name'], $default_column)) {
                    $required = 1;
                }
                $add_column_data[] = [
                    'table_id' => $table_id,
                    'column_name' => $v['name'],
                    'column_comment' => $v['comment'],
                    'column_type' => self::getDbFieldType($v['type']),
                    'is_required' => $required,
                    'is_pk' => $v['primary'] ? 1 : 0,
                    'is_insert' => !in_array($v['name'], $default_column) ? 1 : 0,
                    'is_update' => !in_array($v['name'], $default_column) ? 1 : 0,
                    'is_lists' => !in_array($v['name'], $default_column) ? 1 : 0,
                    'is_query' => !in_array($v['name'], $default_column) ? 1 : 0,
                    'query_type' => '=',
                    'view_type' => 'input',
                    'dict_type' => '',
                    'create_time' => time(),
                    'update_time' => time()
                ];
            }

            (new GenerateColumn())->saveAll($add_column_data);

            Db::commit();
            return $table_id;
        } catch ( Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }

    }

    /**
     * 代码生成编辑
     * @param int $id
     * @param array $params
     * @return bool
     */
    public function edit(int $id, array $params)
    {
        Db::startTrans();
        try {
            // 更新主表信息
            (new GenerateTable())->where([ ['id', '=', $id] ])->save([
                'id' => $id,
                'table_name' => $params['table_name'],
                'table_content' => $params['table_content'],
                'module_name' => $params['module_name'] ?? '',
                'class_name' => $params['class_name'] ?? '',
                'edit_type' => $params['edit_type'] ?? 1,
            ]);
            (new GenerateColumn())->where([['table_id', '=', $id]])->delete();

            $params['table_column'] = json_decode($params['table_column'], true);

            // 更新从表字段信息
            $add_column_data = [];
            foreach ($params['table_column'] as $item) {
                $add_column_data[] = [
                    'table_id' => $id,
                    'column_name' => $item['column_name'] ?? '',
                    'column_comment' => $item['column_comment'] ?? '',
                    'is_pk' => $item['is_pk'],
                    'is_required' => $item['is_required'] ?? 0,
                    'is_insert' => $item['is_insert'] ?? 0,
                    'is_update' => $item['is_update'] ?? 0,
                    'is_lists' => $item['is_lists'] ?? 0,
                    'is_query' => $item['is_query'] ?? 0,
                    'is_search' => $item['is_search'] ?? 0,
                    'query_type' => $item['query_type'],
                    'view_type' => $item['view_type'] ?? 'input',
                    'dict_type' => $item['dict_type'] ?? '',
                    'update_time' => time(),
                    'create_time' => time(),
                    'column_type' => $item['column_type'] ?? 'string',
                ];
            }

            (new GenerateColumn())->saveAll($add_column_data);
            Db::commit();
            return true;
        } catch ( Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 删除代码生成
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        Db::startTrans();
        try {
            (new GenerateTable())->where([['id', '=', $id]])->delete();
            (new GenerateColumn())->where([['table_id', '=', $id]])->delete();
            Db::commit();
            return true;
        } catch ( Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 生成代码
     * @param array $params
     * @return string[]
     */
    public function generate(array $params)
    {
        try {
            $id = $params['id'];
            $table_info = (new GenerateTable())->where([ ['id', '=', $id] ])->field('*')->find()->toArray();
            $table_info['fields'] = (new GenerateColumn())->where([ ['table_id', '=', $id] ])->field('*')->select()->toArray();

            $generator = new Generate();
            $generator->delOutFiles();

            $flag = array_unique(array_column($table_info, 'table_name'));
            $flag = implode(',', $flag);
            $generator->setFlag(md5($flag . time()));

            $generator->generate($table_info);

            $zipFile = '';
            // 生成压缩文件包
            if ($generator->getFlag()) {
                $generator->zipFile();
                $generator->delFlag();
                $zipFile = $generator->getDownloadUrl();
            }

            return ['file' => $zipFile];

        } catch ( Exception $e) {
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 预览
     * @param array $params
     * @return array
     */
    public static function preview(array $params)
    {
        try {
            // 获取数据表信息
            $table = GenerateTable::with(['table_column'])
                ->whereIn('id', $params['id'])
                ->findOrEmpty()->toArray();

            $generateService = app()->make(Generate::class);
            return $generateService->preview($table);

        } catch ( Exception $e) {
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 获取数据表字段类型
     * @param string $type
     * @return string
     */
    public static function getDbFieldType(string $type): string
    {
        if (str_starts_with($type, 'set') || str_starts_with($type, 'dict')) {
            $result = 'string';
        } elseif (preg_match('/(double|float|decimal|real|numeric)/is', $type)) {
            $result = 'float';
        } elseif (preg_match('/(int|serial|bit)/is', $type)) {
            $result = 'int';
        } elseif (preg_match('/bool/is', $type)) {
            $result = 'bool';
        } elseif (str_starts_with($type, 'timestamp')) {
            $result = 'timestamp';
        } elseif (str_starts_with($type, 'datetime')) {
            $result = 'datetime';
        } elseif (str_starts_with($type, 'date')) {
            $result = 'date';
        } else {
            $result = 'string';
        }
        return $result;
    }

    /**
     * 查询表
     * @param array $params
     * @return mixed
     */
    public function tableList(array $params = [])
    {
        $sql = 'SHOW TABLE STATUS WHERE 1=1 ';
        if (!empty($params['name'])) {
            $sql .= "AND name LIKE '%" . $params['name'] . "%'";
        }
        if (!empty($params['comment'])) {
            $sql .= "AND comment LIKE '%" . $params['comment'] . "%'";
        }
        return Db::query($sql);
    }

}