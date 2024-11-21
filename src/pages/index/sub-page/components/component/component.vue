<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import TnLoadmore from '@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.vue'
import Box from '@/components/box.vue'
import { useWxShare } from '@/hooks'

const topSwiperData = [
  'https://resource.tuniaokj.com/images/vue3/banner/vue3-2-min.jpg',
]

// 微信分享
onShareAppMessage(() => ({}))
onShareTimeline(() => ({}))
useWxShare({
  path: '/plugin-demo/tn-dropdown/index',
})
</script>

<template>
  <view class="main w-full">
    <!-- 顶部轮播 -->
    <swiper class="banner">
      <swiper-item
        v-for="(e, index) in topSwiperData"
        :key="index"
        class="w-full h-[400rpx]"
      >
        <image class="w-full" :src="e" mode="heightFix" />
      </swiper-item>
    </swiper>

    <div class="content-container">
      <Box v-for="item in 30" :key="item" />
    </div>
    <TnLoadmore status="nomore" color="tn-gray-disabled" />
    <TnLoadmore status="loading" color="tn-gray-disabled" />
  </view>
</template>

<style lang="scss" scoped>
.main {
  padding-bottom: calc(100rpx + 80rpx + env(safe-area-inset-bottom));
  width: 100%;
  .banner {
    width: 100%;
    height: 400rpx;
  }
  .dropdown-container {
    position: relative;
    width: 100%;

    .dropdown-menu {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: var(--tn-color-white);

      .dropdown-menu-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10rpx 0rpx;

        .icon {
          margin-left: 6rpx;
          transform-origin: center center;
          transform: rotate(0deg);
          transition: transform 0.25s linear;
          line-height: 1;

          &.active {
            transform: rotate(-180deg);
          }
        }

        .double-icon {
          margin-left: 6rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .top {
            transform: translateY(14rpx);
          }
          .bottom {
            transform: translateY(-12rpx);
          }
        }
      }
    }

    .dropdown-content {
      position: relative;
      width: 100%;
      padding: 0rpx 30rpx;

      .recommend-list {
        position: relative;
        width: 100%;

        .recommend-list-item {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 20rpx 0rpx;

          .item-select-icon {
            margin-right: 20rpx;
          }
        }
      }
    }
  }

  .content-container {
    position: relative;
    width: 100%;
    padding: 32rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
