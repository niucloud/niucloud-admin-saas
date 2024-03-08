<template>
	<div class="main-container">
		<el-card class="box-card !border-none" shadow="never">
			<div class="flex justify-between items-center mb-[20px]">
				<span class="text-page-title">{{ pageName }}</span>
				<el-button type="primary" @click="showEvent">{{ t('addCron') }}</el-button>
			</div>
			<el-alert class="warm-prompt " type="info">
				<template #default>
					<div class="flex items-center">
						<div>
							<p>
								{{ t('cronTipsOne') }}
							</p>
							<p class="mt-2">
								{{ t('cronTipsTwo') }}
							</p>
						</div>
					</div>
				</template>
			</el-alert>
			<div class="mt-[20px]">
				<el-table :data="cronTableData.data" size="large" v-loading="cronTableData.loading">

					<template #empty>
						<span>{{ !cronTableData.loading ? t('emptyData') : '' }}</span>
					</template>

					<el-table-column prop="name" :label="t('title')" min-width="150" />
					<el-table-column prop="key" :label="t('key')" min-width="150" />
					<el-table-column :label="t('crondType')" min-width="150">
						<template #default="{ row }">
							{{ row.crontab_content }}
						</template>
					</el-table-column>
					<el-table-column prop="status_name" :label="t('openStatus')" min-width="100" />
					<el-table-column :label="t('operation')" align="right" fixed="right" width="130">
						<template #default="{ row }">
							<el-button type="primary" link @click="editEvent(row)">{{ t('edit') }}</el-button>
							<el-button type="primary" link @click="deleteEvent(row.id)">{{ t('delete') }}</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="mt-[16px] flex justify-end">
					<el-pagination v-model:current-page="cronTableData.page" v-model:page-size="cronTableData.limit"
						layout="total, sizes, prev, pager, next, jumper" :total="cronTableData.total"
						@size-change="loadCronList()" @current-change="loadCronList" />
				</div>
			</div>

		</el-card>
		<cron-info ref="cronDialog" @complete="loadCronList" />
		<el-dialog v-model="showDialog" :title="t('editCron')" width="750px" :destroy-on-close="true">
			<el-form :model="formData" label-width="110px" ref="formRef" :rules="formRules" class="page-form"
				v-loading="loading">
				<el-form-item :label="t('cronTemplate')" class="items-center" prop="key">
					<el-select v-model="formData.key">
						<el-option v-for="item in templateList" :key="item.key" :label="item.name" :value="item.key" />
					</el-select>
				</el-form-item>
				<el-form-item :label="t('cronTime')" prop="timeDate">
					<el-select v-model="formData.time.type" class="w-[150px]">
						<el-option v-for="(item, index) in date_type" :key="index" :label="item" :value="index" />
					</el-select>
					<div class="flex">
						<el-select v-model="formData.time.week" class="ml-2 w-[120px]" v-if="formData.time.type == 'week'">
							<el-option v-for="(item, index) in week_list" :key="index" :label="item" :value="index" />
						</el-select>
						<el-input v-model="formData.time.day" class="ml-2 w-[120px]"
							v-if="['month', 'day'].indexOf(formData.time.type) != -1">
							<template #append>{{ t('day') }}</template>
						</el-input>
						<el-input v-model="formData.time.hour" class="ml-2 w-[120px]"
							v-if="['month', 'day', 'hour', 'week'].indexOf(formData.time.type) != -1">
							<template #append>{{ t('hour') }}</template>
						</el-input>
						<el-input v-model="formData.time.min" class="ml-2 w-[120px]"
							v-if="['month', 'day', 'hour', 'week', 'min'].indexOf(formData.time.type) != -1">
							<template #append>{{ t('min') }}</template>
						</el-input>
					</div>
				</el-form-item>
				<el-form-item :label="t('isopen')">
					<div class="input-width flex items-center text-sm">
						<el-radio-group v-model="formData.status">
							<el-radio :label="1">{{ t('yes') }}</el-radio>
							<el-radio :label="2">{{ t('no') }}</el-radio>
						</el-radio-group>
					</div>
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
import { reactive, ref, computed } from 'vue'
import { t } from '@/lang'
import {
    getCronList,
    getCronTemplate,
    getCronDateType,
    getWeek,
    addCron,
    editCron,
    deleteCron
} from '@/app/api/sys'
import { ElMessageBox, FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import CronInfo from '@/app/views/setting/components/cron-info.vue'

const route = useRoute()
const pageName = route.meta.title

const cronTableData = reactive({
    page: 1,
    limit: 10,
    total: 0,
    loading: true,
    data: [],
    searchParam: {
        title: '',
        type: '',
        last_time: ''
    }
})
const templateList = ref([])
const date_type = ref([])
const week_list = ref([])
const searchFormRef = ref<FormInstance>()

const setTypeList = async () => {
    templateList.value = await (await getCronTemplate()).data
    date_type.value = await (await getCronDateType()).data
    week_list.value = await (await getWeek()).data
}
setTypeList()

/**
 * 获取任务列表
 */
const loadCronList = (page: number = 1) => {
    cronTableData.loading = true
    cronTableData.page = page

    getCronList({
        page: cronTableData.page,
        limit: cronTableData.limit,
        ...cronTableData.searchParam
    }).then(res => {
        cronTableData.loading = false
        cronTableData.data = res.data.data
        cronTableData.total = res.data.total
    }).catch(() => {
        cronTableData.loading = false
    })
}
loadCronList()

const router = useRouter()

const showDialog = ref(false)
const initialFormData = {
    id: 0,
    key: '',
    status: 2,
    time: {
        type: 'min',
        week: '',
        day: '',
        hour: '',
        min: ''
    }
}
const formData: Record<string, any> = reactive({ ...initialFormData })
const formRef = ref<FormInstance>()

const showEvent = () => {
    formData.id = 0,
    formData.key = '',
    formData.status = 2,
    formData.time.type = 'min',
    formData.time.week = '',
    formData.time.day = '',
    formData.time.hour = '',
    formData.time.min = '',
    showDialog.value = true
}

// 表单验证规则
const formRules = computed(() => {
    return {
        key: [
            { required: true, message: t('titlePlaceholder'), trigger: 'blur' }
        ],
        timeDate: [
            { required: true, validator: validatePass, trigger: 'blur' }
        ],
    }
})

const validatePass = (rule: any, value: any, callback: any) => {
    if (formData.time.type == 'min' && formData.time.min != '') {
        return callback()
    }
    if (formData.time.type == 'week' && formData.time.week != '' && formData.time.hour != '' && formData.time.min != '') {
        return callback()
    }
    if (formData.time.type == 'month' && formData.time.day != '' && formData.time.hour != '' && formData.time.min != '') {
        return callback()
    }
    if (formData.time.type == 'day' && formData.time.day != '' && formData.time.hour != '' && formData.time.min != '') {
        return callback()
    }
    if (formData.time.type == 'hour' && formData.time.hour != '' && formData.time.min != '') {
        return callback()
    }
    return callback(new Error(t('cronTimeTips')))
}
const save_type = ref(false)
const addEvent = async (formEl: FormInstance | undefined) => {
    if (save_type.value || !formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            save_type.value = true
            const data = formData
            const save = formData.id > 0 ? editCron : addCron
            save(data).then(res => {
                save_type.value = false
                showDialog.value = false
                loadCronList()
            }).catch(() => {
                save_type.value = false
            })
        }
    })
}

const editEvent = (item:any) => {
    formData.id = item.id,
    formData.key = item.key,
    formData.status = item.status
    formData.time = item.time
    showDialog.value = true
}

const deleteEvent = (id: number) => {
    ElMessageBox.confirm(t('cronDeleteTips'), t('warning'),
        {
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel'),
            type: 'warning'
        }
    ).then(() => {
        deleteCron(id).then(() => {
            loadCronList()
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
