<template>
  <Navbar />

  <view class="w-full h-700 relative">
    <up-swiper
      :list="info[0]?.list"
      @click="swiperClick"
      keyName="img"
      indicator
      indicatorMode="line"
      circular
      easingFunction="easeInOutCubic"
      height="700rpx"
      radius="0"
    />
    <image
      class="absolute max-w-500 left-main"
      mode="heightFix"
      :style="{
        top: boundInfo.boundTop + 'px',
        height: boundInfo.boundHeight + 'px',
      }"
      v-if="info[0].img"
      :src="info[0].img"
    />
    <view
      v-if="info[1]?.list?.length"
      class="absolute bottom-main left-main right-main py-10 rounded-main bg-000-6 flex items-center justify-around shadow-md px-6"
    >
      <view
        v-for="(item, index) in info[1].list"
        :key="index"
        @click="openDetail(item)"
        class="relative w-158 h-106 overflow-hidden rounded-main"
      >
        <image class="w-full h-full bg-cover" :src="item.img" />
        <view
          class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-fff"
        >
          <i class="iconfont text-fff text-40 leading-1.2">{{
            index === 0
              ? "&#xe613;"
              : index === 1
              ? "&#xe62c;"
              : index === 2
              ? "&#xe627;"
              : "&#xe68f;"
          }}</i>
          <view class="text-24 bg-000-6 rounded-8 px-8 py-2">{{
            item.title
          }}</view>
        </view>
      </view>
    </view>
  </view>
  <!-- 案例 -->
  <view class="mt-40 mx-main" v-if="info[2]?.list?.length">
    <Title
      className="mb-20"
      :title="info[2].title"
      :subTitleBottom="info[2].subTitle"
      :isMore="true"
      @click="openDetail(info[2])"
    />
    <up-scroll-list :indicator="false">
      <view
        class="h-320 mr-main last:mr-0 shadow-md"
        v-for="(item, index) in info[2].list"
        :key="index"
        @click="openDetail(item)"
      >
        <view class="h-full overflow-hidden rounded-main relative">
          <image class="w-240 h-full" :src="item.img"></image>
          <view
            class="absolute top-30 left-0 bg-fff-8 text-main p-8 pr-16 min-w-120 rounded-r-full flex justify-center"
            >{{ item.title }}</view
          >
        </view>
      </view>
    </up-scroll-list>
  </view>
  <view class="mx-main mt-40" v-if="info[3]?.list?.length">
    <view class="grid grid-rows-2 grid-cols-9 gap-20 h-330">
      <view
        class="rounded-main text-fff relative shadow-sm"
        v-for="(item, index) in info[3].list"
        :key="index"
        @click="openDetail(item)"
        :class="
          index === 0
            ? ['row-span-2', 'col-span-4', 'bg-fdf2e0']
            : index === 1
            ? ['col-span-5', 'bg-f5f4d6']
            : ['row-span-1', 'col-span-5', 'bg-f9ebea']
        "
      >
        <view class="p-main absolute z-[9] flex flex-col justify-between">
          <view class="text-[#866350] text-36">{{ item.title }}</view>
          <view class="text-tip text-24 pt-10 flex items-center">
            {{ item.subTitle }}
            <i class="iconfont text-18 ml-4">&#xe671;</i>
          </view>
        </view>
        <view
          class="border-[#e1a490] text-[#e1a490] px-20 py-10 border-2 border-solid rounded-8 absolute bottom-80 left-main text-32"
          v-if="index === 0"
        >
          立即邀请
        </view>
        <image
          class="w-100 h-100 bg-cover absolute right-0 bottom-30"
          :src="item.img"
          alt=""
        />
      </view>
    </view>
  </view>
  <!-- 家·空间 -->
  <view class="mx-main mt-40" v-if="info[4]?.list?.length">
    <Title
      :title="info[4].title"
      :subTitle="info[4].subTitle"
      :isMore="true"
      @click="openDetail(info[4])"
    />
    <view class="mt-main grid grid-rows-5 grid-cols-6 gap-20 h-450">
      <view
        class="bg-000 rounded-main text-fff relative overflow-hidden shadow-md"
        :class="{
          'row-span-2 col-span-2': [0, 1, 2].includes(index),
          'row-span-3 col-span-3': [3, 4].includes(index),
        }"
        v-for="(item, index) in info[4].list"
        :key="index"
        @click="openDetail(item)"
      >
        <image class="w-full h-full bg-cover" :src="item?.img" alt="" />
        <view class="absolute bottom-10 left-0 right-0 flex justify-center">
          <view class="bg-000-6 text-fff text-24 rounded-full px-16 py-8">
            {{ item.title }}
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 公司介绍 -->
  <view class="mx-main mt-40" v-if="info[5]?.list?.length">
    <Title :title="info[5].title" :subTitle="info[5].subTitle" />
    <view
      class="mt-main p-20 bg-000-08 rounded-main grid grid-rows-2 grid-cols-2 gap-main"
    >
      <view
        v-for="item in info[5].list"
        :key="item"
        class="relative h-200 rounded-main overflow-hidden"
        @click="openDetail(item)"
      >
        <image class="w-full h-full bg-cover" :src="item.img" alt="" />
        <view
          class="absolute bottom-6 right-10 z-1 flex justify-center items-center text-fff bg-000-6 px-16 py-8 rounded-full animation-zoom-in-out"
        >
          <view>
            {{ item.title }}
          </view>

          <i class="iconfont text-20">&#xe674;</i>
        </view>
      </view>
    </view>
  </view>
  <!-- 品牌介绍 -->
  <view class="mx-main mt-40 pb-20" v-if="info[6]?.title">
    <Title :title="info[6]?.title" :subTitle="info[6]?.subTitle" />
    <image
      v-if="info[6]?.img"
      class="rounded-main mt-main overflow-hidden w-full"
      :src="info[6].img"
      mode="widthFix"
      alt=""
    />

    <video
      v-if="info[6]?.video"
      class="w-full h-400 rounded-main mt-main"
      :src="info[6].video"
      muted
      autoplay
    />
    <up-scroll-list :indicator="false" v-if="info[6]?.list?.length">
      <view
        class="mt-main ml-main first:ml-0 shadow-md"
        v-for="(item, index) in info[6].list"
        :key="index"
        @click="openDetail(item)"
      >
        <view class="h-full overflow-hidden rounded-main relative">
          <image class="w-280 h-400 bg-cover" :src="item.img" alt="" />
          <view
            class="absolute bottom-0 left-0 right-0 flex justify-center items-center text-fff bg-main text-32 py-6"
            v-if="item.title"
          >
            {{ item.title }}
          </view>
        </view>
      </view>
    </up-scroll-list>
  </view>
  <ScrollTop />
  <view
    class="fixed right-0 bottom-300 z-full"
    v-if="info[7]?.img || info[7]?.title"
    @click="openDetail(info[7])"
  >
    <image
      class="h-70 mr-10 shadow-sm"
      v-if="info[7].img"
      :src="info[7].img"
      mode="heightFix"
      alt=""
    />
    <view
      class="rounded-l-full bg-main pl-40 pr-20 py-10 text-fff shadow-sm"
      v-else
    >
      {{ info[7]?.title || "" }}
    </view>
  </view>
</template>

<script setup>
import Title from "@/components/title/index.vue";
import Navbar from "@/components/navbar/index.vue";
import ScrollTop from "@/components/scrollTop/index.vue";

import { getHomeData } from "@/api/main";
import { onMounted, ref } from "vue";
import {
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
import { useWxShare, getBoundInfo } from "@/hooks/index.js";

const app = getApp();
// 监听滚动
onPageScroll((e) => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/home/index",
});
const info = ref([]);
const boundInfo = ref({});

// 页面加载时自动加载数据
onMounted(() => {
  getInfo();
  boundInfo.value = getBoundInfo();
});

// 头部banner点击事件
const swiperClick = (index) => {
  openDetail(info.value[0].list[index]);
};

// 跳转事件
const openDetail = (item) => {
  if (app.globalData.envDevelop) return false;
  console.log(item);
  const type = item.router.type;
  if (item.router.id === 12 || item.router.id === 13) {
    item.router.page = "pages/agreement/index";
    uni[type]({
      url: `/${item.router.page}?id=${item.routerId}&title=${item.title}`,
    });
  }
  uni[type]({
    url: item.router.isId
      ? `/${item.router.page}?id=${item.routerId}`
      : `/${item.router.page}`,
  });
};

const getInfo = async () => {
  const data = await getHomeData();
  if (app.globalData.envDevelop) info.value = data.data.slice(0, 1);
  else info.value = data.data;
};
</script>

<style scoped>
.u-scroll-list {
  padding-bottom: 0 !important;
}
</style>
