<script lang="ts" setup>
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'
import TnFooter from '@tuniao/tnui-vue3-uniapp/components/footer/src/footer.vue'
import { tnNavPage } from '@tuniao/tnui-vue3-uniapp/utils'
import TnDemoPageContainer from '../page-container/src/page-container.vue'
import { useBasic } from './composables'

import type { PageContainerData } from '../page-container'

useBasic()

const bannerList = [
  {
    image_url:
      'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
    url: '/demo-pages/basic/color/index',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
    url: '/demo-pages/basic/color/index',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
    url: '/demo-pages/basic/color/index',
  },
]
const bannerSub = [
  {
    image_url:
      'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
    url: '/demo-pages/basic/color/index',
    name: '奶1油风',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
    url: '/demo-pages/basic/color/index',
    name: '奶1油风',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
    url: '/demo-pages/basic/color/index',
    name: '奶1油风',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
    url: '/demo-pages/basic/color/index',
    name: '奶1油风',
  },
]
const footerNavigator: any = [
  {
    title: '回到首页',
    url: '/pages/index/index?index=0',
    textColor: 'tn-gray',
  },
  {
    title: '关于图鸟',
    url: '/pages/index/index?index=3',
  },
]

// 导航点击事件
const navClick = (nav: any) => {
  if (nav.url) {
    tnNavPage(nav.url, 'reLaunch')
  }
}
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
  <view class="page-container">
    <view class="swiper-wrapper tn-animation-fade-in">
      <TnSwiper
        :data="bannerList"
        indicator
        indicator-position="right-bottom"
        height="600"
      >
        <template #default="{ data, active }">
          <view class="animation" :class="[{ active }]">
            <image class="image" :src="data.image_url" mode="aspectFill" />
          </view>
        </template>
      </TnSwiper>
      <view class="swiper-list tn-flex-center-around">
        <view v-for="e in bannerSub" :key="e.image_url" class="list-wrapper">
          <image class="wrapper-image" :src="e.image_url" mode="aspectFill" />
          <view class="wrapper-name">{{ e.name }}</view>
        </view>
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="加.空间"
        sub-title="打造我的消防滋滋滋"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <TnScrollList :indicator="false">
        <view class="scroll-container">
          <view
            v-for="(e, i) in bannerSub"
            :key="i"
            class="scroll-item tn-flex-center tn-flex-column"
          >
            <image
              class="tn-grey-light_bg"
              :src="e.image_url"
              mode="aspectFill"
            />
            <view class="title">{{ e.name }}</view>
          </view>
        </view>
      </TnScrollList>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="加.空间"
        sub-title="打造我的消防滋滋滋"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <view class="box3">
        <view class="left bg-cover"> 2 </view>
        <view class="right">
          <view class="right-top bg-cover"> 2 </view>
          <view class="right-top bg-cover"> 3 </view>
        </view>
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="加.空间"
        sub-title="打造我的消防滋滋滋"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <view class="box4">
        <view class="top tn-flex-center-between">
          <view class="top-left">1</view>
          <view class="top-right tn-ml-[20rpx]">2</view>
        </view>
        <view class="bottom tn-flex-center-between">
          <view class="bottom-left">3</view>
          <view class="bottom-left">4</view>
          <view class="bottom-more">5</view>
        </view>
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="加.空间"
        sub-title="打造我的消防滋滋滋"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <view class="box5">
        <view class="box" />
        <view class="box" />
        <view class="box" />
        <view class="box" />
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="加.空间"
        sub-title="打造我的消防滋滋滋"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <view class="box6">
        <view class="box1" />
        <view class="box2" />
      </view>
    </view>

    <TnFooter
      content="Copyright © 2023 图鸟科技"
      :navigator="footerNavigator"
      :fixed="false"
      @navigator-click="navClick"
    />
  </view>
</template>

<style lang="scss" scoped>
.page-container {
  padding-bottom: calc(100rpx + 80rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + 80rpx + env(safe-area-inset-bottom));
}
.title {
  padding: 32rpx 32rpx 0;
  width: 100%;
  display: inline-block;
}
/* 入场动画 end */
.swiper-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  .animation {
    width: 100%;
    height: 100%;
    transition: transform 0.5s linear;
    transform: scale(0.8);
  }
  .active {
    transform: scale(1);
  }
  .swiper-list {
    position: absolute;
    bottom: 30rpx;
    left: 30rpx;
    width: 690rpx;
    padding: 30rpx 0;
    height: 100rpx;
    border: 10rpx;
    background: rgba(0, 0, 0, 0.4);
    .list-wrapper {
      width: 150rpx;
      height: 80rpx;
      background: rgba(0, 0, 0, 0.4);
      position: relative;
      .wrapper-image {
        width: 100%;
        height: 100%;
        position: absolute;
        border: 4rpx;
      }
    }
  }
}
.scroll-container {
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;

  .scroll-item {
    flex-grow: 1;
    flex-shrink: 0;
    position: relative;
    margin: 0rpx 20rpx;

    image {
      width: 300rpx;
      height: 200rpx;
      border-radius: 15rpx;
    }

    .title {
      position: absolute;
      right: 10rpx;
      bottom: 10rpx;
    }
  }
}
.bg-cover {
  background-position: center; /* 水平垂直居中 */
  background-size: cover; /* 保持图片的宽高比，并覆盖整个元素 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}
.box3 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  .left {
    width: 300rpx;
    height: 400rpx;
    border-radius: 10rpx;
    text-align: center;
    background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
  }
  .right {
    flex: 1;
    padding-left: 20rpx;
    height: 400rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right-top {
      width: 100%;
      height: 190rpx;
      background: #f30;
      border-radius: 10rpx;
      text-align: center;
      background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
    }
  }
}
.box4 {
  padding: 0 32rpx;
  .top {
    text-align: center;
    .top-left,
    .top-right {
      width: 360rpx;
      background: #f30;
      border-radius: 10rpx;
      height: 100rpx;
      background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
    }
  }
  .bottom {
    margin-top: 20rpx;
    .bottom-left,
    .bottom-more {
      width: 200rpx;
      background: #f30;
      border-radius: 10rpx;
      height: 100rpx;
      background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
    }
  }
}
.box5 {
  margin: 0 32rpx;
  padding: 20rpx;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .box {
    margin: 10rpx;
    width: 300rpx;
    height: 400rpx;
    background: #f30;
    border-radius: 10rpx;
    background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
  }
}
.box6 {
  padding: 0 32rpx;

  .box1 {
    width: 100%;
    height: 200rpx;
    background: #f30;
    border-radius: 10rpx;
    background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
  }
  .box2 {
    margin-top: 10rpx;
    width: 100%;
    height: 500rpx;
    background: #f30;
    border-radius: 10rpx;
    background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
  }
}
</style>
