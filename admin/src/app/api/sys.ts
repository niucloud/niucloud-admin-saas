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
 * @param roleId
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
    return request.post(`sys/role`, params, { showSuccessMessage: true })
}

/**
 * 编辑用户组
 * @param params
 */
export function editRole(params: Record<string, any>) {
    return request.put(`sys/role/${params.role_id}`, params, { showSuccessMessage: true })
}

/**
 * 删除用户组
 * @param roleId
 */
export function deleteRole(roleId: number) {
    return request.delete(`sys/role/${roleId}`, { showSuccessMessage: true })
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
 * @param menu_key
 */
export function getMenuInfo(app_type: string, menu_key: string) {
    return request.get(`sys/menu/${app_type}/info/${menu_key}`);
}

/**
 * 添加菜单
 * @param params
 * @returns
 */
export function addMenu(params: Record<string, any>) {
    return request.post('sys/menu', params, { showSuccessMessage: true })
}

/**
 * 更新菜单
 * @param params
 */
export function editMenu(params: Record<string, any>) {
    return request.put(`sys/menu/${params.app_type}/${params.menu_key}`, params, { showSuccessMessage: true })
}

/**
 * 删除菜单
 * @param menu_key
 */
export function deleteMenu(app_type: string, menu_key: string) {
    return request.delete(`sys/menu/${app_type}/${menu_key}`, { showSuccessMessage: true })
}

/**
 * 获取系统菜单
 *
 */
export function getSystemMenu() {
    return request.get(`sys/menu/system_menu`)
}

/**
 * 获取应用菜单
 *
 */
export function getAddonMenu(key: any) {
    return request.get(`sys/menu/addon_menu/${key}`)
}

/**
 * 获取类型为目录的菜单
 * @param key
 */
export function getMenuByTypeDir(key: any = 'system') {
    return request.get(`sys/menu/dir/${key}`)
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
 * 获取网站设置
 * @returns
 */
export function getWebConfig() {
    return request.get('sys/web/website')
}

/**
 * 更新网站设置
 * @param params
 * @returns
 */
export function setWebsite(params: Record<string, any>) {
    return request.put(`sys/config/website`, params, { showSuccessMessage: true })
}

/**
 * 获取版权设置
 * @returns
 */
export function getCopyright() {
    return request.get('sys/config/copyright')
}

/**
 * 获服务信息
 * @returns
 */
export function getService() {
    return request.get('sys/config/service')
}

/**
 * 更新版权设置
 * @param params
 * @returns
 */
export function setCopyright(params: Record<string, any>) {
    return request.put(`sys/config/copyright`, params, { showSuccessMessage: true })
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
    return request.post(`sys/attachment/category`, params, { showSuccessMessage: true })
}

/**
 * 编辑分类
 * @param params
 * @returns
 */
export function editAttachmentCategory(params: Record<string, any>) {
    return request.put(`sys/attachment/category/${params.id}`, params, { showSuccessMessage: true })
}

/**
 * 删除分类
 * @param id
 * @returns
 */
export function deleteAttachmentCategory(id: number) {
    return request.delete(`sys/attachment/category/${id}`, { showSuccessMessage: true })
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
    return request.delete(`sys/attachment/del`, { data: params, showSuccessMessage: true })
}

/**
 * 移动附件
 * @param params
 * @returns
 */
export function moveAttachment(params: Record<string, any>) {
    return request.put(`sys/attachment/batchmove`, params)
}

/**
 * 获取menu菜单
 */
export function getAuthMenu() {
    return request.get(`auth/site/showmenu`)
}

/**
 * 获取快捷菜单
 */
export function getShortcutMenu() {
    return request.get(`sys/config/shortcut_menu`)
}

/**
 * 添加快捷菜单
 */
export function setShortcutMenu(params: Record<string, any>) {
    return request.put(`sys/config/shortcut_menu`, params, { showSuccessMessage: true })
}

/**
 * 获取图标库分类列表
 * @param params
 * @returns
 */
export function getIconCategoryList(params: Record<string, any>) {
    return request.get(`sys/attachment/icon_category`, { params })
}

/**
 * 获取图标库列表
 * @param params
 * @returns
 */
export function getIconList(params: Record<string, any>) {
    return request.get(`sys/attachment/icon`, { params })
}

/**
 * 获取evn
 * @param params
 * @returns
 */
export function getEnv() {
    return request.get(`sys/env`)
}
/***************************************************** 地址管理 ****************************************************/

/**
 * 获取下级地址列表
 * @param pid
 */
export function getAreaListByPid(pid: number = 0) {
    return request.get(`sys/area/list_by_pid/${pid}`)
}

/**
 * 获取地址树列表
 * @param level
 */
export function getAreatree(level: number = 1) {
    return request.get(`sys/area/tree/${level}`)
}


/**
 * 获取地址信息
 */
export function getAddressInfo(params: any) {
    return request.get(`sys/area/get_info`, { params })
}

/**
 * 获取地址信息
 */
export function getContraryAddress(params: any) {
    return request.get(`sys/area/contrary`, { params })
}

/**
 * 获取地址
 * @param code
 */
export function getAreaByCode(code: number | string) {
    return request.get(`sys/area/code/${code}`)
}
/***************************************************** 存储设置 ****************************************************/

/**
 * 获取存储配置列表
 */
export function getStorageList() {
    return request.get(`sys/storage`)
}

/**
 * 获取存储详情
 * @param type
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
    return request.put(`sys/storage/${params.storage_type}`, params, { showSuccessMessage: true })
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
    return request.put(`pay/config/${params.type}`, params, { showSuccessMessage: true });
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
 * @param channel
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
    return request.get(`sys/schedule/list`, { params })
}

/**
 * 任务详情
 * @returns
 */
export function getCronInfo(id: string) {
    return request.get(`sys/cron/${id}`);
}

/**
 * 任务模版
 * @returns
 */
export function getCronTemplate() {
    return request.get(`sys/schedule/template`)
}

/**
 * 任务间隔
 * @returns
 */
export function getCronDateType() {
    return request.get(`sys/schedule/datetype`)
}

/**
 * 获取星期
 * @returns
 */
export function getWeek() {
    return request.get(`sys/date/week`)
}

/**
 * 添加计划任务
 * @returns
 */
export function addCron(params: Record<string, any>) {
    return request.post(`sys/schedule`, params, { showSuccessMessage: true })
}

/**
 * 编辑任务
 * @returns
 */
export function editCron(params: Record<string, any>) {
    return request.put(`sys/schedule/${params.id}`, params, { showSuccessMessage: true })
}

/**
 * 删除任务
 * @returns
 */
export function deleteCron(id: string) {
    return request.delete(`sys/schedule/${id}`, { showSuccessMessage: true })
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
    return request.put(`sys/agreement/${params.key}`, params, { showSuccessMessage: true })
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
    return request.put(`sys/config/login`, params, { showSuccessMessage: true })
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
    return request.post(`pay/channel/set/all`, params, { showSuccessMessage: true })
}


/***************************************************** 刷新菜单 ****************************************************/
/**
 * 刷新菜单
 */
export function menuRefresh(params: Record<string, any>) {
    return request.post(`sys/menu/refresh`, {}, { showSuccessMessage: true })
}

/**
 * 清理数据字段缓存
 */
export function clearSchemaCache(params: Record<string, any>) {
    return request.post(`sys/schema/clear`, {}, { showSuccessMessage: true })
}


/***************************************************** 获取应用 ****************************************************/
/**
 * 获取应用
 */
export function getAppMange() {
    return request.get(`sys/applist`)
}

/***************************************************** 地图设置 ****************************************************/

/**
 * 设置地图key
 */
export function setMap(params: Record<string, any>) {
    return request.put(`sys/config/map`, params, { showSuccessMessage: true })
}

/**
 * 获取地图配置
 */
export function getMap() {
    return request.get(`sys/config/map`)
}

/***************************************************** 首页 ****************************************************/
/**
 * 获取首页列表
 */
export function getIndexList() {
    return request.get(`sys/config/site_index`)
}

/**
 * 设置首页模版
 */
export function setIndexList(params: Record<string, any>) {
    return request.put(`sys/config/site_index`, params, { showSuccessMessage: true })
}

/**
 * 获取布局
 * @returns
 */
export function getLayouts() {
    return request.get('sys/layout')
}

/**
 * 设置布局
 * @returns
 */
export function setLayout(key: string) {
    return request.put('sys/layout', { key }, { showSuccessMessage: true })
}

/**
 * 获取支付待审核记录
 */
export function getPayAuditList(params: Record<string, any>) {
    return request.get('pay/audit', { params })
}

/**
 * 支付审核通过
 * @returns
 */
export function payAuditPass(outTradeNo: string) {
    return request.put(`pay/pass/${outTradeNo}`, {}, { showSuccessMessage: true })
}

/**
 * 支付审核拒绝
 * @returns
 */
export function payAuditRefuse(params: Record<string, any>) {
    return request.put(`pay/refuse/${params.out_trade_no}`, params, { showSuccessMessage: true })
}

/**
 * 获取支付单据详情
 */
export function getPayDetail(id: number) {
    return request.get(`pay/detail/${id}`)
}

/**
 * 获取应用列表
 */
export function getAddonList() {
    return request.get(`app/getAddonList`)
}

/**
 * 获取手机端首页列表
 */
export function getWapIndexList(params: Record<string, any>) {
    return request.get('sys/config/wap_index', { params })
}
