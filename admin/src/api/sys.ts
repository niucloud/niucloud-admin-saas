import request from '@/utils/request'

/***************************************************** 系统整体信息 *************************************************/

/**
 * 系统信息
 * @returns 
 */
export function getInfo() {
    return request.get('sys/role')
}

/**
 * 系统信息
 * @returns 
 */
export function getUrl() {
    return request.get('sys/url')
}
/***************************************************** 用户组 ****************************************************/

/**
 * 用户组列表
 * @returns 
 */
export function getRoleList(params: Record<string, any>) {
    return request.get('sys/role', { params })
}

/**
 * 用户组详情
 * @param params 
 * @returns 
 */
export function getRoleInfo(roleId: number) {
    return request.get(`sys/role/${roleId}`)
}

/**
 * 添加用户组
 * @param params 
 * @returns 
 */
export function addRole(params: Record<string, any>) {
    return request.post(`sys/role`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑用户组
 * @param role_id 
 * @param params 
 * @returns 
 */
export function editRole(params: Record<string, any>) {
    return request.put(`sys/role/${params.role_id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除用户组
 * @param role_id 
 * @returns 
 */
export function deleteRole(roleId: number) {
    return request.delete(`sys/role/${roleId}`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 全部分组
 * @returns 
 */
export function allRole() {
    return request.get('sys/role/all')
}

/***************************************************** 全部菜单 ****************************************************/

/**
 * 获取全部菜单
 * @returns 
 */
export function getMenus(type: string) {
    return request.get(`sys/menu/${type}`)
}

/**
 * 获取菜单信息
 * @param id 
 * @returns 
 */
export function getMenuInfo(menu_key: string) {
    return request.get(`sys/menu/info/${menu_key}`);
}

/**
 * 添加菜单
 * @param params 
 * @returns 
 */
export function addMenu(params: Record<string, any>) {
    return request.post('sys/menu', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 更新菜单
 * @param id 
 * @param params 
 * @returns 
 */
export function editMenu(params: Record<string, any>) {
    return request.put(`sys/menu/${params.menu_key}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除菜单
 * @param id 
 * @returns 
 */
export function deleteMenu(menu_key: string) {
    return request.delete(`sys/menu/${menu_key}`, { showErrorMessage: true, showSuccessMessage: true })
}

/***************************************************** 站点菜单 ****************************************************/

/**
 * 获取站点菜单
 * @returns 
 */
export function getSiteMenus() {
    return request.get(`site/site/menu`)
}


/***************************************************** 设置 ****************************************************/

/**
 * 获取网站设置
 * @returns 
 */
export function getWebsite() {
    return request.get('sys/config/website')
}

/**
 * 更新网站设置
 * @param params 
 * @returns 
 */
export function setWebsite(params: Record<string, any>) {
    return request.put(`sys/config/website`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取版权设置
 * @returns 
 */
export function getCopyright() {
    return request.get('sys/config/copyright')
}

/**
 * 更新版权设置
 * @param params 
 * @returns 
 */
export function setCopyright(params: Record<string, any>) {
    return request.put(`sys/config/copyright`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取附件组列表
 * @param params 
 * @returns 
 */
export function getAttachmentCategoryList(params: Record<string, any>) {
    return request.get(`sys/attachment/category`, { params })
}

/**
 * 添加分类
 * @param params 
 */
export function addAttachmentCategory(params: Record<string, any>) {
    return request.post(`sys/attachment/category`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑分类
 * @param params 
 * @returns 
 */
export function editAttachmentCategory(params: Record<string, any>) {
    return request.put(`sys/attachment/category/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除分类
 * @param id 
 * @returns 
 */
export function deleteAttachmentCategory(id: number) {
    return request.delete(`sys/attachment/category/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取附件列表
 * @param params 
 * @returns 
 */
export function getAttachmentList(params: Record<string, any>) {
    return request.get(`sys/attachment`, { params })
}

/**
 * 删除附件
 * @param params 
 * @returns 
 */
export function deleteAttachment(params: Record<string, any>) {
    return request.delete(`sys/attachment/del`, { data: params, showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 移动附件
 * @param params 
 * @returns 
 */
export function moveAttachment(params: Record<string, any>) {
    return request.put(`sys/attachment/batchmove`, params)
}


/***************************************************** 地址管理 ****************************************************/

/**
 * 获取下级地址列表
 * @param params 
 * @returns 
 */
export function getAreaListByPid(pid: number = 0) {
    return request.get(`sys/area/list_by_pid/${pid}`)
}

/**
 * 获取地址树列表
 * @param params 
 * @returns 
 */
export function getAreatree(level: number = 1) {
    return request.get(`sys/area/tree/${level}`)
}

/***************************************************** 存储设置 ****************************************************/

/**
 * 获取存储配置列表
 * @param params 
 * @returns 
 */
export function getStorageList() {
    return request.get(`sys/storage`)
}

/**
 * 获取存储详情
 * @param params 
 * @returns 
 */
export function getStorageInfo(type: string) {
    return request.get(`sys/storage/${type}`)
}

/**
 * 修改存储
 * @param params 
 * @returns 
 */
export function editStorage(params: Record<string, any>) {
    return request.put(`sys/storage/${params.storage_type}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/***************************************************** 支付设置 ****************************************************/

/**
 * 获取支付设置
 * @returns 
 */
export function getPayConfig(type: string) {
    return request.get(`pay/config/${type}`)
}

/**
 * 配置支付
 * @returns 
 */
export function setPayConfig(params: Record<string, any>) {
    return request.put(`pay/config/${params.type}`, params, { showErrorMessage: true, showSuccessMessage: true });
}

/**
 * 获取支付列表
 * @returns 
 */
export function getPayList() {
    return request.get(`pay/lists`)
}

/***************************************************** 打款设置 ****************************************************/
/**
 * 获取打款设置配置
 * @returns channel 渠道
 * @returns  
 */
export function getTransferInfo(channel) {
    return request.get(`pay/channel/lists/${channel}`)
}

/**
 * 设置打款配置
 * @param params 
 * @returns
 */
export function setTransferInfo(params: Record<string, any>) {
    return request.post(`pay/channel/set/transfer`, params)
}
/***************************************************** 定时任务 ****************************************************/

/**
 * 获取任务列表
 * @returns 
 */
export function getCronList(params: any) {
    return request.get(`sys/cron`, { params })
}

/**
 * 任务详情
 * @returns 
 */
export function getCronInfo(id: string) {
    return request.get(`sys/cron/${id}`);
}

/**
 * 任务类型
 * @returns 
 */
export function getCronType() {
    return request.get(`sys/cron/type`)
}

/***************************************************** 协议管理 ****************************************************/

/**
 * 获取协议列表
 * @returns 
 */
export function getAgreementList() {
    return request.get(`sys/agreement`)
}

/**
 * 协议详情
 * @returns 
 */
export function getAgreementInfo(key: string) {
    return request.get(`sys/agreement/${key}`);
}

/**
 * 更新协议
 * @returns 
 */
export function editAgreement(params: Record<string, any>) {
    return request.put(`sys/agreement/${params.key}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 协议详情
 * @returns 
 */
export function getChannelType() {
    return request.get(`sys/channel`);
}


/**
 * 获取渠道域名
 * @returns 
 */
export function getSceneDomain() {
    return request.get(`sys/scene_domain`);
}

/***************************************************** 登录注册配置 ****************************************************/

/**
 * 管理端登录注册配置
 * @param params 
 * @returns 
 */
export function getConfigLogin() {
    return request.get(`sys/config/login`)
}

/**
 * 设置管理端登录注册配置
 * @param params 
 * @returns 
 */
export function setConfigLogin(params: Record<string, any>) {
    return request.put(`sys/config/login`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取支付设置
 */
export function getPayConfigList() {
    return request.get(`pay/channel/lists`)
}

/**
 * 设置支付配置
 */
export function setPatConfig(params: Record<string, any>) {
    return request.post(`pay/channel/set/all`, params, { showErrorMessage: true, showSuccessMessage: true })
}


/***************************************************** 刷新菜单 ****************************************************/
/**
 * 刷新菜单
 */
export function menuRefresh(params: Record<string, any>) {
    return request.post(`sys/menu/refresh`,{},{ showErrorMessage: true, showSuccessMessage: true })
}

/***************************************************** 获取应用 ****************************************************/
/**
 * 获取应用
 */
export function getAppMange() {
    return request.get(`sys/applist`)
}

