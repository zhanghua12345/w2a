<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from '@dcloudio/uni-app'
import TnLoadmore from '@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.vue'
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import TnSuspendButton from 'tnuiv3p-tn-suspend-button/index.vue'
import { useUniAppSystemRectInfo } from '@tuniao/tnui-vue3-uniapp/hooks'
import Box from '@/components/box.vue'
import { useWxShare } from '@/hooks'
console.log(useUniAppSystemRectInfo())
const { navBarInfo } = useUniAppSystemRectInfo()

const topSwiperData = [
  'https://pic.rmb.bdstatic.com/bjh/240515/events/38e5e2dfabdd3ee5dbab1cf0229f4e3c6395.jpeg',
  'https://pic.rmb.bdstatic.com/bjh/240515/events/488d1ec94a094e27b0d16282f157e3db8996.jpeg',
  'https://pic.rmb.bdstatic.com/bjh/240515/events/ac8d30b1a701ed4f9cb7307b98808f518730.jpeg',
  'https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg',
]
const currentSwiperIndex = ref(0)
// 微信分享
onShareAppMessage(() => ({}))
onShareTimeline(() => ({}))
useWxShare({
  path: '',
})

const pickers = ref([
  { label: '户型', value: 0 },
  { label: '风格', value: 0 },
  { label: '系列', value: 0 },
  { label: '颜色', value: 0 },
])
const openPicker = ref(false)
const pickerIndex = ref(0)
const pickerData = [
  [
    { label: '全部', value: 1 },
    { label: '复式', value: 7 },
    { label: '别墅', value: 8 },
    { label: '一居室', value: 2 },
    { label: '两居室', value: 3 },
    { label: '三居室', value: 4 },
    { label: '四居室', value: 5 },
    { label: '五居室', value: 6 },
  ],
  [
    { label: '全部', value: 1 },
    { label: '现代简约', value: 11 },
    { label: '极简东方', value: 21 },
    { label: '当代美式', value: 31 },
    { label: '混搭风格', value: 41 },
  ],
  [
    { label: '帕马尔', value: 12 },
    { label: '云端之境', value: 22 },
    { label: '城市辉光', value: 32 },
    { label: '魔光', value: 42 },
    { label: '西格拉底', value: 52 },
  ],
  [
    { label: '星空纹', value: 12 },
    { label: '卡布其纹', value: 22 },
    { label: '星际黑', value: 32 },
    { label: '卡其灰', value: 42 },
    { label: '光影灰', value: 52 },
  ],
]
const pickerClick = (index: number) => {
  openPicker.value = true
  pickerIndex.value = index
}
const pickerConfirm = (value: any, item: any) => {
  console.log(value, item)
  pickers.value[pickerIndex.value] = item
}

const scrollTop = ref(0)

onPageScroll((e) => {
  console.log(e.scrollTop)
  scrollTop.value = e.scrollTop
})
</script>

<template>
  <TnSuspendButton icon="logo-tuniao" class="z-[9999]" />

  <!-- <view
    class="header fixed top-0 left-0 w-full z-[99999] flex items-center justify-center bg-fff tn-shadow tn-gray_shadow"
    :style="{ height: navBarInfo.height + 'px' }"
    >梵米尼</view
  > -->

  <view class="main w-full">
    <!-- 顶部轮播 -->
    <TnSwiper
      v-model="currentSwiperIndex"
      :data="topSwiperData"
      width="100%"
      height="420"
      indicator
      indicator-type="line"
    >
      <template #default="{ data }">
        <view class="w-full h-[420rpx]">
          <image class="w-full h-full" :src="data" mode="aspectFill" />
        </view>
      </template>
    </TnSwiper>
    <view
      class="flex flex-wrap items-center justify-between mt-[32rpx] mx-[30rpx] px-[20rpx] bg-fff rounded-[20rpx]"
    >
      <view
        v-for="(item, index) in pickers"
        :key="index"
        class="w-[160rpx] flex justify-center items-center py-[20rpx] text-24"
        @click="pickerClick(index)"
      >
        {{ item.label
        }}<TnIcon name="down" class="ml-[6rpx]" color="rgba(0,0,0,.5)" />
      </view>
      <TnPicker
        v-model="pickers[pickerIndex].value"
        v-model:open="openPicker"
        mask
        :z-index="999999"
        :data="pickerData[pickerIndex]"
        @confirm="pickerConfirm"
      />
    </view>
    <view class="content-container">
      <view v-for="item in 30" :key="item" class="mt-[30rpx] w-full">
        <Box />
      </view>
    </view>
    <TnLoadmore status="loading" color="tn-gray-disabled" class="mt-[30rpx]" />
  </view>
</template>

<style lang="scss" scoped>
.main {
  padding-bottom: calc(100rpx + 80rpx + env(safe-area-inset-bottom));
  .content-container {
    position: relative;
    width: 100%;
    padding: 0 32rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
