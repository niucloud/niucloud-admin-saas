import request from '@/utils/request'

export function getMemberInfo() {
	return request.get('member/member')
}

/**
 * 获取积分流水
 */
export function getPointList(data : AnyObject) {
	return request.get('member/account/point', data)
}

/**
 * 获取不可提现余额流水
 */
export function getBalanceList(data : AnyObject) {
	return request.get('member/account/balance', data)
}

/**
 * 获取可提现余额流水
 */
export function getMoneyList(data : AnyObject) {
	return request.get('member/account/money', data)
}

/**
 * 会员信息修改
 */
export function modifyMember(data : AnyObject) {
	return request.put(`member/modify/${data.field}`, data, { showErrorMessage: true })
}

/**
 * 发起充值
 */
export function createRecharge(data : AnyObject) {
	return request.post('order/recharge', data, { showErrorMessage: true })
}

/**
 * 充值记录列表
 */
export function getRechargeList(data : AnyObject) {
	return request.get('order/recharge', data, { showErrorMessage: true })
}

/**
 * 充值记录详情
 */
export function getRechargeDetail(id:number) {
	return request.get(`order/recharge/${id}`, {}, { showErrorMessage: true })
}

/**
 * 登录会员绑定手机号
 */
export function bindMobile(data : AnyObject) {
	return request.put('member/mobile', data, { showErrorMessage: true })
}

/**
 * 提现转账方式
 */
export function cashOutTransferType() {
	return request.get('member/cash_out/transfertype')
}

/**
 * 提现配置
 */
export function cashOutConfig() {
	return request.get('member/cash_out/config')
}

/**
 * 申请余额提现
 */
export function cashOutApply(data : AnyObject) {
	return request.post('member/cash_out/apply', data, { showSuccessMessage: true, showErrorMessage: true })
}

/**
 * 获取提现账户信息
 */
export function getCashoutAccountInfo(data : AnyObject) {
	return request.get(`member/cashout_account/${data.account_id}`, {})
}

/**
 * 获取首条提现账户信息
 */
export function getFirstCashoutAccountInfo(data : AnyObject) {
	return request.get('member/cashout_account/firstinfo', data)
}

/**
 * 获取提现账户列表
 */
export function getCashoutAccountList(data : AnyObject) {
	return request.get(`member/cashout_account`, data)
}

/**
 * 获取提现记录列表
 */
export function getCashOutList(data : AnyObject) {
	return request.get(`member/cash_out`, data)
}

/**
 * 获取提现记录详情
 */
export function getCashOutDetail(id : number) {
	return request.get(`member/cash_out/${id}`)
}

/**
 * 添加提现账户
 */
export function addCashoutAccount(data : AnyObject) {
	return request.post('member/cashout_account', data, { showSuccessMessage: true, showErrorMessage: true })
}

/**
 * 添加提现账户
 */
export function editCashoutAccount(data : AnyObject) {
	return request.put(`member/cashout_account/${data.account_id}`, data, { showSuccessMessage: true, showErrorMessage: true })
}

/**
 * 删除提现账户
 */
export function deleteCashoutAccount(accountId: number) {
	return request.delete(`member/cashout_account/${accountId}`, { showSuccessMessage: true, showErrorMessage: true })
}

/**
 * 佣金列表
 */
export function getCommissionList(data : AnyObject) {
	return request.get(`member/account/commission`, data)
}

/**
 * 获取会员收货地址列表
 * @param params
 * @returns
 */
export function getAddressList(params: Record<string, any>) {
	return request.get(`member/address`, {params})
}

/**
 * 获取会员收货地址详情
 * @param id 会员收货地址id
 * @returns
 */
export function getAddressInfo(id: number) {
	return request.get(`member/address/${id}`);
}

/**
 * 添加会员收货地址
 * @param params
 * @returns
 */
export function addAddress(params: Record<string, any>) {
	return request.post('member/address', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑会员收货地址
 * @param params
 * @returns
 */
export function editAddress(params: Record<string, any>) {
	return request.put(`member/address/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除会员收货地址
 * @param id
 * @returns
 */
export function deleteAddress(id: number) {
	return request.delete(`member/address/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}
