<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <el-form :model="formData" label-width="90px" ref="formRef" :rules="formRules" class="page-form" v-loading="loading">
                <el-form-item :label="t('title')" prop="title">
                    <el-input v-model="formData.title" clearable :placeholder="t('titlePlaceholder')" class="input-width" maxlength="20" />
                </el-form-item>

                <el-form-item :label="t('categoryName')" prop="category_id">
                    <el-select v-model="formData.category_id" clearable :placeholder="t('categoryIdPlaceholder')" class="input-width">
                        <el-option :label="item['name']" :value="item['category_id']" v-for="item in categoryList" />
                    </el-select>
                </el-form-item>

                <el-form-item :label="t('intro')" prop="intro">
                    <el-input v-model="formData.intro" type="textarea" rows="4" clearable :placeholder="t('introPlaceholder')" class="input-width" maxlength="50" />
                </el-form-item>
                <el-form-item :label="t('summary')" prop="summary">
                    <el-input v-model="formData.summary" type="textarea" rows="4" clearable :placeholder="t('summaryPlaceholder')" class="input-width" maxlength="50" />
                </el-form-item>
                <el-form-item :label="t('image')">
                    <upload-image v-model="formData.image" />
                </el-form-item>
                <el-form-item :label="t('author')" prop="author">
                    <el-input v-model="formData.author" clearable :placeholder="t('authorPlaceholder')" class="input-width" maxlength="20" />
                </el-form-item>
                <el-form-item :label="t('content')" prop="content">
                    <editor v-model="formData.content" />
                </el-form-item>

                <el-form-item :label="t('visitVirtual')">
                    <el-input v-model="formData.visit_virtual" clearable :placeholder="t('visitVirtualPlaceholder')" class="input-width" />
                </el-form-item>
                <el-form-item :label="t('isShow')">
                    <el-radio-group v-model="formData.is_show" :placeholder="t('isShowPlaceholder')">
                        <el-radio :label="1">{{ t('show') }}</el-radio>
                        <el-radio :label="0">{{ t('hidden') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="t('sort')" prop="sort">
                    <el-input-number v-model="formData.sort" :min="0" />
                </el-form-item>

            </el-form>
        </el-card>
        <div class="fixed-footer-wrap">
            <div class="fixed-footer">
                <el-button type="primary" @click="onSave(formRef)">{{ t('save') }}</el-button>
                <el-button @click="back()">{{ t('cancel') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { t } from '@/lang'
import type { FormInstance, ElNotification } from 'element-plus'
import { getArticleInfo, getArticleCategoryAll, addArticle, editArticle } from '@/api/article'
import { useRoute, useRouter } from 'vue-router'
import useTabbarStore from '@/stores/modules/tabbar'
import useAppStore from '@/stores/modules/app'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const id: number = parseInt(route.query.id || 0)
const loading = ref(false)
const categoryList = ref([])
const tabbarStore = useTabbarStore()
const appStore = useAppStore()

// 页面返回按钮
appStore.pageReturn = true;
watch(route, (newX, oldX) => {
    appStore.pageReturn = false;
});

/**
 * 表单数据
 */
const initialFormData = {
    id: '',
    category_id: '',
    title: '',
    intro: '',
    summary: '',
    image: '',
    author: '',
    content: '',
    visit: '',
    visit_virtual: '',
    is_show: 1,
    sort: 0
}

const formData: Record<string, any> = reactive({ ...initialFormData })

const setFormData = async (id: number = 0) => {
    loading.value = true;
    Object.assign(formData, initialFormData)
    if (id) {
        const data = await (await getArticleInfo(id)).data
        if (!data || Object.keys(data).length == 0) {
            ElMessage.error(t('articleNull'))
            setTimeout(() => {
                router.go(-1);
            }, 2000)
            return false;
        }
        Object.keys(formData).forEach((key: string) => {
            if (data[key] != undefined) formData[key] = data[key]
        })
        loading.value = false;
    } else {
        loading.value = false;
    }

}
if (id) setFormData(id)

const setCategoryList = async () => {
    categoryList.value = await (await getArticleCategoryAll({})).data
    // if (!id && categoryList.value.length > 0) formData.category_id = categoryList.value[0].category_id
}
setCategoryList()

const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = computed(() => {
    return {
        title: [
            { required: true, message: t('titlePlaceholder'), trigger: 'blur' }
        ],
        category_id: [
            { required: true, message: t('categoryIdPlaceholder'), trigger: 'blur' },
        ],
        content: [
            { required: true, message: t('contentPlaceholder'), trigger: 'blur' },
            {
                validator: (rule: any, value: string, callback: any) => {
                    let content = value.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "")
                    if (!content && value.indexOf('img') === -1) {
                        callback(new Error(t('contentPlaceholder')))
                    } else callback()
                },
                trigger: ['blur', 'change']
            }
        ]
    }
})

const onSave = async (formEl: FormInstance | undefined) => {
    if (loading.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            const data = formData
            const save = id ? editArticle : addArticle
            save(data).then(res => {
                loading.value = false
                back();
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

const back = () => {
    tabbarStore.removeTab(route.path)
    router.push({ path: '/article/list' })
}
</script>

<style lang="scss" scoped></style>
