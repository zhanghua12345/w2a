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
 * 个人中心数据
 * @returns {*}
 */
export function articleUserLogNum() {
  return request({
    url: `/api/user/articleUserLogNum`,
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
    url: `/api/user/editPhone`,
    method: "post",
    data,
  });
}

/**
 * 会员注册
 * @param data
 * @returns {*}
 */
export function register(data) {
  return request({
    url: `/api/user/register`,
    method: "post",
    data,
  });
}

/**
 * 审核结果
 * @param data
 * @returns {*}
 */
export function registerRes() {
  return request({
    url: `/api/user/registerRes`,
    method: "get",
  });
}

/**
 * 获取分组
 * @param data
 * @returns {*}
 */
export function groupList() {
  return request({
    url: `/api/getGroupList`,
    method: "get",
  });
}
