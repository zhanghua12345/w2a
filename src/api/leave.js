import request from "@/utils/request";
/**
 * 反馈类型
 * @returns {*}
 */
export function feedbackTypeList() {
  return request({
    url: `/feedback/typeList`,
    dataType: "json",
    method: "post",
  });
}

/**
 * 反馈图片上传
 * @param data
 * @returns {*}
 */
export function uploadFiles(data) {
  return request({
    url: `/uploadImages`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}

/**
 * 添加反馈
 * @param data
 * @returns {*}
 */
export function feedbackAdd(data) {
  return request({
    url: `/feedback/add`,
    dataType: "json",
    method: "post",
    data,
  });
}

/**
 * 反馈列表
 * @param data
 * @returns {*}
 */
export function feedbackList(data) {
  return request({
    url: `/feedback/lists`,
    dataType: "json",
    method: "post",
    params: data,
  });
}

/**
 * 反馈详情
 * @param data
 * @returns {*}
 */
export function feedbackDetail(data) {
  return request({
    url: `/feedback/detail`,
    dataType: "json",
    method: "post",
    data: data,
  });
}

/**
 * 确认结束
 * @param data
 * @returns {*}
 */
export function feedbackEndFeedback(data) {
  return request({
    url: `/feedback/endFeedback`,
    dataType: "json",
    method: "post",
    data: data,
  });
}
