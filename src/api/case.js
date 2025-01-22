import request from "@/utils/request";

/**
 * 案例推荐（首页）
 * @param data
 * @returns {*}
 */
export function getCode(params) {
  return request({
    url: `/api/caseList`,
    method: "get",
    data: params,
  });
}

/**
 * 案例分类
 * @param data
 * @returns {*}
 */
export function getCode(params) {
  return request({
    url: `/api/caseClass`,
    method: "get",
    data: params,
  });
}

/**
 * 案例列表
 * @param data
 * @returns {*}
 */
export function getCode(data) {
  return request({
    url: `/api/product_new_list`,
    method: "get",
    data: data,
  });
}

/**
 * 案例详情
 * @param data
 * @returns {*}
 */
export function getCode(data) {
  return request({
    url: `/api/store_product_new_detail/${data.id}`,
    method: "get",
  });
}

/**
 * 参数一：案例或者文章
 * 参数二：分类 1 文章 2案例
 * 参数三：点赞收藏 1 点赞 2收藏
 * 参数四：功能（取消或收藏） 0 取消 1收藏
 * @param data
 * @returns {*}
 */
export function getCode(data) {
  return request({
    url: `/api/praise/${data.id}/${data.type}/${data.funType}/${data.fun}`,
    method: "get",
  });
}
