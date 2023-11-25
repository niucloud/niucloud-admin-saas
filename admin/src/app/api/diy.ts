import request from '@/utils/request'

/***************************************************** 自定义页面 ****************************************************/

/**
 * 获取自定义页面分页列表
 * @param params
 * @returns
 */
export function getDiyPageList(params: Record<string, any>) {
    return request.get(`diy/diy`, {params})
}

/**
 * 获取自定义页面列表
 * @param params
 * @returns
 */
export function getDiyList(params: Record<string, any>) {
    return request.get(`diy/list`, {params})
}

/**
 * 获取自定义页面详情
 * @param id 自定义页面id
 * @returns
 */
export function getDiyPageInfo(id: number) {
    return request.get(`diy/diy/${id}`);
}

/**
 * 添加自定义页面
 * @param params
 * @returns
 */
export function addDiyPage(params: Record<string, any>) {
    return request.post('diy/diy', params, {showSuccessMessage: true})
}

/**
 * 编辑自定义页面
 * @param params
 */
export function editDiyPage(params: Record<string, any>) {
    return request.put(`diy/diy/${params.id}`, params, {showSuccessMessage: true})
}

/**
 * 设为使用
 * @param params
 */
export function setUseDiyPage(params: Record<string, any>) {
    return request.put(`diy/use`, params, {showSuccessMessage: true})
}

/**
 * 修改自定义页面分享内容
 * @param params
 */
export function editDiyPageShare(params: Record<string, any>) {
    return request.put(`diy/diy/share`, params, {showSuccessMessage: true})
}

/**
 * 删除自定义页面
 * @param id
 * @returns
 */
export function deleteDiyPage(id: number) {
    return request.delete(`diy/diy/${id}`, {showSuccessMessage: true})
}

/**
 * 获取自定义页面初始化数据
 */
export function initPage(params: Record<string, any>) {
    return request.get(`diy/init`, {params})
}

/**
 * 获取自定义链接列表
 */
export function getLink(params: Record<string, any>) {
    return request.get(`diy/link`, {params})
}

/**
 * 获取底部导航数据
 */
export function getDiyBottom(params: Record<string, any>) {
    return request.get(`diy/bottom`, {params})
}

/**
 * 配置底部导航数据
 * @param params
 * @returns
 */
export function setDiyBottom(params: Record<string, any>) {
    return request.post('diy/bottom', params, {showSuccessMessage: true})
}

/**
 * 获取页面模板
 */
export function getDiyTemplate(params: Record<string, any>) {
    return request.get(`diy/template`, {params})
}

/**
 * 获取自定义路由列表
 * @param params
 * @returns
 */
export function getDiyRouteList(params: Record<string, any>) {
    return request.get(`diy/route`, {params})
}

/**
 * 获取自定义路由信息
 * @param params
 */
export function getDiyRouteInfo(params: Record<string, any>) {
    return request.get(`diy/route/info`, {params});
}

/**
 * 修改路由页面分享内容
 * @param params
 */
export function editDiyRouteShare(params: Record<string, any>) {
    return request.put(`diy/route/share`, params, {showSuccessMessage: true})
}

/**
 * 获取自定义页面列表
 * @param params
 * @returns
 */
export function getDecoratePage(params: Record<string, any>) {
    return request.get(`diy/decorate`, {params})
}

/**
 * 切换模板
 * @param params
 * @returns
 */
export function changeTemplate(params: Record<string, any>) {
    return request.put(`diy/change`, params, {showSuccessMessage: true})
}

/**
 * 获取预览数据
 * @param params
 * @returns
 */
export function getPreviewData(params: Record<string, any>) {
    return request.put(`diy/preview`, params, {showSuccessMessage: false})
}