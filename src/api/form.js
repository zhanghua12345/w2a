import request from "@/utils/request";

/**
 * 报价提交
 * @param data
 * @returns {*}
 */
export function offerForm(data) {
  return request({
    url: `/api/user/offer`,
    method: "post",
    data,
  });
}

/**
 * 免费设计
 * @param data
 * @returns {*}
 */
export function designForm(data) {
  return request({
    url: "/api/user/design",
    method: "post",
    data,
  });
}

/**
 * 我要装修提交
 * @param data
 * @returns {*}
 */
export function renovationForm(data) {
  return request({
    url: "/api/user/renovation",
    method: "post",
    data,
  });
}
