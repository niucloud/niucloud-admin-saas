<template>
    <div class="main-container">
        <div class="flex ml-[18px] justify-between items-center mt-[20px]">
			<span class="text-[20px]">{{pageName}}</span>
		</div>
        <el-form :model="formData" label-width="150px" ref="ruleFormRef" :rules="rules" class="page-form" v-loading="loading">
            <el-card class="box-card !border-none" shadow="never">

                <el-form-item :label="t('isOpen')">
                    <el-switch v-model="formData.is_open" />
                </el-form-item>

                <el-form-item :label="t('cashWithdrawalAmount')" v-if="formData.is_open" prop="min">
                    <el-input v-model="formData.min" type="number"  class="input-width" :placeholder="t('cashWithdrawalAmountPlaceholder')" />
                </el-form-item>

                <el-form-item :label="t('commissionRatio')" v-if="formData.is_open" prop="rate">
                    <el-input v-model="formData.rate" type="number" class="input-width" :placeholder="t('commissionRatioPlaceholder')" />
                    <span class="ml-2">%</span>
                </el-form-item>
                <el-form-item :label="t('audit')" v-if="formData.is_open"  class="items-center">
                    <el-radio-group v-model="formData.is_auto_verify">
                        <el-radio label="0" size="large">{{t('manualAudit')}}</el-radio>
                        <el-radio label="1" size="large">{{t('automaticAudit')}}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item :label="t('transfer')" v-if="formData.is_open" class="items-center">
                    <el-radio-group v-model="formData.is_auto_transfer">
                        <el-radio label="0" size="large">{{t('manualTransfer')}}</el-radio>
                        <el-radio label="1" size="large">{{t('automatedTransit')}}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item :label="t('transferMode')" v-if="formData.is_open" class="items-center">
                    <el-checkbox-group v-model="formData.transfer_type" size="large">
                        <el-checkbox :label="item.key"  v-for="(item,index) in Transfertype" :key="'a'+index">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-card>
        </el-form>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(ruleFormRef)">{{ t('save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getCashOutConfig, setCashOutConfig, getTransfertype } from '@/app/api/member'
import { FormRules, FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title

const loading = ref(true),
      ruleFormRef = ref<FormInstance>(),
      formData = reactive<Record<string, string | boolean | Array<string> >>({
        is_auto_transfer: "0",
        is_auto_verify: "0",
        is_open: "0",
        min: "0.01",
        rate: "0",
        transfer_type: []
    });
const Transfertype = ref<Array<Object>>([])

// 获取会员转账方式
const getTransfertypeFn = async()=>{
    Transfertype.value = await (await getTransfertype()).data
}
getTransfertypeFn()


// 获取会员的配置信息
const setFormData = async (id: number = 0) => {
    const data = await (await getCashOutConfig()).data
    Object.keys(formData).forEach((key: string) => {
        if (data[key] != undefined) formData[key] = data[key];
    })
    formData.is_open = Boolean(Number(formData.is_open));
    loading.value = false;
}
setFormData()



const minRules = (rule: any, value: any, callback: any) => {
  if (Number(value) < 0.01) {
    callback(new Error(t('cashWithdrawalAmountHint')))
  } else {
    callback()
  }
}

const rateRules = (rule: any, value: any, callback: any) => {
  if (Number(value) > 100 || Number(value) < 0) {
    callback(new Error(t('commissionRatioHint')))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  min: [
    { validator: minRules, trigger: 'blur' }
  ],
  rate: [
    { validator: rateRules, trigger: 'blur' }
  ]
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            let save = {...formData};
            save.is_open = Number(save.is_open).toString();

            setCashOutConfig(save).then(() => {
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>
