// 全局请求封装
export const base_url = "https://fanminitop.com";

export default (params) => {
  console.log(params);
  let url = params.url;
  let method = params.method || "GET";
  let data = params.data || {};
  let header = {};

  if (method == "POST") {
    header = {
      "content-type": "application/json",
    };
  }

  // 获取本地token
  const token = wx.getStorageSync("token");
  if (token) {
    header["Authorization"] = "Bearer " + token;
    if (params.data) {
      params.data["uid"] = token;
    } else {
      params.data = {
        uid: token,
      };
    }
  }
  return new Promise((resolve, reject) => {
    // wx.showLoading();
    wx.request({
      url: base_url + url,
      method: method,
      header: header,
      data: data,
      success(response) {
        const result = response.data;
        console.log("response", result);
        if (
          result.status === 200 ||
          result.errorCode === "200" ||
          result.code === 200
        ) {
          resolve(result.data || result.res || result);
        } else if (result.status === 3) {
          uni.showModal({
            title: "提示",
            content: "登录失效请重新登录,3s自动跳转登录",
            showCancel: false,
            success(res) {
              setTimeout(() => {
                wx.navigateTo({
                  url: "/pages/login/index",
                });
              }, 3000);
            },
          });
          reject(result);
        } else if (result.errorCode === "0" || result.status === 2) {
          uni.showToast({
            title: "请重试...",
            icon: "error",
            duration: 2000,
          });
          reject(result.data || result.res || result);
        } else if (result.status === 400) {
          console.log(5555);
          uni.showToast({
            icon: "none",
            title: result.msg,
          });
          reject(result.data || result.res || result);
        }
      },
      fail(err) {
        console.log(err);
        if (err.errMsg.indexOf("request:fail") !== -1) {
          wx.showToast({
            title: "网络异常",
            icon: "error",
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: "未知异常",
            icon: "error",
            duration: 2000,
          });
        }
        reject(err);
      },
      complete() {
        // wx.hideLoading();
        // wx.hideToast();
      },
    });
  });
};
