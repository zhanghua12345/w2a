<script lang="ts" setup>
import TnDemoPageContainer from '../page-container/src/page-container.vue'
import { useComponent } from './composables'

import type { PageContainerData } from '../page-container'

useComponent()

const topSwiperData = [
  'https://resource.tuniaokj.com/images/vue3/banner/vue3-2-min.jpg',
]
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>
// #endif

<template>
  <!-- 顶部轮播 -->
  <view class="tn-w-full">
    <swiper class="banner">
      <swiper-item
        v-for="(e, index) in topSwiperData"
        :key="index"
        class="swiper-item"
      >
        <image class="tn-w-full" :src="e" mode="heightFix" />
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 400rpx;
}
</style>
