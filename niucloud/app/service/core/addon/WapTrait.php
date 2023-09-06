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
     * @return false|int
     */
    public function compileDiyComponentsCode($compile_path)
    {
        $content = "<template>\n";
        $content .= "    <view class=\"diy-group\" id=\"componentList\">\n";
        $content .= "        <view v-for=\"(component, index) in data.value\" :key=\"component.id\"\n";
        $content .= "        @click=\"diyStore.changeCurrentIndex(index, component)\" class=\"draggable-element relative cursor-move\"\n";
        $content .= "        :class=\"{ selected: diyStore.currentIndex == index,decorate : diyStore.mode == 'decorate' }\" :style=\"component.pageStyle\">\n";

        $root_path = $compile_path . str_replace('/', DIRECTORY_SEPARATOR, 'components/diy'); // 扩展组件根目录
        $file_arr = getFileMap($root_path);

        if (!empty($file_arr)) {
            foreach ($file_arr as $ck => $cv) {
                if (str_contains($cv, 'index.vue')) {

                    $path = str_replace($root_path . '/', '', $ck);
                    $path = str_replace('/index.vue', '', $path);
                    if ($path == 'group') {
                        continue;
                    }

                    // 获取自定义组件 key 关键词
                    $name_arr = explode('-', $path);
                    foreach ($name_arr as $k => $v) {
                        // 首字母大写
                        $name_arr[$k] = strtoupper($v[0] ?? '') . substr($v, 1);
                    }
                    $name = implode('', $name_arr);
                    $file_name = 'diy-' . $path;

                    $content .= "            <template v-if=\"component.componentName == '{$name}'\">\n";
                    $content .= "                <$file_name :component=\"component\" :index=\"index\" :pullDownRefresh=\"props.pullDownRefresh\"></$file_name>\n";
                    $content .= "            </template>\n";
                }
            }
        }

        $content .= "        </view>\n";
        $content .= "        <template v-if=\"diyStore.mode == '' && data.global.bottomTabBarSwitch\">\n";
        $content .= "            <view class=\"pt-[20rpx]\"></view>\n";
        $content .= "            <tabbar />\n";
        $content .= "        </template>\n";
        $content .= "    </view>\n";
        $content .= "</template>\n";

        $content .= "<script lang=\"ts\" setup>\n";
        $content .= "   import useDiyStore from '@/stores/diy';\n";
        $content .= "   import { onMounted, nextTick, computed, ref,watch } from 'vue';\n";
        $content .= "   import Sortable from 'sortablejs';\n";
        $content .= "   import { range } from 'lodash-es';\n";

        $content .= "   const props = defineProps(['data','pullDownRefresh']);\n";
        $content .= "   const diyStore = useDiyStore();\n\n";

        $content .= "   const data = computed(() => {\n";
        $content .= "       if (diyStore.mode == 'decorate') {\n";
        $content .= "           return diyStore;\n";
        $content .= "       } else {\n";
        $content .= "           return props.data;\n";
        $content .= "       }\n";
        $content .= "   })\n\n";

        $content .= "   onMounted(() => {\n";
        $content .= "       // #ifdef H5\n";
        $content .= "       if (diyStore.mode == 'decorate') {\n";
        $content .= "           var el = document.getElementById('componentList');\n";
        $content .= "           const sortable = Sortable.create(el, {\n";
        $content .= "               group: 'draggable-element',\n";
        $content .= "               animation: 200,\n";
        $content .= "               // 结束拖拽\n";
        $content .= "               onEnd: event => {\n";
        $content .= "                   let temp = diyStore.value[event.oldIndex!];\n";
        $content .= "                   diyStore.value.splice(event.oldIndex!, 1);\n";
        $content .= "                   diyStore.value.splice(event.newIndex!, 0, temp);\n\n";

        $content .= "                   nextTick(() => {\n";
        $content .= "                       sortable.sort(\n";
        $content .= "                           range(diyStore.value.length).map(value => {\n";
        $content .= "                               return value.toString();\n";
        $content .= "                           })\n";
        $content .= "                       );\n\n";

        $content .= "                       diyStore.postMessage(event.newIndex, diyStore.value[event.newIndex]);\n";
        $content .= "                   });\n";
        $content .= "               }\n";
        $content .= "           });\n";
        $content .= "       }\n";
        $content .= "       // #endif\n";
        $content .= "   });\n";

        $content .= "</script>\n";

        $content .= "<style lang=\"scss\" scoped>\n";
        $content .= "   @import './index.scss';\n";
        $content .= "</style>\n";

        return file_put_contents($compile_path . str_replace('/', DIRECTORY_SEPARATOR, 'components/diy/group/index.vue'), $content);
    }

    /**
     * 编译 fixed-group 固定模板组件代码文件
     * @param $compile_path
     * @return false|int
     */
    public function compileFixedComponentsCode($compile_path)
    {
        $content = "<template>\n";
        $content .= "    <view class=\"fixed-group\">\n";

        $root_path = $compile_path . str_replace('/', DIRECTORY_SEPARATOR, 'components/fixed'); // 扩展组件根目录
        $file_arr = getFileMap($root_path);

        if (!empty($file_arr)) {
            foreach ($file_arr as $ck => $cv) {
                if (str_contains($cv, 'index.vue')) {

                    $path = str_replace($root_path . '/', '', $ck);
                    $path = str_replace('/index.vue', '', $path);
                    if ($path == 'group') {
                        continue;
                    }

                    $file_name = 'fixed-' . $path;

                    $content .= "        <template v-if=\"props.data.global.component == '{$path}'\">\n";
                    $content .= "            <$file_name :data=\"props.data\" :pullDownRefresh=\"props.pullDownRefresh\"></$file_name>\n";
                    $content .= "        </template>\n";
                }
            }
        }

        $content .= "    </view>\n";
        $content .= "</template>\n";

        $content .= "<script lang=\"ts\" setup>\n";
        $content .= "   const props = defineProps(['data','pullDownRefresh']);\n";
        $content .= "</script>\n";

        $content .= "<style lang=\"scss\" scoped>\n";
        $content .= "   @import './index.scss';\n";
        $content .= "</style>\n";

        return file_put_contents($compile_path . str_replace('/', DIRECTORY_SEPARATOR, 'components/fixed/group/index.vue'), $content);
    }

    /**
     * 编译 pages.json 页面路由代码文件，// {{PAGE}}
     * @param $compile_path
     * @return bool|int|void
     */
    public function installPageCode($compile_path)
    {
        if (!file_exists($this->geAddonPackagePath($this->addon) . 'uni-app-pages.php')) return;

        $uniapp_pages = require $this->geAddonPackagePath($this->addon) . 'uni-app-pages.php';

        if (empty($uniapp_pages['pages'])) {
            return;
        }

        $addon = strtoupper($this->addon);

        $content = @file_get_contents($compile_path . "pages.json");


        $page_begin = $addon . '_PAGE_BEGIN';
        $page_end = $addon . '_PAGE_END';

        // 清除插件页面路由代码块
        $pattern = "/\s+\/\/ {$page_begin}[\S\s]+\/\/ {$page_end}(\n,)?/";
        $content = preg_replace($pattern, '', $content);

        $uniapp_pages['pages'] = str_replace('PAGE_BEGIN', $page_begin, $uniapp_pages['pages']);
        $uniapp_pages['pages'] = str_replace('PAGE_END', $page_end, $uniapp_pages['pages']);

        $replacement = ",// {{PAGE}}\n";
        $replacement .= $uniapp_pages['pages'] . "\n,";

        $page_begin_matches_count = preg_match_all('/PAGE_BEGIN/', $content . $replacement, $page_begin_matches);

        // 如果存在多个插件，要在插件前面加上逗号分割
        if ($page_begin_matches_count > 0) {
            $content = str_replace(',// {{PAGE}}', '// {{PAGE}}', $content);
        }

        $content = str_replace('// {{PAGE}}', $replacement, $content);

        // 清除最后一个逗号
        $content = preg_replace('/PAGE_END\n,\s+\],/', "PAGE_END\n],", $content);

        // 找到页面路由文件 pages.json，写入内容
        return file_put_contents($compile_path . "pages.json", $content);
    }

    /**
     * 编译 pages.json 页面路由代码文件
     * @param $compile_path
     * @return bool|int|void
     */
    public function uninstallPageCode($compile_path)
    {
        if (!file_exists($this->geAddonPackagePath($this->addon) . 'uni-app-pages.php')) return;

        $uniapp_pages = require $this->geAddonPackagePath($this->addon) . 'uni-app-pages.php';

        if (empty($uniapp_pages['pages'])) {
            return;
        }

        $addon = strtoupper($this->addon);

        $content = @file_get_contents($compile_path . "pages.json");

        $page_begin = $addon . '_PAGE_BEGIN';
        $page_end = $addon . '_PAGE_END';

        $uniapp_pages['pages'] = str_replace('PAGE_BEGIN', $page_begin, $uniapp_pages['pages']);
        $uniapp_pages['pages'] = str_replace('PAGE_END', $page_end, $uniapp_pages['pages']);

        // 清除插件页面路由代码块
        $pattern = "/\s+\/\/ {$page_begin}[\S\s]+\/\/ {$page_end}(\n,)?/";
        $content = preg_replace($pattern, '', $content);

        $page_begin_matches_count = preg_match_all('/PAGE_BEGIN/', $content, $page_begin_matches);

        //  如果没有页面，清除最后一个逗号
        if ($page_begin_matches_count == 0) {
            $content = str_replace(',// {{PAGE}}', '// {{PAGE}}', $content);
        }

        // 清除最后一个逗号
        $content = preg_replace('/PAGE_END\n,\s+\],/', "PAGE_END\n],", $content);

        return file_put_contents($compile_path . "pages.json", $content);

    }

}