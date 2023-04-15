<template>
    <div class="main-container">
        <el-form label-width="120px" ref="formRef" class="page-form">
            
            <el-card class="box-card !border-none" shadow="never">
                <h3 class="panel-title">{{ t('pcInfo') }}</h3>

                <el-form-item :label="t('preview')" prop="weapp_name">
                    <img class="w-[1010px]" src="@/assets/images/channel/preview.png" alt="">
                </el-form-item>
            </el-card>

        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { t } from '@/lang'
import { useClipboard } from '@vueuse/core'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
</script>

<style lang="scss" scoped></style>
