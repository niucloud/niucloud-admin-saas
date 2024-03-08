<?php

namespace app\upgrade\v011;

use app\dict\diy\LinkDict;
use app\dict\sys\MenuDict;
use app\model\diy\Diy;
use app\model\sys\SysMenu;
use app\service\admin\sys\MenuService;
use app\service\core\addon\CoreAddonBaseService;
use app\service\core\addon\CoreAddonService;
use app\service\core\sys\CoreSysConfigService;
use think\facade\Cache;

class Upgrade {

    public function handle() {
        Cache::set("local_install_addons", null);

        $addon_list = (new CoreAddonService())->getInstallAddonList();
        foreach ($addon_list as $addon) {
            $this->handleUniappPagesJson($addon['key']);
            $this->handleMenus('admin', $addon['key']);
            $this->handleMenus('site', $addon['key']);
        }

        $this->handleDiyData();

    }

    public function handleUniappPagesJson($addon) {
        $json_file = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR . 'uni-app-pages.php';
        if (file_exists($json_file)) {
            $content = str_replace('addon/', '', file_get_contents($json_file));
            file_put_contents($json_file, $content);
        }
    }

    public function handleMenus($app_type = 'admin', $addon = '') {
        $where = [
            ['app_type', '=', $app_type],
            ['menu_type', 'in', [0, 1]]
        ];
        if ($addon) $where[] = ['addon', '=', $addon];
        $menu_list = (new SysMenu())->where($where)->order('sort desc')->select()->toArray();
        $menu_list = (new MenuService())->menuToTree($menu_list, 'menu_key', 'parent_key', 'children', 'auth', '', 0);

        $update_data = [];
        $this->getUpdateData($menu_list, $update_data);

        (new SysMenu())->saveAll($update_data);
        $this->generateMenuFile($app_type, $addon);
    }

    public function getUpdateData($menu_list, &$data = [], $parent_router = '') {
        foreach ($menu_list as $item) {
            if ($item['menu_type'] == 0) {
                $data[]  = ['id' => $item['id'], 'router_path' => ''];
            } else {
                $data[]  = ['id' => $item['id'], 'router_path' => $parent_router ? "{$parent_router}/{$item['router_path']}" : $item['router_path'] ];
            }
            if (isset($item['children'])) {
                $this->getUpdateData($item['children'], $data, $parent_router ? "{$parent_router}/{$item['router_path']}" : $item['router_path']);
            }
        }
    }

    /**
     * 生成菜单文件
     * @param string $app_type
     * @param $addon
     * @return true
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function generateMenuFile(string $app_type, $addon = '') {
        $where = [ ['app_type', '=', $app_type], ['addon', '=', $addon] ];
        $field = 'menu_name,menu_key,menu_short_name,parent_key,menu_type,icon,api_url,router_path,view_path,methods,sort,status,is_show';
        $menu = (new SysMenu())->where($where)->field($field)->order('sort', 'desc')->select()->toArray();
        if (!empty($menu)) {
            $menu = (new MenuService())->menuToTree($menu, 'menu_key', 'parent_key', 'children');
            (new SysMenu())->where($where)->update(['source' => MenuDict::SYSTEM]);
        }

        if ($addon) {
            $addon_path = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
        } else {
            $addon_path = root_path() . DIRECTORY_SEPARATOR;
        }
        $addon_dict = $addon_path . 'app' . DIRECTORY_SEPARATOR . 'dict' . DIRECTORY_SEPARATOR . 'menu' . DIRECTORY_SEPARATOR . $app_type . '.php';

        $content = '<?php' . PHP_EOL;
        $content .= 'return [' . PHP_EOL;
        $content .= $this->arrayFormat($menu);
        $content .= '];';
        file_put_contents($addon_dict, $content);

        return true;
    }

    private function arrayFormat($array, $level = 1) {
        $tab = '';
        for ($i = 0; $i < $level; $i++) {
            $tab .= '    ';
        }
        $content = '';
        foreach ($array as $k => $v) {
            if (in_array($k, ['status_name', 'menu_type_name']) || ($level > 2 && $k == 'parent_key')) continue;
            if (is_array($v)) {
                $content .= $tab;
                if (is_string($k)) {
                    $content .= "'{$k}' => ";
                }
                $content .= '[' . PHP_EOL . $this->arrayFormat($v, $level + 1);
                $content .= $tab . '],' . PHP_EOL;
            } else {
                $content .= $tab ."'{$k}' => '{$v}'," . PHP_EOL;
            }
        }
        return $content;
    }

    /**
     * 处理自定义数据，本次版本 移除自定义应用组件，改为图文导航
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    private function handleDiyData()
    {
        $diy_model = new Diy();
        $where = [
            [ 'value', 'like', '%AddonList%' ]
        ];
        $field = 'id,site_id,value';
        $list = $diy_model->where($where)->field($field)->select()->toArray();
        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $diy_data = json_decode($v[ 'value' ], true);
                foreach ($diy_data[ 'value' ] as $ck => $cv) {
                    if ($cv[ 'componentName' ] == 'AddonList') {
                        $value = $this->getDiyData($v[ 'site_id' ]);
                        if (!empty($value)) {
                            $diy_data[ 'value' ][ $ck ] = $value;
                        } else {
                            unset($diy_data[ 'value' ][ $ck ]);
                        }
                    }
                }
                $diy_data[ 'value' ] = array_values($diy_data[ 'value' ]);
                $diy_data = json_encode($diy_data);

                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }
    }

    /**
     * 应用组件改为 图文导航组件 的数据格式
     * @param $site_id
     * @return array
     */
    private function getDiyData($site_id)
    {
        request()->siteId($site_id);
        $wap_index_list = ( new CoreSysConfigService() )->getWapIndexList();
        if (empty($wap_index_list)) {
            return [];
        }

        $data = [
            "path" => "edit-graphic-nav",
            "id" => unique_random(10),
            "componentName" => "GraphicNav",
            "componentTitle" => "图文导航",
            "uses" => 0,
            "layout" => "horizontal",
            "navTitle" => "",
            "subNavTitle" => "",
            "subNavTitleLink" => [
                "name" => ""
            ],
            "subNavColor" => "#999999",
            "mode" => "graphic",
            "showStyle" => "fixed",
            "rowCount" => 4,
            "pageCount" => 2,
            "carousel" => [
                "type" => "circle",
                "color" => "#FFFFFF"
            ],
            "imageSize" => 30,
            "aroundRadius" => 25,
            "font" => [
                "size" => 14,
                "weight" => "normal",
                "color" => "#303133"
            ],
            "pageBgColor" => "",
            "componentBgColor" => "rgba(255, 255, 255, 1)",
            "topRounded" => 9,
            "bottomRounded" => 9,
            "elementBgColor" => "",
            "topElementRounded" => 0,
            "bottomElementRounded" => 0,
            "margin" => [
                "top" => 10,
                "bottom" => 10,
                "both" => 16
            ],
            "ignore" => [],
            "list" => []
        ];

        if (!empty($wap_index_list)) {
            foreach ($wap_index_list as $k => $v) {
                $link_list = LinkDict::getLink([ 'addon' => $v[ 'key' ] ]);
                $link = [];
                foreach ($link_list as $ck => $cv) {
                    if ($cv[ 'addon_info' ][ 'key' ] == $v[ 'key' ]) {
                        foreach ($cv[ 'child_list' ] as $tk => $tv) {
                            if ($tv[ 'url' ] == $v[ 'url' ]) {
                                $link = [
                                    "parent" => $ck,
                                    "name" => $tv[ 'name' ],
                                    "title" => $tv[ 'title' ],
                                    "url" => $tv[ 'url' ]
                                ];
                                break;
                            }
                        }
                    }
                }
                $data[ 'list' ][] = [
                    "title" => $v[ 'title' ],
                    "link" => $link,
                    "imageUrl" => $v[ 'icon' ],
                    "label" => [
                        "control" => false,
                        "text" => "热门",
                        "textColor" => "#FFFFFF",
                        "bgColorStart" => "#F83287",
                        "bgColorEnd" => "#FE3423"
                    ],
                    "id" => unique_random(10 + $k),
                    "imgWidth" => 100,
                    "imgHeight" => 100
                ];
            }
        }
        return $data;
    }

}

