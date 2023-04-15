import { img, isWeixinBrowser, currRoute, currShareRoute, getToken } from '@/utils/common'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { getShareInfo } from '@/api/diy';
import useMemberStore from '@/stores/member'

// #ifdef H5
import wechat from '@/utils/wechat'
// #endif

export const useShare = () => {
	let wechatOptions : WeixinJsSdk.OnMenuShareAppMessageOptions = {
		title: '',
		link: ''
	};

	let weappOptions = {};

	// #ifdef H5
	// 微信公众号分享
	const wechatShare = () => {
		if (!isWeixinBrowser()) return;
		wechat.share(wechatOptions);
	}
	// #endif

	const setShare = (options : any = {}) => {
		let memberStore = useMemberStore();

		if (options && options.wechat && options.weapp) {
			let query = currShareRoute().params;
			if (memberStore.info) {
				query.push('mid=' + memberStore.info.member_id);
			}

			// #ifdef H5
			let link = location.origin + location.pathname + (query.length > 0 ? '?' + query.join('&') : '');
			wechatOptions = {
				title: options.wechat.title || '',
				link: options.wechat.link || link,
				desc: options.wechat.desc || '',
				imgUrl: options.wechat.url ? img(options.wechat.url) : ''
			}
			wechatShare()
			// #endif

			weappOptions = {
				title: options.weapp.title || '',
				query: options.weapp.path || '/' + currRoute() + (query.length > 0 ? '?' + query.join('&') : ''),
				imageUrl: options.weapp.url ? img(options.weapp.url) : ''
			}
		} else {
			getShareInfo({ route: '/' + currRoute(), params: currShareRoute().params.toString() }).then((res : any) => {
				if (res.code == 200) {
					let data = res.data;

					// #ifdef H5
					let wechat = data.wechat;
					if (wechat) {
						let link = location.origin + location.pathname + (data.query ? '?' + data.query : '');
						wechatOptions = {
							link: link,
							title: wechat.title,
							desc: wechat.desc,
							imgUrl: wechat.url ? img(wechat.url) : ''
						}
					}
					wechatShare()
					// #endif

					let weapp = data.weapp;
					if (weapp) {
						weappOptions = {
							query: data.url,
							title: weapp.title,
							imageUrl: weapp.url ? img(weapp.url) : ''
						}
					}
				}
			})
		}

	}

	// 小程序分享，分享给好友
	const shareApp = (options = {}) => {
		onShareAppMessage(() => {
			return {
				...weappOptions,
				...options
			}
		})

	}

	// 小程序分享，分享到朋友圈
	const shareTime = (options = {}) => {
		onShareTimeline(() => {
			return {
				...weappOptions,
				...options
			}
		})
	}

	return {
		setShare: setShare,
		onShareAppMessage: shareApp,
		onShareTimeline: shareTime,
	}
}