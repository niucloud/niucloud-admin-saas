import request from '@/utils/request'


/**
 * 获取更新内容
 * @param addon
 */
export function getUpgradeContent(addon: string = '') {
    return request.get(addon ? `upgrade/${addon}` : 'upgrade')
}

/**
 * 获取升级任务
 * @param addon
 */
export function getUpgradeTask() {
    return request.get('upgrade/task')
}

/**
 * 升级
 * @param addon
 */
export function upgradeAddon(addon: string = '') {
    return request.post(addon ? `upgrade/${addon}` : 'upgrade')
}

/**
 * 执行升级
 */
export function executeUpgrade() {
    return request.post('upgrade/execute')
}

/**
 * 升级前检测
 */
export function preUpgradeCheck(addon: string = '') {
    return request.get(addon ? `upgrade/check/${addon}` : 'upgrade/check')
}

/**
 * 清除
 */
export function clearUpgradeTask() {
    return request.post('upgrade/clear')
}
