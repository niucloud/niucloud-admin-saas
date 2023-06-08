<template>
    <div class="main-container">
        <el-form :model="formData" label-width="150px" ref="formRef" class="page-form"
            v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title">{{ t('mapSetting') }}</h3>
                <el-form-item :label="t('mapKey')" prop="site_name">
                    <el-input v-model="formData.key" class="input-width" clearable />
                </el-form-item>
            </el-card>
        </el-form>

        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" :loading="loading" @click="save(formRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { setMap, getMap } from '@/api/sys'
import { FormInstance, } from 'element-plus'

const loading = ref(false)
const formData = reactive<Record<string, string>>({
	key : ''
})
const setFormData = async () => {
	const service_data = await (await getMap()).data
	formData.key = service_data.key
}
setFormData()

/**
 * 保存
 */
const save = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return

    setMap(formData).then(() => {
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

</script>

<style lang="scss" scoped></style>
