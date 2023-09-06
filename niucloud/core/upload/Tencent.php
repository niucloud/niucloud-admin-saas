<?php

namespace core\upload;

use core\exception\UploadFileException;
use Exception;
use Qcloud\Cos\Client;

/**
 * 腾讯云存储引擎 (COS)
 */
class Tencent extends BaseUpload
{

    private $position = array(
        'top-left' => 'northwest',
        'top-center' => 'north',
        'top-right' => 'northeast',
        'center-left' => 'west',
        'center' => 'center',
        'center-right' => 'east',
        'bottom-left' => 'southwest',
        'bottom-center' => 'south',
        'bottom-right' => 'southeast',
    );

    protected function initialize(array $config = [])
    {
        parent::initialize($config);
    }

    /**
     * 获取服务主体
     * @return Client
     */
    public function client()
    {
        $secret_id = $this->config['access_key']; //替换为用户的 secretId，请登录访问管理控制台进行查看和管理，https://console.tencentcloud.com/cam/capi
        $secret_key = $this->config['secret_key']; //替换为用户的 secretKey，请登录访问管理控制台进行查看和管理，https://console.tencentcloud.com/cam/capi
        $region = $this->config['region']; //替换为用户的 region，已创建桶归属的region可以在控制台查看，https://console.tencentcloud.com/cos5/bucket

        return new Client(
            array(
                'region' => $region,
//                'schema' => 'https', //协议头部，默认为http
                'credentials' => array(
                    'secretId' => $secret_id,
                    'secretKey' => $secret_key)
            )
        );
    }


    /**
     * 执行上传
     * @param string $dir
     * @return true
     */
    public function upload(string $dir)
    {
        $this->validate();
        $bucket = $this->config['bucket'];
        try {
            $result = $this->client()->putObject(array(
                'Bucket' => $bucket, //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.tencentcloud.com/cos5/bucket
                'Key' => $this->getFullPath(),
                'Body' => fopen($this->getRealPath(), 'rb'),
            ));
            // 请求成功
            return true;
        } catch ( Exception $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }

    /**
     * base文件上云
     * @param string $base64_data
     * @param string|null $key
     * @return true
     */
    public function base64(string $base64_data, ?string $key = null)
    {
        $bucket = $this->config['bucket'];
        try {
            $base64_file = base64_decode($base64_data);
            if (!$base64_file) throw new UploadFileException('FILE_ERROE');
            $result = $this->client()->putObject(array(
                'Bucket' => $bucket, //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.tencentcloud.com/cos5/bucket
                'Key' => $key,
                'Body' => $base64_file,
            ));
            // 请求成功
            return true;
        } catch ( Exception $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }
    /**
     * notes: 抓取远程资源(最大支持上传5G文件)
     * @param string $url
     * @param string|null $key
     * @return true
     */
    public function fetch(string $url, ?string $key = null)
    {

        $bucket = $this->config['bucket'];
        try {
            $result = $this->client()->putObject(array(
                'Bucket' => $bucket, //存储桶名称，由BucketName-Appid 组成，可以在COS控制台查看 https://console.tencentcloud.com/cos5/bucket
                'Key' => $key,
                'Body' => fopen($url, 'rb'),
            ));
            // 请求成功
            return true;
        } catch ( Exception $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }

    /**
     * 删除一个简单对象
     * @param string $file_name
     * @return true
     */
    public function delete(string $file_name)
    {
        $bucket = $this->config['bucket'];
        try {
            $this->client()->deleteObject(array(
                'Bucket' => $bucket,
                'Key' => $file_name
            ));
            return true;
        } catch ( Exception $e ) {
            throw new UploadFileException($e->getMessage());
        }
    }

    public function thumb($file_path, $thumb_type)
    {
        //腾讯云缩略图地址

        $thumb_config = config('upload.thumb.thumb_type');
        $thumb_data = [];
        foreach ($thumb_config as $k => $v) {
            if ($thumb_type == 'all' || $thumb_type == $k || (is_array($thumb_type) && in_array($k, $thumb_type))) {
//                ?x-oss-process=image/resize,m_fill,w_200,h_600,quality,q_60
                $width = $v['width'];
                $height = $v['height'];
                //拼装缩略路径
                $item_thumb = $file_path . '?imageMogr2/thumbnail/' . $width . 'x' . $height;
                $thumb_data[$k] = $item_thumb;
            }
        }

        return $thumb_data;
    }


    /**
     * 图片水印
     * @param $file_path
     * @return mixed
     * @throws Exception
     */
    public function water($file_path)
    {
        $water_config = [];
        $water_path = $file_path;
        if (!empty($water_config)) {
            $status = $water_config['status'];//是否启用
            if($status){
                //判断当前的云图片是否存在?,存在符号的话需要用|连接
                if(str_contains($file_path, '?')){
                    $water_path .= '&watermark';
                }else{
                    $water_path .= '?watermark';
                }
                if ($water_config['type'] == 'image') {
                    $water_image = $water_config['image'];
                    if(!empty($water_image)){
                        //http://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg?watermark/1/image/aHR0cDovL2V4YW1wbGVzLTEyNTEwMDAwMDQucGljc2gubXlxY2xvdWQuY29tL3NodWl5aW4uanBn/gravity/southeast
                        $water_path .= '/1/image/' . base64_encode($water_image) . '/gravity/' . $this->position[$water_config['position']] . '/blogo/1/dx/' . $water_config['offset_x'] . '/dy/' . $water_config['offset_y'].'/dissolve/'.$water_config['opacity'];
                    }
                } else {
                    //http://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg?q-sign-algorithm=<signature>&watermark/2/text/6IW-6K6v5LqRwrfkuIfosaHkvJjlm74/fill/IzNEM0QzRA/fontsize/20/dissolve/50/gravity/northeast/dx/20/dy/20/batch/1/degree/45
                    $water_path .= '/2/text/' . base64_encode($water_config['text']) . '/font/' . base64_encode($water_config['font']) . '/fill/' . base64_encode($water_config['color']) . '/fontsize/' . $water_config['size'] . '/gravity/' . $this->position[$water_config['position']] . '/dx/' . $water_config['offset_x'] . '/dy/' . $water_config['offset_y'];
                }
            }
        }
        return $water_path;
    }
}
