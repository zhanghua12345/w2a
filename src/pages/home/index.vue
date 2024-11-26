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
  <view class="mt-main">
    <Title className="mx-main mb-20" title="积极向上" />
    <up-scroll-list :indicator="false">
      <view
        class="h-200 pl-main last:pr-main"
        v-for="(item, index) in [...bannerSub, ...bannerSub, ...bannerSub]"
        :key="index"
      >
        <view class="h-full overflow-hidden rounded-main relative">
          <image class="w-300 h-full" :src="item.image_url"></image>
          <view
            class="absolute bottom-0 left-0 right-0 flex items-center text-fff pl-main bg-gradient-to-t from-000-6 to-000-0 pt-main"
            >{{ item.name }}</view
          >
        </view>
      </view>
    </up-scroll-list>
  </view>
  <view class="mx-main mt-main">
    <Title title="积极向上2" />
    <view class="mt-20 grid grid-rows-2 grid-cols-9 gap-main h-400">
      <view
        class="bg-000 rounded-main text-fff flex items-center justify-center"
        :class="{
          'row-span-2 col-span-4': index === 0,
          'col-span-5': index === 1,
          'row-span-1 col-span-5 ': index === 2,
        }"
        v-for="(item, index) in list3"
        :key="index"
      >
        {{ index }}
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
    url: "/demo-pages/basic/color/index",
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
</script>

<style scoped>
.u-scroll-list {
  padding-bottom: 0;
}
</style>
