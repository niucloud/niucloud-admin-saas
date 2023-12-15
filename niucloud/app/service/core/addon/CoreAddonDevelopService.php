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

namespace app\service\core\addon;

use app\dict\sys\FileDict;
use app\model\addon\Addon;
use app\service\core\upload\CoreFetchService;
use core\exception\AddonException;
use core\exception\UploadFileException;

/**
 * 插件开发服务层
 */
class CoreAddonDevelopService extends CoreAddonBaseService
{

    public $base_addon_dir;
    private $map = array(
        'admin' => [
            'api' => [
                [
                    'name' => 'hello_world.ts',
                    'vm' => 'admin' . DIRECTORY_SEPARATOR . 'api.vm',
                ]
            ],
            'assets' => [],
            'lang' => [
                'zh-cn' => [
                    [
                        'name' => 'hello_world.index.json',
                        'vm' => 'admin' . DIRECTORY_SEPARATOR . 'lang.vm',
                    ]
                ]
            ],
            'views' => [
                'hello_world' => [
                    [
                        'name' => 'index.vue',
                        'vm' => 'admin' . DIRECTORY_SEPARATOR . 'views.vm',
                    ]
                ]

            ]
        ],
        'app' => [
            'adminapi' => [
                'controller' => [
                    'hello_world' => [
                        [
                            'name' => 'Index.php',
                            'vm' => 'system' . DIRECTORY_SEPARATOR . 'admin_controller.vm',
                        ]
                    ]
                ],
                'route' => [
                    [
                        'name' => 'route.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'admin_route.vm',
                    ]
                ]
            ],
            'api' => [
                'controller' => [
                    'hello_world' => [
                        [
                            'name' => 'Index.php',
                            'vm' => 'system' . DIRECTORY_SEPARATOR . 'api_controller.vm',
                        ]
                    ],
                ],
                'route' => [
                    [
                        'name' => 'route.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'api_route.vm'
                    ]

                ]
            ],
            'dict' => [
                'menu' => [
                    [
                        'name' => 'admin.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'menu.vm'
                    ],
                    [
                        'name' => 'site.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'menu.vm'
                    ]
                ]

            ],
            'job' => [

            ],
            'lang' => [
                'zh-cn' => [
                    [
                        'name' => 'api.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'common.vm'
                    ],
                    [
                        'name' => 'dict.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'common.vm'
                    ],
                    [
                        'name' => 'validate.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'common.vm'
                    ]
                ],

                'en' => [
                    [
                        'name' => 'api.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'common.vm'
                    ],
                    [
                        'name' => 'dict.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'common.vm'
                    ],
                    [
                        'name' => 'validate.php',
                        'vm' => 'system' . DIRECTORY_SEPARATOR . 'common.vm'
                    ]
                ]

            ],
            'listener' => [

            ],
            'model' => [

            ],
            'service' => [

            ],
            'validate' => [

            ],
            [
                'name' => 'event.php',
                'vm' => 'system' . DIRECTORY_SEPARATOR . 'event.vm'
            ]
        ],
        'sql' => [
            [
                'name' => 'install.sql',
            ],
            [
                'name' => 'uninstall.sql',
            ]
        ],
        'package' => [
            [
                'name' => 'uni-app-pages.php',
                'vm' => 'package' . DIRECTORY_SEPARATOR . 'uni-app-pages.vm'
            ],
        ],
        'resource' => [
            [
                'name' => 'cover.png',
                'is_cover' => true
            ],
            [
                'name' => 'icon.png',
                'is_cover' => true
            ],
        ],
        'uni-app' => [
            'api' => [
                [
                    'name' => 'hello_world.ts',
                    'vm' => 'uni-app' . DIRECTORY_SEPARATOR . 'api.vm',
                ],
            ],
            'components' => [],
            'locale' => [
                'zh-Hans' => [
                    [
                        'name' => 'pages.hello_world.index.json',
                        'vm' => 'uni-app' . DIRECTORY_SEPARATOR . 'lang.vm',
                    ],
                ],
                [
                    'name' => 'en.json',
                    'vm' => 'uni-app' . DIRECTORY_SEPARATOR . 'lang.vm',
                ],
                [
                    'name' => 'zh-Hans.json',
                    'vm' => 'uni-app' . DIRECTORY_SEPARATOR . 'lang.vm',
                ],
            ],
            'pages' => [
                'hello_world' => [
                    [
                        'name' => 'index.vue',
                        'vm' => 'uni-app' . DIRECTORY_SEPARATOR . 'views.vm',
                    ],
                ]
            ],
            'utils' => []
        ],

        'web' => [
            'api' => [
                [
                    'name' => 'hello_world.ts',
                    'vm' => 'web' . DIRECTORY_SEPARATOR . 'api.vm',
                ],
            ],
            'lang' => [
                'zh-cn' => [
                    [
                        'name' => 'pages.json',
                        'vm' => 'web' . DIRECTORY_SEPARATOR . 'lang_pages.vm',
                    ],
                    [
                        'name' => 'hello_world.index.json',
                        'vm' => 'web' . DIRECTORY_SEPARATOR . 'lang.vm',
                    ],
                ],
            ],
            'pages' => [
                'hello_world' => [
                    [
                        'name' => 'index.vue',
                        'vm' => 'web' . DIRECTORY_SEPARATOR . 'view.vm',
                    ],
                ],
                [
                    'name' => 'routes.ts',
                    'vm' => 'web' . DIRECTORY_SEPARATOR . 'routes.vm',
                ],
            ],
        ],
        'compile' => [
            'admin' => [

            ],
            'wap' => [

            ],
            'weapp' => [

            ],
            'web' => [

            ],
            'aliapp' => [

            ],
        ],
        [
            'name' => 'info.json',
            'vm' => 'system' . DIRECTORY_SEPARATOR . 'info.vm',
            'is_cover' => true
        ],
        [
            'name' => 'Addon.php',
            'vm' => 'system' . DIRECTORY_SEPARATOR . 'addon.vm'
        ]

    );
    private $addon_info;

    private $key;

    private $action;

    public function __construct(string $key)
    {
        parent::__construct();
        $this->model = new Addon();
        $this->key = $key;
        $this->base_addon_dir = $this->addon_path . DIRECTORY_SEPARATOR . $this->key;
    }
    //生成


    /**
     * 生成新建插件
     * @param array $title
     * @param $desc
     * @param $key
     * @param $version
     * @param $author
     * @param $type
     * @param $support_app
     * @return true
     */
    public function add(array $data)
    {
        if (is_dir($this->base_addon_dir)) throw new AddonException('ADDON_KEY_IS_EXIST');//当前目录中已存在key值一致的插件
        $this->setAddonInfo($data);

        $this->filePut($this->map, $this->base_addon_dir);


        return true;
    }

    public function setAddonInfo($data)
    {
        $data['key'] = $this->key;
        $this->addon_info = $data;
    }

    /**
     * 文件创建
     * @param $item
     * @param $root_k
     * @param $key
     * @return true
     */
    public function filePut($item, $root_k = '', $key = '')
    {
        //key为int为文件,否者是文件夹
        if (is_int($key)) {
            $this->fileAdd($item, $root_k);
        } else {
            $item_dir = $root_k . DIRECTORY_SEPARATOR . $key . DIRECTORY_SEPARATOR;
            if ($key) {
                if (!is_dir($item_dir) && !mkdir($item_dir, 0777, true) && !is_dir($item_dir)) {
                    throw new AddonException(sprintf('Directory "%s" was not created', $item_dir));
                }
            }
            if (!empty($item)) {
                foreach ($item as $k => $v) {
                    $this->filePut($v, $item_dir, $k);
                }
            }
        }
        return true;
    }

    /**
     * 文本替换
     * @param $item
     * @param $dir
     * @return true
     */
    public function fileAdd($item, $dir = '')
    {
        $is_cover = $item['is_cover'] ?? false;
        if ($this->action == 'edit' && !$is_cover) {
            return true;
        }
        $name = $item['name'] ?? '';
        if (!$name) {
            return true;
        }
        $file = $dir . $name;

        if (!is_dir($dir) && !mkdir($dir, 0777, true) && !is_dir($dir)) {
            throw new AddonException(sprintf('Directory "%s" was not created', $dir));
        }
        if (strpos($name, 'png') || strpos($name, 'jpg')) {
            $file_name = explode('.', $name)[0] ?? '';
            if (empty($file_name)) return true;
            $image = $this->addon_info[$file_name] ?? '';
            if (empty($image)) return true;
            if (check_file_is_remote($image)) {
                try {
                    (new CoreFetchService())->setRootPath($dir)->setRename($name)->image($image, '', FileDict::LOCAL);
                } catch ( UploadFileException $e ) {
                    return true;
                }
            } else {
                @copy($image, $file);
            }
        } else {
            //创建路由文件
            $vm_root_dir = root_path('app') . 'service' . DIRECTORY_SEPARATOR . 'core' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . 'vm' . DIRECTORY_SEPARATOR;
            $vm = $item['vm'] ?? '';
            if (is_file($vm_root_dir . $vm)) {
                $content = file_get_contents($vm_root_dir . $vm);
                $content = $this->contentReplace($content, $this->addon_info);
            } else {
                $content = '';
            }
            //如果已存在就不要创建了
//        if(!is_file($file)){
            file_put_contents($file, $content);
//        }
        }

        return true;
    }

    /**
     * 文本根据变量组来替换字符
     * @param $content
     * @param $vars
     * @return array|mixed|string|string[]
     */
    public function contentReplace($content, $vars)
    {
        foreach ($vars as $k => $v) {
            $content = str_replace('{' . $k . '}', $v, $content);
        }
        return $content;
    }

    /**
     * 编辑
     * @param array $data
     * @return true
     */
    public function edit(array $data)
    {
        if (!is_dir($this->base_addon_dir)) throw new AddonException('ADDON_IS_NOT_EXIST');//当前目录中不存在此项插件
        $this->action = 'edit';
        $this->setAddonInfo($data);

        $this->filePut($this->map, $this->base_addon_dir);
        //如果已安装的插件,需要同步修改表记录
        $where = [
            [
                'key', '=', $this->key
            ]
        ];
        $info = $this->model->where($where)->findOrEmpty();
        if (!$info->isEmpty()) {
            $info->save(
                [
                    'title' => $data['title'],
                    'desc' => $data['desc'],
                    'author' => $data['author'],
                    'version' => $data['version'],
                    'type' => $data['type'],
                    'support_app' => $data['support_app'],
                    'update_time' => $data['update_time'],
                ]
            );
        }
        return true;
    }

    /**
     * 删除
     * @return true
     */
    public function del()
    {
        if (!is_dir($this->base_addon_dir)) throw new AddonException('ADDON_IS_NOT_EXIST');//当前目录中不存在此项插件
        $where = [
            [
                'key', '=', $this->key
            ]
        ];
        $info = $this->model->where($where)->findOrEmpty();
        if (!$info->isEmpty()) {
            throw new AddonException('ADDON_IS_INSTALLED_NOT_ALLOW_DEL');
        }
        //删除目录文件
        del_target_dir($this->base_addon_dir, true);
        return true;
    }

}
