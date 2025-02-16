import request from "@/utils/request";

/**
 * 案例推荐（顶部轮播）
 * @param data
 * @returns {*}
 */
export function caseList(data) {
  return request({
    url: `/api/caseList/${data.type}`,
    method: "get",
  });
}

/**
 * 案例分类
 * @param data
 * @returns {*}
 */
export function caseClass() {
  return request({
    url: `/api/caseClass`,
    method: "get",
  });
}

/**
 * 案例列表
 * @param data
 * @returns {*}
 */
export function product_new_list(data) {
  return request({
    url: `/api/product_new_list`,
    method: "get",
    data,
  });
}

/**
 * 案例详情
 * @param data
 * @returns {*}
 */
export function product_new_detail(data) {
  return request({
    url: `/api/store_product_new_detail/${data.id}`,
    method: "get",
  });
}

/**
 * 案例点赞
 * /api/praise/:id/2/1/0
 * @param data
 * @returns {*}
 */
export function setPraise(data) {
  return request({
    url: `/api/praise/${data.id}/2/1/0`,
    method: "post",
  });
}

/**
 * 案例收藏
 * /api/praise/:id/2/2/0
 * @param data
 * @returns {*}
 */
export function setCollect(data) {
  return request({
    url: `/api/praise/${data.id}/2/2/0`,
    method: "post",
  });
}

/**
 * 案例取消收藏
 * /api/praise/:id/2/2/1
 * @param data
 * @returns {*}
 */
export function setCancelCollect(data) {
  return request({
    url: `/api/praise/${data.id}/2/2/1`,
    method: "post",
  });
}

/**
 * 案例浏览列表
 * @param data
 * @returns {*}
 */
export function browseList(data) {
  console.log(data);
  return request({
    url: `/api/ArticleUserLog/3/2`,
    method: "get",
    data,
  });
}

/**
 * 案例收藏列表
 * @param data
 * @returns {*}
 */
export function praiseList(data) {
  return request({
    url: `/api/ArticleUserLog/2/2`,
    method: "get",
    data,
  });
}

/**
 * 案例点赞列表
 * @param data
 * @returns {*}
 */
export function caseUserList(data) {
  return request({
    url: `/api/ArticleUserLog/1/2`,
    method: "get",
    data,
  });
}
