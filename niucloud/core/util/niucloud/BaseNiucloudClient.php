<?php

namespace core\util\niucloud;

use app\service\admin\niucloud\NiucloudService;
use app\service\core\niucloud\CoreNiucloudConfigService;
use Closure;
use core\exception\NiucloudException;
use core\util\niucloud\http\AccessToken;
use core\util\niucloud\http\HasHttpRequests;
use core\util\niucloud\http\Response;
use core\util\niucloud\http\Token;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Middleware;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use think\facade\Cache;


class BaseNiucloudClient
{

    use HasHttpRequests;
    use AccessToken;
    use Token;
    /**
     * 授权码
     * @var mixed|string
     */
    protected $code;
    /**
     * 授权秘钥
     * @var mixed|string
     */
    protected $secret;


    protected $config;



    /**
     *官网服务主域名
     * @var string
     */
    protected string $baseUri = 'https://api.niucloud.com/openapi/';
    /**
     *
     * @var \think\facade\Request|\think\Request
     */
    protected $request;


    /**
     * @param string $code
     * @param string $secret
     */
    public function __construct(string $code = '', string $secret = '')
    {
        if($code || $secret){
            $this->code = $code;
            $this->secret = $secret;
        }else{
            $auth_config = (new CoreNiucloudConfigService())->getNiucloudConfig();
            if($auth_config['auth_code'] || $auth_config['auth_secret']){
                $this->code = $auth_config['auth_code'];
                $this->secret = $auth_config['auth_secret'];
            }else{
                $this->code = config('niucloud.auth.code');
                $this->secret = config('niucloud.auth.secret');
            }
        }
        $this->access_token = $this->getAccessToken();
        $this->request = request();
    }

    /**
     * @param string $url
     * @param array $data
     * @return array|Response|object|ResponseInterface
     * @throws GuzzleException
     */
    public function httpPost(string $url, array $data = [])
    {
        return $this->request($url, 'POST', [
            'form_params' => $data,
        ]);
    }

    /**
     * @param string $url
     * @param string $method
     * @param array $options
     * @param bool $returnRaw
     *
     * @return ResponseInterface
     * @throws GuzzleException
     */
    public function request(string $url, string $method = 'GET', array $options = [], bool $returnRaw = false)
    {
        if (empty($this->middlewares)) {
            $this->registerHttpMiddlewares();
        }
        $response = $this->toRequest($url, $method, $options);
        return $returnRaw ? $response : $this->responseToType($response, config('niucloud.response_type'));
    }

    /**
     * Register Guzzle middlewares.
     */
    protected function registerHttpMiddlewares()
    {
        // retry
        $this->pushMiddleware($this->retryMiddleware(), 'retry');
        //header
        $this->pushMiddleware($this->headerMiddleware(), 'header');
        // access token
        $this->pushMiddleware($this->accessTokenMiddleware(), 'access_token');
    }

    /**
     * @return callable
     */
    protected function retryMiddleware()
    {
        return Middleware::retry(
            function (
                $retries,
                RequestInterface $request,
                ResponseInterface $response = null
            ) {
                // Limit the number of retries to 2  重试次数，默认 1，指定当 http 请求失败时重试的次数。
                if ($retries < config('niucloud.http.max_retries', 1) && $response && $body = $response->getBody()) {
                    // Retry on server errors
                    $response = json_decode($body, true);
                    if (isset($response['code'])) {
                        if ($response['code'] != 1) {
                            if (in_array(abs($response['code']), [401], true)) {
                                $this->clearAccessToken();
                                $this->refreshAccessToken();
                            } else {
                                throw new NiucloudException($response['msg']);
                            }
                        }
                        return true;
                    }
                }
                return false;
            },
            function () {
                //重试延迟间隔（单位：ms），默认 500
                return abs(config('niucloud.http.retry_delay', 500));
            }
        );
    }

    /**
     * 表头属性
     * @return Closure
     */
    public function headerMiddleware(){
        return function (callable $handler) {
            return function (RequestInterface $request, array $options) use ($handler) {
                $domain = request()->domain(true);
                $domain = str_replace('http://', '', $domain);
                $domain = str_replace('https://', '', $domain);
                $request = $request->withHeader('Referer', $domain);
                $options['verify'] =  config('niucloud.http.verify', true);
                return $handler($request, $options);
            };
        };
    }


    /**
     * @param string $url
     * @param array $query
     * @return array|object|Response|ResponseInterface
     * @throws GuzzleException
     */
    public function httpGet(string $url, array $query = [])
    {
        return $this->request($url, 'GET', [
            'query' => $query,
        ]);
    }

    /**
     * @return Closure
     */
    protected function accessTokenMiddleware()
    {
        return function (callable $handler) {
            return function (RequestInterface $request, array $options) use ($handler) {
                if ($this->access_token) {
                    $request = $this->applyToRequest($request, $options);
                }
                return $handler($request, $options);
            };
        };
    }

    /**
     * @param RequestInterface $request
     * @param array $requestOptions
     * @return RequestInterface
     */
    public function applyToRequest(RequestInterface $request, array $requestOptions = []): RequestInterface
    {
        return $request->withHeader($this->access_token_key, $this->access_token);
    }

    /**
     * @param ResponseInterface $response
     * @param $type
     * @return array|Response|object
     */
    public function responseToType(ResponseInterface $response, $type = null)
    {
        $response = Response::buildFromPsrResponse($response);
        $response->getBody()->rewind();

        switch ($type ?? 'array') {
            case 'collection':
                return $response->toCollection();
            case 'array':
                return $response->toArray();
            case 'object':
                return $response->toObject();
            case 'raw':
                return $response;
            default:
                throw new NiucloudException(sprintf('Config key "response_type" not found', $type));
        }
    }

    /**
     * @param string $url
     * @param array $data
     * @param array $query
     * @return array|Response|object|ResponseInterface
     * @throws GuzzleException
     */
    public function httpPostJson(string $url, array $data = [], array $query = [])
    {
        return $this->request($url, 'POST', ['query' => $query, 'json' => $data]);
    }

    /**
     * @param string $url
     * @param array $files
     * @param array $form
     * @param array $query
     * @return array|Response|object|ResponseInterface
     * @throws GuzzleException
     */
    public function httpUpload(string $url, array $files = [], array $form = [], array $query = [])
    {
        $multipart = [];
        $headers = [];

        if (isset($form['filename'])) {
            $headers = [
                'Content-Disposition' => 'form-data; name="media"; filename="' . $form['filename'] . '"'
            ];
        }

        foreach ($files as $name => $path) {
            $multipart[] = [
                'name' => $name,
                'contents' => fopen($path, 'r'),
                'headers' => $headers
            ];
        }

        foreach ($form as $name => $contents) {
            $multipart[] = compact('name', 'contents');
        }

        return $this->request(
            $url,
            'POST',
            ['query' => $query, 'multipart' => $multipart, 'connect_timeout' => 30, 'timeout' => 30, 'read_timeout' => 30]
        );
    }

    /**
     * @param string $url
     * @param string $method
     * @param array $options
     *
     * @return Response
     * @throws GuzzleException
     */
    public function requestRaw(string $url, string $method = 'GET', array $options = [])
    {
        return Response::buildFromPsrResponse($this->request($url, $method, $options, true));
    }

    /**
     * 下载文件
     * @param string $url
     * @param array $query
     * @param string $absolute_path
     * @return string
     * @throws GuzzleException
     */
    public function download(string $url, array $query = [], string $absolute_path = '')
    {
        // 打开即将下载的本地文件，在该文件上打开一个流
        $resource = fopen($absolute_path, 'w');
        $res = $this->request($url, 'GET', ['sink' => $absolute_path, 'query' => $query]);
        // 关闭一个已打开的文件指针
        fclose($resource);
        return $absolute_path;
    }

    public function getDomain($is_filter = true){
        $domain = request()->domain(true);
        if($is_filter){
            $domain = str_replace('http://', '', $domain);
            $domain = str_replace('https://', '', $domain);
        }
        return $domain;
    }
}
