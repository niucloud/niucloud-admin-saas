<template>
    <el-aside :class="['layout-aside w-full ease-in duration-200', { 'bright': !dark }]">
        <div v-if="currHeadMenuName == 'setting_manage'" class="pt-[20px] pl-[80px] pr-[70px]">
            <div class="flex flex-wrap items-center">
                <template v-for="(item,index) in settingMenu" :key="index">
                    <div
                        v-if="item.meta.show"
                        @click="settingMenuFn(item)"
                        :class="['flex items-center h-[32px] border-[1px] border-solid my-[3px] border-[#E0E0E0] rounded-full px-[10px] mr-[24px] cursor-pointer bg-[#f8f8f8] hover:bg-[#fff]',{'text-[#fff] !bg-[#000] border-[#000]': menuActive == item.name || menuTwoActive && menuTwoActive == item.name}]">
                        <icon v-if="item.meta.icon" :name="item.meta.icon" class="!w-auto mr-[4px] !leading-[14px]" size="14px" :title="item.meta.title"/>
                        <span class="text-[14px]">{{ item.meta.title }}</span>
                    </div>
                </template>
            </div>
            <el-tabs v-model="menuActive" class="mt-[20px]" @tab-click="settingHandleClick" v-if="settingTwoMenu.length">
                <template v-for="(item,index) in settingTwoMenu" :key="index">
                    <el-tab-pane :label="item.meta.title" :name="item.name" :path="item.path" v-if="item.meta.show" @click="settingMenuFn(item)"></el-tab-pane>
                </template>
            </el-tabs>
        </div>

        <div class="flex flex-wrap items-center pt-[20px] pl-[80px] pr-[70px]" v-if="currHeadMenuName == 'site_manage'">
            <template v-for="(item,index) in siteMenu" :key="index">
                <div
                    v-if="item.meta.show"
                    @click="siteMenuFn(item)"
                    :class="['flex items-center h-[32px] border-[1px] border-solid my-[3px] border-[#E0E0E0] rounded-full px-[10px] mr-[24px] cursor-pointer bg-[#f8f8f8] hover:bg-[#fff]',{'text-[#fff] !bg-[#000] border-[#000]': menuActive == item.name || menuTwoActive && menuTwoActive == item.name}]">
                    <icon v-if="item.meta.icon" :name="item.meta.icon" class="!w-auto mr-[4px] !leading-[14px]" size="14px" :title="item.meta.title"/>
                    <span class="text-[14px]">{{ item.meta.title }}</span>
                </div>
            </template>
        </div>

        <div class="pt-[20px] pl-[80px] pr-[70px]" v-if="currHeadMenuName == 'tool'">
            <div class="flex flex-wrap items-center">
                 <template v-for="(item,index) in appToolsMenu" :key="index">
                    <div
                        v-if="item.meta.show"
                        @click="toolsMenuFn(item)"
                        :class="['flex items-center h-[32px] border-[1px] border-solid my-[3px] border-[#E0E0E0] rounded-full px-[10px] mr-[24px] cursor-pointer bg-[#f8f8f8] hover:bg-[#fff]',{'text-[#fff] !bg-[#000] border-[#000]': menuActive == item.name || menuTwoActive && menuTwoActive == item.name}]">
                        <icon v-if="item.meta.icon" :name="item.meta.icon" class="!w-auto mr-[4px] !leading-[14px]" size="14px" :title="item.meta.title"/>
                        <span class="text-[14px]">{{ item.meta.title }}</span>
                    </div>
                </template>
            </div>
            <el-tabs v-model="menuActive" class="mt-[20px]" @tab-click="toolsHandleClick" v-if="appToolsTwoMenu.length">
                <template v-for="(item,index) in appToolsTwoMenu" :key="index">
                    <el-tab-pane :label="item.meta.title" :name="item.name" :path="item.path" v-if="item.meta.show" @click="settingMenuFn(item)"></el-tab-pane>
                </template>
            </el-tabs>
        </div>
    </el-aside>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import side from './side.vue'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import storage from '@/utils/storage'
import { CollectionTag } from '@element-plus/icons-vue'

const userStore = useUserStore()
const systemStore = useSystemStore()

const dark = computed(() => {
    return systemStore.dark
})

const currHeadMenuName = computed(()=>{
    return systemStore.currHeadMenuName
})
let menuData = JSON.parse(JSON.stringify(userStore.routers));

const route = useRoute()
const router = useRouter()
const menuActive = computed(() => {
    return String(route.name)
})
const menuTwoActive = ref('')
// 控制高度
const emit = defineEmits(['complete'])
watch(route, () => {
    systemStore.$patch(state => {
        state.menuDrawer = false
    })
    resetFn();

    let currMenuName = '';
    menuData.forEach((item,index) => {
        if(item.name == route.name){
            currMenuName = item.name;
        }else if(item.children && item.children.length){
            item.children.forEach((twoItem, twoIndex) => {
                if(twoItem.name == route.name){
                    currMenuName = item.name;
                }else if(twoItem.children && twoItem.children.length){
                    twoItem.children.forEach((threeItem, threeIndex) => {
                        if(threeItem.name == route.name){
                            currMenuName = item.name;
                            // 刷新后选中三级菜单
                            if(currMenuName == 'setting_manage' && !menuTwoActive.value){
                                menuTwoActive.value = twoItem.name;
                                settingTwoMenu.value = twoItem.children;
                            }
                            if(currMenuName == 'tool' && !menuTwoActive.value){
                                menuTwoActive.value = twoItem.name;
                                appToolsTwoMenu.value = twoItem.children;
                            }
                                
                        }   
                    });
                }       
            });
        }
    });
    
    // 控制页面内容高度
    emit('complete')

    // 设置菜单
    let menuIndexArr = {setting_manage: 'setting_manage', site_manage: 'site_manage', tool:'tool', app_auth:'tool'};
    if(Object.keys(menuIndexArr).indexOf(currMenuName) != -1){
        systemStore.setHeadMenu(menuIndexArr[currMenuName]);
        return false;
    }
    systemStore.setHeadMenu(''); 
})


let settingMenu = ref([]);
let settingTwoMenu = ref([]);
let siteMenu = ref([]);
let appToolsMenu = ref([]);
let appToolsTwoMenu = ref([]);

userStore.routers.forEach((item, index) => {
    item.meta.class = 1
    if (item.children) {
        item.children.forEach((subItem, subIndex) => {
            subItem.meta.class = 2
            if (subItem.children) {
                subItem.children.forEach((threeItem, threeIndex) => {
                    threeItem.meta.class = 3
                })
            }
        })
    }
    // 控制台
    if(item.name == 'setting_manage'){
        settingMenu.value = item.children;
    }

    // 站点
    if(item.name == 'site_manage'){
        siteMenu.value = item.children;
    }

    // 开发
    if(item.name == 'tool'){
        appToolsMenu.value = item.children;
    }
    
})

// 控制台跳转 start
const settingMenuFn = (data)=>{
    let obj =  '/setting/';
    menuTwoActive.value = '';
    settingTwoMenu.value = [];

    if(data.children){
        menuTwoActive.value = data.name;
        settingTwoMenu.value = data.children;
        obj = obj + data.path + '/' + data.children[0].path;
        router.push(obj)
    }else{
        obj = obj + data.path;
        router.push(obj)
    }
}

const settingHandleClick = (tab, event: Event) => {
    let obj =  '/setting/';
    
    settingMenu.value.forEach((item,index)=>{
        if(item.children && item.children.length){
            item.children.forEach((subItem,subIndex) => {
                if(subItem.name == tab.props.name){
                    obj = obj + item.path + '/' + subItem.path;
                    router.push(obj)
                }
            });     
        }
    })
}
// 控制台跳转 end

// 站点跳转 start
const siteMenuFn = (data)=>{
    let obj = '/admin/site/';
    menuTwoActive.value = '';

    if(data.children){
        menuTwoActive.value = data.name;
        obj = obj + data.path + '/' + data.children[0].path;
        router.push(obj)
    }else{
        obj = obj + data.path;
        router.push(obj)
    }
}
// 站点跳转 end

// 开发跳转 start
const toolsMenuFn = (data)=>{
    let obj = '/admin/tools/';
    menuTwoActive.value = '';
    appToolsTwoMenu.value = [];
    
    if(data.children){
        menuTwoActive.value = data.name;
        appToolsTwoMenu.value = data.children;
        obj = obj + data.path + '/' + data.children[0].path;
        router.push(obj)
    }else{
        obj = obj + data.path;
        router.push(obj)
    }
}

const toolsHandleClick = (tab, event: Event) => {
    let obj =  '/tools/';
    
    appToolsMenu.value.forEach((item,index)=>{
        if(item.children && item.children.length){
            item.children.forEach((subItem,subIndex) => {
                if(subItem.name == tab.props.name){
                    obj = obj + item.path + '/' + subItem.path;
                    router.push(obj)
                }
            });     
        }
    })
}
// 开发跳转 end

// 重置变量
const resetFn = ()=>{
    menuTwoActive.value= '';
    settingTwoMenu.value = [];
}

// 跳转链接
const toLink = (path) => {
    router.push({path})
}
</script>

<style lang="scss">
.layout-aside {
    &.bright {
        li {
            background-color: #F5F7F9;

            &.is-active:not(.is-opened) {
                position: relative;
                color: #333;
                background-color: #fff;

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 2px;
                    background-color: var(--el-menu-active-color);
                }
            }
        }
    }

    .menu-item:hover{
        color: var(--el-color-primary);
    }
}
.text-color{
    color: var(--el-color-primary);
}
</style>
