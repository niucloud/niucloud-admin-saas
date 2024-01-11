<template>
	<div class="main-container" v-loading="loading">
		<div class="detail-head !ml-[20px] !mb-[5px]">
			<div class="left" @click="router.push({ path: '/member/member' })">
				<span class="iconfont iconxiangzuojiantou !text-xs"></span>
				<span class="ml-[1px]">{{t('returnToPreviousPage')}}</span>
			</div>
			<span class="adorn">|</span>
			<span class="right">{{ pageName }}</span>
		</div>
		<el-card class="box-card !border-none" shadow="never">
			<div class="bg-[#FAFAFD] py-[20px] pr-[80px] pl-[280px] relative">
				<div class="member-info absolute w-[250px]">
					<div class="flex items-center">
						<span class="text-[14px] min-w-[110px] text-right mr-[20px]">{{ t('headimg') }}</span>
						<span class="flex items-end text-[14px]">
							<img class="w-[50px] h-[50px] inline-block" v-if="formData.headimg" :src="img(formData.headimg)" alt="">
							<img class="w-[50px] h-[50px] inline-block" v-else src="@/app/assets/images/default_headimg.png" alt="">
							<el-icon @click="editMemberInfo('headimg')" class="-bottom-[2px] -right-[4px] cursor-pointer">
								<EditPen color="#273CE2" />
							</el-icon>
						</span>
					</div>
					<div class="flex items-center mt-[20px]">
						<span class="text-[14px] min-w-[110px] text-right mr-[20px]">UID</span>
						<span class="member-info-item text-[14px] text-[#666666] font-bold w-[150px]">
							{{ formData.member_no || t('notAvailable') }}
						</span>
					</div>
				</div>
				<div>
					<el-row justify="space-evenly" class="flex">
						<el-col :span="5">
							<div class="statistic-card">
								<el-statistic :value="formData.point">
									<template #title>
										<div style="display: inline-flex; align-items: center">
											<span class="text-[14px]">
												{{ t('point') }}
											</span>
											<el-tooltip effect="dark" :content="t('adjust')" placement="top">
												<el-icon @click="adjustPoint(formData)" class="ml-2 cursor-pointer" :size="12">
													<EditPen color="#273CE2" />
												</el-icon>
											</el-tooltip>
											<el-tooltip effect="dark" :content="t('detail')" placement="top">
												<el-icon @click="infoPoint(formData)" class="ml-2 cursor-pointer" :size="12">
													<View />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
								</el-statistic>
								<div class="statistic-footer">
									<div class="footer-item text-[14px] text-[#333333]">
										<span>{{ t('accumulative') }}</span>
										<span class="green ml-1">
											{{ formData.point_get }}
										</span>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="5">
							<div class="statistic-card">
								<el-statistic :value="formData.balance">
									<template #title>
										<div style="display: inline-flex; align-items: center">
											<span class="text-[14px]">
												{{ t('balance') }}
											</span>
											<el-tooltip effect="dark" :content="t('adjust')" placement="top">
												<el-icon @click="adjustBalance(formData)" class="ml-2 cursor-pointer" :size="12">
													<EditPen color="#273CE2" />
												</el-icon>
											</el-tooltip>
											<el-tooltip effect="dark" :content="t('detail')" placement="top">
												<el-icon @click="infoBalance(formData)" class="ml-2 cursor-pointer" :size="12">
													<View />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
								</el-statistic>
								<div class="statistic-footer">
									<div class="footer-item text-[14px] text-[#333333]">
										<span>{{ t('accumulative') }}</span>
										<span class="red ml-1">
											{{ formData.balance_get }}
										</span>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="5">
							<div class="statistic-card">
								<el-statistic :value="formData.money" title="New transactions today ">
									<template #title>
										<div style="display: inline-flex; align-items: center">
											<span class="text-[14px]">
												{{ t("money") }}
											</span>
											<el-tooltip effect="dark" :content="t('detail')" placement="top">
												<el-icon @click="infoBalance(formData)" class="ml-2 cursor-pointer" :size="12">
													<View />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
								</el-statistic>
								<div class="statistic-footer">
									<div class="footer-item text-[14px] text-[#333333]">
										<span>{{ t('accumulative') }}</span>
										<span class="green ml-1">
											{{ formData.money_get }}
										</span>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="5">
							<div class="statistic-card">
								<el-statistic :value="formData.commission" title="New transactions today">
									<template #title>
										<div style="display: inline-flex; align-items: center ">
											<span class="text-[14px]">
												{{ t("commission") }}
											</span>
											<el-tooltip effect="dark" :content="t('detail')" placement="top">
												<el-icon @click="infoCommission(formData)" class="ml-2 cursor-pointer" :size="12">
													<View />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
								</el-statistic>
								<div class="statistic-footer">
									<div class="footer-item text-[14px] text-[#333333]">
										<span>{{ t('accumulative') }}</span>
										<span class="green ml-1">
											{{ formData.commission_get }}
										</span>
									</div>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-card>
		<el-card class="box-card !border-none" shadow="never">
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('urserName') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.username || t('notAvailable') }}
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('nickname') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.nickname || t('notAvailable') }}
				</span>
			</div>

			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('mobile') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.mobile || t('notAvailable') }}
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('memberLabel') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.member_label_name.toString() || t('notAvailable') }}<el-icon @click="editMemberInfo('member_label')" class="-bottom-[2px] -right-[4px] cursor-pointer">
						<EditPen color="#273CE2" />
					</el-icon>
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('birthday') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.birthday || t('notAvailable') }}<el-icon @click="editMemberInfo('birthday')" class="-bottom-[2px] -right-[4px] cursor-pointer">
						<EditPen color="#273CE2" />
					</el-icon>
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('sex') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.sex == 1 && t('manSex') || formData.sex == 2 && t('girlSex') || t('secrecySex') }}<el-icon @click="editMemberInfo('sex')" class="-bottom-[2px] -right-[4px] cursor-pointer">
						<EditPen color="#273CE2" />
					</el-icon>
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('wxUnionid') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.wx_unionid || t('notAvailable') }}
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('weappOpenid') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.weapp_openid || t('notAvailable') }}
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('wxOpenid') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.wx_openid || t('notAvailable') }}
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('registeredSource') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.register_channel_name || t('notAvailable') }}
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('createTime') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.create_time || t('notAvailable') }}
				</span>
			</div>
			<div class="flex items-center mt-[15px]">
				<span class="text-[14px] w-[130px] text-right mr-[20px]">{{ t('lastVisitTime') }}</span>
				<span class="text-[14px] text-[#666666]">
					{{ formData.last_visit_time || t('notAvailable') }}
				</span>
			</div>
		</el-card>

		<point-edit ref="pointDialog" @complete="getMemberInfoFn" />
		<balance-edit ref="balanceDialog" @complete="getMemberInfoFn" />
		<edit-member ref="editMemberDialog" @complete="getMemberInfoFn()" />
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { t } from '@/lang'
import { getMemberInfo } from '@/app/api/member'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { img } from '@/utils/common'
import PointEdit from '@/app/views/member/components/member-point-edit.vue'
import BalanceEdit from '@/app/views/member/components/member-balance-edit.vue'
import EditMember from '@/app/views/member/components/edit-member.vue'
// import colorGradient from '../../../../uniapp/src/uni_modules/vk-uview-ui/libs/function/colorGradient'
import useAppStore from '@/stores/modules/app'

const route = useRoute()
const pageName = route.meta.title
const appStore = useAppStore()

const loading = ref(true)

// 获取会员信息
const id: number = parseInt(route.query.id || 0)
const formData: any = reactive({ member_label_name: '' })

const getMemberInfoFn = async () => {
    loading.value = true
    if (id) {
        const data = await (await getMemberInfo(id)).data
        if (!data || Object.keys(data).length == 0) {
            ElMessage.error(t('memberNull'))
            setTimeout(() => {
                router.go(-1)
            }, 2000)
            return false
        }

        Object.keys(data).forEach((item) => {
            formData[item] = data[item]
        })

        if (formData?.member_label_array && Object.keys(formData.member_label_array)?.length) {
            formData.member_label = Object.values(formData.member_label_array).map((item: any, index) => {
                return item.label_id
            })

            formData.member_label_name = Object.values(formData.member_label_array).map((item: any, index) => {
                return item.label_name
            })
        }
        loading.value = false
    } else {
        loading.value = false
    }
}
getMemberInfoFn()

const pointDialog: Record<string, any> | null = ref(null)
const balanceDialog: Record<string, any> | null = ref(null)
const editMemberDialog: Record<string, any> | null = ref(null)

/**
 *  修改会员信息
 */
const editMemberInfo = (type: any) => {
    const data = ref({
        type,
        id,
        data: formData
    })
    editMemberDialog.value.setDialogType(data.value)
    editMemberDialog.value.showDialog = true
}

/**
 * 调整积分
 */
const adjustPoint = (data: any) => {
    pointDialog.value.setFormData(data)
    pointDialog.value.showDialog = true
}

/**
 * 调整余额
 */
const adjustBalance = (data: any) => {
    balanceDialog.value.setFormData(data)
    balanceDialog.value.showDialog = true
}

const router = useRouter()

/**
 * 积分详情
 */
const infoPoint = () => {
    router.push(`/member/point?id=${id}`)
}

/**
 * 余额详情
 */
const infoBalance = () => {
    router.push(`/member/balance?id=${id}`)
}

/**
 * 佣金详情
 */
const infoCommission = () => {
    router.push(`/member/commission?id=${id}`)
}

</script>

<style lang="scss" scoped>
.el-col {
	background-color: #FAFAFD;
}

.member-info {
	left: 0px
}

.member-info-item {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
}
</style>
