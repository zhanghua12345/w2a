<template>
  <view class="fixed z-[9999] left-0 w-full" v-show="scrollTop > 50">
    <up-navbar :style="{ 'z-index': 9999 }" title="梵米尼" leftIcon="" />
  </view>
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
          class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-fff bg-000-4"
        >
          <i class="iconfont text-fff text-40">&#xeaf6;</i>
          <view class="text-24">{{ e.name }}</view>
        </view>
      </view>
    </view>
  </view>
  <!-- 案例 -->
  <view class="mt-main mx-main">
    <Title
      className=" mb-20"
      title="全屋方案"
      subTitleBottom="盘点最备受瞩目的全屋设计方案"
    />
    <up-scroll-list :indicator="false">
      <view
        class="h-300 pr-main last:pr-0"
        v-for="(item, index) in cases"
        :key="index"
      >
        <view class="h-full overflow-hidden rounded-main relative">
          <image class="w-250 h-full" :src="item.image_url"></image>
          <view
            class="absolute top-40 left-0 bg-fff-8 text-main font-600 p-12 pr-16 rounded-r-full"
            >{{ item.name }}</view
          >
        </view>
      </view>
    </up-scroll-list>
  </view>
  <view class="mx-main mt-40">
    <!-- <Title title="积极向上2" /> -->
    <view class="grid grid-rows-2 grid-cols-9 gap-20 h-330">
      <view
        class="rounded-main text-fff flex items-center justify-center"
        :class="{
          'row-span-2 col-span-4 bg-[#E8E3D9]': index === 0,
          'col-span-5 bg-[#856755]': index === 1,
          'row-span-1 col-span-5 bg-[#A48360]': index === 2,
        }"
        v-for="(item, index) in actives"
        :key="index"
      >
        {{ item.name }}
      </view>
    </view>
  </view>
  <view class="mx-main mt-main">
    <Title title="积极向上3" />
    <view class="mt-20 grid grid-rows-5 grid-cols-6 gap-main h-400">
      <view
        class="bg-000 rounded-main text-fff flex items-center justify-center"
        :class="{
          'row-span-3 col-span-3': index === 0 || index === 1,
          'row-span-2 col-span-2': index === 2 || index === 3,
        }"
        v-for="(item, index) in bannerSub"
        :key="index"
      >
        {{ index }}
      </view>
      <view
        class="bg-000 rounded-main text-fff row-span-2 col-span-2 flex items-center justify-center"
      >
        更多 <i class="iconfont text-fff text-28">&#xeaf6;</i>
      </view>
    </view>
  </view>
  <view class="mx-main mt-main pb-20">
    <Title title="积极向上4" />
    <view
      class="mt-20 p-20 bg-000-04 rounded-main grid grid-rows-2 grid-cols-2 gap-main"
    >
      <view
        v-for="item in 4"
        :key="item"
        class="relative h-200 rounded-main overflow-hidden"
      >
        <image
          class="w-full h-full bg-cover"
          src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
          alt=""
        />
        <view
          class="absolute left-0 top-0 bottom-0 right-0 z-1 bg-000-2 text-fff flex justify-center items-center"
          >全屋类
        </view>
      </view>
    </view>
  </view>
  <!-- 品牌介绍 -->
  <view class="mx-main mt-main pb-20">
    <Title title="品牌介绍" subTitle="美好生活轻松实现" />
    <up-image
      class="rounded-main mt-main overflow-hidden"
      width="100%"
      height="400rpx"
      @click="
        openBrands({
          router: '/pages/join/index',
        })
      "
      src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
    />
    <video
      class="w-full h-400 rounded-main mt-main"
      src="https://static.guyantv.com/videos/2024_11_27/w2a_0_355/720/7E2reK4X5TH6UNzBkhcfsZGQqvjVYxDR_720.m3u8"
      muted
      autoplay
    />
    <up-scroll-list :indicator="false">
      <view
        class="pt-main pl-main first:pl-0"
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
</template>

<script setup>
import Title from "@/components/title/index.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";

const scrollTop = ref(0);
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
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
    icon: "reload-home",
    name: "家具风格",
  },
  {
    image_url:
      "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
    url: "/demo-pages/basic/color/index",
    icon: "receipt",
    name: "10秒算报价",
  },
  {
    image_url: "https://tgi1.jia.com/111/760/11760562.jpg",
    url: "/pages/join/index",
    icon: "tips",
    name: "梵米尼攻略",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    url: "/demo-pages/basic/color/index",
    icon: "carousel",
    name: "新品首发",
  },
];
//活动
const actives = ref([
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/pages/join/index",
    name: "推荐有礼",
    subName: "邀好友得门店好礼",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "免费设计",
    subName: "省2880元设计礼包",
  },
  {
    image_url:
      "https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg",
    router: "/demo-pages/basic/color/index",
    name: "来点灵感",
    subName: "实景装修案例",
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
    name: "北欧",
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
</script>

<style scoped>
.u-scroll-list {
  padding-bottom: 0;
}
</style>
