/**
 * 文章列表
 */
export function getArticleList(params: Record<string, any>) {
    return request.get('article/article', params)
}

/**
 * 文章列表
 */
export function getArticleAll(params: Record<string, any>) {
    return request.get('article/article/all', params)
}

/**
 * 文章详情
 */
export function getArticleDetail(id: number) {
    return request.get(`article/article/${id}`)
}

/**
 * 文章分类
 */
export function getArticleCategory() {
    return request.get('article/category')
}