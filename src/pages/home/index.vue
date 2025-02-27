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
    <view
      v-if="info[1]?.list?.length"
      class="absolute bottom-main left-main right-main py-10 rounded-main bg-000-4 flex items-center justify-around shadow-md"
    >
      <view
        v-for="(item, index) in info[1].list"
        :key="index"
        @click="openDetail(item)"
        class="relative w-150 h-100 overflow-hidden rounded-main"
      >
        <image class="w-full h-full bg-cover" :src="item.img" />
        <view
          class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-fff bg-000-1"
        >
          <i class="iconfont text-fff text-40" v-html="item.icon" />
          <view class="text-24">{{ item.title }}</view>
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
        class="h-300 mr-main last:mr-0 shadow-md"
        v-for="(item, index) in info[2].list"
        :key="index"
        @click="openDetail(item)"
      >
        <view class="h-full overflow-hidden rounded-main relative">
          <image class="w-250 h-full" :src="item.img"></image>
          <view
            class="absolute top-40 left-0 bg-fff-8 text-main p-12 pr-16 min-w-120 rounded-r-full flex justify-center"
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
          class="border-[#e1a490] text-[#e1a490] px-20 py-10 border-2 border-solid rounded-8 absolute bottom-80 left-main"
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
    <view class="mt-main grid grid-rows-7 grid-cols-6 gap-20 h-540">
      <view
        class="bg-000 rounded-main text-fff relative overflow-hidden shadow-md"
        :class="{
          'row-span-4 col-span-2': [0].includes(index),
          'row-span-2 col-span-2': [1, 2, 3, 4].includes(index),
          'row-span-3 col-span-3': [5, 6].includes(index),
        }"
        v-for="(item, index) in info[4].list"
        :key="index"
        @click="openDetail(item)"
      >
        <image class="w-full h-full bg-cover" :src="item.img" alt="" />
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
          class="absolute left-0 top-0 bottom-0 right-0 z-1 bg-000-2 text-fff flex justify-center items-center"
          >{{ item.title }}
          <view
            class="w-36 h-36 rounded-full bg-000-5 flex justify-center items-center ml-10 animation-zoom-in-out"
          >
            <i class="iconfont text-20 text-fff animation-zoom-in-out"
              >&#xe674;</i
            >
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 品牌介绍 -->
  <view class="mx-main mt-40 pb-20">
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
            class="absolute bottom-0 left-0 right-0 flex justify-center items-center text-fff bg-main text-32"
            v-if="item.title"
          >
            {{ item.title }}
          </view>
        </view>
      </view>
    </up-scroll-list>
  </view>
  <ScrollTop />
  <!-- <view
    class="fixed right-0 bottom-300 rounded-l-full bg-main pl-40 pr-20 py-10 text-fff shadow-sm z-full"
    @click="openDetail(info[7])"
  >
    {{ info[7]?.title || "" }}
  </view> -->
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
import { useWxShare } from "@/hooks/index.js";
// 监听滚动
onPageScroll((e) => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/home/index",
});
const info = ref([]);

// 页面加载时自动加载数据
onMounted(() => {
  getInfo();
});

// 头部banner点击事件
const swiperClick = (index) => {
  openDetail(info.value[0].list[index]);
};

// 跳转事件
const openDetail = (item) => {
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
  console.log(data.data);
  info.value = data.data;
};
</script>

<style scoped>
.u-scroll-list {
  padding-bottom: 0 !important;
}
</style>
