<template>
  <view class="tabbar-contain">
    <image
      src="/static/images/icon/icon-success.png"
      mode="scaleToFill"
      class="success-icon"
    />
    <i class="iconfont text-main-vip text-128">&#xe632;</i>
    <view class="name">提交成功</view>
    <view class="text">工作人员会在3个工作日内审核</view>
    <view class="text">联系我们：865-884-6224</view>
    <view class="btn2" @click="goHome"> 返回个人中心 </view>
  </view>
</template>
<script>
import { registerRes } from "@/api/login";
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
        url: "/pages/my/index",
      });
    },

    async getGroupList() {
      const data = await registerRes();
      roles.value = data.list;
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
