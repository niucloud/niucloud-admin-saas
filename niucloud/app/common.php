<?php

use think\Response;
use think\facade\Lang;
use think\facade\Queue;
use think\facade\Cache;

// 应用公共文件

/**
 * 接口操作成功，返回信息
 * @param int $msg
 * @param array $
 */
function success($msg = 100000, array|string | null $data = [], int $code = 200, int $http_code = 200): Response
{
    if (is_array($msg)) {
        $data = $msg;
        $msg = 100000;
    }
    return Response::create([ 'data' => $data, 'msg' => get_lang($msg), 'code' => $code ], 'json', $http_code);

}

/**
 * 接口操作失败，返回信息
 */
function fail($msg = 100005, ?array $data = [], int $code = 400, int $http_code = 200) : Response
{
    if (is_array($msg)) {
        $data = $msg;
        $msg = 100005;
    }
    return Response::create([ 'data' => $data, 'msg' => get_lang($msg), 'code' => $code ], 'json', $http_code);
}

/**
 * 自动侦测语言并转化
 * @param string
 * @return lang()
 */
function get_lang($str)
{
    $lang_config = config('lang') ?? [];
    $range = cookie($lang_config[ 'cookie_var' ]) ?? 'zh-cn';
    return Lang::get($str, [], $range);
}


/**
 * 把返回的数据集转换成Tree
 * @param $list 要转换的数据集
 * @param string $pk
 * @param string $pid
 * @param string $child
 * @param int $root
 * @return array
 */
function list_to_tree($list, $pk = 'id', $pid = 'pid', $child = 'child', $root = 0)
{
    // 创建Tree
    $tree = array ();
    if (is_array($list)) {
        // 创建基于主键的数组引用
        $refer = array ();
        foreach ($list as $key => $data) {
            $refer[ $data[ $pk ] ] =& $list[ $key ];
        }
        foreach ($list as $key => $data) {
            // 判断是否存在parent
            $parent_id = $data[ $pid ];
            if ($root == $parent_id) {
                $tree[] =& $list[ $key ];
            } else {
                if (isset($refer[ $parent_id ])) {
                    $parent =& $refer[ $parent_id ];
                    $parent[ $child ][] =& $list[ $key ];
                }
            }
        }
    }
    return $tree;

}

/**
 * 生成加密密码
 * @param $password
 * @param $salt  手动提供散列密码的盐值（salt）。这将避免自动生成盐值（salt）。,默认不填写将自动生成
 * @return bool|string
 */
function create_password($password, $salt = '')
{
    return password_hash($password, PASSWORD_DEFAULT);
}

/**
 * 校验比对密码和加密密码是否一致
 * @param $password
 * @param $hash
 */
function check_password($password, $hash)
{
    if (!password_verify($password, $hash)) return false;
    return true;
}


/**
 * 获取键对应的值
 * @param array $array 源数组
 * @param array $keys 要提取的键数组
 * @param string $index 二维组中指定提取的字段（唯一）
 * @return array
 */
function array_keys_search($array, $keys, $index = '', $is_sort = true)
{
    if (empty($array))
        return $array;
    if (empty($keys))
        return [];
    if (!empty($index) && count($array) != count($array, COUNT_RECURSIVE))
        $array = array_column($array, null, $index);
    $list = array ();

    foreach ($keys as $key) {
        if (isset($array[ $key ])) {
            if ($is_sort) {
                $list[] = $array[ $key ];
            } else {
                $list[ $key ] = $array[ $key ];
            }
        }

    }
    return $list;
}


/**
 * @notes 删除目标目录
 * @param $path
 * @param $delDir
 * @return bool|void
 */
function del_target_dir($path, $delDir)
{
    //没找到，不处理
    if (!file_exists($path)) {
        return false;
    }

    //打开目录句柄
    $handle = opendir($path);
    if ($handle) {
        while (false !== ( $item = readdir($handle) )) {
            if ($item != "." && $item != "..") {
                if (is_dir("$path/$item")) {
                    del_target_dir("$path/$item", $delDir);
                } else {
                    unlink("$path/$item");
                }
            }
        }
        closedir($handle);
        if ($delDir) {
            return rmdir($path);
        }
    } else {
        if (file_exists($path)) {
            return unlink($path);
        }
        return false;
    }
}


/**
 * @notes 下载文件
 * @param $url
 * @param $saveDir
 * @param $fileName
 * @return string
 */
function download_file($url, $saveDir, $fileName)
{
    if (!file_exists($saveDir)) {
        mkdir($saveDir, 0775, true);
    }
    $fileSrc = $saveDir . $fileName;
    file_exists($fileSrc) && unlink($fileSrc);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    $file = curl_exec($ch);
    curl_close($ch);
    $resource = fopen($fileSrc, 'a');
    fwrite($resource, $file);
    fclose($resource);
    if (filesize($fileSrc) == 0) {
        unlink($fileSrc);
        return '';
    }
    return $fileSrc;
}


/**
 * 获取一些公共的系统参数
 * @param string|null $key
 * @return array|mixed
 */
function system_name(?string $key = '')
{
    $params = [
        'admin_token_name' => env('system.admin_token_name', 'token'),///todo !!! 注意  header参数  不能包含_ , 会自动转成 -
        'api_token_name' => env('system.api_token_name', 'token'),
        'admin_site_id_name' => env('system.admin_site_id_name', 'site-id'),
        'api_site_id_name' => env('system.api_site_id_name', 'site-id'),
        'channel_name' => env('system.channel_name', 'channel'),
    ];
    if (!empty($key)) {
        return $params[ $key ];
    } else {
        return $params;
    }
}


/**
 * 获取日期(默认不传参 获取当前日期)
 * @param int|null $time
 * @return string
 */
function get_date_by_time(?int $time = null)
{
    return date('Y-m-d h:i:s', time());
}


/**
 * 路径转链接
 * @param $path
 * @return string
 */
function path_to_url($path)
{
    return trim(str_replace(DIRECTORY_SEPARATOR, '/', $path), '.');
}

/**
 * 链接转化路径
 * @param $url
 * @return void
 */
function url_to_path($url)
{
    if (str_contains($url, 'http://') || str_contains($url, 'https://')) return $url;//网络图片不必
    return public_path() . trim(str_replace('/', DIRECTORY_SEPARATOR, $url));
}

/**
 * 新增队列工作
 * @param $job
 * @param $data
 * @param $delay
 * @param $queue
 * @return void
 */
function create_queue($job, $data = '', $delay = 0, $queue = null)
{
    if ($delay > 0) {
        Queue::later($delay, $job, $data, $queue);
    } else {
        Queue::push($job, $data, $queue);
    }
}

/**
 * 判断 文件/目录 是否可写（取代系统自带的 is_writeable 函数）
 *
 * @param string $file 文件/目录
 * @return boolean
 */
function is_write($file)
{
    if (is_dir($file)) {
        $dir = $file;
        if ($fp = @fopen("$dir/test.txt", 'w')) {
            @fclose($fp);
            @unlink("$dir/test.txt");
            $writeable = true;
        } else {
            $writeable = false;
        }
    } else {
        if ($fp = @fopen($file, 'a+')) {
            @fclose($fp);
            $writeable = true;
        } else {
            $writeable = false;
        }
    }
    return $writeable;
}

/**
 * 主要用于金额格式化(用于显示)
 * @param $number
 * @return int|mixed|string
 */
function format_money($number)
{
    if ($number == intval($number)) {
        return intval($number);
    } elseif ($number == sprintf('%.2f', $number)) {
        return sprintf('%.2f', $number);
    }
    return $number;
}

/**
 * 金额保留小数点后*位
 * @param $number
 * @return float
 */
function format_round_money($number)
{
    return round($number, 2);
}
/**
 * 基础属性过滤(特殊字符..)
 * @param $string
 * @return void
 */
function filter($string)
{
    return $string;
}

/**
 * 生成编号
 * @param string $type
 * @param string $tag 业务标识 例如member_id ...
 * @return void
 */
function create_no(string $prefix = '', string $tag = '')
{
    return $prefix . substr(md5($tag), -5) . uniqid();

}

/**
 * 多级目录不存在则创建
 * @param $dir
 * @param $mode
 * @return bool
 */
function mkdirs($dir, $mode = 0777)
{
    if (str_contains($dir, '.')) $dir = dirname($dir);
    if (is_dir($dir) || @mkdir($dir, $mode)) return true;
    if (!mkdirs(dirname($dir), $mode)) return false;
    return @mkdir($dir, $mode);
}
/**
 * 获取唯一随机字符串
 * @param int $len
 * @return string
 */
function unique_random($len = 10)
{
    $str = 'qwertyuiopasdfghjklzxcvbnmasdfgh';
    str_shuffle($str);
    $res = substr(str_shuffle($str), 0, $len);
    return $res;
}

/**
 * 校验事件结果
 * @param $result
 * @return void
 */
function check_event_result($result)
{
    if (empty($result) || is_array($result)) {
        return true;
    }
    foreach ($result as $v) {
        if (!$v) return false;
    }
    return true;
}

/**
 * 二维数组合并
 * @param $array1
 * @param $array2
 */
function array_merge2(array $array1, array $array2)
{
      foreach ($array2 as $array2_k => $array2_v)
      {
          if(array_key_exists($array2_k, $array1))
          {
              foreach ($array2_v as $array2_kk => $array2_vv)
              {
                if(array_key_exists($array2_kk, $array1[$array2_k]))
                {
                    $array1[$array2_k][$array2_kk] = array_merge($array1[$array2_k][$array2_kk], $array2_vv);
                }else
                    $array1[$array2_k][$array2_kk] = $array2_vv;
              }
          }else
              $array1[$array2_k] = $array2_v;
      }
      return $array1;
}
