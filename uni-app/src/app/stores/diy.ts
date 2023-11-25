import { defineStore } from 'pinia'
import { toRaw } from 'vue'

interface Diy {
	mode : string, // 模式：decorate 装修，为空表示正常
	pageMode : string, // 页面展示模式，diy：自定义，fixed：固定
	currentIndex : number,
	global : {
		title : string,
		pageBgColor : string, // 页面背景颜色
		bottomTabBarSwitch : boolean, // 底部导航开关
		bgUrl: string
	},
	// 组件集合
	value : any[]
}

const useDiyStore = defineStore('diy', {
	state: () : Diy => {
		return {
			mode: '',
			pageMode: 'diy',
			currentIndex: -99,
			global: {
				title: "",
				pageBgColor: "", // 页面背景颜色
				bottomTabBarSwitch: true,
				bgUrl: ''
			},
			// 组件集合
			value: []
		}
	},
	getters: {
	},
	actions: {
		// 初始化
		init() {
			// #ifdef H5
			var data = JSON.stringify({
				type: 'init',
				load: true
			});
			// 传输给后台数据
			window.parent.postMessage(data, '*');

			// 监听父页面发来的消息
			window.addEventListener('message', event => {
				try {
					let data = JSON.parse(event.data);
					this.currentIndex = data.currentIndex;
					this.pageMode = data.pageMode;
					if (data.global) this.global = data.global;
					if (data.value) this.value = data.value;

					if (this.value) {
						this.value.forEach((item, index) => {
							item.pageStyle = '';
							if (item.pageBgColor) item.pageStyle += 'background-color:' + item.pageBgColor + ';';
							if (item.margin) {
								item.pageStyle += 'padding-top:' + item.margin.top * 2 + 'rpx' + ';';
								item.pageStyle += 'padding-bottom:' + item.margin.bottom * 2 + 'rpx' + ';';
								item.pageStyle += 'padding-right:' + item.margin.both * 2 + 'rpx' + ';';
								item.pageStyle += 'padding-left:' + item.margin.both * 2 + 'rpx' + ';';
							}
						});
					}
					// console.log('uniapp 接受后台装修返回的组件数据', data);
				} catch (e) {
					console.log('uniapp接受数据错误', e)
				}
			}, false);
			// #endif
		},
		// 将数据传输给后台
		postMessage(index, component) {
			// #ifdef H5
			this.currentIndex = index;
			if (component)
				var data = JSON.stringify({
					type: 'data',
					index: this.currentIndex,
					global: toRaw(this.global),
					value: toRaw(this.value),
					component: toRaw(component)
				});
			// 传输给后台数据
			window.parent.postMessage(data, '*');
			// #endif
		},
		// 选中正在编辑的组件
		changeCurrentIndex(index : number, component : any = null) {
			// #ifdef H5

			// 实际展示禁止编辑
			if (this.mode == '') return;

			// 减少重复请求
			if (this.currentIndex == index) return;
			this.currentIndex = index;
			var data = JSON.stringify({
				type: 'change',
				index,
				component: toRaw(component)
			});
			window.parent.postMessage(data, '*');
			// #endif
		}
	}
})

export default useDiyStore