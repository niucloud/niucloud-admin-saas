<template>
    <el-dialog v-model="showDialog" :title="title" width="480px" :before-close="beforeClose" :destroy-on-close="true">
        <el-form :model="formData" label-width="130px" ref="formRef" :rules="formRules" class="page-form">
            <el-form-item :label="t('selectType')" prop="type">
					<el-radio-group v-model="formData.select_type">
						<el-radio :label="1">{{ t('dictType' )}}</el-radio>
						<el-radio :label="2">{{ t('remotePullDown') }}</el-radio>
					</el-radio-group>
			</el-form-item>

            <el-form-item :label="t('dictType')"  v-if="formData.select_type == 1" prop="dict_type">
                <el-select class="input-width" :placeholder="t('dictTypePlaceholder')" v-model="formData.dict_type" filterable remote clearable>
                    <el-option :label="item.name" :value="item.key" v-for="item in dicList" :key="item.key" />
                </el-select>
            </el-form-item>
               
            <el-form-item :label="t('addons')" prop="addon" v-if="formData.select_type == 2">
                <el-select v-model="formData.addon" :placeholder="t('addonsPlaceholder')" class="input-width" @change="addonChange">
                    <el-option v-for="(item, index) in addonLst" :label="item.title" :value="item.key" :key="index" />
                </el-select>
            </el-form-item>

            <el-form-item :label="t('associatedModel')" prop="model" v-if="formData.select_type == 2">
                <el-select :placeholder="t('associatedModelPlaceholder')" v-model="formData.model" class="input-width" filterable  @change="modelChange"> 
                    <el-option v-for="item in modelList" :label="item" :value="item" :key="item" />
                </el-select>
            </el-form-item>

             <el-form-item prop="value_key" :label="t('remotePullDownValue')" v-if="formData.select_type == 2">
                <el-select class="input-width" :placeholder="t('remotePullDownValuePlaceholder')"
                    v-model="formData.value_key">
                    <el-option :label="`${item.name}:${item.comment}`" :value="item.name"
                        v-for="(item, index) in keyList " :key="index" />
                </el-select>
            </el-form-item>

            <el-form-item prop="label_key" :label="t('remotePullDownLabel')" v-if="formData.select_type == 2">
                <el-select class="input-width" :placeholder="t('remotePullDownLabelPlaceholder')"
                    v-model="formData.label_key">
                    <el-option :label="`${item.name}:${item.comment}`" :value="item.name"
                        v-for="(item, index) in keyList " :key="index" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" @click="confirm(formRef)">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup async>
import { ref, computed, toRaw } from 'vue'
import { t } from '@/lang'
import { getDictAll } from '@/app/api/dict'
import type { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { getGeneratorAllModel, getGeneratorTableColumn,getAddonDevelop,getGeneratorModelTableColumn } from '@/app/api/tools'
const showDialog = ref(false)
const title = ref('')
/**
 * 表单数据
 */
const initialFormData = {
    select_type : 1,
    dict_type: "",
    addon: "",
    model: "",
    value_key: "",
    label_key: ""
}
const formData: Record<string, any> = ref({ ...initialFormData })

const formRef = ref<FormInstance>()
const dicList = ref<Array<any>>([])

/**
 * 获取关联模型
 */
const modelList = ref([])
const getGeneratorAllModelFn = (params:any) => {
    getGeneratorAllModel(params).then(res => {
        modelList.value = res.data
    })
}



//获取插件列表
const addonLst = ref<Array<any>>([])
const getAddonDevelopFn = async () => {
    let { data } = await getAddonDevelop({})
    addonLst.value = [{ title: "系统", key: "system" }]
    addonLst.value.push(...data)
    getGeneratorAllModelFn({addon:'system'})
}
getAddonDevelopFn()

//选择应用
const addonChange =(val:any)=>{
    formData.value.model = ''
   getGeneratorAllModelFn({addon:val})
}

const keyList = ref([])
const getGeneratorModelTableColumnFn = (params:any) => {
    getGeneratorModelTableColumn(params).then(res => {
        keyList.value = res.data
    })
}

//根据模型获取字段
const modelChange = (val:any) => {
    // formData.value.model = ''
    getGeneratorModelTableColumnFn({model:val})
}

// 表单验证规则
const formRules = computed(() => {
    return {
        dict_type: [
            {
            validator: (rule: any, value: any, callback: any) => {
                console.log(formData.value.select_type)
                if (formData.value.select_type == 1 && formData.value.dict_type == '') {
                    callback(new Error(t('dictTypePlaceholder')))
                }else{
                        callback()
                    } 
            },
            trigger: 'blur'
        }
        ],
        addon: [
            {
                validator: (rule: any, value: any, callback: any) => {
                    if (formData.value.select_type == 2 && formData.value.addon == '') {
                        callback(new Error(t('addonsPlaceholder')))
                    }else{
                        callback()
                    } 
                },
                trigger: 'blur'
            }
        ],
        model: [
            {
                validator: (rule: any, value: any, callback: any) => {
                    console.log(formData.value.model);
                    if (formData.value.select_type == 2 && formData.value.model == '') {
                        callback(new Error(t('associatedModelPlaceholder')))
                    }else{
                        callback()
                    }
                },
                trigger: 'blur'
            }
        ],
        value_key: [
            {
                validator: (rule: any, value: any, callback: any) => {
                    if (formData.value.select_type == 2 && formData.value.value_key == '') {
                        callback(new Error(t('remotePullDownValuePlaceholder')))
                    }else{
                        callback()
                    } 
                },
                trigger: 'blur'
            }
        ],
        label_key: [
            {
                validator: (rule: any, value: any, callback: any) => {
                    if (formData.value.select_type == 2 && formData.value.label_key == '') {
                        callback(new Error(t('remotePullDownLabelPlaceholder')))
                    }else{
                        callback()
                    } 
                },
                trigger: 'blur'
            }
        ]

    }
})

const getDictAllFn = () => {
    getDictAll().then((res) => {
        dicList.value = res.data
    })
}
const emit = defineEmits(['complete'])
/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid) => {
        if (valid) {
            emit('complete', toRaw(formData.value))
            showDialog.value = false
        }
    })
}

const setFormData = async (row: any = null) => {
    formData.value = cloneDeep(Object.assign(initialFormData, row))
    getDictAllFn()
    if(formData.value.model != '')
    {
        getGeneratorAllModelFn({addon:formData.value.addon})
        getGeneratorModelTableColumnFn({model:formData.value.model})
    }
    showDialog.value = true
}
const beforeClose = (next: any) => {
    formRef.value?.clearValidate()
    next()
}
defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
