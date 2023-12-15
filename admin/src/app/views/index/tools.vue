<template>
	<div class="box-border pt-[64px]">
		<div class="text-[20px] text-[#222] mb-[32px] pl-[14px]">工具管理</div>
		<div class="flex flex-wrap mt-[28px]">
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/addon')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">插件开发</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						点击新建插件，生成插件后系统会生成对应插
					</div>
				</div>
				<img src="@/app/assets/images/tools/addon_develop.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/code')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">代码生成</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						代码生成
					</div>
				</div>
				<img src="@/app/assets/images/tools/code.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/list')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">数据字典</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						数据字典
					</div>
				</div>
				<img src="@/app/assets/images/tools/sys_dict_list.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/update')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">更新缓存</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						更新缓存
					</div>
				</div>
				<img src="@/app/assets/images/tools/tools_Update_cache.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/detection')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">环境监测</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						环境监测
					</div>
				</div>
				<img src="@/app/assets/images/tools/tools_check_environment.png" class="w-[256px] h-[128px] cursor-pointer" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/schedule')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">计划任务</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						计划任务
					</div>
				</div>
				<img src="@/app/assets/images/tools/tools_schedule.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/authorize')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">授权信息</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						查看授权信息及重新认证授权
					</div>
				</div>
				<img src="@/app/assets/images/tools/app_auth.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/setting/admin')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">平台菜单</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						平台菜单
					</div>
				</div>
				<img src="@/app/assets/images/tools/official_market.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="toLink('/admin/tools/setting/site')">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">站点菜单</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						站点菜单
					</div>
				</div>
				<img src="@/app/assets/images/tools/official_market.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="developerDialogVisible = true">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">开发模式</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						开发环境和生产环境说明
					</div>
				</div>
				<img src="@/app/assets/images/tools/developer.png" class="w-[256px] h-[128px]" />
			</div>
			<div class="w-[256px] tools-item-shadow mb-[24px] mx-[14px] rounded-[8px] flex flex-col cursor-pointer leading-[1]" @click="goRouter">
				<div class="flex-1 pt-[18px] pb-[14px] px-[24px] flex flex-col">
					<span class="text-[16px] text-[#222] font-bold">官方市场</span>
					<div class="text-[13px] text-[#6D7278] leading-[18px] mt-[8px] truncate">
						官方市场
					</div>
				</div>
				<img src="@/app/assets/images/tools/official_market.png" class="w-[256px] h-[128px]" />
			</div>
		</div>
		<el-dialog v-model="developerDialogVisible" class="developer-dialog-wrap" title="开发人员模式说明" width="30%" :before-close="handleClose">
			<div>
				<p class="text-[16px] mb-[4px] text-[#333]">开发模式</p>
				<div class="text-[14px] indent-[2em]">
					开发人员模式即软件开发环境，指框架开启了开发模式(DEBUG=TRUE) ，开发模式时会出现开发选项卡，仅用于开发人员使用，包括应用及插件的安装卸载，系统升级等等。本菜单及子项功能均不受系统管理和权限控制
				</div>
				<p class="text-[16px] mt-[15px] mb-[4px] text-[#333]">生产模式</p>
				<div class="text-[14px] indent-[2em]">
					生产模式即软件生产环境，指框架关闭了调试开发模式(DEBUG=FALSE) 软件正式部署运营开发选项卡隐藏，一般来说，开发人员开发或者部署好环境后，要关闭开发模式。
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="developerDialogVisible = false">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
    import {reactive, ref, onMounted, computed} from 'vue'
    import {t} from '@/lang'
    import {getAuthaddon} from '@/app/api/auth'
    import {img} from '@/utils/common'
    import {useRouter} from 'vue-router'
    import storage from '@/utils/storage'
    import {findFirstValidRoute} from '@/router/routers'
	import {UserFilled} from '@element-plus/icons-vue'
	import useSystemStore from '@/stores/modules/system'
	
	const systemStore = useSystemStore()
	systemStore.setHeadMenu('');

    const router = useRouter()
	let developerDialogVisible = ref(false)

	const toLink = (link)=>{
		router.push(link)
	}
    const goRouter = () => {
        window.open('https://www.niucloud.com/app')
    }
</script>

<style lang="scss" scoped></style>
<style>
	.tools-item-shadow{
		box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.2);
	}
	/* 多行超出隐藏 */
	.multi-hidden {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.developer-dialog-wrap .el-dialog__body{
		padding: 15px 20px;
	}
</style>
