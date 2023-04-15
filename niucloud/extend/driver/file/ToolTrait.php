<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2023-02-17
 * Time: 15:58
 */

namespace extend\driver\file;

use extend\exception\UploadFileException;

/**
 * 文件管理驱动类
 * Class FileDriver
 * @package extend\driver\file
 */
Trait ToolTrait{

    protected $file;//上传的文件对象
    protected $file_info;//上传的文件属性参数
    protected $file_name;//新文件名
//    protected $root_path = 'upload';//根目录  PS:可能只有本地存储用
    protected $full_file;//完整的文件地址
    protected $full_path;
    //可能还需要一个完整路径
    /**
     * 读取文件
     * @param $name
     */
    public function read(string $name, bool $is_rename = true){
        $this->file = request()->file($name);
        if(!empty($file))
            throw new UploadFileException(100012);

        $this->file_info = [
            'name'     => $this->file->getOriginalName(),//文件原始名称
            'mime'     => $this->file->getOriginalMime(),//上传文件类型信息
            'real_path' => $this->file->getRealPath(),//上传文件真实路径
            'ext'      => $this->file->getOriginalExtension(),//上传文件后缀
            'size'     => $this->file->getSize(),//上传文件大小
        ];
        if($is_rename){
            $this->file_name = $this->createFileName();
        }else{
            $this->file_name = $this->file_info['name'];
        }

    }

    /**
     * 校验文件是否合法
     */
    public function check(){

    }

    /**
     * 生成新的文件名
     * @return string
     */
    public function createFileName(string $key = '', string $ext = ''){
        //DIRECTORY_SEPARATOR  常量
        if(empty($key)){
            return time().md5($this->file_info['real_path']).'.'.$this->file_info['ext'];
        }else{
            return time().md5($key).'.'.$ext;
        }

    }

    /**
     * 获取原始附件信息
     * @return mixed
     */
    public function getFileInfo(){
        return $this->file_info;
    }

    /**
     * 获取上传文件的真实完整路径
     * @return mixed
     */
    public function getRealPath(){
        return $this->file_info['real_path'];
    }
    /**
     * 获取生成的文件完整地址
     * @return mixed
     */
    public function getFullPath(){
        return $this->full_path;
    }

    /**
     * 合并路径和文件名
     */
    public function concatFullPath(string $dir = ''){
        $this->full_path = implode('/', array_filter([$dir, $this->getFileName()]));
    }

    /**
     * 获取文件名
     * @return mixed
     */
    public function getFileName()
    {
        return $this->file_name;
    }
    public function getUrl(string $path = ''){
        $path = !empty($path) ? $path : $this->getFullPath();
        $domain = $this->config['domain'] ?? '';
        $domain = empty($domain) ? '' : $domain.'/';
        return $domain.$path;
    }
}