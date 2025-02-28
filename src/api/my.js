import request from "@/utils/request";

/**
 * 会员详情
 * @param data
 * @returns {*}
 */
export function getMemberInfo() {
  return request({
    url: `/api/user/memberInfo`,
    method: "get",
  });
}

/**
 * 会员信息修改
 * @param data
 * @returns {*}
 */
export function memberSave(data) {
  return request({
    url: `/api/user/memberSave`,
    method: "post",
    data,
  });
}

/**
 * 提现
 * @param data
 * @returns {*}
 */
export function withdrawal(data) {
  return request({
    url: `/api/user/withdrawal`,
    method: "post",
    data,
  });
}

/**
 * 提现列表
 * @param data
 * @returns {*}
 */
export function withdrawalList(data) {
  return request({
    url: `/api/user/withdrawalList`,
    method: "get",
    data,
  });
}

/**
 * 总收益列表
 * @param data
 * @returns {*}
 */
export function balanceDetails(data) {
  return request({
    url: `/api/user/balanceDetails`,
    method: "get",
    data,
  });
}
/**
 * 会员邀请用户到店
 * @param data
 * @returns {*}
 */
export function invite(data) {
  return request({
    url: `/api/invite`,
    method: "post",
    data,
  });
}

/**
 * 查看邀请用户列表
 * @param data
 * @returns {*}
 */
export function inviteList(data) {
  return request({
    url: `/api/inviteList`,
    method: "get",
    data,
  });
}
