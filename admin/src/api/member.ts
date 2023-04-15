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
 * 添加会员
 * @param params 
 * @returns 
 */
export function addMember(params: Record<string, any>) {
    return request.post(`member/member`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 会员注册方式
 * @param params 
 * @returns 
 */
export function getRegisterType(params: Record<string, any>) {
    return request.get(`member/registertype`, params)
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
    return request.post('member/label', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑会员标签
 * @param label_id
 * @param params
 * @returns
 */
export function updateMemberLabel(params: Record<string, any>) {
    return request.put(`member/label/${params.label_id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除会员标签
 * @param label_id
 * @returns
 */
export function deleteMemberLabel(label_id: number) {
    return request.delete(`member/label/${label_id}`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取全部会员标签
 * @param label_id 会员标签label_id
 * @returns
 */
export function getMemberLabelAll() {
    return request.get(`member/label/all`);
}

/**
 * 编辑会员详情
 * @param id 
 * @param params 
 * @returns 
 */
export function updateMemberDetail(params: Record<string, any>) {
    return request.put(`member/member/modify/${params.member_id}/${params.field}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/***************************************************** 会员零钱 ****************************************************/

/**
 * 获取会员零钱列表
 * @param params 
 * @returns 
 */
export function getMoneyList(params: Record<string, any>) {
    return request.get(`member/account/money`, {params})
}


/***************************************************** 会员账户 ****************************************************/

/**
 * 账户变动方式
 * @param params 
 * @returns 
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
    return request.get(`member/account/point`, { params })
}
/**
 * 会员余额流水
 * @param params 
 * @returns 
 */
export function getBalanceList(params: Record<string, any>) {
    return request.get(`member/account/balance`, { params })
    }
/**
 * 会员积分调整
 * @param params 
 * @returns 
 */
export function adjustPoint(params: Record<string, any>) {
    return request.post(`member/account/point`, params, { showErrorMessage: true, showSuccessMessage: true })
    }
/**
 * 会员余额调整
 * @param params 
 * @returns 
 */
export function adjustBalance(params: Record<string, any>) {
    return request.post(`member/account/balance`, params, { showErrorMessage: true, showSuccessMessage: true })
    }

/***************************************************** 会员相关设置 ****************************************************/    

/**
 * 获取登录设置
 * @param params 
 * @returns 
 */
export function getLoginConfig(params: Record<string, any>) {
    return request.get(`member/config/login`, params)
    }
/**
 * 注册登录设置
 * @param params 
 * @returns 
 */
export function setLoginConfig(params: Record<string, any>) {
    return request.post(`member/config/login`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取提现设置
 * @param params 
 * @returns 
 */
export function getWithdrawConfig() {
    return request.get(`member/config/withdraw`)
    }
/**
 * 设置提现设置
 * @param params 
 * @returns 
 */
export function setWithdrawConfig(params: Record<string, any>) {
    return request.post(`member/config/withdraw`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取会员提现列表
 * @param params 
 * @returns 
 */
export function getWithdrawList(params: Record<string, any>) {
    return request.get(`member/withdraw`, {params})
}

/**
 * 获取会员转账方式
 * @param params 
 * @returns 
 */
export function getTransfertype() {
    return request.get(`member/withdraw/transfertype`)
}