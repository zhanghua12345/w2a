<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'
import { tnNavPage } from '@tuniao/tnui-vue3-uniapp/utils'
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'

import { pageContainerProps } from './page-container'

import type { PageContainerDataItem } from './page-container'

type ListData = {
  title: string
  data: PageContainerDataItem[]
  tips?: string
}

const props = defineProps(pageContainerProps)

// 是否显示顶部轮播
const showTopSwiper = computed(() => props.topSwiperData?.length > 0)

// 列表数据
const listData = ref<ListData[]>([])
watch(
  () => props.data,
  (val) => {
    if (val) {
      listData.value = Object.entries(val).map(([key, value]) => ({
        title: key,
        data: value.data,
        tips: value?.tips || '',
      }))
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
        :data="topSwiperData"
        indicator
        indicator-position="right-bottom"
      >
        <template #default="{ data, active }">
          <view class="swiper-data animation" :class="[{ active }]">
            <image class="image" :src="data" mode="aspectFill" />
          </view>
        </template>
      </TnSwiper>
      <view class="swiper-list tn-flex-center-around">
        <view v-for="item in topSwiperData" :key="item" class="list-wrapper">
          <image class="wrapper-image" :src="item" mode="aspectFill" />
          <view class="wrapper-name">意见报道</view>
        </view>
      </view>
    </view>

    <!-- 顶部轮播 -->
    <!-- <view v-if="showTopSwiper" class="top-swiper tn-animation-fade-in">
      <swiper class="swiper-container">
        <swiper-item
          v-for="(item, index) in topSwiperData"
          :key="index"
          class="swiper-item"
        >
          <image class="image" :src="item" mode="heightFix" />
        </swiper-item>
      </swiper>
    </view> -->

    <!-- 列表数据 -->
    <view class="list-container">
      <view v-for="(item, index) in listData" :key="index" class="list-item">
        <view v-if="showTitle" class="list-title">
          <TnTitle
            :title="item.title"
            :sub-title="item.title"
            color="tn-type-primary"
            size="xl"
            mode="subTitle"
          />
        </view>
        <view v-if="!!item.tips" class="list-tips tn-red_text">
          {{ item.tips }}
        </view>
        <template v-if="item.title !== '2'">
          <view class="content-container">
            <view
              v-for="(dItem, dIndex) in item.data"
              :key="dIndex"
              class="content-item"
              @tap.stop="navDemoPage(dItem.url)"
            >
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
          </view>
        </template>
        <TnScrollList :indicator="false">
          <view class="item-container">
            <view
              v-for="i in 20"
              :key="i"
              class="scroll-item tn-flex-center tn-flex-column"
            >
              <view class="empty tn-grey-light_bg" />
              <view class="title">图鸟UI</view>
            </view>
          </view>
        </TnScrollList>
      </view>
    </view>
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
</style>
