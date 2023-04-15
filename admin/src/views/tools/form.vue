<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item label="文本" prop="text">
                    <el-input v-model="formData.text" placeholder="请输入用户名" clearable class="input-width" />
                    <div class="form-tip">管理员账号登录时使用</div>
                </el-form-item>
                <el-form-item label="单选" prop="radio">
                    <el-radio-group v-model="formData.radio">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图片上传" prop="img">
                    <upload-image v-model="formData.img" :limit="1" />
                </el-form-item>
                <el-form-item label="视频上传" prop="video">
                    <upload-video v-model="formData.video" :limit="1" />
                </el-form-item>
                <el-form-item label="文件上传" prop="video">
                    <div class="input-width">
                        <upload-file v-model="formData.file" />
                    </div>
                </el-form-item>
                <el-form-item label="文本域" prop="textarea">
                    <el-input v-model="formData.textarea" type="textarea" rows="5" class="input-width" />
                </el-form-item>
                <el-form-item label="下拉选择" prop="select">
                    <el-select v-model="formData.select" placeholder="请选择角色" class="input-width">
                        <el-option label="管理员" value="shanghai" />
                        <el-option label="收银员" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="日期选择" prop="date">
                    <div class="input-width">
                        <el-date-picker v-model="formData.date" type="date" placeholder="Pick a date" />
                    </div>
                </el-form-item>
                <el-form-item label="日期区间" prop="date_range">
                    <div class="input-width">
                        <el-date-picker v-model="formData.date_range" type="daterange" placeholder="Pick a date" />
                    </div>
                </el-form-item>
                <el-form-item label="富文本" prop="editor">
                    <editor v-model="formData.editor" />
                </el-form-item>

                <el-form-item label="排序" prop="editor">
                    <el-input-number v-model="formData.sort" :min="0" />
                </el-form-item>

                <el-form-item label="">
                    <el-button type="primary" :loading="loading" @click="onSave(formRef)">保存</el-button>
                    <el-button>返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary">{{ t('save') }}</el-button>
                <el-button>{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'

const loading = ref(false)

/**
 * 表单数据
 */
const initialFormData = {
    text: '',
    radio: 1,
    textarea: '',
    img: '',
    video: '',
    file: '',
    select: '',
    date: '',
    editor: '',
    date_range: '',
    sort: 0
}
const formData: Record<string, any> = reactive({ ...initialFormData })

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        // username: [
        //     { required: formData.uid == 0, message: t('accountNumberPlaceholder'), trigger: 'blur' }
        // ],
        // password: [
        //     { required: true, message: t('passwordPlaceholder'), trigger: 'blur' }
        // ],
        // confirm_password: [
        //     { required: true, message: t('confirmPasswordPlaceholder'), trigger: 'blur' },
        //     {
        //         validator: (rule: any, value: string, callback: any) => {
        //             if (value != formData.password) callback(new Error(t('confirmPasswordError')))
        //             else callback()
        //         },
        //         trigger: 'blur'
        //     }
        // ]
    }
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            // loading.value = true

            const data = formData
            console.log(data)

            // save(data).then(res => {
            //     loading.value = false
            //     showDialog.value = false
            //     emit('complete')
            // }).catch(err => {
            //     loading.value = false
            //     showDialog.value = false
            // })
        }
    })
}
</script>

<style lang="scss" scoped></style>
