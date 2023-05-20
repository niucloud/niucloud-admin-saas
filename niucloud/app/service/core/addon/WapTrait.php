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

namespace app\service\core\addon;


/**
 * 编译手机端文件
 */
trait WapTrait
{

    // TODO 主题色调 theme

    // TODO 图标库 iconfont

    /**
     * 编译 diy-group 自定义组件代码文件
     * @param $compile_path
     * @param $addon_name
     * @return string
     */
    public function compileDiyComponentsCode($compile_path)
    {
        $content = "<template>\n";
        $content .= "    <view>\n";
        $content .= "        <!-- 扩展组件 -->\n";

        $root_path = $compile_path . str_replace('/', DIRECTORY_SEPARATOR,'/components/diy/extend'); // 扩展组件根目录
        $file_arr = getFileMap($root_path);

        if (!empty($file_arr)) {
            foreach ($file_arr as $ck => $cv) {
                if (strpos($cv, 'index.vue') !== false) {

                    $path = str_replace($root_path . DIRECTORY_SEPARATOR, '', $ck);
                    $path = str_replace(DIRECTORY_SEPARATOR.'index.vue', '', $path);

                    // 获取自定义组件 key 关键词
                    $name_arr = explode('-', $path);
                    foreach ($name_arr as $k => $v) {
                        // 首字母大写
                        $name_arr[ $k ] = strtoupper(substr($v, 0, 1)) . substr($v, 1);
                    }
                    $name = implode('', $name_arr);
                    $file_name = 'diy-core-' . $path;

                    $content .= "        <template v-if=\"props.component.componentName == '{$name}'\">\n";
                    $content .= "            <$file_name :component=\"props.component\" :index=\"props.index\"></{$file_name}>\n";
                    $content .= "        </template>\n";
                }
            }
        }

        $content .= "    </view>\n";
        $content .= "</template>\n";

        $content .= "<script setup lang=\"ts\">\n";
        $content .= "    // 自定义扩展组件\n";
        $content .= "    import { computed } from 'vue';\n";
        $content .= "    import useDiyStore from '@/stores/diy';\n";
        $content .= "    const props = defineProps(['component', 'index']);\n";
        $content .= "    const diyStore = useDiyStore();\n";
        $content .= "    const diyComponent = computed(() => {\n";
        $content .= "        if (diyStore.mode == 'decorate') {\n";
        $content .= "            return diyStore.value[props.index];\n";
        $content .= "        } else {\n";
        $content .= "            return props.component;\n";
        $content .= "        }\n";
        $content .= "    })\n";
        $content .= "</script>\n";
        $content .= "<style lang=\"scss\" scoped></style>\n";

        // 找到页面路由文件 pages.json，写入内容
        $res = file_put_contents($compile_path . str_replace('/', DIRECTORY_SEPARATOR, '/components/diy/comp-extend/index.vue'), $content);
        return $res;
    }

    /**
     * 编译 pages.json 页面路由代码文件
     * @param $compile_path
     * @return bool|int
     */
    public function compileRoutesCode($compile_path)
    {

        $package = [ 'pages' ]; // 主包

        // 特殊页面，隐藏导航栏
        $special_page = [
            'pages/index/index',
            'pages/member/index',
            'pages/pay/result',
            'pages/pay/browser'
        ];

        // 需要登录的页面
        $need_login_page = [
            'pages/member/info',
            'pages/setting/index',
            'pages/member/personal',
            'pages/member/point',
            'pages/member/balance'
        ];

        $route_arr = []; // 路由集合

        foreach ($package as $k => $v) {
            $file_arr = getFileMap($compile_path . DIRECTORY_SEPARATOR . $v);
            if (!empty($file_arr)) {
                foreach ($file_arr as $ck => $cv) {
                    if (strpos($cv, '.vue') !== false) {
                        $route = str_replace($compile_path . DIRECTORY_SEPARATOR, '', $ck);
                        $route = str_replace('.vue', '', $route);
                        $route_arr[ $v ][] = $route;
                    }
                }
            }
        }

        // 排序
        foreach ($package as $k => $v) {
            sort($route_arr[ $v ], SORT_STRING);
        }

        // 获取首页下标
        $index_page = array_search('pages/index/index', $route_arr[ 'pages' ]);
        $index_route = $route_arr[ 'pages' ][ $index_page ];

        // 将首页设为启动页
        $route_arr[ 'pages' ][ $index_page ] = $route_arr[ 'pages' ][ 0 ];
        $route_arr[ 'pages' ][ 0 ] = $index_route;

        $content = "{\n";

        // 主包
        $content .= "   \"pages\" : [ // pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages\n";
        foreach ($route_arr[ 'pages' ] as $k => $v) {
            $content .= "       {\n";
            $content .= "           \"path\": \"{$v}\",\n";
            $content .= "           \"style\": {\n";

            if (in_array($v, $special_page)) {
                $content .= "               \"navigationStyle\": \"custom\",\n";
            } else {
                $content .= "               // #ifdef H5\n";
                $content .= "               \"navigationStyle\": \"custom\",\n";
                $content .= "               // #endif\n";
            }

            $content .= "               \"navigationBarTitleText\": \"%" . str_replace('/', '.', $v) . "%\"\n";

            // 控制登录的页面
            if (in_array($v, $need_login_page)) {
                $content .= "           },\n";
                $content .= "           \"needLogin\": true\n";
            } else {
                $content .= "           }\n";
            }

            // 最后一个不能加逗号,
            if (( count($route_arr[ 'pages' ]) - 1 ) == $k) {
                $content .= "       }\n";
            } else {
                $content .= "       },\n";
            }

        }
        $content .= "   ],\n";

        // globalStyle
        $content .= "   \"globalStyle\": {\n";
        $content .= "       \"navigationBarTextStyle\": \"black\",\n";
        $content .= "       \"navigationBarTitleText\": \"\",\n";
        $content .= "       \"navigationBarBackgroundColor\": \"#ffffff\",\n";
        $content .= "       \"backgroundColor\": \"#F8F8F8\",\n";
        $content .= "       \"backgroundColorTop\": \"#F8F8F8\",\n";
        $content .= "       \"backgroundColorBottom\": \"#F8F8F8\"\n";
        $content .= "   },\n";

        // tabBar
        $content .= "   \"tabBar\": {\n";
        $content .= "       \"list\": [\n";

        $content .= "           {\n";
        $content .= "               \"pagePath\": \"pages/index/index\"\n";
        $content .= "           },\n";

        $content .= "           {\n";
        $content .= "               \"pagePath\": \"pages/article/list\"\n";
        $content .= "           },\n";

        $content .= "           {\n";
        $content .= "               \"pagePath\": \"pages/member/index\"\n";
        $content .= "           }\n";

        $content .= "       ]\n";

        $content .= "   },\n";

        $content .= "   \"uniIdRouter\": {},\n";

        // easycom
        $content .= "   \"easycom\": {\n";
        $content .= "       \"custom\": {\n";
        $content .= "           \"^u-(.*)\": \"uview-plus/components/u-$1/u-$1.vue\",\n";
        $content .= "           \"diy-system-(\W.*)\": \"@/components/diy/system/$1/index.vue\",\n";
        $content .= "           \"diy-core-(\W.*)\": \"@/components/diy/core/$1/index.vue\",\n";
        $content .= "           \"diy-(\\W.*)\": \"@/components/diy/$1/index.vue\"\n";
        $content .= "       }\n";
        $content .= "   }\n";

        $content .= "}\n";

        // 找到页面路由文件 pages.json，写入内容
        $res = file_put_contents($compile_path . DIRECTORY_SEPARATOR. 'pages.json', $content);
        return $res;
    }

}