<template>
  <view class="tabbar-contain pt-100">
    <i class="iconfont text-main-vip text-128">&#xe6e7;</i>
    <view class="name">您的会员审核失败啦！</view>
    <view class="text">失败原因</view>
    <view class="text">{{ detail.remarks }}</view>
    <view class="text mt-main">联系我们：865-884-6224</view>
    <view class="btn2" @click="goRegister"> 重新提交 </view>
  </view>
</template>
<script>
import { registerRes } from "@/api/login";
export default {
  components: {},
  data() {
    return {
      scrollTop: 0,
      detail: {},
    };
  },
  onLoad() {
    this.registerData();
  },

  methods: {
    goRegister() {
      uni.navigateTo({ url: "/pages/register/index" });
    },

    async registerData() {
      const data = await registerRes();
      console.log(data);
      this.detail = data.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar-contain {
  color: #333;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5;
  font-size: 24upx;
  letter-spacing: 2upx;
  .success-icon {
    width: 156upx;
    height: 156upx;
    margin-top: 120upx;
  }
  .name {
    font-size: 40upx;
    font-weight: 500;
    padding: 40upx 0;
  }
  .text {
    font-size: 30upx;
    color: #9e9e9e;
  }
}
.btn2 {
  position: fixed;
  bottom: 80upx;
  left: 64upx;
  width: 622upx;
  height: 84upx;
  background: #805844;
  color: #fffcfb;
  border-radius: 60upx;
  line-height: 84upx;
  font-size: 34upx;
  text-align: center;
}
</style>
