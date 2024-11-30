<template>
  <view class="before-after-scale w-60 h-60"></view>
</template>
<script setup></script>
<style lang="scss" scoped>
.before-after-scale {
  position: relative;
  &:active {
    transform: scale(0.98);
  }

  &::before {
    content: "";
    background: url(/static/download1.png) 0 /100% no-repeat;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    animation: beforeScale 1s infinite linear;
    position: absolute;
    z-index: 1;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  &::after {
    content: "";
    background: url(/static/download.png) 0 / 100% no-repeat;
    width: 70rpx;
    height: 70rpx;
    animation: afterScale 1s infinite linear;
    position: absolute;
    top: 22rpx;
    right: -32rpx;
    z-index: 2;
    /*开启硬件加速   解决页面闪白   保证动画流畅*/
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes afterScale {
  0%,
  100% {
    top: 22rpx;
    right: -32rpx;
  }

  50% {
    top: 42rpx;
    right: -52rpx;
  }
}

@keyframes beforeScale {
  0%,
  100% {
    transform: scale(1);
    opacity: 0;
  }

  25% {
    transform: scale(1.5);
    opacity: 1;
  }

  50% {
    transform: scale(2);
    opacity: 0.8;
  }

  75% {
    transform: scale(2);
    opacity: 0.1;
  }
}
</style>
