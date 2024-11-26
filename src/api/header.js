import request from "@/utils/request";
/**
 * 活动页面
 * @param data
 * @returns {*}
 */
export function activeViewData() {
  return request({
    url: `/activeViewData`,
    dataType: "json",
    method: "get",
  });
}

/**
 * 用户签到
 * @param data
 * @returns {*}
 */
export function activeUserSignIn() {
  return request({
    url: `/activeUserSignIn`,
    dataType: "json",
    method: "get",
  });
}

/**
 * 用户最新获取金币
 * @param data
 * @returns {*}
 */
export function getAllCoinWithActivity() {
  return request({
    url: `/getAllCoinWithActivity`,
    dataType: "json",
    method: "post",
  });
}

/**
 * 点击fb tt google等获取金币
 * @param data
 * @returns {*}
 */
export function postFollowUsOnDifferentPlatforms(data) {
  return request({
    url: `/followUsOnDifferentPlatforms`,
    dataType: "json",
    data,
    method: "post",
  });
}
