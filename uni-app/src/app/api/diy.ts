import request from '@/utils/request'

/**
 * 获取自定义页面信息
 */
export function getDiyInfo(params : Record<string, any>) {
	return request.get('diy/diy', params)
}

/**
 * 获取底部导航信息
 */
export function getTabbarInfo() {
	return request.get('diy/tabbar')
}

/**
 * 获取页面分享信息
 */
export function getShareInfo(params : Record<string, any>) {
	return request.get('diy/share', params)
}