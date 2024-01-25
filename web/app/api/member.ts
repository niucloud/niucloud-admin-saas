export function getMemberInfo() {
    return request.get('member/member')
}

/**
 * 会员信息修改
 */
export function modifyMember(data: AnyObject) {
    return request.put(`member/modify/${data.field}`, data)
}

/**
 * 获取积分流水
 */
export function getPointList(data: AnyObject) {
    return request.get('member/account/point', data)
}

/**
 * 获取余额流水
 */
export function getBalanceList(data: AnyObject) {
    return request.get('member/account/balance', data)
}

/**
 * 登录会员绑定手机号
 */
export function bindMobile(data: AnyObject) {
    return request.put('member/mobile', data)
}