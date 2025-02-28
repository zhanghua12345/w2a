<template>
  <view>
    <view class="after-navber">
      <view>
        <image
          src="https://fanminitop.com/uploads/attach/2025/02/20250225/582abb13c2ccaf95c2e36449a741f2eb.jpg"
          style="width: 100%"
          mode="widthFix"
          class="logo"
        />
        <view
          style="
            text-align: center;
            padding-top: 100rpx;
            color: #888;
            letter-spacing: 0rpx;
          "
          >首次进入需要手动开启授权</view
        >
        <!-- <view style="color: #888; margin-bottom: 88rpx"
          >获得你的公开信息（昵称、头像、手机号等）</view
        > -->
        <button
          class="login-btn"
          open-type="getPhoneNumber"
          @click="login"
          @getphonenumber="getphonenumber"
        >
          启动授权
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
// 微信分享
onShareAppMessage();
onShareTimeline();
useWxShare({
  path: "/pages/login/index",
});

import { editUserInfo, getUserInfo, getPhone } from "@/api/login";
const app = getApp();
export default {
  data() {
    return {};
  },
  onLoad() {
    // 获取启动参数
    // const launchOptions = wx.getLaunchOptionsSync();
    // // 判断是否是通过 URL Scheme 跳转到小程序
    // if (
    //   launchOptions.scene === 1036 &&
    //   launchOptions.query &&
    //   launchOptions.query.urlScheme
    // ) {
    //   // 获取 URL Scheme
    //   const urlScheme = launchOptions.query.urlScheme;
    // }
  },
  methods: {
    login() {
      if (
        !app.globalData.userInfo.nickname ||
        !app.globalData.userInfo.avatar
      ) {
        uni.getUserProfile({
          lang: "zh_CN",
          desc: "用于完善用户昵称、头像",
          success: async (res) => {
            await editUserInfo({
              avatar: res.userInfo.avatarUrl,
              nickname: res.userInfo.nickName,
            });
            const userInfo = await getUserInfo();
            app.globalData.userInfo = userInfo;
          },
        });
      }
    },
    async getphonenumber(e) {
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        console.log(JSON.stringify(e.detail));
        await getPhone(e.detail);
        const userInfo = await getUserInfo();
        app.globalData.userInfo = userInfo;
        app.globalData.islogin = true;
        if (userInfo.phone) {
          if (getCurrentPages().length > 1) {
            uni.navigateBack({
              delta: 1,
            });
          } else {
            uni.switchTab({
              url: "/pages/home/index",
            });
          }
        }
      }
    },
  },
};
</script>

<style>
page {
  background: #fff;
}
.cup-box {
  width: 510rpx;
  padding: 60rpx;
  background: #fff;
}

.cup-box button {
  border-radius: 10upx !important;
  border: 0upx !important;
  height: 88rpx !important;
  line-height: 88rpx !important;
  background: #3291f8;
  color: #fff;
  font-size: 11pt;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
}

.login-btn {
  border: none;
  height: 88rpx;
  line-height: 88rpx;
  background: #31ba52;
  margin: 30rpx;
  color: #fff;
  font-size: 11pt;
  border-radius: 999rpx;
}

.login-btn::after {
  display: none;
}

.login-btn.button-hover {
  box-shadow: inset 0 5rpx 30rpx rgba(0, 0, 0, 0.15);
}
</style>
