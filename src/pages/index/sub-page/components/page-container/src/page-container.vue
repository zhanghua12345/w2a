<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'
import { tnNavPage } from '@tuniao/tnui-vue3-uniapp/utils'
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'

import TnFooter from '@tuniao/tnui-vue3-uniapp/components/footer/src/footer.vue'
import { pageContainerProps } from './page-container'

import type {
  FooterNavigator,
  FooterNavigatorData,
} from '@tuniao/tnui-vue3-uniapp'
import type { PageContainerData } from './page-container'

type ListData = PageContainerData

const props = defineProps(pageContainerProps)

// 是否显示顶部轮播

// 列表数据
const listData = ref<ListData[]>([])
watch(
  () => props.data,
  (val) => {
    if (val) {
      listData.value = [...val]
    }
  },
  {
    immediate: true,
  }
)

// 跳转到对应的演示页面
const navDemoPage = (path: string) => {
  tnNavPage(path, 'navigateTo').catch(() => {
    uni.showToast({
      title: '即将上线',
      icon: 'none',
    })
  })
}

const footerNavigator: FooterNavigatorData = [
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
const navClick = (nav: FooterNavigator) => {
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
    <template v-for="item in listData" :key="item">
      <view v-if="item.title" class="list-title">
        <TnTitle
          :title="item.title"
          :sub-title="item.title"
          color="tn-type-primary"
          size="xl"
          mode="subTitle"
        />
      </view>
      <view v-if="!!item.tip" class="list-tips tn-red_text">
        {{ item.tip }}
      </view>
      <view
        v-if="item.type === 'banner'"
        class="swiper-wrapper tn-animation-fade-in"
      >
        <TnSwiper
          :data="item.list"
          indicator
          indicator-position="right-bottom"
          height="600"
        >
          <template #default="{ data, active }">
            <view class="swiper-data animation" :class="[{ active }]">
              <image class="image" :src="data.image_url" mode="aspectFill" />
            </view>
          </template>
        </TnSwiper>
      </view>
      <template v-if="item.type === 'banner_sub'">
        <view class="swiper-list tn-flex-center-around">
          <view v-for="e in item.list" :key="e.image_url" class="list-wrapper">
            <image class="wrapper-image" :src="e.image_url" mode="aspectFill" />
            <view class="wrapper-name">{{ e.name }}</view>
          </view>
        </view>
      </template>
      <!-- 顶部轮播 -->
      <!-- <view
        v-if="item.type === 'banner2'"
        class="top-swiper tn-animation-fade-in"
      >
        <swiper class="swiper-container">
          <swiper-item
            v-for="(e, index) in item.list"
            :key="index"
            class="swiper-item"
          >
            <image class="image" :src="e.image_url" mode="heightFix" />
          </swiper-item>
        </swiper>
      </view> -->
      <TnScrollList v-if="item.type === 'box-1'" :indicator="false">
        <view class="item-container">
          <view
            v-for="(e, i) in item.list"
            :key="i"
            class="scroll-item tn-flex-center tn-flex-column"
          >
            <image
              class="empty tn-grey-light_bg"
              :src="e.image_url"
              mode="aspectFill"
            />
            <view class="title">{{ e.name }}</view>
          </view>
        </view>
      </TnScrollList>
      <view v-if="item.type === 'box-2'" class="box3">
        <view class="left">1</view>
        <view class="right">
          <view class="right-top"> 2 </view>
          <view class="right-top right-bottom"> 3 </view>
        </view>
      </view>
      <view v-if="item.type === 'box-3'" class="box4">
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
      <view v-if="item.type === 'box-4'" class="box5">
        <view class="box" />
        <view class="box" />
        <view class="box" />
        <view class="box" />
      </view>
      <view v-if="item.type === 'box-5'" class="box6">
        <view class="box1" />
        <view class="box2" />
      </view>

      <TnFooter
        v-if="item.type === 'footer'"
        content="Copyright © 2023 图鸟科技"
        :navigator="footerNavigator"
        :fixed="false"
        @navigator-click="navClick"
      />
    </template>
  </view>
</template>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
<style lang="scss" scoped>
.item-container {
  position: relative;
  width: fit-content;

  display: flex;
  flex-wrap: nowrap;

  .scroll-item {
    flex-grow: 1;
    flex-shrink: 0;
    margin: 0rpx 20rpx;

    .empty {
      width: 100rpx;
      height: 100rpx;
      border-radius: 15rpx;
    }

    .title {
      margin-top: 10rpx;
    }
  }
}
.box3 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 300rpx;
    height: 400rpx;
    background: #f30;
    border-radius: 10rpx;
    text-align: center;
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
    }
  }
}
.box4 {
  margin-top: 20rpx;
  .top {
    text-align: center;
    .top-left,
    .top-right {
      width: 360rpx;
      background: #f30;
      border-radius: 10rpx;
      height: 100rpx;
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
    }
  }
}
.box5 {
  margin-top: 20rpx;
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
  }
}
.box6 {
  margin: 10rpx;
  .box1 {
    width: 100%;
    height: 200rpx;
    background: #f30;
    border-radius: 10rpx;
  }
  .box2 {
    margin-top: 10rpx;
    width: 100%;
    height: 500rpx;
    background: #f30;
    border-radius: 10rpx;
  }
}
</style>
