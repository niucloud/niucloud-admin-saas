import request from '@/utils/request'


/***************************************************** 会员管理 ****************************************************/

/**
 * 获取会员列表
 * @param params
 * @returns
 */
export function getMemberList(params: Record<string, any>) {
    return request.get(`member/member`, {params})
}

/**
 * 获取会员详情
 * @param id 会员id
 * @returns
 */
export function getMemberInfo(id: number) {
    return request.get(`member/member/${id}`);
}

/**
 * 获取会员编码
 * @returns
 */
export function getMemberNo() {
    return request.get(`member/memberno`);
}

/**
 * 添加会员
 * @param params
 * @returns
 */
export function addMember(params: Record<string, any>) {
    return request.post(`member/member`, params, {showSuccessMessage: true})
}

/**
 * 会员注册方式
 * @param params
 * @returns
 */
export function getRegisterType(params: Record<string, any>) {
    return request.get(`member/registertype`, params)
}

/**
 * 会员注册渠道
 * @param params
 * @returns
 */
export function getRegisterChannelType(params: Record<string, any>) {
    return request.get(`member/register/channel`, params)
}

/**
 * 会员删除
 * @param member_id
 */
export function deleteMember(member_id: number) {
    return request.delete(`member/member/${member_id}`, {showSuccessMessage: true})
}


/***************************************************** 会员标签 ****************************************************/

/**
 * 获取会员标签列表
 * @param params
 * @returns
 */
export function getMemberLabelList(params: Record<string, any>) {
    return request.get(`member/label`, {params})
}

/**
 * 获取会员标签详情
 * @param label_id 会员标签label_id
 * @returns
 */
export function getMemberLabelInfo(label_id: number) {
    return request.get(`member/label/${label_id}`);
}

/**
 * 添加会员标签
 * @param params
 * @returns
 */
export function addMemberLabel(params: Record<string, any>) {
    return request.post('member/label', params, {showSuccessMessage: true})
}

/**
 * 编辑会员标签
 * @param params
 */
export function updateMemberLabel(params: Record<string, any>) {
    return request.put(`member/label/${params.label_id}`, params, {showSuccessMessage: true})
}

/**
 * 删除会员标签
 * @param label_id
 * @returns
 */
export function deleteMemberLabel(label_id: number) {
    return request.delete(`member/label/${label_id}`, {showSuccessMessage: true})
}

/**
 * 获取全部会员标签
 */
export function getMemberLabelAll() {
    return request.get(`member/label/all`);
}

/**
 * 编辑会员详情
 * @param params
 */
export function editMemberDetail(params: Record<string, any>) {
    return request.put(`member/member/modify/${params.member_id}/${params.field}`, params, {showSuccessMessage: true})
}

/***************************************************** 会员零钱 ****************************************************/


/***************************************************** 会员账户 ****************************************************/

/**
 * 账户变动方式
 * @param change_type
 */
export function getChangeTypeList(change_type: string) {
    return request.get(`member/account/change_type/${change_type}`)
}

/**
 * 会员积分流水
 * @param params
 * @returns
 */
export function getPointList(params: Record<string, any>) {
    return request.get(`member/account/point`, {params})
}

/**
 * 会员余额流水
 * @param params
 * @returns
 */
export function getBalanceList(params: Record<string, any>) {
    return request.get(`member/account/balance`, {params})
}

/**
 * 获取会员可提现余额列表
 * @param params
 * @returns
 */
export function getMoneyList(params: Record<string, any>) {
    return request.get(`member/account/money`, {params})
}

/**
 * 获取会员佣金列表
 * @param params
 * @returns
 */
export function getCommissionList(params: Record<string, any>) {
    return request.get(`member/account/commission`, {params})
}

/**
 * 会员积分调整
 * @param params
 * @returns
 */
export function adjustPoint(params: Record<string, any>) {
    return request.post(`member/account/point`, params, {showSuccessMessage: true})
}

/**
 * 会员余额调整
 * @param params
 * @returns
 */
export function adjustBalance(params: Record<string, any>) {
    return request.post(`member/account/balance`, params, {showSuccessMessage: true})
}

/***************************************************** 会员相关设置 ****************************************************/

/**
 * 获取登录设置
 */
export function getLoginConfig() {
    return request.get(`member/config/login`)
}

/**
 * 注册登录设置
 * @param params
 * @returns
 */
export function setLoginConfig(params: Record<string, any>) {
    return request.post(`member/config/login`, params, {showSuccessMessage: true})
}

/**
 * 获取会员设置
 */
export function getMemberConfig() {
    return request.get(`member/config/member`)
}

/**
 * 会员设置
 * @param params
 * @returns
 */
export function setMemberConfig(params: Record<string, any>) {
    return request.post(`member/config/member`, params, {showSuccessMessage: true})
}


/**
 * 获取会员转账方式
 */
export function getTransfertype() {
    return request.get(`member/cash_out/transfertype`)
}


/**
 * 佣金统计
 * @param params
 * @returns
 */
export function getCommissionSum(params: Record<string, any>) {
    return request.get(`member/account/sum_commission`, {params})
}

/**
 * 积分统计
 * @param params
 * @returns
 */
export function getPointSum(params: Record<string, any>) {
    return request.get(`member/account/sum_point`, {params})
}

/**
 * 余额统计
 * @param params
 * @returns
 */
export function getBalanceSum(params: Record<string, any>) {
    return request.get(`member/account/sum_balance`, {params})
}

/**
 * 余额类型
 */
export function getBalanceStatus() {
    return request.get(`member/account/type`)
}

/**
 * 获取余额变动类型
 */
export function getAccountType(params: Record<string, any>) {
    return request.get(`member/account/change_type/${params.account_type}`)
}


/***************************************************** 会员提现 ****************************************************/

/**
 * 获取提现设置
 */
export function getCashOutConfig() {
    return request.get(`member/config/cash_out`)
}

/**
 * 设置提现设置
 * @param params
 * @returns
 */
export function setCashOutConfig(params: Record<string, any>) {
    return request.post(`member/config/cash_out`, params, {showSuccessMessage: true})
}

/**
 * 获取会员提现列表
 * @param params
 * @returns
 */
export function getCashOutList(params: Record<string, any>) {
    return request.get(`member/cash_out`, {params})
}

/**
 * 会员提现详情
 * @param id
 */
export function getCashOutDetail(id: number) {
    return request.get(`member/cash_out/${id}`, {})
}

/**
 * 会员提现审核
 * @param params
 */
export function memberAudit(params: Record<string, any>) {
    return request.put(`member/cash_out/audit/${params.id}/${params.action}`, params, {showSuccessMessage: true})
}

/**
 * 会员提现转账
 * @param params
 */
export function memberTransfer(params: Record<string, any>) {
    return request.put(`member/cash_out/transfer/${params.id}`, params, {showSuccessMessage: true})
}

/**
 * 会员状态变更
 * @param params
 */
export function editMemberStatus(params: Record<string, any>) {
    return request.put(`member/setstatus/${params.status}`, params, {showSuccessMessage: true})
}

/**
 * 会员提现状态
 */
export function getCashOutStatusList() {
    return request.get(`member/cash_out/status`)
}

/**
 * 提现统计
 * @returns
 */
export function getCashOutStat() {
    return request.get(`member/cash_out/stat`)
}

