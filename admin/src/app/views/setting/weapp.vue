<template>
    <div class="main-container">
        <el-card class="box-card !border-none" shadow="never">
            <div class="flex justify-between items-center">
                <span class="text-[20px]">{{pageName}}</span>
                <el-button type="primary" @click="showEvent">{{ t('addVersion') }}</el-button>
            </div>
            <div class="mt-[10px]">
                <el-table :data="weappTableData.data" size="large" v-loading="weappTableData.loading">

                    <template #empty>
                        <span>{{ !weappTableData.loading ? t('emptyData') : '' }}</span>
                    </template>

                    <el-table-column prop="version" :label="t('version')" min-width="150" />
					<el-table-column prop="create_time" :label="t('createTime')" min-width="150" />
					<!-- <el-table-column prop="status_name" :label="t('status')" min-width="100" /> -->
					<el-table-column :label="t('operation')" align="right" fixed="right" width="130">
					    <template #default="{ row }">
					        <el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
					        <el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
					    </template>
					</el-table-column>
                </el-table>
                <div class="mt-[16px] flex justify-end">
                    <el-pagination v-model:current-page="weappTableData.page" v-model:page-size="weappTableData.limit" layout="total, sizes, prev, pager, next, jumper" :total="weappTableData.total" @size-change="loadWeappTemplateList()" @current-change="loadWeappTemplateList" />
                </div>
            </div>

        </el-card>
        <cron-info ref="cronDialog" @complete="weappTableData" />
		<el-dialog v-model="showDialog" :title="t('editVersion')" width="550px" :destroy-on-close="true">
		    <el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
		        v-loading="loading">
				<el-form-item :label="t('version')" prop="version">
					<el-input v-model="formData.version" :placeholder="t('versionPlaceholder')" class="input-width"/>
				</el-form-item>
				<el-form-item :label="t('file')" prop="path">
					<upload-file v-model="formData.path" class="input-width" api="applet/upload" />
				</el-form-item>
				<el-form-item :label="t('desc')">
					<el-input type="textarea" v-model="formData.desc" class="input-width" clearable></el-input>
				</el-form-item>
		    </el-form>

		    <template #footer>
		        <span class="dialog-footer">
		            <el-button type="primary" @click="addEvent(formRef)">{{ t('confirm') }}</el-button>
		        </span>
		    </template>
		</el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue'
import { t } from '@/lang'
import {
	getVersionList,
	uploadVersion,
	addVersion,
	editVersion,
	deleteVersion
} from '@/app/api/weapp'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import CronInfo from '@/app/views/setting/components/cron-info.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = route.meta.title;

const weappTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        title: '',
        type:'',
        last_time:''
    }
})
const searchFormRef = ref<FormInstance>()

/**
 * 获取任务列表
 */
const loadWeappTemplateList = (page: number = 1) => {
    weappTableData.loading = true
    weappTableData.page = page

    getVersionList({
        page: weappTableData.page,
        limit: weappTableData.limit,
        ...weappTableData.searchParam
    }).then(res => {
        weappTableData.loading = false
        weappTableData.data = res.data.data
        weappTableData.total = res.data.total
    }).catch(() => {
        weappTableData.loading = false
    })
}
loadWeappTemplateList()

const router = useRouter()

const showDialog = ref(false)
const initialFormData = {
	id: 0,
	desc: '',
	path: '',
	version: '',
	type: 'weapp'
}
const formData: Record<string, any> = reactive({ ...initialFormData })
const formRef = ref<FormInstance>()

const showEvent = () => {
	formData.id = 0,
	formData.desc = '',
	formData.path = '',
	formData.version = '',
	showDialog.value = true
}

// 表单验证规则
const formRules = computed(() => {
    return {
        version: [
            { required: true, message: t('versionPlaceholder'), trigger: 'blur' }
        ],
        path: [
            { required: true, validator: validatePass, trigger: 'blur' }
        ],
    }
})

const validatePass = (rule: any, value: any, callback: any) => {
	if(formData.path == ''){
		return callback(new Error(t('filePlaceholder')))
	}
	return callback()
}
const save_type = ref(false)
const addEvent = async (formEl: FormInstance | undefined) => {
    if (save_type.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            save_type.value = true
            const data = formData
            const save = formData.id > 0 ? editVersion : addVersion
            save(data).then(res => {
                save_type.value = false
				showDialog.value = false
				loadWeappTemplateList()
            }).catch(() => {
                save_type.value = false
            })
        }
    })
}

const editEvent = (item) => {
	formData.id = item.id,
	formData.desc = item.desc,
	formData.path = item.path
	formData.version = item.version
	showDialog.value = true
}

const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('weappVersionDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteVersion(id).then(() => {
            loadWeappTemplateList()
        }).catch(() => {
        })
    })
}

const cronDialog: Record<string, any> | null = ref(null)
/**
 * 查看任务
 * @param data
 */
const infoEvent = (data: any) => {
    cronDialog.value.setFormData(data)
    cronDialog.value.showDialog = true
}

</script>

<style lang="scss" scoped>
	.el-input-number.is-controls-right .el-input-number__increase {
		left: 20px !important
	}
</style>
