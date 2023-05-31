import request from '@/utils/request'

/***************************************************** 文章表 ****************************************************/

/**
 * 获取文章表列表
 * @param params
 * @returns
 */
export function getArticleList(params: Record<string, any>) {
    return request.get(`article/article`, { params })
}

/**
 * 获取文章表详情
 * @param id 文章表id
 * @returns
 */
export function getArticleInfo(id: number) {
    return request.get(`article/article/${id}`);
}

/**
 * 添加文章表
 * @param params
 * @returns
 */
export function addArticle(params: Record<string, any>) {
    return request.post('article/article', params, { showSuccessMessage: true })
}

/**
 * 编辑文章表
 * @param id
 * @param params
 * @returns
 */
export function editArticle(params: Record<string, any>) {
    return request.put(`article/article/${params.id}`, params, { showSuccessMessage: true })
}

/**
 * 删除文章表
 * @param id
 * @returns
 */
export function deleteArticle(id: number) {
    return request.delete(`article/article/${id}`, { showSuccessMessage: true })
}
/***************************************************** 文章分类管理 ****************************************************/

/**
 * 获取文章分类列表
 * @param params 
 * @returns 
 */
export function getArticleCategoryList(params: Record<string, any>) {
    return request.get(`article/category`, { params })
}


/**
 * 获取文章全部分类
 * @param params 
 * @returns 
 */
export function getArticleCategoryAll(params: Record<string, any>) {
    return request.get(`article/category/all`, params)
}

/**
 * 获取文章分类详情
 * @param id 文章分类id
 * @returns 
 */
export function getArticleCategoryInfo(category_id: number) {
    return request.get(`article/category/${category_id}`);
}

/**
 * 添加文章分类
 * @param params 
 * @returns 
 */
export function addArticleCategory(params: Record<string, any>) {
    return request.post('article/category', params, { showSuccessMessage: true })
}

/**
 * 编辑文章分类
 * @param params 
 * @returns 
 */
export function editArticleCategory(params: Record<string, any>) {
    return request.put(`article/category/${params.category_id}`, params, { showSuccessMessage: true })
}

/**
 * 文章分类删除
 * @param id 文章分类id
 * @returns 
 */
export function deleteArticleCategory(category_id: number) {
    return request.delete(`article/category/${category_id}`, { showSuccessMessage: true });
}