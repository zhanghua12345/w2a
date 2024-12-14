<template>
  <Navbar leftIcon=" " />
  <view class="w-full h-700 relative">
    <up-swiper
      :list="list3"
      indicator
      indicatorMode="line"
      circular
      easingFunction="easeInOutCubic"
      height="700rpx"
      radius="0"
    ></up-swiper>
    <view
      class="absolute bottom-main left-main right-main py-10 rounded-main bg-000-4 flex items-center justify-around shadow-md"
    >
      <view
        v-for="e in bannerSub"
        :key="e.image_url"
        class="relative w-150 h-100 overflow-hidden rounded-main"
      >
        <image class="w-full h-full bg-cover" :src="e.image_url" />
        <view
          class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-fff bg-000-1"
        >
          <i class="iconfont text-fff text-40" v-html="e.icon" />
          <view class="text-24">{{ e.name }}</view>
        </view>
      </view>
    </view>
  </view>
  <!-- 案例 -->
  <view class="mt-40 mx-main">
    <Title
      className="mb-20"
      title="全屋方案"
      subTitleBottom="盘点最备受瞩目的全屋设计方案"
      :isMore="true"
      @click="openPage('/pages/case/index', 'switchTab')"
    />
    <up-scroll-list :indicator="false">
      <view
        class="h-300 mr-main last:mr-0 shadow-md"
        v-for="(item, index) in cases"
        :key="index"
      >
        <view class="h-full overflow-hidden rounded-main relative">
          <image class="w-250 h-full" :src="item.image_url"></image>
          <view
            class="absolute top-40 left-0 bg-fff-8 text-main font-600 p-12 pr-16 min-w-160 rounded-r-full flex justify-center"
            >{{ item.name }}</view
          >
        </view>
      </view>
    </up-scroll-list>
  </view>
  <view class="mx-main mt-40">
    <view class="grid grid-rows-2 grid-cols-9 gap-20 h-330">
      <view
        class="rounded-main text-fff relative"
        v-for="(item, index) in actives"
        :key="index"
        :class="
          index === 0
            ? ['row-span-2', 'col-span-4', 'bg-fdf2e0']
            : index === 1
            ? ['col-span-5', 'bg-f5f4d6']
            : ['row-span-1', 'col-span-5', 'bg-f9ebea']
        "
      >
        <view class="p-main absolute z-10 flex flex-col justify-between">
          <view class="text-[#866350] text-36 font-600">{{ item.name }}</view>
          <view class="text-tip text-24 pt-10 flex items-center">
            {{ item.subName }}
            <i class="iconfont text-20">&#xe671;</i>
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
          :src="item.image_url"
          alt=""
        />
      </view>
    </view>
  </view>
  <view class="mx-main mt-40">
    <Title
      title="家·空间"
      subTitle="细致打造有品生活"
      :isMore="true"
      @click="openPage('/pagesA/spaces/index')"
    />
    <view class="mt-main grid grid-rows-5 grid-cols-6 gap-main h-450">
      <view
        class="bg-000 rounded-main text-fff relative overflow-hidden shadow-md"
        :class="{
          'row-span-3 col-span-3': index === 0 || index === 1,
          'row-span-2 col-span-2': index === 2 || index === 3 || index === 4,
        }"
        v-for="(item, index) in spaces"
        :key="index"
      >
        <image class="w-full h-full bg-cover" :src="item.image_url" alt="" />
        <view class="absolute bottom-10 left-0 right-0 flex justify-center">
          <view class="bg-000-6 text-fff rounded-full px-20 py-6">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="mx-main mt-40">
    <Title title="梵米尼优选" subTitle="满足你对生活的所有想象" />
    <view
      class="mt-main p-20 bg-000-04 rounded-main grid grid-rows-2 grid-cols-2 gap-main"
    >
      <view
        v-for="item in introduces"
        :key="item"
        class="relative h-200 rounded-main overflow-hidden"
        @click="openPage(item.router)"
      >
        <image class="w-full h-full bg-cover" :src="item.image_url" alt="" />
        <view
          class="absolute left-0 top-0 bottom-0 right-0 z-1 bg-000-2 text-fff flex justify-center items-center"
          >{{ item.name }}
          <view
            class="w-36 h-36 rounded-full bg-000-5 flex justify-center items-center ml-10 animation-zoom-in-out"
          >
            <i class="iconfont text-20 text-fff">&#xe674;</i>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 品牌介绍 -->
  <view class="mx-main mt-40 pb-20">
    <Title title="品牌介绍" subTitle="美好生活轻松实现" />
    <image
      class="rounded-main mt-main overflow-hidden w-full"
      @click="openPage('/pages/join/index')"
      src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
      alt=""
    />

    <video
      class="w-full h-400 rounded-main mt-main"
      src="https://static.guyantv.com/videos/2024_11_27/w2a_0_355/720/7E2reK4X5TH6UNzBkhcfsZGQqvjVYxDR_720.m3u8"
      muted
      autoplay
    />
    <up-scroll-list :indicator="false">
      <view
        class="mt-main ml-main first:ml-0 shadow-md"
        v-for="(item, index) in brands"
        :key="index"
        @click="openBrands(item)"
      >
        <view class="h-full overflow-hidden rounded-main relative">
          <up-image width="280rpx" height="400rpx" :src="item.image_url" />
          <view
            class="absolute bottom-0 left-0 right-0 flex justify-center items-center text-fff bg-main text-32 font-600"
            >{{ item.name }}</view
          >
        </view>
      </view>
    </up-scroll-list>
  </view>
  <ScrollTop />
  <view
    class="fixed right-0 bottom-300 rounded-l-full bg-main pl-40 pr-20 py-10 text-fff shadow-sm"
    @click="openPage('/pagesA/join/form')"
  >
    AI设计
  </view>
</template>

<script setup>
import Title from "@/components/title/index.vue";
import Navbar from "@/components/navbar/index.vue";
import ScrollTop from "@/components/scrollTop/index.vue";
import { onMounted, onUnmounted, ref } from "vue";
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
// 使用 ref 创建响应式引用
const list3 = ref([
  "https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png",
  "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
  "https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg",
]);

const bannerSub = [
  {
    image_url:
      "https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg",
    url: "/demo-pages/basic/color/index",
    icon: "&#xe627;",
    name: "家具风格",
  },
  {
    image_url:
      "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
    url: "/demo-pages/basic/color/index",
    icon: "&#xe613;",
    name: "10秒算报价",
  },
  {
    image_url: "https://tgi1.jia.com/111/760/11760562.jpg",
    url: "/pages/join/index",
    icon: "&#xe62c;",
    name: "梵米尼攻略",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    url: "/demo-pages/basic/color/index",
    icon: "&#xe68f;",
    name: "新品首发",
  },
];
//活动
const actives = ref([
  {
    image_url: "/static/active_1.png",
    router: "/pages/join/index",
    name: "推荐有礼",
    subName: "邀好友得门店好礼",
  },
  {
    image_url: "/static/active_1.png",
    router: "/demo-pages/basic/color/index",
    name: "免费设计",
    subName: "省2880元设计礼包",
  },
  {
    image_url: "/static/active_1.png",
    router: "/demo-pages/basic/color/index",
    name: "来点灵感",
    subName: "实景装修案例",
  },
]);
// 家·空间
const spaces = ref([
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/pages/join/index",
    name: "客餐厅",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "卧室",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "厨房",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "入户",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "书房",
  },
]);
// 案例
const cases = ref([
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/pages/join/index",
    name: "时尚简约",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "意式极简",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "北 欧",
  },
]);
// 公司介绍
const introduces = ref([
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/pages/join/index",
    name: "走进梵米尼",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "走进AI工厂",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "发展进程",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "品质保障",
  },
]);
// 品牌介绍
const brands = [
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/pages/join/index",
    name: "走进工厂",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "品质与售后",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "净醛抗菌",
  },
];
const openBrands = (item) => {
  uni.navigateTo({ url: item.router });
};
const openPage = (page, type = "navigateTo") => {
  uni[type]({ url: page });
};
</script>

<style scoped>
.u-scroll-list {
  padding-bottom: 0;
}
</style>
