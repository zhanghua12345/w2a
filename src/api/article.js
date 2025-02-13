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
 * 参数一：案例或者文章id
 * 参数二：分类 1 文章 2案例 静态1
 * 参数三：点赞收藏 1 点赞 2收藏
 * 参数四：功能（取消或收藏） 0 取消 1收藏
 * @param data
 * @returns {*}
 */
export function setPraise(data) {
  return request({
    url: `/api/praise/${data.id}/1/${data.funType}/${data.fun}`,
    method: "post",
  });
}
