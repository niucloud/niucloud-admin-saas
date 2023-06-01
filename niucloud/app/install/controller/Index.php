<?php

namespace app\install\controller;


use app\model\site\Site;
use app\model\sys\SysUser;
use app\service\admin\install\InstallSystemService;
use app\service\admin\site\SiteGroupService;
use app\service\admin\site\SiteService;
use think\facade\Cache;
use think\facade\Db;
use think\facade\View;


class Index extends BaseInstall
{

    /**
     *安装
     */
    public function index()
    {
        $this->checkLock();
        $step = input("step", 1);

        if ($step == 1) {
            return View::fetch('index/step-1');
        } elseif ($step == 2) {
            //系统变量
            $system_variables = [];
            $phpv = phpversion();
            $os = PHP_OS;
            $server = $_SERVER[ 'SERVER_SOFTWARE' ];

            $host = ( empty($_SERVER[ 'REMOTE_ADDR' ]) ? $_SERVER[ 'REMOTE_HOST' ] : $_SERVER[ 'REMOTE_ADDR' ] );
            $name = $_SERVER[ 'SERVER_NAME' ];

            $verison = version_compare(PHP_VERSION, '8.0.0') == -1 ? false : true;
            //pdo
            $pdo = extension_loaded('pdo') && extension_loaded('pdo_mysql');
            $system_variables[] = [ "name" => "pdo", "need" => "开启", "status" => $pdo ];
            //curl
            $curl = extension_loaded('curl') && function_exists('curl_init');
            $system_variables[] = [ "name" => "curl", "need" => "开启", "status" => $curl ];
            //openssl
            $openssl = extension_loaded('openssl');
            $system_variables[] = [ "name" => "openssl", "need" => "开启", "status" => $openssl ];
            //gd
            $gd = extension_loaded('gd');
            $system_variables[] = [ "name" => "GD库", "need" => "开启", "status" => $gd ];
            //fileinfo
            $fileinfo = extension_loaded('fileinfo');
            $system_variables[] = [ "name" => "fileinfo", "need" => "开启", "status" => $fileinfo ];

            $root_path = str_replace("\\", DIRECTORY_SEPARATOR, dirname(dirname(dirname(dirname(__FILE__)))));
            $root_path = str_replace("../", DIRECTORY_SEPARATOR, $root_path);
            $dirs_list = [
                [ "path" => $root_path . DIRECTORY_SEPARATOR, "path_name" => "niucloud/", "name" => "网站目录" ],
                [ "path" => $root_path . DIRECTORY_SEPARATOR . ".env", "path_name" => "niucloud/.env", "name" => "env" ],
                [ "path" => $root_path . DIRECTORY_SEPARATOR . ".example.env", "path_name" => "niucloud/.example_env", "name" => "env" ],
                [ "path" => $root_path . DIRECTORY_SEPARATOR . 'runtime'.DIRECTORY_SEPARATOR, "path_name" => "niucloud/runtime", "name" => "runtime" ],
                [ "path" => $root_path . DIRECTORY_SEPARATOR . 'public'.DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR, "path_name" => "niucloud/public/upload", "name" => "upload" ],
                [ "path" => $root_path . DIRECTORY_SEPARATOR . 'app'.DIRECTORY_SEPARATOR.'install'.DIRECTORY_SEPARATOR, "path_name" => "niucloud/app/install", "name" => "安装目录" ]
            ];
            //目录 可读 可写检测
            $is_dir = true;
            foreach ($dirs_list as $k => $v) {
                @mkdir($v[ "path" ], 0755, true);
                $is_readable = is_readable($v[ "path" ]);
                $is_write = is_write($v[ "path" ]);
                $dirs_list[ $k ][ "is_readable" ] = $is_readable;
                $dirs_list[ $k ][ "is_write" ] = $is_write;
                if ($is_readable == false || $is_write == false) {
                    $is_dir = false;
                }
            }
            $this->assign("root_path", $root_path);
            $this->assign("system_variables", $system_variables);
            $this->assign("phpv", $phpv);
            $this->assign("server", $server);
            $this->assign("host", $host);
            $this->assign("os", $os);
            $this->assign("name", $name);
            $this->assign("verison", $verison);
            $this->assign("dirs_list", $dirs_list);
            if ($verison && $pdo && $curl && $openssl && $gd && $fileinfo && $is_dir) {
                $continue = true;
            } else {
                $continue = false;
            }
            $this->assign("continue", $continue);
            return $this->fetch('index/step-2');
        } elseif ($step == 3) {
            return $this->fetch('index/step-3');

        }
    }


    public function installSuccess()
    {
        Cache::delete('install_data');
        Cache::delete('install_status');
        return $this->fetch('index/step-4', [], $this->replace);
    }

    /**
     * 测试数据库
     */
    public function testDb()
    {
        $this->checkLock();
        $dbport = input("dbport", "");
        $dbhost = input("dbhost", "");
        $dbuser = input("dbuser", "");
        $dbpwd = input("dbpwd", "");
        $dbname = input("dbname", "");

        try {

            if ($dbport != "" && $dbhost != "") {
                $dbhost = $dbport != '3306' ? $dbhost . ':' . $dbport : $dbhost;
            }

            if ($dbhost == '' || $dbuser == '') {
                return fail([
                    "status" => -1,
                    "message" => "数据库账号或密码不能为空"
                ]);
            }

            if (!function_exists("mysqli_connect")) {
                return fail([
                    "status" => -1,
                    "message" => "mysqli扩展类必须开启"
                ]);
            }

            $conn = @mysqli_connect($dbhost, $dbuser, $dbpwd);
            if ($conn) {
                if (empty($dbname)) {
                    $result = [
                        "status" => 1,
                        "message" => "数据库连接成功"
                    ];

                } else {
                    if (@mysqli_select_db($conn, $dbname)) {
                        $result = [
                            "status" => 2,
                            "message" => "数据库存在，系统将覆盖数据库"
                        ];
                    } else {
                        $result = [
                            "status" => 1,
                            "message" => "数据库不存在,系统将自动创建"
                        ];
                    }
                }
                @mysqli_close($conn);
            } else {
                $result = [
                    "status" => -1,
                    "message" => "数据库连接失败！"
                ];
                return fail($result);
            }

            return success($result);
        } catch (\Exception $e) {
            $result = [
                "status" => -1,
                "message" => $e->getMessage()
            ];
            return fail($result);
        }
    }

    /**
     * @param $sql_data sql文件
     * @return array
     */
    public function getSqlQuery($sql_data)
    {
        $this->checkLock();
        $sql_data = preg_replace("/TYPE=(InnoDB|MyISAM|MEMORY)( DEFAULT CHARSET=[^; ]+)?/", "ENGINE=\\1 DEFAULT CHARSET=utf8", $sql_data);

        $sql_data = str_replace("\r", "\n", $sql_data);
        $sql_query = [];
        $num = 0;
        $sql_arr = explode(";\n", trim($sql_data));
        unset($sql);
        foreach ($sql_arr as $sql) {
            $sql_query[ $num ] = '';
            $sqls = explode("\n", trim($sql));
            $sqls = array_filter($sqls);
            foreach ($sqls as $query) {
                $str1 = substr($query, 0, 1);
                if ($str1 != '#' && $str1 != '-')
                    $sql_query[ $num ] .= $query;
            }
            $num++;
        }
        return $sql_query;
    }

    public function install()
    {


        set_time_limit(300);
        Cache::delete('install_data');
        Cache::set('install_status', 0);//进行中

        $check = $this->testDb()->getData();
        if ($check[ 'code' ] != 1) {
            $this->setSuccessLog([ $check[ 'data' ][ 'message' ], 'error' ]);
            return fail($check[ 'data' ][ 'message' ]);
        }

        $admin_name = input('admin_name', "");
        $username = input('username', "");
        $password = input('password', "");
        $password2 = input('password2', "");

        $site_name = input('site_name', "");
        $site_username = input('site_username', "");
        $site_password = input('site_password', "");
        $site_password2 = input('site_password2', "");

        if ($admin_name == '' || $username == '' || $password == '') {
            $this->setSuccessLog([ '平台信息不能为空', 'error' ]);
            return fail('平台信息不能为空!');
        }

        if ($site_username == $username) {
            $this->setSuccessLog([ '站点管理员和平台管理员不能相同，请重新输入', 'error' ]);
            return fail('站点管理员和平台管理员不能相同，请重新输入');
        }

        if ($password != $password2) {
            $this->setSuccessLog([ '平台两次密码输入不一样，请重新输入', 'error' ]);
            return fail('平台两次密码输入不一样，请重新输入');
        }

        if ($site_name == '' || $site_username == '' || $site_password == '') {
            $this->setSuccessLog([ '平台信息不能为空', 'error' ]);
            return fail('平台信息不能为空!');
        }

        if($site_username == $username) {
            $this->setSuccessLog([ '站点账号不能跟平台账号一致', 'error' ]);
            return fail('站点账号不能跟平台账号一致!');
        }

        if ($site_password != $site_password2) {
            $this->setSuccessLog([ '站点两次密码输入不一样，请重新输入', 'error' ]);
            return fail('站点两次密码输入不一样，请重新输入');
        }

        try {
            //配置写入
            $res = $this->installConfig(input())->getData();
            if ($res[ 'code' ] != 1) {
                $this->setSuccessLog([ $res[ 'msg' ], 'error' ]);
                return fail($res[ 'msg' ]);
            }
            //数据库
            $res = $this->installSql(input())->getData();
            if ($res[ 'code' ] != 1) {
                $this->setSuccessLog([ $res[ 'msg' ], 'error' ]);
                return fail($res[ 'msg' ]);
            }

            Cache::set('install_status', 1);//成功
            return success();
        } catch (\Exception $e) {
            $this->setSuccessLog([ '安装失败' . $e->getMessage(), 'error' ]);
            return fail('安装失败' . $e->getMessage());
        }
    }

    public function initData()
    {
        $this->checkLock();
        $admin_name = input('admin_name', "");
        $username = input('username', "");
        $password = input('password', "");
        $password2 = input('password2', "");

        $site_name = input('site_name', "");
        $site_username = input('site_username', "");
        $site_password = input('site_password', "");
        $site_password2 = input('site_password2', "");
        if ($admin_name == '' || $username == '' || $password == '') {
            return fail('平台信息不能为空!');
        }

        if ($password != $password2) {
            return fail('平台两次密码输入不一样，请重新输入');
        }

        if ($site_name == '' || $site_username == '' || $site_password == '') {
            return fail('站点信息不能为空!');
        }

        if($site_username == $username) {
            return fail('站点账号不能跟平台账号一致');
        }

        if ($site_password != $site_password2) {
            return fail('站点两次密码输入不一样，请重新输入');
        }

        try {
            //初始化数据
            $res = ( new InstallSystemService() )->install();
            if (!$res) {
                $this->setSuccessLog([ '菜单初始化失败', 'error' ]);
                return fail('菜单初始化失败');
            }

            $user = ( new SysUser() )->where([ [ 'uid', '=', 1 ] ])->findOrEmpty();
            if (!$user->isEmpty()) {
                $user->save([
                    'username' => $username,
                    'password' => create_password($password),
                ]);
            }
            ( new Site() )->where([ [ 'site_id', '=', 1 ] ])->update(['site_id' => 0]);
            $site = ( new Site() )->where([ [ 'site_id', '=', 0 ] ])->findOrEmpty();
            if (!$site->isEmpty()) {
                $site->save([
                    'site_name' => $admin_name,
                ]);
            }
            //修改自增主键默认值
            Db::execute("alter table ".env('database.prefix', '')."site auto_increment = 1");
            //获取默认套餐
            $group_id = (new SiteGroupService())->addAllMenuGroup();

            $data = [
                'site_name' => $site_name,
                'real_name' => '',
                'group_id' => $group_id,
                'expire_time' => 0,
                'username' => $site_username,
                'password' => $site_password,
            ];
            (new SiteService())->add($data);
            $fp = fopen($this->lock_file, "w");
            if ($fp == false) {
                $this->setSuccessLog([ "写入失败，请检查目录" . dirname(dirname(__FILE__)) . "是否可写入！'", 'error' ]);
                return fail("写入失败，请检查目录" . dirname(dirname(__FILE__)) . "是否可写入！'");
            }
            $this->setSuccessLog([ '初始化成功', 'success' ]);
            fwrite($fp, '已安装');
            fclose($fp);
            Cache::set('install_status', 2);//成功
//            Cache::tag(MenuService::$cache_tag_name)->clear();
            return success();
        } catch (\Exception $e) {
            $this->setSuccessLog([ '安装失败' . $e->getMessage(), 'error' ]);
            return fail('安装失败' . $e->getMessage());
        }
    }

    /**
     * 安装sql
     * @param $data
     * @return \think\Response
     */
    public function installSql(array $data)
    {
        $this->checkLock();
        $dbport = $data[ 'dbport' ] ?? '';
        $dbhost = $data[ 'dbhost' ] ?? '';
        $dbuser = $data[ 'dbuser' ] ?? '';
        $dbpwd = $data[ 'dbpwd' ] ?? '';
        $dbname = $data[ 'dbname' ] ?? '';
        $dbprefix = $data[ 'dbprefix' ] ?? '';
        if ($dbhost == '' || $dbuser == '') {
            return fail('数据库链接配置信息丢失!');
        }

        $file_name = $this->install_root . "/source/database.sql";//数据文件
        //数据库连接测试
        $conn = @mysqli_connect($dbhost, $dbuser, $dbpwd, "", $dbport);
        if (!$conn) {
            return fail('连接数据库失败！请检查连接参数!');
        }

        //数据库可写和是否存在测试
        $empty_db = mysqli_select_db($conn, $dbname);
        if ($empty_db) {
            $sql = "DROP DATABASE `$dbname`";
            $retval = mysqli_query($conn, $sql);
            if (!$retval) {
                return fail('删除数据库失败: ' . mysqli_error($conn));
            }
        }

        //如果数据库不存在，我们就进行创建。
        $dbsql = "CREATE DATABASE `$dbname`";
        $db_create = mysqli_query($conn, $dbsql);
        if (!$db_create) {
            return fail('创建数据库失败，请确认是否有足够的权限!');
        }

        //链接数据库
        @mysqli_select_db($conn, $dbname);

        //导入SQL并执行。
        $get_sql_data = file_get_contents($file_name);
        $sql_query = $this->getSqlQuery($get_sql_data);
        @mysqli_query($conn, "SET NAMES utf8mb4");
        $query_count = count($sql_query);

        for ($i = 0; $i < $query_count; $i++) {
            $sql = trim($sql_query[ $i ]);
            $is_write = false;
            if (strstr($sql, 'CREATE TABLE')) {
                $match_item = preg_match('/CREATE TABLE [`]?(\\w+)[`]?/is', $sql, $match_data);
                $is_write = true;
            } elseif (strstr($sql, 'ALTER TABLE')) {
                $match_item = preg_match('/ALTER TABLE [`]?(\\w+)[`]?/is', $sql, $match_data);

            } elseif (strstr($sql, 'INSERT INTO')) {
                $match_item = preg_match('/INSERT INTO [`]?(\\w+)[`]?/is', $sql, $match_data);
            } else {
                $match_item = 0;
            }
            if ($match_item > 0) {
                try {
                    $table_name = $match_data[ 1 ];
                    $new_table_name = $dbprefix . $table_name;
                    $sql_item = $this->str_replace_first($table_name, $new_table_name, $sql);
                    @mysqli_query($conn, $sql_item);
                    if ($is_write) $this->setSuccessLog([ '创建表' . $table_name, 'success' ]);
                } catch (\Exception $e) {
                    $this->setSuccessLog([ $e->getMessage(), 'error' ]);
                    return fail('数据库解析失败' . $e->getMessage());
                }
            }
        }
        @mysqli_close($conn);

        return success();
    }

    /**
     * 配置设置
     * @param $path
     * @param $data
     * @return \think\Response
     */
    public function installConfig(array $data)
    {
        $this->checkLock();
        $root_path = str_replace("\\", DIRECTORY_SEPARATOR, dirname(dirname(dirname(dirname(__FILE__)))));
        $root_path = str_replace("../", DIRECTORY_SEPARATOR, $root_path);
        $env_dir = $root_path . DIRECTORY_SEPARATOR . ".env";
        $example_env = $root_path . DIRECTORY_SEPARATOR . ".example.env";
        $dbport = $data[ 'dbport' ] ?? '';
        $dbhost = $data[ 'dbhost' ] ?? '';
        $dbuser = $data[ 'dbuser' ] ?? '';
        $dbpwd = $data[ 'dbpwd' ] ?? '';
        $dbname = $data[ 'dbname' ] ?? '';
        $dbprefix = $data[ 'dbprefix' ] ?? '';

        $replace_key = [
            '{dbhost}',
            '{dbport}',
            '{dbuser}',
            '{dbpwd}',
            '{dbprefix}',
            '{dbname}',
            '{auth_key}'
        ];

        $replace_val = [
            $dbhost,
            $dbport,
            $dbuser,
            $dbpwd,
            $dbprefix,
            $dbname,
            unique_random(32)
        ];
        $content = str_replace($replace_key, $replace_val, file_get_contents($example_env));
        file_put_contents($env_dir, $content);

        $this->setSuccessLog([ '写入配置', 'success' ]);

        return success();
    }

    public function getInstallInfo()
    {
        $install_data = Cache::get('install_data') ?? [];
        $install_status = Cache::get('install_status') ?? 0;
        return success('', [
            'log' => $install_data,
            'status' => $install_status
        ]);
    }

    public function setSuccessLog($data)
    {
        if ($data[ 1 ] == 'error') {
            Cache::set('install_status', -1);
        }
        $time = @(int)microtime(true);
        $data[] = date('Y-m-d H:i:s', $time);
        $install_data = Cache::get('install_data') ?? [];
        $install_data[] = $data;
        Cache::set('install_data', $install_data);
    }

}