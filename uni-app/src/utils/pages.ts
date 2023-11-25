import pagesJson from '@/pages.json'

/**
 * 获取需要登录的页面
 */
export function getNeedLoginPages() {
    const pages = []
    // 获取主包中需要登录的页面
    pagesJson.pages.forEach(item => {
        if (item.needLogin) pages.push(`/${item.path}`)
    })
    // 获取分包中需要登录的页面
    if (pagesJson.subPackages) {
        pagesJson.subPackages.forEach(subPackages => {
            subPackages.pages.forEach(item => {
                if (item.needLogin) pages.push(`/${subPackages.root}/${item.path}`)
            })
        })
    }
    return pages
}

/**
 * 获取tabbar
 */
export function getTabbarPages() {
    return pagesJson.tabBar.list.map(item => { return `/${item.pagePath}` })
}

/**
 * 获取首页路径
 */
export function getFirstPage() {
    return '/' + pagesJson.pages[0].path
}