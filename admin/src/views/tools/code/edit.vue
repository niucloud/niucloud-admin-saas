<template>
    <div class="main-container mb-80" v-loading="loading">
        <div class="detail-head !mb-[10px]">
            <div class="left" @click="router.push({ path: '/admin/tools/code' })">
                <span class="iconfont iconxiangzuojiantou !text-xs"></span>
                <span class="ml-[1px]">{{t('returnToPreviousPage')}}</span>
            </div>
            <span class="adorn">|</span>
            <span class="right">{{ pageName }}</span>
        </div>
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('tableName')" prop="table_name">
                    <el-input v-model="formData.table_name" clearable :placeholder="t('tableNamePlaceholder')" class="input-width" maxlength="64" />
                </el-form-item>
                <el-form-item :label="t('tableContent')" prop="table_content">
                    <el-input v-model="formData.table_content" clearable :placeholder="t('tableContentPlaceholder')" class="input-width" maxlength="64" />
                </el-form-item>
                <el-form-item :label="t('moduleName')">
                    <el-input v-model="formData.module_name" clearable :placeholder="t('moduleNamePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('className')">
                    <el-input v-model="formData.class_name" clearable :placeholder="t('classNamePlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('editType')">
                    <el-radio-group v-model="formData.edit_type" :placeholder="t('editTypePlaceholder')">
                        <el-radio :label="1">{{ t('popup') }}</el-radio>
                        <el-radio :label="2">{{ t('page') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </el-card>

        <el-row class="flex mt-4" :gutter="15">
            <el-col :span="6">
                <el-card class="box-card !border-none p-none" shadow="never">
                    <el-divider content-position="left">{{ t('commentField') }}</el-divider>
                    <div class="flex flex-row m-0.5 cursor-pointer flex-wrap" :ref="tabsRefs.set">
                        <div class="border border-dashed border-gray-200 mt-2 text-sm mr-2 pt-1 pb-1 pl-1.5 pr-1.5 dashed-border design-field" v-for="(item, index) in fieldList.common" :key="index" :data-id="index">{{ item.column_comment }}</div>
                    </div>
                    <el-divider content-position="left">{{ t('baseField') }}</el-divider>
                    <div class="flex flex-row m-0.5 cursor-pointer flex-wrap" :ref="tabsRefs.set">
                        <div class="border border-dashed border-gray-200 mt-2 text-sm mr-2 pt-1 pb-1 pl-1.5 pr-1.5 dashed-border design-field" v-for="(item, index) in fieldList.base" :key="index" :data-id="index">{{ item.column_comment }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card !border-none p-none" shadow="never">
                    <div class="flex flex-col" ref="fieldBoxRef">
                        <div class="flex flex-row m-0.5 cursor-pointer justify-between items-center border border-dashed border-gray-200 dashed-border p-2 pt-1 pb-1" v-for="(item, index) in formData.table_column" :key="index" :data-id="index" @click="onActivateField(index)" :class="index === formData.editFiledIndex ? 'activate' : ''">
                            <div class="flex flex-row ">
                                <div class="flex flex-row design-field">
                                    <div class="text-xs text-gray-500 w-28 items-center	 justify-end flex">{{t('columnName') }}：</div>
                                    <el-input class="w-50 m-2" v-model="item.column_name" size="small" :placeholder="t('columnNamePlaceholder')" />
                                </div>
                                <div class="flex flex-row design-field">
                                    <div class="text-xs text-gray-500 w-28 items-center	justify-end	 flex">{{ t('columnComment') }}：</div>
                                    <el-input class="w-50 m-2" v-model="item.column_comment" size="small" :placeholder="t('columnCommentPlaceholder')" />
                                </div>
                                <div class="flex flex-row design-field flex-shrink-0 w-40">
                                    <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{t('columnType') }}：</div>
                                    <div class="w-50 m-2">{{ item.column_type }}</div>
                                </div>
                            </div>
                            <div @click="onDel(index)" class="items-center justify-center flex items-center flex-shrink-0 rounded-full bg-red-400 text-white icon-btn w-7 h-7">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </div>
                        </div>

                    </div>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card !border-none p-none" shadow="never" v-if="formData.table_column.length">

                    <el-divider content-position="left">{{ t('fieldAttribute') }}</el-divider>
                    <div>
                        <div class="flex flex-row">
                            <div class="text-xs text-gray-500 w-20 items-center	 justify-end flex">{{ t('columnName') }}：
                            </div>
                            <div>
                                <el-input class="w-50 m-2"
                                    v-model="formData.table_column[formData.editFiledIndex]['column_name']" size="small"
                                    :placeholder="t('columnNamePlaceholder')" />
                            </div>
                        </div>
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('columnComment') }}：
                            </div>
                            <div>
                                <el-input class="w-50 m-2" v-model="formData.table_column[formData.editFiledIndex]['column_comment']" size="small" :placeholder="t('columnCommentPlaceholder')" />
                            </div>
                        </div>

                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('isPk') }}：</div>
                            <div>
                                <el-radio-group class="ml-4" v-model="formData.table_column[formData.editFiledIndex]['is_pk']">
                                    <el-radio :label="1" size="large">{{ t('yes') }}</el-radio>
                                    <el-radio :label="0" size="large">{{ t('no') }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('viewType') }}：
                            </div>
                            <div>
                                <el-select class="m-2" :placeholder="t('selectPlaceholder')" size="small" v-model="formData.table_column[formData.editFiledIndex]['view_type']">
                                    <el-option :label="item.label" :value="item.value" v-for="(item, index) in viewType" :key="index" />
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <el-divider content-position="left">{{t('addAndEdit')}}</el-divider>
                    <div>
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('isInsert') }}：
                            </div>
                            <div>
                                <el-radio-group class="ml-4" v-model="formData.table_column[formData.editFiledIndex]['is_insert']">
                                    <el-radio :label="1" size="large">{{ t('yes') }}</el-radio>
                                    <el-radio :label="0" size="large">{{ t('no') }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('isUpdate') }}：
                            </div>
                            <div>
                                <el-radio-group class="ml-4" v-model="formData.table_column[formData.editFiledIndex]['is_update']">
                                    <el-radio :label="1" size="large">{{ t('yes') }}</el-radio>
                                    <el-radio :label="0" size="large">{{ t('no') }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('isRequired') }}：
                            </div>
                            <div>
                                <el-radio-group class="ml-4" v-model="formData.table_column[formData.editFiledIndex]['is_required']">
                                    <el-radio :label="1" size="large">{{ t('yes') }}</el-radio>
                                    <el-radio :label="0" size="large">{{ t('no') }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <el-divider content-position="left">{{t('listSearch')}}</el-divider>
                    <div>
                   
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('isLists') }}：</div>
                            <div>
                                <el-radio-group class="ml-4" v-model="formData.table_column[formData.editFiledIndex]['is_lists']">
                                    <el-radio :label="1" size="large">{{ t('yes') }}</el-radio>
                                    <el-radio :label="0" size="large">{{ t('no') }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('isSearch') }}：
                            </div>
                            <div>
                                <el-radio-group class="ml-4" v-model="formData.table_column[formData.editFiledIndex]['is_search']">
                                    <el-radio :label="1" size="large">{{ t('yes') }}</el-radio>
                                    <el-radio :label="0" size="large">{{ t('no') }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('isQuery') }}：</div>
                            <div>
                                <el-radio-group class="ml-4" v-model="formData.table_column[formData.editFiledIndex]['is_query']">
                                    <el-radio :label="1" size="large">{{ t('yes') }}</el-radio>
                                    <el-radio :label="0" size="large">{{ t('no') }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="flex flex-row ">
                            <div class="text-xs text-gray-500 w-20 items-center	justify-end	 flex">{{ t('queryType') }}：
                            </div>
                            <div>
                                <el-select class="m-2" :placeholder="t('selectPlaceholder')" size="small" v-model="formData.table_column[formData.editFiledIndex]['query_type']">
                                    <el-option :label="item" :value="item" v-for="(item, index) in queryType" :key="index" />
                                </el-select>
                            </div>
                        </div>

                    </div>

                </el-card>
            </el-col>
        </el-row>
    </div>

    <div class="fixed-footer-wrap">
        <div class="fixed-footer">
            <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
            <el-button @click="back()">{{ t('cancel') }}</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { t } from '@/lang'
import { FormInstance, ElNotification } from 'element-plus'
import { getGenerateTableInfo, editGenerateTable } from '@/api/tools'
import { useRoute, useRouter } from 'vue-router'
import Sortable, { SortableEvent } from 'sortablejs'
import { useTemplateRefsList } from '@vueuse/core'
import { cloneDeep, range } from 'lodash-es'
import useTabbarStore from '@/stores/modules/tabbar'
import useAppStore from '@/stores/modules/app'

const tabbarStore = useTabbarStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const pageName = route.meta.title

const id: number = parseInt(route.query.id || 0)

const loading = ref(true)
const tabsRefs = useTemplateRefsList<HTMLElement>()
const fieldBoxRef = ref()
let nameRepeatCount = 1

const fieldData: any = {
    column_name: '',
    column_comment: '',
    column_type: '',
    is_required: 1,
    is_pk: 1,
    is_insert: 1,
    is_update: 1,
    is_lists: 1,
    is_query: 1,
    is_search: 1,
    query_type: '=',
    view_type: 'input'
}
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

const fieldList: {
    common: fieldData[],
    base: fieldData[],
} = {
    common: [
        {
            column_name: 'id',
            column_comment: t('pk'),
            column_type: 'int',
            is_required: 1,
            is_pk: 1,
            is_insert: 0,
            is_update: 0,
            is_lists: 0,
            is_query: 1,
            is_search: 0,
            query_type: '=',
            view_type: 'input'
        },
        {
            column_name: 'status',
            column_comment: t('status'),
            column_type: 'int',
            is_required: 1,
            is_pk: 0,
            is_insert: 1,
            is_update: 1,
            is_lists: 1,
            is_query: 1,
            is_search: 0,
            query_type: '=',
            view_type: 'radio'
        },
        {
            column_name: 'create_time',
            column_comment: t('createTime'),
            column_type: 'int',
            is_required: 0,
            is_pk: 0,
            is_insert: 0,
            is_update: 0,
            is_lists: 1,
            is_query: 1,
            is_search: 0,
            query_type: 'BETWEEN',
            view_type: 'datetime'
        },
        {
            column_name: 'update_time',
            column_comment: t('updateTime'),
            column_type: 'int',
            is_required: 0,
            is_pk: 0,
            is_insert: 0,
            is_update: 0,
            is_lists: 1,
            is_query: 1,
            is_search: 0,
            query_type: 'BETWEEN',
            view_type: 'datetime'
        }

    ],
    base: [
        {
            column_name: 'string',
            column_comment: t('string'),
            column_type: 'string',
            is_required: 1,
            is_pk: 0,
            is_insert: 1,
            is_update: 1,
            is_lists: 1,
            is_query: 1,
            is_search: 1,
            query_type: '=',
            view_type: 'input'
        },
        {
            column_name: 'image',
            column_comment: t('image'),
            column_type: 'string',
            is_required: 1,
            is_pk: 0,
            is_insert: 1,
            is_update: 1,
            is_lists: 1,
            is_query: 1,
            is_search: 1,
            query_type: '=',
            view_type: 'imageSelect'
        },
        {
            column_name: 'radio',
            column_comment: t('radio'),
            column_type: 'int',
            is_required: 1,
            is_pk: 0,
            is_insert: 1,
            is_update: 1,
            is_lists: 1,
            is_query: 1,
            is_search: 1,
            query_type: '=',
            view_type: 'radio'
        },
        {
            column_name: 'checkbox',
            column_comment: t('checkbox'),
            column_type: 'string',
            is_required: 1,
            is_pk: 0,
            is_insert: 1,
            is_update: 1,
            is_lists: 1,
            is_query: 1,
            is_search: 1,
            query_type: '=',
            view_type: 'checkbox'
        },
        {
            column_name: 'select',
            column_comment: t('select'),
            column_type: 'string',
            is_required: 1,
            is_pk: 0,
            is_insert: 1,
            is_update: 1,
            is_lists: 1,
            is_query: 1,
            is_search: 1,
            query_type: '=',
            view_type: 'select'
        },
        {
            column_name: 'editor',
            column_comment: t('editor'),
            column_type: 'string',
            is_required: 1,
            is_pk: 0,
            is_insert: 1,
            is_update: 1,
            is_lists: 1,
            is_query: 1,
            is_search: 1,
            query_type: '=',
            view_type: 'editor'
        },
        {
            column_name: 'datetime',
            column_comment: t('dateTime'),
            column_type: 'string',
            is_required: 1,
            is_pk: 0,
            is_insert: 1,
            is_update: 1,
            is_lists: 1,
            is_query: 1,
            is_search: 1,
            query_type: '=',
            view_type: 'datetime'
        }

    ]
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
    }
]

interface SortableEvt extends SortableEvent {
    originalEvent?: DragEvent
}

const onActivateField = (idx: number) => {
    formData.editFiledIndex = idx
}

onMounted(() => {
    const sortable = Sortable.create(fieldBoxRef.value, {
        group: 'design-field',
        animation: 200,
        onAdd: (evt: SortableEvt) => {
            const name = evt.originalEvent?.dataTransfer?.getData('name')
            const field = fieldList[name]

            if (field && field[evt.oldIndex!]) {
                const data = cloneDeep(field[evt.oldIndex!])

                if (data.is_pk) {
                    const is_pk = formData.table_column.find((item: { is_pk: any; }) => {
                        return item.is_pk
                    })
                    if (is_pk) {
                        ElNotification({
                            type: 'error',
                            message: t('pkRepeatTip')
                        })
                        return evt.item.remove()
                    }
                    formData.table_column.defaultSortField = data.name
                    formData.table_column.quickSearchField.push(data.name)
                }

                const isRepeat = getArrayKey(formData.table_column, 'column_name', data.column_name)
                if (isRepeat) {
                    data.column_name = data.column_name + nameRepeatCount
                    nameRepeatCount++
                }
                formData.table_column.splice(evt.newIndex!, 0, data)
            }
            evt.item.remove()
            nextTick(() => {
                sortable.sort(range(formData.table_column.length).map((value) => value.toString()))
            })
        },
        onEnd: (evt) => {
            const temp = formData.table_column[evt.oldIndex!]
            formData.table_column.splice(evt.oldIndex!, 1)
            formData.table_column.splice(evt.newIndex!, 0, temp)

            nextTick(() => {
                sortable.sort(range(formData.table_column.length).map((value) => value.toString()))
            })
        }
    })

    tabsRefs.value.forEach((item, index) => {
        Sortable.create(item, {
            sort: false,
            group: {
                name: 'design-field',
                pull: 'clone',
                put: false
            },
            animation: 200,
            setData: (dataTransfer) => {
                dataTransfer.setData('name', Object.keys(fieldList)[index])
            }
        })
    })
})

const getArrayKey = (arr: any, pk: string, value: string): any => {
    for (const key in arr) {
        if (arr[key][pk] == value) {
            return key
        }
    }
    return false
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (id: number = 0) => {
    Object.assign(formData, initialFormData)
    const data = await (await getGenerateTableInfo(id)).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key]
    })

    loading.value = false
}
if (id) setFormData(id)

const formRef = ref<FormInstance>()

const validataVarName = (val: string) => {
    return /^([a-zA-Z_$])([a-zA-Z0-9_$])*$/.test(val)
}

// 表单验证规则
const formRules = computed(() => {
    return {
        table_name: [
            { required: true, message: t('tableNamePlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (!validataVarName(value)) {
                        callback(new Error(t('tableNameValidata')))
                    }

                    callback()
                },
                trigger: 'blur'
            }

        ],
        table_content: [
            { required: true, message: t('tableContentPlaceholder'), trigger: 'blur' }
        ]

    }
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    let msg = ''
    formData.table_column.find((item) => {
        if (!validataVarName(item.column_name)) {
            msg = item.column_name + ' ' + t('fieldNameValidata')
            return true
        }
    })

    if (msg) {
        ElNotification({
            type: 'error',
            message: msg
        })
        return
    }

    loading.value = true
    const data = cloneDeep(formData)
    data.table_column = JSON.stringify(data.table_column)
    editGenerateTable(data).then((res: any) => {
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
const onDel = (index: number) => {
    if (!formData.table_column[index]) return
    if (formData.editFiledIndex == index) formData.editFiledIndex = 0
    formData.table_column.splice(index, 1)
}
const back = () => {
    tabbarStore.removeTab(route.path)
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
</style>
