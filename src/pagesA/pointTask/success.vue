<template>
  <view class="tabbar-contain pt-100">
    <i class="iconfont text-main-vip text-128">&#xe632;</i>
    <view class="name">{{ msg || "提交成功" }}</view>
    <view class="text">你可以前往我的邀请查看提交结果</view>
    <view class="text mt-main">联系我们：865-884-6224</view>
    <view class="btn2" @click="openPointTask"> 我的邀请</view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      msg: "",
    };
  },
  onLoad(options) {
    this.msg = options.msg;
  },
  methods: {
    openPointTask() {
      uni.navigateTo({
        url: "/pagesA/pointTask/list",
      });
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
  bottom: 80rpx;
  left: 64rpx;
  width: 622rpx;
  height: 84rpx;
  background: #805844;
  color: #fffcfb;
  border-radius: 60rpx;
  line-height: 84rpx;
  font-size: 34rpx;
  text-align: center;
}
</style>
