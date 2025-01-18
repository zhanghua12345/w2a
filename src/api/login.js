import request from "@/utils/request";

/**
 * 静默登录
 * @param data
 * @returns {*}
 */
export function getCode(params) {
  return request({
    url: `/api/v2/routine/auth_type`,
    method: "get",
    data: params,
  });
}

/**
 * 授权登录
 * @param data
 * @returns {*}
 */
export function getToken(params) {
  return request({
    url: `/api/v2/routine/auth_login`,
    method: "get",
    data: params,
  });
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserInfo() {
  return request({
    url: `/api/userInfo`,
    method: "get",
  });
}

/**
 * 编辑头像和昵称
 * @param data
 * @returns {*}
 */
export function editUserInfo(data) {
  return request({
    url: `/api/user/edit`,
    method: "post",
    data,
  });
}

/**
 * 后台解密手机号
 * @param data
 * @returns {*}
 */
export function getPhone(data) {
  return request({
    url: `/api/v2/routine/auth_binding_phone`,
    method: "post",
    data,
  });
}
