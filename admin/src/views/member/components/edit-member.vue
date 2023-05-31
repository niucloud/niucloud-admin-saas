<template>
    <el-dialog v-model="showDialog" :title="title || t('updateMember')" width="500px" :destroy-on-close="true">

        <el-form :model="saveData" label-width="90px" :rules="formRules" class="page-form" v-loading="loading">
            <el-form-item :label="t('headimg')" v-if="type == 'headimg'">
                <upload-image v-model="saveData.headimg" />
            </el-form-item>
            <el-form-item :label="t('nickname')" v-if="type == 'nickname'">
                <el-input v-model="saveData.nickname" clearable :placeholder="t('nickNamePlaceholder')"
                    class="input-width" />
            </el-form-item>
            <el-form-item :label="t('birthday')" v-if="type == 'birthday'">
                <el-date-picker v-model="saveData.birthday" value-format="YYYY-MM-DD" type="date"
                    :placeholder="t('birthdayTip')" />
            </el-form-item>
            <el-form-item :label="t('sex')" v-if="type == 'sex'">
                <el-select v-model="saveData.sex" clearable :placeholder="t('sexPlaceholder')" class="input-width">
                    <el-option :label="item['name']" :value="item['id']" v-for="item in sexSeleteData" />
                </el-select>
            </el-form-item>
            <el-form-item :label="t('memberLabel')" v-if="type == 'member_label'">
                <el-select v-model="saveData.member_label" multiple collapse-tags :placeholder="t('memberLabelPlaceholder')"
                    class="input-width">
                    <el-option :label="item['label_name']" :value="item['label_id']" v-for="item in labelSelectData" />
                </el-select>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">{{ t('cancel') }}</el-button>
                <el-button type="primary" :loading="loading" @click="confirm(formRef)">{{
                    t('confirm')
                }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { t } from '@/lang'
import type { FormInstance } from 'element-plus'
import { editMemberDetail, getMemberLabelAll } from '@/api/member'

// 修改类型
let type = ref('')
let title = ref('')
// 会员id
let memberId = ref('')
let showDialog = ref(false)
const loading = ref(false)
let sexSeleteData = ref([
    {
        id: 0,
        name: t('secrecySex')
    },
    {
        id: 1,
        name: t('manSex')
    },
    {
        id: 2,
        name: t('girlSex')
    }
]);
let labelSelectData = ref(null)
// 获取全部标签
const getMemberLabelAllFn = async () => {
    labelSelectData.value = await (await getMemberLabelAll()).data
}
getMemberLabelAllFn();



/**
 * 表单数据
 */
const initialFormData = {
    headimg: '',
    nickname: '',
    member_label: '',
    sex: '',
    birthday: ''
}
const saveData: Record<string, any> = reactive({ ...initialFormData })


const emit = defineEmits(['complete'])

/**
 * 确认
 * @param formEl
 */
const confirm = async (formEl: FormInstance | undefined) => {
    loading.value = true
    let data = ref({
        member_id: memberId.value,
        field: type.value,
        value: saveData[type.value]
    })

    editMemberDetail(data.value).then(res => {
        loading.value = false
        showDialog.value = false
        emit('complete')
    }).catch(err => {
        loading.value = false
        // showDialog.value = false
    })
}

const setDialogType = async (row: any = null) => {
    loading.value = true;
    type.value = row.type;
    title.value = row.title;
    memberId.value = row.id;
    saveData[type.value] = row.data[type.value]
    if (type.value == "member_label" && saveData[type.value]) {
        saveData[type.value].forEach((item, index) => {
            saveData[type.value][index] = Number.parseFloat(item);
        });
    }
    loading.value = false;

}

defineExpose({
    showDialog,
    setDialogType
})
</script>

<style lang="scss" scoped></style>