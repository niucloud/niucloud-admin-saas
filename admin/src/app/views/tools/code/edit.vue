<template>
    <div class="main-container mb-80" v-loading="loading">
        <div class="detail-head !mb-[10px]">
            <div class="left" @click="router.push({ path: '/tools/code' })">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{ t('returnToPreviousPage') }}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane :label="t('basicSettings')" name="basicSettings">
                    <el-form :model="formData" label-width="70px" class="page-form">
                        <el-form-item :label="t('tableName')">
                            <el-input v-model="formData.table_name" disabled :placeholder="t('tableNamePlaceholder')"
                                class="input-width" maxlength="64" />
                        </el-form-item>
                        <el-form-item :label="t('tableContent')">
                            <el-input v-model="formData.table_content" clearable :placeholder="t('tableContentPlaceholder')"
                                class="input-width" maxlength="64" />
                        </el-form-item>
                        <el-form-item :label="t('addon')">
                            <el-select class="input-width" :placeholder="t('addonPlaceholder1')"
                                v-model="formData.addon_name" filterable remote clearable :remote-method="getAddonDevelopFn"
                                @change="addonChange">
                                <el-option :label="item.title" :value="item.key" v-for="item in addonList"
                                    :key="item.key" />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="t('moduleName')">
                            <div>
                                <el-input v-model="formData.module_name" clearable :placeholder="t('moduleNamePlaceholder')"
                                    class="input-width" />
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">
                                    生成代码所属功能模块，对应路由名称，例如会员模块，充值模块，订单模块等</p>
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">
                                    命名规范，小写，多个单词使用下划线连接,例如: member，article_category</p>
                            </div>

                        </el-form-item>
                        <el-form-item :label="t('className')">
                            <div>
                                <el-input v-model="formData.class_name" clearable :placeholder="t('classNamePlaceholder')"
                                    class="input-width" />
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">
                                    生成代码所属文件名称，controller，model，service，等类型文件名</p>
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">
                                    命名规范，小写，多个单词使用下划线连接,例如: article_category</p>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="t('fieldSettings')" name="fieldSettings">
                    <el-table :data="formData.table_column" size="large" ref="tableRef" :key="toggleIndex">
                        <el-table-column align="center" label="操作" width="80">
                            <template #default>
                                <i class="iconfont icontuodong vues-rank cursor-move"></i>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('columnName')" prop="column_name" min-width="130px" />
                        <el-table-column :label="t('columnComment')" prop="" min-width="220px">
                            <template #default="{ row }">
                                <el-input class="" v-model="row.column_comment"
                                    :placeholder="t('columnCommentPlaceholder')" />
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('columnType')" prop="column_type" width="100px" />
                        <el-table-column :label="t('isPk')" prop="" align="center" width="65px">
                            <template #default="{ row }">
                                <el-checkbox v-model="row.is_pk" disabled :true-label="1" :false-label="0" />
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('isRequired')" prop="" align="center" width="65px">
                            <template #default="{ row }">
                                <el-checkbox v-model="row.is_required" :true-label="1" :false-label="0" />
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('isInsert')" prop="" align="center" width="65px">
                            <template #default="{ row }">
                                <el-checkbox v-model="row.is_insert" :true-label="1" :false-label="0" />
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('isUpdate')" prop="" align="center" width="65px">
                            <template #default="{ row }">
                                <el-checkbox v-model="row.is_update" :true-label="1" :false-label="0" />
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('isLists')" prop="" align="center" width="65px">
                            <template #default="{ row }">
                                <el-checkbox v-model="row.is_lists" :true-label="1" :false-label="0" />
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('isSearch')" prop="" align="center" width="65px">
                            <template #default="{ row }">
                                <el-checkbox v-model="row.is_search" :true-label="1" :false-label="0" />
                            </template>
                        </el-table-column>
                        <!-- <el-table-column :label="t('isQuery')" prop="" width="80px">
                        <template #default="{ row }">
                            <el-checkbox v-model="row.is_query" :true-label="1" :false-label="0" size="large" />
                        </template>
                    </el-table-column> -->
                        <el-table-column :label="t('queryType')" prop="" min-width="170px">
                            <template #default="{ row }">
                                <div class="flex items-center">
                                    <el-select class="" v-if="row.is_search" :placeholder="t('selectPlaceholder')"
                                        v-model="row.query_type">
                                        <el-option :label="item" :value="item" v-for="(item, index) in queryType"
                                            :key="index" />
                                    </el-select>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('formType')" prop="" min-width="225px">
                            <template #default="{ row, $index }">
                                <el-select class="w-[146px]" :placeholder="t('selectPlaceholder')" v-model="row.view_type"
                                    @change="viewTypeBtn(row, $index)">
                                    <el-option :label="item.label" :value="item.value" v-for="(item, index) in viewType"
                                        :key="index" />
                                </el-select>
                                <el-button class="ml-[10px]" v-if="['select', 'radio', 'checkbox'].includes(row.view_type)"
                                    type="primary" link @click="viewTypeBtn(row, $index)">{{ t('setUp')
                                    }}</el-button>
                                <el-button class="ml-[10px]" v-if="row.view_type === 'number'" type="primary" link
                                    @click="validatorBtn(row, $index)">{{ t('setUp')
                                    }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column :label="t('verifyType')" prop="" min-width="260px">
                            <template #default="{ row, $index }">
                                <div class="flex items-center">
                                    <el-select class="w-[196px]" :placeholder="t('selectPlaceholder')"
                                        v-model="row.validate_type" @change="validatorBtn(row, $index)"
                                        :disabled="!['input', 'textarea'].includes(row.view_type)">
                                        <template v-for="(item, index) in verifyType" :key="index">
                                            <el-option v-if="item.value === 'max'" :value="item.value" :label="`最大输入字符`" />
                                            <el-option v-else-if="item.value === 'min'" :value="item.value"
                                                :label="`最小输入字符`" />
                                            <el-option v-else-if="item.value === 'between'" :value="item.value"
                                                :label="`输入字符区间`" />
                                            <el-option v-else :label="item.label" :value="item.value" />
                                        </template>
                                    </el-select>
                                    <el-button class="ml-[10px]"
                                        v-if="['max', 'min', 'between'].includes(row.validate_type)" type="primary" link
                                        @click="validatorBtn(row, $index)">{{ t('setUp')
                                        }}</el-button>
                                </div>

                            </template>
                        </el-table-column>
                        <!-- <el-table-column :label="t('formValidation')" prop="" min-width="170px">
                            <template #default="{ row }">
                                <el-select :placeholder="t('selectPlaceholder')" v-model="row.view_type">
                                    <el-option :label="item.label" :value="item.value" v-for="(item, index) in viewType"
                                        :key="index" />
                                </el-select>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="t('generationSettings')" name="generationSettings">
                    <el-form :model="formData" class="page-form" label-width="140px" ref="formRef" :rules="rules">
                        <el-form-item :label="t('deleteType')">
                            <div>
                                <el-radio-group v-model="formData.is_delete" @change="deleteTypeChange">
                                    <el-radio :label="0">{{ t('physicalDeletion') }}</el-radio>
                                    <el-radio :label="1">{{ t('softDeletion') }}</el-radio>
                                </el-radio-group>
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">
                                    物理删除：从表中把记录移除。软删除：通过标识使得这条记录在系统逻辑层面上不可见</p>

                            </div>

                        </el-form-item>
                        <el-form-item prop="delete_column_name" :label="t('deleteField')" v-if="formData.is_delete">
                            <div>
                                <el-select class="input-width" :placeholder="t('deleteFieldPlaceholder')"
                                    v-model="formData.delete_column_name">
                                    <el-option :label="`${item.column_name}:${item.column_comment}`"
                                        :value="item.column_name" v-for="(item, index) in formData.table_column "
                                        :key="index" />
                                </el-select>
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">
                                    软删除字段需为int类型，并且默认值为0</p>
                            </div>

                        </el-form-item>

                        <el-form-item :label="t('editType')">
                            <div>
                                <el-radio-group v-model="formData.edit_type" :placeholder="t('editTypePlaceholder')">
                                    <el-radio :label="1">{{ t('popup') }}</el-radio>
                                    <el-radio :label="2">{{ t('page') }}</el-radio>
                                </el-radio-group>
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">弹出：弹出框编辑。新页面：跳转页面编辑。</p>
                            </div>
                        </el-form-item>
                        <el-form-item :label="t('orderColumnName')">
                            <div>
                                <el-select class="input-width" :placeholder="t('orderColumnNamePlaceholder')"
                                    v-model="formData.order_column_name" clearable @change="orderColumnNameChange">
                                    <el-option :label="`${item.column_name}:${item.column_comment}`"
                                        :value="item.column_name" v-for="(item, index) in formData.table_column "
                                        :key="index" />
                                </el-select>
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">列表排序规则字段。</p>
                            </div>

                        </el-form-item>
                        <el-form-item :label="t('orderType')" v-if="formData.order_column_name">
                            <div>
                                <el-select class="input-width" :placeholder="t('orderTypePlaceholder')"
                                    v-model="formData.order_type" >
                                    <el-option label="正序 asc" :value="1" />
                                    <el-option label="倒序 desc" :value="2" />
                                </el-select>
                                <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">列表排序规则。</p>
                            </div>

                        </el-form-item>
                        <el-form-item :label="t('menuType')">
                            <!-- <div>
                                <el-radio-group v-model="formData.parent_menu">
                                    <el-radio :label="0">{{ t('manualAddition') }}</el-radio>
                                    <el-radio :label="1">{{ t('autoBuild') }}</el-radio>
                                </el-radio-group>
                            <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">自动构建：自动执行生成菜单sql。手动添加：自行添加菜单。</p>
                            </div> -->
                            <el-tree-select class="input-width" v-if="formData.addon_name != ''" clearable
                                            v-model="formData.parent_menu" :props="{ label: 'menu_name', value: 'menu_key' }"
                                :data="addonMenuList" check-strictly :render-after-expand="false" />
                            <el-tree-select class="input-width" v-else v-model="formData.parent_menu" clearable
                                            :props="{ label: 'menu_name', value: 'menu_key' }" :data="sysMenuList" check-strictly
                                :render-after-expand="false" />
                        </el-form-item>
                        <!-- <el-form-item :label="t('controller')">
                            <el-input v-model="controller" disabled class="input-width" />
                        </el-form-item>
                        <el-form-item :label="t('dataModel')">
                            <el-input v-model="dataModel" disabled class="input-width" />
                        </el-form-item>
                        <el-form-item :label="t('validator')">
                            <el-input v-model="validator" disabled class="input-width" />
                        </el-form-item>
                        <el-form-item :label="t('webView')">
                            <el-input v-model="webView" disabled class="input-width" />
                        </el-form-item>
                        <el-form-item :label="t('routerView')">
                            <el-input v-model="routerView" disabled class="input-width" />
                        </el-form-item> -->
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="t('associatedConfiguration')" name="associatedConfiguration">
                    <div class="mb-[20px]">
                        <el-button type="primary" class="w-[100px]" @click="addEvent(null, -1)">{{ t('insertAssociated')
                        }}</el-button>
                    </div>
                    <el-table :data="formData.relations" size="large">
                        <el-table-column :label="t('associatedType')" prop="type" min-width="130px" />
                        <el-table-column :label="t('associatedName')" prop="name" min-width="130px" />
                        <el-table-column :label="t('addons')" prop="addon" min-width="130px" />
                        <el-table-column :label="t('associatedModel')" prop="model" min-width="130px" />
                        <el-table-column :label="t('localKey')" prop="local_key" min-width="130px" />
                        <el-table-column :label="t('foreignKey')" prop="foreign_key" min-width="130px" />
                        <el-table-column :label="t('operation')" align="right" min-width="130px">
                            <template #default="{ row, $index }">
                                <el-button type="primary" link @click="addEvent(row, $index)">{{ t('edit') }}</el-button>
                                <el-button type="primary" link @click="deleteEvent($index)">{{ t('delete')
                                }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
    <edit-associated ref="editDialog" :table_name="formData.table_name" @complete="complete" />
    <edit-view-type ref="editViewTypeRef" @complete="completeViewType" />
    <edit-verify ref="editVerifyRef" @complete="completeVerify" />
    <div class="fixed-footer-wrap">
        <div class="fixed-footer">
            <el-button type="primary" @click="onSave(1)">{{ t('save') }}</el-button>
            <el-button type="primary" @click="onSave(3)">{{ t('saveAndSync') }}</el-button>
            <el-button type="primary" @click="onSave(2)">{{ t('saveAndDownload') }}</el-button>
            <el-button @click="back()">{{ t('cancel') }}</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { t } from '@/lang'
import { img } from '@/utils/common'
import { FormInstance, ElMessageBox, ElMessage } from 'element-plus'
import editAssociated from '@/app/views/tools/code/components/edit-associated.vue'
import editViewType from '@/app/views/tools/code/components/edit-view-type.vue'
import editVerify from '@/app/views/tools/code/components/edit-verify.vue'
import { getGenerateTableInfo, editGenerateTable, getAddonDevelop, generatorCheckFile, generateCreate } from '@/app/api/tools'
import { getMenuByTypeDir } from '@/app/api/sys'
import { useRoute, useRouter } from 'vue-router'
import Sortable from 'sortablejs'
import { useTemplateRefsList } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'

const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const id: number = parseInt(route.query.id || 0)

const loading = ref(true)
const tableRef = useTemplateRefsList<HTMLElement>()
const toggleIndex = ref(0)
const activeName = ref('basicSettings')
/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    table_name: '',
    table_content: '',
    module_name: '',
    class_name: '',
    edit_type: 1,
    table_column: [],
    editFiledIndex: 0
}
const queryType = ['=', '!=', '>', '>=', '<', '<=', 'LIKE', 'BETWEEN']
const viewType = [
    {
        label: t('formInput'),
        value: 'input'
    },
    {
        label: t('formTextarea'),
        value: 'textarea'
    },
    {
        label: t('formSelect'),
        value: 'select'
    },
    {
        label: t('formRadio'),
        value: 'radio'
    },
    {
        label: t('formCheckbox'),
        value: 'checkbox'
    },
    {
        label: t('formDateTime'),
        value: 'datetime'
    },
    {
        label: t('formImageSelect'),
        value: 'imageSelect'
    },
    {
        label: t('formEditor'),
        value: 'editor'
    },
    {
        label: t('formNumber'),
        value: 'number'
    }
]
const verifyType = [
    {
        label: '无需验证',
        value: ''
    },
    {
        label: t('mobileVerify'),
        value: 'mobile'
    },
    {
        label: t('numberVerify'),
        value: 'number'
    },
    {
        label: t('idCardVerify'),
        value: 'idCard'
    },
    {
        label: t('emailVerify'),
        value: 'email'
    },
    {
        label: '',
        value: 'max'
    },
    {
        label: '',
        value: 'min'
    },
    {
        label: '',
        value: 'between'
    }
]

const addonList = ref<Array<any>>([])
// 获取插件远程搜索
const getAddonDevelopFn = (search: string) => {
    getAddonDevelop({ search }).then(res => {
        addonList.value = res.data
        nextTick(() => {
            rowDrop()
        })
    })
}
// 拖拽排序
const rowDrop = () => {
    const tbody = tableRef.value.$el.querySelector(
        '.el-table__body-wrapper tbody'
    )
    Sortable.create(tbody, {
        handle: '.vues-rank',
        animation: 300,
        onEnd ({ newIndex, oldIndex }) {
            const tableData = formData.table_column
            const currRow = tableData.splice(oldIndex, 1)[0]
            tableData.splice(newIndex, 0, currRow)
            toggleIndex.value += 1
            nextTick(() => {
                rowDrop()
            })
        }
    })
}
onMounted(() => {
    getAddonDevelopFn('')
})
// 删除类型change
const deleteTypeChange = (val: any) => {
    formData.delete_column_name = val ? formData.table_column[formData.table_column.length - 1].column_name : ''
}
// 排序字段change
const orderColumnNameChange = (val: any) => {
    formData.order_type = val ? 1 : 0
}
const formData: Record<string, any> = reactive({ ...initialFormData })
const controller = computed(() => {
    return formData.addon_name ? `addon${formData.addon_name ? '\\' + formData.addon_name : ''}\\app\\adminapi\\controller${formData.module_name ? '\\' + formData.module_name : ''}${formData.class_name ? '\\' + formData.class_name : ''}` : `app\\adminapi\\controller${formData.module_name ? '\\' + formData.module_name : ''}${formData.class_name ? '\\' + formData.class_name : ''}`
})
const dataModel = computed(() => {
    return formData.addon_name ? `addon${formData.addon_name ? '\\' + formData.addon_name : ''}\\app\\model${formData.module_name ? '\\' + formData.module_name : ''}${formData.class_name ? '\\' + formData.class_name : ''}` : `app\\model${formData.module_name ? '\\' + formData.module_name : ''}${formData.class_name ? '\\' + formData.class_name : ''}`
})
const validator = computed(() => {
    return formData.addon_name ? `addon${formData.addon_name ? '\\' + formData.addon_name : ''}\\app\\validate${formData.module_name ? '\\' + formData.module_name : ''}${formData.class_name ? '\\' + formData.class_name : ''}` : `app\\validate${formData.module_name ? '\\' + formData.module_name : ''}${formData.class_name ? '\\' + formData.class_name : ''}`
})
const webView = computed(() => {
    return formData.addon_name ? `addon${formData.addon_name ? '\\' + formData.addon_name : ''}\\admin\\src` : 'admin\\src'
})
const routerView = computed(() => {
    return formData.addon_name ? `addon${formData.addon_name ? '\\' + formData.addon_name : ''}\\app\\adminapi\\route${formData.module_name ? '\\' + formData.module_name : ''}` : `app\\adminapi\\route${formData.module_name ? '\\' + formData.module_name : ''}`
})
const setFormData = async (id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getGenerateTableInfo(id)).data
    Object.keys(data).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })
    formData.table_column.forEach((el:any) => {
        el.betweenMin = cloneDeep(el.min_number)
        el.betweenMax = cloneDeep(el.max_number)
    })
    if (formData.addon_name != '') getAddonMenuFn(formData.addon_name)
    loading.value = false
}
if (id) setFormData(id)

const formRef = ref<FormInstance>()

const sysMenuList = ref<Array<any>>([])
const addonMenuList = ref<Array<any>>([])
// 获取系统菜单列表
const getSystemMenuFn = async () => {
    const { data } = await getMenuByTypeDir()
    sysMenuList.value = [{ menu_name: '顶级', menu_key: '' }]
    sysMenuList.value.push(...data)
}
getSystemMenuFn()
// 获取系统应用菜单列表
const getAddonMenuFn = async (key: any) => {
    const { data } = await getMenuByTypeDir(key)
    addonMenuList.value = data
}
// 选择插件
const addonChange = async (val: any) => {
    formData.parent_menu = ''
    if (val != '') {
        await getAddonMenuFn(val)
        if (addonMenuList.value[0]) formData.parent_menu = addonMenuList.value[0].menu_key
    }
}
const associatedIndex = ref(0)
const editDialog = ref()
// 添加编辑关联设置

const addEvent = (val: any, index: number) => {
    associatedIndex.value = index
    editDialog.value.setFormData(val)
}
const complete = (row: any) => {
    if (associatedIndex.value != -1) {
        formData.relations.splice(associatedIndex.value, 1, row)
    } else {
        formData.relations.unshift(row)
    }
}
// 删除关联配置
const deleteEvent = (index: number) => {
    formData.relations.splice(index, 1)
}
const onSave = async (code: number) => {
    const data = cloneDeep(formData)
    // if (data.table_column.some(el => { return ['select', 'radio', 'checkbox'].includes(el.view_type) && el.dict_type == '' })) {
    //     // ElMessage({
    //     //     type: 'error',
    //     //     message: t('dictTypePlaceholder'),
    //     // })
    //     // return false
    // }

    data.table_column = JSON.stringify(data.table_column.map((el:any) => {
        if (!el.is_search) el.query_type = ''
        if (el.validate_type === 'between' || el.view_type === 'number') {
            el.max_number = el.betweenMax
            el.min_number = el.betweenMin
        }
        if (!['select', 'radio', 'checkbox'].includes(el.view_type)) el.dict_type = ''
        return el
    }))

    data.relations = JSON.stringify(data.relations)
    loading.value = true
    editGenerateTable(data).then((res: any) => {
        if (code === 3) {
            generatorCheckFileFn()
        } else if (code === 2) {
            generateCreateFn(code)
        } else {
            loading.value = false
            ElMessage({
                type: 'success',
                message: '操作成功'
            })
            setTimeout(() => {
                window.codeActiveName = 'codeList'
                back()
            }, 650)
        }
    }).catch(() => {
        loading.value = false
    })
}
/**
 * 同步校验
 */
const generatorCheckFileFn = (() => {
    generatorCheckFile({ id: formData.id }).then(res => {
        loading.value = false
        ElMessageBox.confirm(
            res.msg != '2' ? t('saveAndSyncText') : t('saveAndSyncText1'),
            t('warning'),
            {
                confirmButtonText: t('confirm'),
                cancelButtonText: t('cancel')
            }
        )
            .then(() => {
                loading.value = true
                generateCreateFn(3)
            })
            .catch(() => { })
    }).catch(() => {
        loading.value = false
    })
})
/**
 * 同步or下载
 */
const generateCreateFn = (generate_type: any) => {
    generateCreate({ id: formData.id, generate_type }).then(res => {
        loading.value = false
        ElMessage({
            type: 'success',
            message: '操作成功'
        })
        window.open(img(res.data.file), '_blank')
        setTimeout(() => {
            window.codeActiveName = 'codeList'
            back()
        }, 650)
    }).catch(() => {
        loading.value = false
    })
}
const rowIndex = ref(0)
const editVerifyRef = ref(null)
const editViewTypeRef = ref(null)
/**
 * 打开最大最小值设置
 */

const validatorBtn = (row: any, index: number) => {
    if (['max', 'min', 'between'].includes(row.validate_type) || row.view_type === 'number') {
        rowIndex.value = index
        editVerifyRef.value?.setFormData(row)
    }
}
const completeVerify = (row: any) => {
    formData.table_column.splice(rowIndex.value, 1, row)
}
const viewTypeBtn = (row: any, index: number) => {
    if (!['input', 'textarea'].includes(row.view_type)) row.validate_type = ''
    if (['select', 'radio', 'checkbox'].includes(row.view_type)) {
        rowIndex.value = index
        editViewTypeRef.value?.setFormData(row)
    } else if (row.view_type === 'number') {
        validatorBtn(row, index)
    }
}
const completeViewType = (row: any) => {
    formData.table_column.splice(rowIndex.value, 1, row)
}
const back = () => {
    router.push({ path: '/tools/code' })
}
</script>

<style lang="scss" scoped>
.dashed-border {
    border-color: var(--el-border-color-light);

    &:hover {
        border-color: var(--el-color-primary);
    }

    &.activate {
        border-color: var(--el-color-primary);
    }
}

.icon-btn {
    background-color: var(--el-color-primary);
}

:deep(.el-card__body) {
    padding-left: 30px;
}
</style>
