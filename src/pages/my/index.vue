<template>
  <!-- 背景毛玻璃 -->
  <view
    class="bg-frosted-glass fixed z-1b left-0 top-0 right-0 h-690 bg-no-repeat"
  >
    <view class="h-full backdrop-opacity-20 bg-f8f8f8-5"></view>
  </view>
  <!-- 顶部容器 -->
  <view class="px-main pt-main">
    <view
      class="flex flex-wrap justify-between items-center"
      :style="{
        paddingTop: '45px',
      }"
    >
      <view>
        <view class="text-48 font-700">张三李四</view>
        <view class="">张三李四张三李四张三李四张三李四</view>
      </view>
      <view class="h-150 w-150 rounded-full bg-d6f4fa"></view>
    </view>
    <view class="pt-80 flex flex-wrap">
      <view class="pr-50" v-for="item in 3">
        <view class="text-40">{{ item }}</view>
        <view class="text-9c9c9c text-32">案例</view>
      </view>
    </view>
    <view class="bg-fff rounded-32 overflow-hidden mt-50">
      <view
        class="bg-131313 px-main flex flex-wrap justify-between items-center"
      >
        <view class="text-[#aaa] py-30">
          <i class="iconfont text-fff text-40">&#xeaf6;</i>
          <view>加入VIP</view>
        </view>
        <view
          class="py-12 px-30 text-5e3d05 rounded-full bg-vip-gradient"
          @click="goVip"
          >立即加入</view
        >
      </view>
      <view class="flex flex-wrap justify-around py-main">
        <view class="flex flex-col items-center" v-for="item in 4">
          <i class="iconfont text-64">&#xeaf6;</i>
          <view>加入VIP</view>
        </view>
      </view>
    </view>
    <view class="mt-main bg-fff rounded-32 overflow-hidden">
      <up-cell-group :border="false">
        <up-cell
          v-for="item in 4"
          icon="map"
          title="霜叶红于二月花"
          :isLink="false"
          :border="false"
        ></up-cell>
      </up-cell-group>
    </view>
    <view class="mt-main">
      <view class="flex justify-between items-center">
        <view class="">友情链接</view>
        <view class="flex items-center">
          全部
          <i class="iconfont text-28 ml-10">&#xeaf6;</i>
        </view>
      </view>
      <view class="bg-fff rounded-32 overflow-hidden mt-main">
        <view class="flex flex-wrap justify-around py-main">
          <view class="flex flex-col items-center" v-for="item in 4">
            <i class="iconfont text-64">&#xeaf6;</i>
            <view>加入VIP</view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <Footer className="py-60" content="Copyright © 2023 图鸟科技" />
</template>

<script setup>
import { ref } from "vue";
import Footer from "@/components/footer/index.vue";

const router = ref([
  {
    label: "reward.Rewards",
    router: "../reward/index",
  },
  {
    label: "leave.Leave",
    router: "../leave/index",
  },
]);
const goVip = () => {
  uni.navigateTo({ url: "/pages/register/index" });
};
</script>

<style scoped lang="scss">
$top-container-height: 690rpx;
/* 背景毛玻璃 start */
.bg-frosted-glass {
  background-image: linear-gradient(180deg, #d6f4fa 0%, #f8f8f8 100%);
  background-size: 100% 590rpx;
}
.bg-vip-gradient {
  background-image: linear-gradient(270deg, #feeacc 0%, #ffe3a3 100%);
}
</style>
