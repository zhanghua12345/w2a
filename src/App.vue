<script>
import { getCode, getToken, getUserInfo } from "@/api/login";
export default {
  globalData: {
    userInfo: {},
    memberInfo: {},
    islogin: false,
    envDevelop: false,
  },
  onLaunch: function () {
    console.log("App Launch");
    const _this = this;
    // 微信更新提醒
    _this.globalData.envDevelop =
      wx.getAccountInfoSync().miniProgram.envVersion === "develop";

    if (uni.canIUse("getUpdateManager")) {
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: "更新提示",
              content: "新版本已经下载好，是否重启当前应用？",
              success(res) {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              },
            });
          });
          updateManager.onUpdateFailed(() => {
            wx.showModal({
              title: "发现新版本",
              content: "请删除当前小程序，重启搜索打开...",
            });
          });
        }
      });
    }
    // 登录
    uni.login({
      success: async (res) => {
        if (!res.code) {
          wx.showToast({
            title: "获取登录凭证失败，请稍后重试！",
            icon: "none",
            duration: 2000,
          });
          // 记录错误信息
        } else {
          // 处理正常情况
          const code = await getCode({ code: res.code });
          const token = await getToken({ key: code.key });
          wx.setStorageSync("token", token.token);
          const userInfo = await getUserInfo();
          _this.globalData.userInfo = userInfo;
          // wx.setStorageSync("token", request.uid);
          // const userInfo = await getUser();
          // setTimeout(() => {
          //   wx.setStorageSync("getIosPay", true);
          // }, userInfo.time * 60000);
          // console.log(userInfo);
          // _this.globalData.userInfo = userInfo;
          // if (_this.userInfoCallback) {
          //   _this.userInfoCallback(userInfo);
          // }
        }
      },
    });
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./styles/iconfont.css";
@import "uview-plus/index.scss";
@import "./styles/tailwind.css";
@import "./styles/animation.scss";
</style>
