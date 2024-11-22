<script lang="ts" setup>
import type { PropType } from 'vue'
defineProps({
  dItem: {
    type: Object as PropType<any>,
    required: true,
    default: () => {
      return {
        title: '页脚',
        path: 'footer',
        url: '/demo-pages/basic/footer/index',
      }
    },
  },
})
const list = ['三居室', '123m²', '现代简约', '马克色']
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
  <view
    class="w-full rounded-12 overflow-hidden tn-shadow tn-gray-disabled_shadow bg-fff content-item"
    @tap.stop="navDemoPage(dItem.url)"
  >
    <!-- https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg -->
    <img
      class="w-full h-[300rpx]"
      src="https://img2.baidu.com/it/u=3788447690,3423920042&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500"
      alt=""
    />
    <view class="px-[24rpx] py-[14rpx] w-full">
      <view class="truncate"
        >最佳“灰+白”搭配！138m²美式温馨四居室，餐厅利用率100%</view
      >
      <view
        class="flex flex-wrap items-center justify-between mt-[6rpx] text-24 text-000-4"
      >
        <view class="flex-1 flex flex-wrap justify-start">
          <view v-for="(item, index) in list" :key="item" class="">
            {{ item }}
            <TnIcon v-show="index !== list.length - 1" name="title" />
          </view>
        </view>
        <view class="flex flex-wrap items-center justify-end">
          <TnIcon name="like-lack" class="mr-[4rpx]" /> 555
          <TnIcon name="title" />
          <TnIcon name="star" class="mr-[4rpx]" /> 100
          <!-- <TnIcon name="title" /> -->
          <!-- <TnIcon name="carousel" /> -->
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.content-item {
  opacity: 0;
  animation: list-item-enter-animation 0.3s ease forwards;
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
