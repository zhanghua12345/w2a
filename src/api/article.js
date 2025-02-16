import request from "@/utils/request";

/**
 * 文章分类
 * @param data
 * @returns {*}
 */
export function articleClass() {
  return request({
    url: `/api/article/category/list`,
    method: "get",
  });
}

/**
 * 文章列表
 * @param data
 * @returns {*}
 */
export function article_list(data) {
  return request({
    url: `/api/article/list`,
    method: "get",
    data: data,
  });
}

/**
 * 文章详情
 * @param data
 * @returns {*}
 */
export function article_detail(data) {
  return request({
    url: `/api/article/details/${data.id}`,
    method: "get",
  });
}

/**
 * 文章点赞
 * /api/praise/:id/1/1/0
 * @param data
 * @returns {*}
 */
export function setPraise(data) {
  return request({
    url: `/api/praise/${data.id}/1/1/0`,
    method: "post",
  });
}

/**
 * 文章收藏
 * /api/praise/:id/1/2/0
 * @param data
 * @returns {*}
 */
export function setCollect(data) {
  return request({
    url: `/api/praise/${data.id}/1/2/0`,
    method: "post",
  });
}

/**
 * 文章取消收藏
 * /api/praise/:id/1/2/1
 * @param data
 * @returns {*}
 */
export function setCancelCollect(data) {
  return request({
    url: `/api/praise/${data.id}/1/2/1`,
    method: "post",
  });
}

/**
 * 文章浏览列表
 * @param data
 * @returns {*}
 */
export function browseList(data) {
  return request({
    url: `/api/ArticleUserLog/3/1`,
    method: "get",
    data,
  });
}

/**
 * 文章收藏列表
 * @param data
 * @returns {*}
 */
export function praiseList(data) {
  return request({
    url: `/api/ArticleUserLog/2/1`,
    method: "get",
    data,
  });
}

/**
 * 文章点赞列表
 * @param data
 * @returns {*}
 */
export function caseUserList(data) {
  return request({
    url: `/api/ArticleUserLog/1/1`,
    method: "get",
    data,
  });
}
