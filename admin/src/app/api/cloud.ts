import request from '@/utils/request'

/**
 * 云编译
 * @param addon
 */
export function cloudBuild() {
    return request.post('niucloud/build', {}, { timeout: 0 })
}

/**
 * 获取云编译任务
 * @param addon
 */
export function getCloudBuildTask() {
    return request.get('niucloud/build')
}

/**
 * 云编译前检测
 */
export function getCloudBuildLog() {
    return request.get('niucloud/build/log')
}

/**
 * 清除
 */
export function clearCloudBuildTask() {
    return request.post('niucloud/build/clear')
}

/**
 * 云编译前检测
 */
export function preBuildCheck() {
    return request.get('niucloud/build/check')
}
