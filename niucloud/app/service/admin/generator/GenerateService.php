<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\admin\generator;

use app\model\addon\Addon;
use app\model\generator\GenerateColumn;
use app\model\generator\GenerateTable;
use core\base\BaseAdminService;
use core\exception\AdminException;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;
use think\helper\Str;
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
        $field = 'id,table_name,table_content,class_name,edit_type,create_time,addon_name';
        $order = 'create_time desc';
        $search_model = (new GenerateTable())->withSearch(['table_name', 'table_content','addon_name'], $where)->with('addon')->field($field)->order($order);
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
        $field = 'id,table_name,table_content,class_name,module_name,edit_type,addon_name,order_type,parent_menu,relations,synchronous_number';

        $info = (new GenerateTable())->field($field)->where([['id', '=', $id]])->findOrEmpty()->toArray();

        $info['table_column'] = (new GenerateColumn())->where([['table_id', '=', $id]])->select()->toArray();

        $column = (new GenerateColumn())->where([['table_id', '=', $id],['is_delete','=',1]])->find();
        if($info && $info['order_type'] != 0)
        {
            $order_column = (new GenerateColumn())->where([['table_id', '=', $id],['is_order','=',1]])->find();
            if($order_column)
            {
                $info['order_column_name'] = $order_column['column_name'];
            }else{
                $info['order_column_name'] = '';
            }
        }else{
            $info['order_column_name'] = '';
        }

        if($column)
        {
            $info['is_delete'] = 1;
            $info['delete_column_name'] = $column['column_name'];
        }else{
            $info['is_delete'] = 0;
            $info['delete_column_name'] = '';
        }
        if($info['relations'] == '[]')
        {
            $info['relations'] = [];
        }else{
            if(!empty($info['relations']))
            {
                $info['relations'] = json_decode($info['relations'],true);
            }else{
                $info['relations'] = [];
            }

        }
        if($info && !empty($info['table_column']))
        {
            foreach ($info['table_column'] as &$value)
            {
                if($value['view_type'] === 'number')
                {

                    if(!empty($value['validate_type']))
                    {

                        $num_validate = json_decode($value['validate_type'],true);
                        if($num_validate[0] == 'between')
                        {
                            $value['view_max'] = $num_validate[1][1];
                            $value['view_min'] = $num_validate[1][0];
                        } else if($num_validate[0] == 'max')
                        {
                            $value['view_max'] = $num_validate[1][0];

                        } else if($num_validate[0] == 'min')
                        {
                            $value['view_min'] = $num_validate[1][0];
                        }else{
                            $value['view_max'] = 100;
                            $value['view_min'] = 0;
                        }
                    }else{
                        $value['view_min'] = 0;
                        $value['view_max'] = 100;
                    }

                }else{
                    $value['view_min'] = 0;
                    $value['view_max'] = 100;
                }

                if(!empty($value['validate_type']))
                {
                    $validate = json_decode($value['validate_type'],true);

                    if($validate[0] == 'between')
                    {
                        $value['max_number'] = $validate[1][1];
                        $value['min_number'] = $validate[1][0];
                    } else if($validate[0] == 'max')
                    {
                        $value['max_number'] = $validate[1][0];

                    } else if($validate[0] == 'min')
                    {
                        $value['min_number'] = $validate[1][0];
                    }else{
                        $value['max_number'] = 120;
                        $value['min_number'] = 1;
                    }
                    $value['validate_type'] = $validate[0];
                }else{
                    $value['max_number'] = 120;
                    $value['min_number'] = 1;
                }


            }
        }
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
                'class_name' => $table_name,
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
                    'is_delete' => 0,
//                    'is_query' => !in_array($v['name'], $default_column) ? 1 : 0,
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
                'addon_name' => $params['addon_name'] ?? '',
                'order_type' => $params['order_type'] ?? 0,
                'parent_menu' => $params['parent_menu'] ?? '',
                'relations' => $params['relations'] ?? []
            ]);
            (new GenerateColumn())->where([['table_id', '=', $id]])->delete();

            $params['table_column'] = json_decode($params['table_column'], true);

            // 更新从表字段信息
            $add_column_data = [];
            foreach ($params['table_column'] as $item) {
                if($params['is_delete'] == 1)
                {
                    if($item['column_name'] == $params['delete_column_name'])
                    {
                        $item['is_delete'] = 1;
                    }else{
                        $item['is_delete'] = 0;
                    }
                }else{
                    $item['is_delete'] = 0;
                }
                if($params['order_type'] != 0)
                {
                    if($item['column_name'] == $params['order_column_name'])
                    {
                        $item['is_order'] = 1;
                    }else{
                        $item['is_order'] = 0;
                    }
                }else{
                    $item['is_order'] = 0;
                }
                if(!empty($item['validate_type']) && $item['view_type'] != 'number')
                {
                    if($item['validate_type'] == 'between')
                    {
                        $validate_type = [$item['validate_type'],[$item['min_number'],$item['max_number']]];
                    }else if($item['validate_type'] == 'max'){
                        $validate_type = [$item['validate_type'],[$item['max_number']]];
                    }else if($item['validate_type'] == 'min'){
                        $validate_type = [$item['validate_type'],[$item['min_number']]];
                    }else{
                        $validate_type = [$item['validate_type'],[]];
                    }
                    $item['validate_type'] = json_encode($validate_type,JSON_UNESCAPED_UNICODE);
                }
                if($item['view_type'] === 'number')
                {
                    $validate_type = ['between',[$item['view_min'],$item['view_max']]];
                    $item['validate_type'] = $validate_type;
                    $item['validate_type'] = json_encode($validate_type,JSON_UNESCAPED_UNICODE);
                }

                $add_column_data[] = [
                    'table_id' => $id,
                    'column_name' => $item['column_name'] ?? '',
                    'column_comment' => $item['column_comment'] ?? '',
                    'is_pk' => $item['is_pk'],
                    'is_required' => $item['is_required'] ?? 0,
                    'is_insert' => $item['is_insert'] ?? 0,
                    'is_update' => $item['is_update'] ?? 0,
                    'is_lists' => $item['is_lists'] ?? 0,
//                    'is_query' => $item['is_query'] ?? 0,
                    'is_search' => $item['is_search'] ?? 0,
                    'is_delete' => $item['is_delete'] ?? 0,
                    'is_order' => $item['is_order'] ?? 0,
                    'query_type' => $item['query_type'],
                    'view_type' => $item['view_type'] ?? 'input',
                    'dict_type' => $item['dict_type'] ?? '',
                    'update_time' => time(),
                    'create_time' => time(),
                    'column_type' => $item['column_type'] ?? 'string',
                    'validate_type' => $item['validate_type'] ?? '',
                    'validate_rule' => $params['rule'] ?? []
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
        if($params['generate_type'] == 2)
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
                $table_info['generate_type'] = 2;
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
        }else if($params['generate_type'] == 3){
            try {
                $id = $params['id'];
                $table_info = (new GenerateTable())->where([ ['id', '=', $id] ])->field('*')->find()->toArray();
                $table_info['fields'] = (new GenerateColumn())->where([ ['table_id', '=', $id] ])->field('*')->select()->toArray();
                $synchronous_number = $table_info['synchronous_number'] +1;
                (new GenerateTable())->where([ ['id', '=', $id] ])->save(['synchronous_number' => $synchronous_number]);
                $generator = new Generate();
                $generator->delOutFiles();
                $flag = array_unique(array_column($table_info, 'table_name'));
                $flag = implode(',', $flag);
                $generator->setFlag(md5($flag . time()));
                $table_info['generate_type'] = 3;
                $generator->generate($table_info);

                return [];

            } catch ( Exception $e) {
                throw new AdminException($e->getMessage());
            }
        }else{
            return [];
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
            $id = $params['id'];
            $table_info = (new GenerateTable())->where([ ['id', '=', $id] ])->field('*')->find()->toArray();
            $table_info['fields'] = (new GenerateColumn())->where([ ['table_id', '=', $id] ])->field('*')->select()->toArray();

            $generateService = app()->make(Generate::class);
            $table_info['generate_type'] = 1;
            return $generateService->preview($table_info);

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

    /**
     * 检测文件是否存在
     */
    public function checkFile($checkFile)
    {

        $info = (new GenerateTable())->where([['id', '=', $checkFile['id']]])->findOrEmpty()->toArray();
        $dir = dirname(root_path());
        if(empty($info['class_name']))
        {
            $info['class_name'] =  Str::studly($info['table_name']);
        }
        if(empty($info['module_name']))
        {
            $info['module_name'] = Str::camel($info['table_name']);
        }
        if(!empty($info['addon_name']))
        {
            $controllerFile = $dir.'\\niucloud\\addon\\'.$info['addon_name'].'\\app\\adminapi\\controller\\'.$info['module_name'].'\\'.$info['class_name'].'.php';
            $modelFile = $dir.'\\niucloud\\addon\\'.$info['addon_name'].'\\app\\model\\'.$info['module_name'].'\\'.$info['class_name'].'.php';
            $validateFile = $dir.'\\niucloud\\addon\\'.$info['addon_name'].'\\app\\validate\\'.$info['module_name'].'\\'.$info['class_name'].'.php';
            $webViewFile = $dir.'\\admin\\src\\'.$info['addon_name'].'\\views\\'.$info['module_name'];
        }else{
            $controllerFile = $dir.'\\niucloud\\app\\adminapi\\controller\\'.$info['module_name'].'\\'.$info['class_name'].'.php';
            $modelFile = $dir.'\\niucloud\\app\model\\'.$info['module_name'].'\\'.$info['class_name'].'.php';
            $validateFile = $dir.'\\niucloud\\app\validate\\'.$info['module_name'].'\\'.$info['class_name'].'.php';
            $webViewFile = $dir.'\\admin\\src\\views'.'\\'.$info['module_name'];
        }

        if(file_exists($controllerFile) && file_exists($modelFile) && file_exists($validateFile)  && file_exists($webViewFile))
        {
            $is_check = 1;
        }else{
            $is_check = 2;
        }

        return $is_check;
    }

    /**
     * 获取表字段
     */
    public function getTableColumn($data)
    {
        $sql = 'SHOW TABLE STATUS WHERE 1=1 ';
        $tablePrefix = config('database.connections.mysql.prefix');
        if (!empty($data['table_name'])) {
            $sql .= "AND name='" .$tablePrefix.$data['table_name']."'";
        }
        $tables = Db::query($sql);
        $table_info = $tables[0] ?? [];
        if(empty($table_info)) throw new AdminException('DATA_NOT_EXIST');
        $table_name = str_replace($tablePrefix, '', $table_info['Name']);
        return Db::name($table_name)->getFields();

    }

    /**
     * @notes 获取所有模型
     */
    public static function getModels($data)
    {
        if($data['addon'] == 'system')
        {
            //获取系统模型
            $modulePath = dirname(root_path()) . '/niucloud/app/model/';
            if(!is_dir($modulePath)) {
                return [];
            }
            $modulefiles = glob($modulePath . '*');
            $targetFiles = [];
            foreach ($modulefiles as $file) {
                $fileBaseName = basename($file, '.php');

                if (is_dir($file)) {
                    $file = glob($file . '/*');
                    foreach ($file as $item) {
                        if (is_dir($item)) {
                            continue;
                        }
                        $targetFiles[] = sprintf(
                            "app\\model\\%s\\%s",
                            $fileBaseName,
                            basename($item, '.php')
                        );
                    }
                } else {
                    if ($fileBaseName == 'BaseModel') {
                        continue;
                    }
                    $targetFiles[] = sprintf(
                        "app\\model\\%s",
                        basename($file, '.php')
                    );
                }
            }
        }else{
            //获取插件模型
            $path = dirname(root_path())."/niucloud/addon/".$data['addon']."/app/model";

            if(!is_dir($path)) {
                return [];
            }

            $modulefiles = glob($path . '/*');

            $targetFiles = [];
            foreach ($modulefiles as $file) {
                $fileBaseName = basename($file, '.php');

                if (is_dir($file)) {

                    $file = glob($file . '/*');

                    foreach ($file as $item) {

                        if (is_dir($item)) {
                            continue;
                        }
                        $targetFiles[] = sprintf(
                            'addon\\'.$data['addon']."\\app\\model\\%s\\%s",
                            $fileBaseName,
                            basename($item, '.php')
                        );
                    }
                } else {

                    if ($fileBaseName == 'BaseModel') {
                        continue;
                    }
                    $targetFiles[] = sprintf(
                        'addon\\'.$data['addon']."\\app\\model\\%s",
                        basename($file, '.php')
                    );
                }
            }
        }
        return $targetFiles;
    }

}
