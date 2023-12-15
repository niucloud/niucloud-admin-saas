<template>
    <div class="panel-title">{{ buttonData.sub_button ? t('menuNameInfo') : t('subMenuNameInfo') }}</div>

    <el-form :model="buttonData" label-width="140px" ref="formRef" :rules="formRules" class="page-form mt-[30px]">

        <el-form-item :label="t('menuName')" prop="name">
            <el-input v-model="buttonData.name" :placeholder="t('menuNamePlaceholder')" class="input-width" clearable />
            <div class="form-tip">{{ buttonData.sub_button ? t('menuNameTips') : t('subMenuNameTips') }}</div>
        </el-form-item>

        <template v-if="!buttonData.sub_button || !buttonData.sub_button.length">
            <el-form-item :label="t('messageType')">
                <el-radio-group v-model="buttonData.type">
                    <el-radio label="view">{{ t('skipWebpage') }}</el-radio>
                    <el-radio label="miniprogram">{{ t('skipWeapp') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('webpageUrl')" prop="url">
                <el-input v-model="buttonData.url" :placeholder="t('webpageUrlPlaceholder')" class="input-width" clearable />
            </el-form-item>

            <el-form-item :label="t('weappAppid')" prop="appid" v-show="buttonData.type == 'miniprogram'">
                <el-input v-model="buttonData.appid" :placeholder="t('weappAppidPlaceholder')" class="input-width" clearable />
            </el-form-item>

            <el-form-item :label="t('weappPage')" prop="pagepath" v-show="buttonData.type == 'miniprogram'">
                <el-input v-model="buttonData.pagepath" :placeholder="t('weappPagePlaceholder')" class="input-width" clearable />
            </el-form-item>

        </template>

        <div class="mt-[40px]">
            <el-button type="primary" link @click="deleteButton">{{ t('deleteMemu') }}</el-button>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { t } from '@/lang'
import { strByteLength } from '@/utils/common'

const prop = defineProps({
    data: {
        type: Object,
        default: () => { }
    },
    index: {
        type: Number,
        default: 0
    },
    subIndex: {
        type: Number,
        default: -1
    }
})

const formRef = ref(null)

const buttonData = computed({
    get() {
        return prop.data
    },
    set(value) {

    }
})

/**
 * 验证规则
 */
const formRules = computed(() => {
    return {
        name: [
            { required: true, message: t('menuNamePlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    if (buttonData.value.sub_button && strByteLength(value) > 8) callback(new Error(t('menuNameTips')))
                    else if (!buttonData.value.sub_button && strByteLength(value) > 16) callback(new Error(t('subMenuNameTips')))
                    else callback()
                },
                trigger: ['blur', 'change']
            }
        ],
        url: [
            { required: !buttonData.value.sub_button || !buttonData.value.sub_button.length, message: t('webpageUrlPlaceholder'), trigger: 'blur' }
        ],
        appid: [
            { required: ((!buttonData.value.sub_button || !buttonData.value.sub_button.length) && buttonData.value.type == 'miniprogram'), message: t('weappAppidPlaceholder'), trigger: 'blur' }
        ],
        pagepath: [
            { required: ((!buttonData.value.sub_button || !buttonData.value.sub_button.length) && buttonData.value.type == 'miniprogram'), message: t('weappPagePlaceholder'), trigger: 'blur' }
        ]
    }
})

const emit = defineEmits(['delete'])

const deleteButton = () => {
    emit('delete')
}

const validate = async () => {
    let validate = false
    await formRef.value.validate(async (valid: boolean) => {
        validate = valid
    })
    return validate
}

defineExpose({
    validate,
    index: prop.index,
    subIndex: prop.subIndex
})
</script>

<style lang="scss" scoped></style>
