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
namespace core\upload;

use app\service\core\upload\CoreUploadConfigService;
use core\exception\UploadFileException;
use core\loader\DriverConfig;
use core\loader\Storage;
/**
 * Class BaseUpload
 */
abstract class BaseUpload extends Storage
{

    protected $file;//上传的文件对象
    protected $file_info;//上传的文件属性参数
    protected $file_name;//新文件名
    protected $name;
    protected $full_file;//完整的文件地址
    protected $full_path;
    protected $validate;
    protected $type;

    protected $config = null;
    //可能还需要一个完整路径

    /**
     * 初始化
     * @param array $config
     * @return mixed|void
     */
    protected function initialize(array $config = [])
    {
        $this->config = $config;
    }

    /**
     * 附件上传
     * @param $save_dir
     * @return mixed
     */
    abstract protected function upload(string $dir);

    /**
     * 抓取远程附件
     * @param $url
     * @param $key
     * @return mixed
     */
    abstract protected function fetch(string $url, ?string $key);

    /**
     * 附件删除
     * @param $fileName
     * @return mixed
     */
    abstract protected function delete(string $file_name);



    /**
     * 读取文件
     * @param $name
     */
    public function read(string $name, bool $is_rename = true){
        $this->name = $name;
        $this->file = request()->file($name);
        if(empty($this->file))
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
     * 设置文件类型
     * @param string $type
     * @return $this
     */
    public function setType(string $type){
        $this->type = $type;
        return $this;
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
    public function getFullPath(string $dir = ''){
        return $this->full_path ?: $this->concatFullPath($dir);
    }

    /**
     * 合并路径和文件名
     */
    public function concatFullPath(string $dir = ''){
        $this->full_path = implode('/', array_filter([$dir, $this->getFileName()]));
        return $this->full_path;
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


    public function setValidate(array $validate = []){
        $this->validate = $validate ?: config('upload.rules')[$this->type] ?? [];
        return $this;
    }

    /**
     * 根据上传文件的类型来校验文件是否符合配置
     * @param int $site_id
     * @param string $file
     * @param string $att_type
     * @return void
     */
    public function validate()
    {
        if (empty($this->file))
            throw new UploadFileException('UPLOAD_FAIL');

        $config['file_ext'] = $this->validate['ext'] ?? [];
        $config['file_mime'] = $this->validate['mime'] ?? [];
        $config['file_size'] = $this->validate['size'] ?? 0;
        $rule = [];
        $file_size = $config['file_size'] ?? 0;
        if ($file_size > 0) {
            $rule[] = 'fileSize:' . $file_size;
        }
        //验证上传文件类型
        $file_mime = $config['file_mime'] ?? [];
        $file_ext = $config['file_ext'] ?? [];
        if (!empty($file_ext)) {
            $rule[] = 'fileExt:' . implode(',', $file_ext);
        }
//        $image_config = $config['image'] ?? [];
//        if (!empty($image_config)) {
//            $image_width = $image_config['width'] ?? 0;
//            $image_height = $image_config['height'] ?? 0;
//            $image_type = $image_config['type'] ?? [];
//            $image_rule = '';
//            if ($image_width > 0 && $image_height > 0) {
//                $image_rule = 'image:' . $image_width . ',' . $image_height;
//            }
//            if (!empty($image_type)) {
//                if (empty($image_rule)) {
//                    $image_rule = 'image:';
//                } else {
//                    $image_rule .= ',';
//                }
//                $image_rule .= implode(',', $image_type);
//            }
//            if (!empty($image_type)) {
//                $rule[] = $image_rule;
//            }
//        }
        if (!empty($rule)) {
            if (!in_array($this->file->getOriginalMime(), $file_mime)) {
                throw new UploadFileException('UPLOAD_TYPE_NOT_SUPPORT');
            }
            validate([$this->name => implode('|', $rule)])->check([$this->name => $this->file]);
        }

    }
}
