// #ifdef H5
import wx from 'weixin-js-sdk'
// #endif
import { getWechatSkdConfig } from '@/app/api/system'
import { isWeixinBrowser } from '@/utils/common'

class Wechat {
	constructor() {
		// #ifdef H5
		// isWeixinBrowser() && this.init()
		// #endif
	}

	public init() {
		getWechatSkdConfig({
			url: uni.getSystemInfoSync().platform == 'ios' ? uni.getStorageSync('initUrl') : location.href
		}).then((res : responseResult) => {
			const { data } = res
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature,// 必填，签名
				jsApiList: ['chooseWXPay', 'updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
			});
		})
	}

	/**
	 * 发起支付
	 */
	public pay(options : WeixinJsSdk.ChooseWXPayOptions) {
		wx.ready(() => {
			wx.chooseWXPay(options)
		})
	}

	/**
	 * 分享设置
	 */
	public share(options : WeixinJsSdk.OnMenuShareAppMessageOptions) {
		wx.ready(() => {
			// 分享给朋友
			wx.updateAppMessageShareData(options)
			// 分享到朋友圈
			wx.updateTimelineShareData(options)
		})
	}
}

export default new Wechat()
