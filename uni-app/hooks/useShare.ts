import { img, isWeixinBrowser, currRoute, currShareRoute, getToken } from '@/utils/common'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { getShareInfo } from '@/api/diy';
import useMemberStore from '@/stores/member'

// #ifdef H5
import wechat from '@/utils/wechat'
// #endif

export const useShare = () => {
	var wechatOptions : WeixinJsSdk.OnMenuShareAppMessageOptions = {
		title: '',
		link: ''
	};

	var weappOptions = {};

	// #ifdef H5
	const wechatInit = async () => {
		if (!isWeixinBrowser()) return;
		await wechat.init();
	}

	// 微信公众号分享
	const wechatShare = () => {
		if (!isWeixinBrowser()) return;
		wechat.share(wechatOptions);
	}
	// #endif

	const setShare = async (options : any = {}) => {
		let memberStore = useMemberStore();

		// 初始化sdk
		await wechatInit();

		if (options && options.wechat && options.weapp) {
			let query = currShareRoute().params;

			if (memberStore.info) {
				query.mid = memberStore.info.member_id;
			}

			let str = [];
			for (let key in query) {
				str.push(key + '=' + query[key]);
			}

			// #ifdef H5
			let link = location.origin + location.pathname + (str.length > 0 ? '?' + str.join('&') : '');
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
				query: options.weapp.path || '/' + currRoute() + (str.length > 0 ? '?' + str.join('&') : ''),
				imageUrl: options.weapp.url ? img(options.weapp.url) : ''
			}
		} else {
			getShareInfo({ route: '/' + currRoute(), params: JSON.stringify(currShareRoute().params) }).then((res : any) => {
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