import request from "@/utils/request";

/**
 * 静默登录
 * @param data
 * @returns {*}
 */
export function getHomeData() {
  return request({
    url: `/api/index/allData`,
    method: "get",
  });
}
