import request from "@/utils/request";

/**
 * 首页数据
 * @param data
 * @returns {*}
 */
export function getHomeData() {
  return request({
    url: `/api/index/allData`,
    method: "get",
  });
}

/**
 * 协议 和 品牌介绍 公司介绍
 * @param data
 * @returns {*}
 */
export function getAgreement(data) {
  return request({
    url: `/api/get_agreement/${data.id}`,
    method: "get",
  });
}
