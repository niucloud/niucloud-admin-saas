<template>
	<view class="member-record-list">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getListFn" top="">
			<view v-for="(item,index) in list" :key="item.id" class="member-record-item">
				<view class="name">{{item.from_type_name}}</view>
				<view class="desc" v-if="item.memo">{{item.memo}}</view>
				<view class="desc">{{item.create_time}}</view>
				<view class="money" :class="item.account_data > 0 ? 'text-active' : ''">
					{{ item.account_data > 0 ? '+' + item.account_data : item.account_data }}
				</view>
			</view>
			<mescroll-empty v-if="!list.length && loading" :option="{tip : (type == 'commission' ? t('commissemptyTip') : t('emptyTip') )}"></mescroll-empty>
		</mescroll-body>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { t } from '@/locale'
	import MescrollBody from '@/components/mescroll/mescroll-body/mescroll-body.vue';
	import MescrollEmpty from '@/components/mescroll/mescroll-empty/mescroll-empty.vue';
	import useMescroll from '@/components/mescroll/hooks/useMescroll.js';
	import { getBalanceList, getMoneyList, getCommissionList} from '@/api/member';
	import { onPageScroll, onReachBottom, onLoad, onShow } from '@dcloudio/uni-app';
	const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom);

	const type = ref('')

	onLoad((options) => {
		type.value = options.type || 'balance';
	});

	const list = ref<Array<any>>([]),
		loading = ref<boolean>(false),
		mescrollRef = ref(null);

	interface mescrollStructure {
		num : number,
		size : number,
		endSuccess : Function,
		[propName : string] : any
	}

	const getListFn = (mescroll : mescrollStructure) => {
		loading.value = false;
		let data : Object = {
			page: mescroll.num,
			page_size: mescroll.size
		};
		interface acceptingDataStructure {
			data : acceptingDataItemStructure,
			msg : string,
			code : number
		}
		interface acceptingDataItemStructure {
			data : object,
			[propName : string] : number | string | object
		}

		let fnList = (params : any) => { };
		if (type.value == 'balance') fnList = getBalanceList;
		else if (type.value == 'money') fnList = getMoneyList;
		else if (type.value == 'commission') fnList = getCommissionList;

		fnList(data).then((res : acceptingDataStructure) => {
			let newArr = res.data.data;
			mescroll.endSuccess(newArr.length);
			//设置列表数据
			if (mescroll.num == 1) {
				list.value = []; //如果是第一页需手动制空列表
			}
			list.value = list.value.concat(newArr);
			loading.value = true;
		}).catch(() => {
			loading.value = true;
			mescroll.endErr(); // 请求失败, 结束加载
		})
	}
</script>

<style lang="scss">
@import '@/styles/member_record_list.scss';
</style>