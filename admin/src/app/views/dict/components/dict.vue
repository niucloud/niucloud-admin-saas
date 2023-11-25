<template>
    <el-dialog v-model="showDialog" :title="t('dictData')" width="60%" class="diy-dialog-wrap" :destroy-on-close="true">
        <div class="mb-[10px]">
            <el-button type="primary" @click="addEvent">
                {{ t('addDictData') }}
            </el-button>
        </div>
        <el-table :data="tableDate" size="large" v-loading="loading">
            <el-table-column :label="t('dataName')" prop="name" />
            <el-table-column :label="t('dataValue')" prop="value" />
            <el-table-column :label="t('sort')" align="center" min-width="100px" prop="sort" />
            <el-table-column :label="t('memo')" prop="memo" />
            <el-table-column :label="t('operation')" align="right" fixed="right" width="120">
                <template #default="{ row, $index }">
                    <el-button type="primary" link @click="editEvent(row, $index)">{{ t('edit') }}</el-button>
                    <el-button type="primary" link @click="deleteEvent($index)">{{ t('delete') }}</el-button>
                </template>
            </el-table-column>

        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" @click="confirm()">{{
                    t('confirm')
                }}</el-button>
            </span>
        </template>
        <el-dialog v-model="dialogVisible" :title="type != 'edit' ? t('addDictData') : t('editDictData')" width="480"
            class="diy-dialog-wrap" :destroy-on-close="true">
            <el-form :model="formData" label-width="120px" ref="formRef" :rules="formRules" class="page-form">
                <el-form-item :label="t('name')">
                    <el-input v-model="name" disabled class="input-width" />
                </el-form-item>
                <el-form-item :label="t('dataName')" prop="name">
                    <el-input v-model="formData.name" clearable :placeholder="t('dataNamePlaceholder')"
                        class="input-width" />
                </el-form-item>
                <el-form-item :label="t('dataValue')" prop="value">
                    <el-input v-model="formData.value" clearable :placeholder="t('dataValuePlaceholder')"
                        class="input-width" />
                </el-form-item>
                <el-form-item :label="t('sort')" prop="sort">
                    <div>
                    <el-input-number v-model="formData.sort" ::step="1" step-strictly :value-on-clear="0" :min="0" class="input-width" />
                    <p class="text-[12px] text-[#a9a9a9] leading-normal mt-[5px]">{{ t('sortPlaceholder') }}</p>
                </div>
                </el-form-item>
                <el-form-item :label="t('memo')">
                    <el-input v-model="formData.memo" type="textarea" clearable :placeholder="t('momePlaceholder')"
                        class="input-width" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">{{ t('cancel') }}</el-button>
                    <el-button type="primary" @click="submit(formRef)">{{
                        t('confirm')
                    }}</el-button>
                </span>
            </template>
        </el-dialog>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { setDictData, getDictInfo } from '@/app/api/dict'
import { cloneDeep } from 'lodash-es'

let showDialog = ref(false)
const loading = ref(false)
const dialogVisible = ref(false)

const tableDate = ref<Array<any>>([])
const id = ref()
const type = ref('add')
const formRef = ref()
/**
 * 表单数据
 */
const name = ref('')
const initialFormData = {
    name: '',
    value: '',
    sort: 0,
    memo:'',
}
const formData = ref({ ...initialFormData })
// 表单验证规则
const formRules = computed(() => {
    return {
        name: [
            { required: true, message: t('dataNamePlaceholder'), trigger: 'blur' }

        ],
        value: [
            { required: true, message: t('dataValuePlaceholder'), trigger: 'blur' }

        ],
    }
})
const addEvent = () => {
    type.value = 'add'
    formData.value = cloneDeep(initialFormData)
    dialogVisible.value = true
}
const tabelIndex = ref(0)
const editEvent = (row: any, index: number) => {
    type.value = 'edit'
    tabelIndex.value = index
    formData.value = cloneDeep(initialFormData)
    formData.value = Object.assign(formData.value,cloneDeep( row))
    dialogVisible.value = true
}
/**
 * 表单确认
 */
const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            if (type.value != 'edit') {
                tableDate.value.push(cloneDeep(formData.value))
            } else {
                tableDate.value.splice(tabelIndex.value, 1, cloneDeep(formData.value))
                
            }
            tableDate.value.sort(function(a,b){return b.sort-a.sort})
            dialogVisible.value = false
        }
    })
}
const emit = defineEmits(['complete'])

/**
 *删除
 */
const deleteEvent = (index: number) => {
    tableDate.value.splice(index, 1)
}
/**
 * 确认
 * @param formEl
 */
const confirm = async () => {
    loading.value = true
    setDictData(id.value, { dictionary: JSON.stringify(tableDate.value) }).then(res => {
        loading.value = false
        showDialog.value = false
        emit('complete')
    }).catch(() => {
        loading.value = false
    })
}

const setFormData = async (row: any = null) => {
    showDialog.value = true
    loading.value = true
    id.value = row.id
    name.value = row.name
    const data = await (await getDictInfo(row.id)).data
    tableDate.value =  data.dictionary
    loading.value = false
}



defineExpose({
    showDialog,
    setFormData
})
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.diy-dialog-wrap .el-form-item__label {
    height: auto !important;
}
</style>
