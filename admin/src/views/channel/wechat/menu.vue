<template>
    <div class="main-container">
        <div class="flex" v-loading="loading">
            <div class="preview-wrap w-[300px] h-[550px] mr-[16px] bg-overlay rounded-md flex flex-col justify-between">
                <div class="head w-full h-[70px]"></div>

                <div class="menu-list h-[70px] flex border-t border-color">
                    <div class="py-[15px]">
                        <div class="flex h-full px-[10px] items-center justify-center border-r border-color">
                            <icon name="iconfont-iconjianpan" size="20px" color="#b1b2b3" />
                        </div>
                    </div>
                    <div class="flex-1 flex w-0">
                        <div class="menu-item py-[15px] flex items-center justify-center cursor-pointer" :class="{ 'size-1': button.length == 1, 'size-2-3': button.length > 1, 'active': index == buttonIndex, 'curr': index == buttonIndex && subButtonIndex == -1 }"
                            v-for="(item, index) in button" :key="index" @click="selectButton(index)">
                            <div class="menu-name px-[10px] border-r border-color w-full leading-[40px] text-base truncate text-center">{{ item.name }}</div>
                            <div class="active-shade"></div>

                            <!-- 子菜单 -->
                            <div class="sub-menu-wrap w-full bg-overlay border border-color rounded">
                                <div class="menu-item h-[50px] p-[10px] border-b border-color flex items-center justify-center cursor-pointer"
                                    :class="{ 'curr': subIndex == subButtonIndex }"
                                    v-for="(subItem, subIndex) in item.sub_button" :key="subIndex"
                                    @click.stop="selectBubButton(index, subIndex)">
                                    <div class="menu-name w-full text-base truncate text-center">{{ subItem.name }}</div>
                                    <div class="active-shade"></div>
                                </div>
                                <!-- 添加子菜单 -->
                                <div class="add-menu flex items-center justify-center flex-1 cursor-pointer menu-item h-[50px]" v-show="!item.sub_button || item.sub_button.length < 5" @click.stop="addSubButton(index)">
                                    <icon name="element-Plus" />
                                </div>
                            </div>
                        </div>
                        <!-- 添加菜单 -->
                        <div class="add-menu flex items-center justify-center flex-1 cursor-pointer menu-item" v-show="button.length < 3" @click="addButton">
                            <icon name="element-Plus" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1">
                <el-card class="box-card !border-none h-auto" shadow="never">
                    <template v-if="button.length">

                        <div v-for="(item, index) in button" :key="index">
                            <div v-show="index == buttonIndex && subButtonIndex == -1">
                                <menu-form :data="item" @delete="deleteButton" :index="index" ref="formRef" />
                            </div>

                            <div v-for="(subItem, subIndex) in item.sub_button" :key="subIndex">
                                <div v-show="index == buttonIndex && subIndex == subButtonIndex">
                                    <menu-form :data="subItem" @delete="deleteButton" :index="index" :sub-index="subIndex" ref="formRef" />
                                </div>
                            </div>
                        </div>

                    </template>
                    <div v-else class="py-[20px] leading">尚未添加自定义菜单，点击左侧添加菜单为公众号创建菜单栏。</div>
                </el-card>
            </div>
        </div>
    </div>
    <div class="fixed-footer-wrap">
        <div class="fixed-footer">
            <el-button type="primary" :loading="loading" @click="save()">{{ t('save') }}</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getWechatMenu, editWechatMenu } from '@/api/wechat'
import menuForm from './components/menu-form.vue'

const loading = ref(true)
const button = ref<Record<string, any>[]>([])
const buttonIndex = ref<number>(0)
const subButtonIndex = ref<number>(-1)
const formRef = ref<Record<string, any>[] | null>(null)

/**
 * 获取公众号菜单配置
 */
getWechatMenu().then((res) => {
    button.value = res.data
    loading.value = false;
})

/**
 * 添加一级菜单
 */
const addButton = () => {
    button.value.push({
        name: '菜单名称',
        type: 'view',
        url: '',
        appid: '',
        pagepath: '',
        sub_button: []
    })
    selectButton(button.value.length - 1)
}

/**
 * 添加二级菜单
 * @param index
 */
const addSubButton = (index: number) => {
    !button.value[index].sub_button && (button.value[index].sub_button = [])
    button.value[index].sub_button.push({
        name: '子菜单名称',
        type: 'view',
        url: '',
        appid: '',
        pagepath: ''
    })
    selectBubButton(index, button.value[index].sub_button.length - 1)
}

/**
 * 选择一级菜单
 */
const selectButton = (index: number) => {
    buttonIndex.value = index
    subButtonIndex.value = -1
}

/**
 * 选择二级菜单
 * @param index
 * @param subIndex
 */
const selectBubButton = (index: number, subIndex: number) => {
    buttonIndex.value = index
    subButtonIndex.value = subIndex
}

/**
 * 删除菜单
 */
const deleteButton = () => {
    ElMessageBox.confirm(
        t('deleteMemuTips'),
        t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        if (subButtonIndex.value != -1) {
            button.value[buttonIndex.value].sub_button.splice(subButtonIndex.value, 1)
            subButtonIndex.value = button.value[buttonIndex.value].sub_button.length - 1
            // 如果子菜单被全部删除
            if (subButtonIndex.value == -1) {
                Object.assign(button.value[buttonIndex.value], {
                    type: 'view',
                    url: '',
                    appid: '',
                    pagepath: ''
                })
            }
        } else {
            button.value.splice(buttonIndex.value, 1)
            button.value.length && (buttonIndex.value = button.value.length - 1)
        }
    })
}

/**
 * 保存
 */
const save = async () => {
    if (!formRef.value || !formRef.value) {
        ElMessage.error(t('menusEmptyTips'))
        return
    }
    for (let i = 0; i < formRef?.value.length; i++) {
        const item = formRef.value[i]
        const validate = await item.validate()
        if (!validate) {
            buttonIndex.value = item.index
            subButtonIndex.value = item.subIndex
            break
        }
    }
    if (loading.value) return
    loading.value = true
    editWechatMenu({ button: button.value }).then(() => {
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.preview-wrap {
    .head {
        background: url('assets/images/wechat-menu-head-bg.png');
        background-size: cover;
    }

    .menu-item {
        position: relative;

        &.size-1 {
            width: 50%;
        }

        &.size-2-3 {
            width: 33.33%;
        }

        &:nth-child(3)>.menu-name {
            border-right: 0;
        }

        .active-shade {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 1px solid var(--el-color-primary);
            display: none;
            left: 0;
            top: 0;
        }

        &.curr {
            background: var(--el-color-primary-light-9);

            >.menu-name {
                color: var(--el-color-primary);
            }

            &>.active-shade {
                display: block;
            }
        }

        &.active {
            .sub-menu-wrap {
                display: block !important;
            }
        }
    }

    .sub-menu-wrap {
        display: none;
        position: absolute;
        top: 0;
        transform: translateY(calc(-100% - 15px));

        .menu-item:nth-child(5) {
            border-bottom: 0;
        }
    }
}

.dark {
    .preview-wrap .head {
        background: url('assets/images/wechat-menu-head-dark-bg.png');
        background-size: cover;
    }
}
</style>
