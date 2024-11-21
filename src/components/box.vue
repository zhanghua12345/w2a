<script lang="ts" setup>
import type { PropType } from 'vue'
defineProps({
  dItem: {
    type: Object as PropType<any>,
    required: true,
    default: () => {
      return {
        title: '页脚',
        icon: 'rocket',
        path: 'footer',
        url: '/demo-pages/basic/footer/index',
      }
    },
  },
})
const list = ['123m²', '现代风', '大三房']
// 跳转到对应的演示页面
const navDemoPage = (path: string) => {
  console.log(1)
}
</script>

<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>

<template>
  <view class="content-item" @tap.stop="navDemoPage(dItem.url)">
    <img
      src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
      alt=""
    />
    <view class="info">
      <view class="title">雅居 - 绿地V岛</view>
      <view class="tag">
        <view v-for="item in list" :key="item" class="box">
          {{ item }}
        </view>
      </view>
    </view>
    <view class="icon">
      <TnIcon :name="dItem.icon" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.content-item {
  position: relative;
  width: 330rpx;
  margin-bottom: 24rpx;
  height: 400rpx;
  opacity: 0;
  border-radius: 8rpx;
  overflow: hidden;
  animation: list-item-enter-animation 0.3s ease forwards;
  img {
    width: 100%;
    height: 100%;
  }
  .info {
    position: absolute;
    z-index: 1;
    padding: 24rpx;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    color: #fff;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    );

    .title {
      font-size: 28rpx;
      font-weight: 600;
    }
    .tag {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      height: 40rpx;
      width: 100%;
      .box {
        max-width: 100%;
        white-space: nowrap; /* 保证文本在一行内显示 */
        overflow: hidden; /* 超出容器部分隐藏 */
        text-overflow: ellipsis; /* 使用省略符号表示文本被截断 */
        line-height: 1;
        font-size: 22rpx;
        background: rgba(255, 255, 255, 0.1);
        padding: 4rpx 8rpx;
      }
    }
  }
  .icon {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    width: 60rpx;
    height: 60rpx;
    padding: 10rpx;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
  }
  /* 数据 end */
}

/* 入场动画 start */
@keyframes list-item-enter-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
/* 入场动画 end */
</style>
