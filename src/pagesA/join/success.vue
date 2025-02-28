<template>
  <view class="tabbar-contain">
    <image
      src="/static/images/icon/icon-success.png"
      mode="scaleToFill"
      class="success-icon"
    />
    <view class="name">提交成功</view>
    <view class="text">请您保持电话畅通</view>
    <view class="text">工作人员会在3个工作日内与您联系</view>
    <view class="btn2" @click="goHome"> 返回首页 </view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      height: 0,
      scrollTop: 0,
    };
  },
  onLoad() {
    const res = uni.getSystemInfoSync();
    this.height = res.statusBarHeight * 2;
  },
  onShow() {},

  onPageScroll(e) {
    // 页面滚动时会触发
    this.scrollTop = e.scrollTop; // 更新滚动位置
  },

  methods: {
    goHome(e) {
      uni.reLaunch({
        url: "/pages/custormer/index/index",
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
