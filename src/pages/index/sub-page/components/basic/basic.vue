<script lang="ts" setup>
import TnDemoPageContainer from '../page-container/src/page-container.vue'
import { useBasic } from './composables'

import type { PageContainerData } from '../page-container'

useBasic()

const topSwiperData = [
  'https://resource.tuniaokj.com/images/vue3/banner/vue3-1-min.jpg',
  'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
  'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
  'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
]
const data: PageContainerData[] = [
  {
    title: '',
    tip: '',
    type: 'banner',
    list: [
      {
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
        url: '/demo-pages/basic/color/index',
      },
      {
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
        url: '/demo-pages/basic/color/index',
      },
    ],
  },
  {
    title: '',
    tip: '',
    type: 'banner_sub',
    list: [
      {
        image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
        url: '/demo-pages/basic/color/index',
        name: '奶油风',
      },
      {
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
        url: '/demo-pages/basic/color/index',
        name: '奶油风',
      },
      {
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
        name: '奶油风',
      },
    ],
  },
  {
    title: '家空间',
    tip: '潮流新品，一应俱全',
    type: 'box-1',
    list: [
      {
        name: '奶油风',
        image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '现代风',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '潮流风',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
    ],
  },
  {
    title: '家生活方式',
    tip: '打造111',
    type: 'box-2',
    list: [
      {
        name: '介绍1',
        image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍2',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍3',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
    ],
  },
  {
    title: '新品品鉴',
    tip: '打造121',
    type: 'box-3',
    list: [
      {
        name: '介绍1',
        image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍2',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍3',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
    ],
  },
  {
    title: '严选',
    tip: '打造121',
    type: 'box-4',
    list: [
      {
        name: '介绍1',
        image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍2',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍3',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍4',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
    ],
  },
  {
    title: '推文',
    tip: '打造121',
    type: 'box-5',
    list: [
      {
        name: '介绍1',
        image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍2',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍3',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍4',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
    ],
  },
  {
    title: '',
    tip: '',
    type: 'footer',
    list: [
      {
        name: '介绍1',
        image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍2',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍3',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
      {
        name: '介绍4',
        image_url:
          'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
        url: '/demo-pages/basic/color/index',
      },
    ],
  },
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
  <TnDemoPageContainer :top-swiper-data="topSwiperData" :data="data" />
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
