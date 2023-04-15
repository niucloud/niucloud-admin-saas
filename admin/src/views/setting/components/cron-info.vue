<template>
    <el-dialog v-model="showDialog" :title="t('cronInfo')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
 
            <el-form-item :label="t('title')" >
                <div class="input-width"> {{ formData.title }} </div>
            </el-form-item>

            <el-form-item :label="t('typeName')" >
                <div class="input-width"> {{ formData.type_name }} </div>
            </el-form-item>

            <el-form-item :label="t('crondType')" >
                <div class="input-width"  v-if="formData.type == 'crond'">{{ formData.crond_length }} {{ formData.crond_type_name }} </div>
                <div  class="input-width" v-else>{{ t('cron') }}</div>
            </el-form-item>

            <el-form-item :label="t('count')" >
                <div class="input-width"> {{ formData.count }} </div>
            </el-form-item>
 
            <el-form-item :label="t('task')" >
                <div class="input-width"> {{ formData.task }} </div>
            </el-form-item>

            <el-form-item :label="t('data')" >
                <div class="input-width"> {{ JSON.stringify(formData.data) }} </div>
            </el-form-item>

            <el-form-item :label="t('statusDesc')" >
                <div class="input-width"> {{ formData.status_desc }} </div>
            </el-form-item>

            <el-form-item :label="t('lastTime')" >
                <div class="input-width"> {{ formData.last_time }} </div>
            </el-form-item>

            <el-form-item :label="t('nextTime')" >
                <div class="input-width"> {{ formData.next_time }} </div>
            </el-form-item>

            <el-form-item :label="t('createTime')" >
                <div class="input-width"> {{ formData.create_time }} </div>
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="showDialog = false">{{ t('confirm') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    count: 0,
    create_time:'',
    crond_length:'',
    crond_type:'',
    crond_type_name:'',
    data:'',
    delete_time:'',
    last_time:'',
    next_time:'',
    status_desc:'',
    title:'',
    type:'',
    type_name:'',
    update_time:''
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {

    }
})

const emit = defineEmits(['complete'])

const setFormData = async (row: any = null) => {
    loading.value = true
    Object.assign(formData, initialFormData)
    if (row) {
        Object.keys(formData).forEach((key: string) => {
            if (row[key] != undefined) formData[key] = row[key]
        })
    }
    
    loading.value = false
}

defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
