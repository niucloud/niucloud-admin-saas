<template>
    <el-dialog v-model="showDialog" :title="t('moneyInfo')" width="550px" :destroy-on-close="true">
        <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
            v-loading="loading">
 
            <el-form-item :label="t('headimg')" >
                <div class="flex items-center">
                    

                    <img class="w-[50px] h-[50px] mr-[10px]" v-if="formData.headimg" :src="img(formData.headimg)" alt="" >
                    <img class="w-[50px] h-[50px] mr-[10px]" v-else src="@/assets/images/default_headimg.png" alt="" >

                </div>
            </el-form-item>


            <el-form-item :label="t('nickName')" >
                <div class="input-width"> {{ formData.nickname }} </div>
            </el-form-item>


            <el-form-item :label="t('mobile')" >
                <div class="input-width"> {{ formData.mobile }} </div>
            </el-form-item>

            <el-form-item :label="t('accountData')" >
                <div class="input-width"> {{ formData.account_data }} </div>
            </el-form-item>
 
            <el-form-item :label="t('fromType')" >
                <div class="input-width"> {{ formData.from_type_name }} </div>
            </el-form-item>

            <el-form-item :label="t('memo')" >
                <div class="input-width"> {{ formData.memo }} </div>
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
import { img } from '@/utils/common'

const showDialog = ref(false)
const loading = ref(true)

/**
 * 表单数据
 */
const initialFormData = {
    account_data: 0,
    account_type:'',
    create_time:'',
    from_type:'',
    from_type_name:"",
    headimg:'',
    member_id:'',
    memo:'',
    mobile:'',
    nickname:'',
    related_id:'',
    username:''

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
    loading.value = true;
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
