<template>
  <view>
    <view class="after-navber">
      <view style="padding: 0 60rpx">
        <view
          style="
            padding: 80rpx 0 48rpx;
            border-bottom: 1rpx solid #e3e3e3;
            margin-bottom: 72rpx;
            text-align: center;
          "
        >
          <image
            src="https://img2.baidu.com/it/u=3788447690,3423920042&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500"
            style="width: 200rpx; height: 200rpx"
            class="logo"
          ></image>
        </view>
        <view style="font-size: 13pt; margin-bottom: 40rpx"
          >申请获取以下权限</view
        >
        <view style="color: #888; margin-bottom: 88rpx"
          >获得你的公开信息（昵称、头像、手机号等）</view
        >
        <button
          class="login-btn"
          open-type="getPhoneNumber"
          @click="login"
          @getphonenumber="getphonenumber"
        >
          授权登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
// import { wxLogin } from "@/api/custormer.js";

export default {
  data() {
    return {
      code: "",
      nickName: "",
      avatarUrl: "",
      encryptedData: "",
      iv: "",
    };
  },
  onLoad() {
    // 获取启动参数
    const launchOptions = wx.getLaunchOptionsSync();
    // 判断是否是通过 URL Scheme 跳转到小程序
    if (
      launchOptions.scene === 1036 &&
      launchOptions.query &&
      launchOptions.query.urlScheme
    ) {
      // 获取 URL Scheme
      const urlScheme = launchOptions.query.urlScheme;
    }
    uni.login({
      success: (res) => {
        this.code = res.code;
      },
    });
  },
  methods: {
    login() {
      uni.getUserProfile({
        lang: "zh_CN",
        desc: "用于完善用户昵称、头像",
        success: (r) => {
          this.avatarUrl = r.userInfo.avatarUrl;
          this.nickName = r.userInfo.nickName;
          this.wxlogin();
        },
      });
    },
    getphonenumber(e) {
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        this.encryptedData = e.detail.encryptedData;
        this.iv = e.detail.iv;
        this.wxlogin();
      }
    },
    wxlogin() {
      if (this.code && this.nickName && this.encryptedData) {
        let info = {};
        if (uni.getStorageSync("shareUserId")) {
          info.userId = uni.getStorageSync("shareUserId");
        }
        // wxLogin(
        //   {
        //     code: this.code,
        //     encryptedData: this.encryptedData,
        //     iv: this.iv,
        //     nickname: this.nickName,
        //     avatar: this.avatarUrl,
        //     ...info,
        //   },
        //   (res) => {
        //     if (res.code === 0) {
        //       uni.setStorageSync("token", res.token);
        //       uni.showToast({
        //         title: "登录成功!",
        //       });
        //       setTimeout(() => {
        //         uni.navigateBack();
        //       }, 1000);
        //     } else {
        //       uni.showToast({
        //         title: res.msg,
        //         icon: "none",
        //       });
        //     }
        //   }
        // );
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
  background: #9a613f;
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
