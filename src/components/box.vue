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
    <view class="bg tn-gradient-bg__blue-light" />
    <view class="data">
      <view class="title tn-text-ellipsis-1">{{ dItem.title }}</view>
      <view class="path tn-gray_text tn-text-ellipsis-1">
        <TnIcon name="code" />
        <text>{{ dItem.path }}</text>
      </view>
      <view class="icon tn-grey_text">
        <TnIcon :name="dItem.icon" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.content-item {
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  width: calc(100% / 2 - 16rpx);
  height: 300rpx;
  opacity: 0;
  animation: list-item-enter-animation 0.3s ease forwards;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4NDcuMyAyODkuOSI+PGNpcmNsZSBjeD0iNzczLjQiIGN5PSIyMTYiIHI9IjczIi8+PHBhdGggZD0iTTc5NCAwSDQyLjVDMTkgMCAwIDE5IDAgNDIuNXYyMDQuOGMwIDIzLjUgMTkgNDIuNSA0Mi41IDQyLjVoNjA4LjhjMjQuMSAwIDQxLjMtMjEuNiAzNy44LTQ0LjEtLjQtMi42LTEuMS01LjMtMi4xLTcuOS0xLjQtMy41LTIuNS03LjItMy4zLTExLS44LTQuNy0xLjItOS41LTEuMi0xNC40IDAtNDggMzguOS04Ni45IDg2LjktODYuOSA3LjggMCAxNS40IDEgMjIuNiAzIDEuMS40IDIuMS43IDMuMiAxLjEgMS43LjYgMy40IDEuMSA1LjEgMS41IDIzLjUgNS41IDQ3LTEyLjIgNDctMzcuMlY1My4zQzg0Ny4zIDIzLjggODIzLjUgMCA3OTQgMHoiLz48L3N2Zz4=');
    mask-size: 100% 100%, top;
    mask-repeat: no-repeat;
    mask-composite: xor;
    z-index: 1;
  }

  /* 数据 start */
  .data {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    padding: 20rpx 30rpx;
    padding-top: 14rpx;

    .title {
      font-size: 38rpx;
      width: 90%;
      vertical-align: middle;
    }
    .path {
      margin-top: 8rpx;
      width: 80%;
      line-height: 1;

      text {
        margin-left: 10rpx;
      }
    }

    .icon {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36rpx;
    }
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
