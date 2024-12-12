<template>
  <Navbar leftIcon=" " />
  <view class="w-full h-700 relative">
    <up-swiper
      :list="list3"
      indicator
      :autoplay="false"
      indicatorMode="line"
      circular
      easingFunction="easeInOutCubic"
      height="700rpx"
      indicatorStyle="bottom: 50rpx"
      @change="(e) => (currentNum = e.current)"
      radius="0"
    >
      <template #indicator>
        <view class="flex justify-between w-690 h-50 text-24">
          <view class="w-80"></view>
          <view class="bg-000-5 w-240 rounded-full flex text-fff">
            <view class="w-1/2 flex justify-center items-center"
              >720
              <i class="iconfont text-30 leading-1 ml-10">&#xe76e;</i></view
            >
            <view
              class="w-1/2 flex justify-center items-center bg-main rounded-full"
              >图片</view
            >
          </view>
          <view
            class="bg-000-5 w-76 rounded-full text-fff flex justify-center items-center"
            >{{ currentNum + 1 }}/{{ list3.length }}</view
          >
        </view>
      </template>
    </up-swiper>
    <view class="absolute bottom-0 left-0 right-0 h-30 rounded-t-full bg-bg" />
  </view>
  <view class="px-main">
    <view class="text-48 text-000 font-600">轻奢1222三居室</view>
    <view class="flex flex-wrap items-center mt-10">
      <i class="iconfont text-tip text-24 mr-6">&#xe662;</i>浏览量{{
        Math.floor(Math.random() * 100)
      }}
      <view class="px-20">
        <up-line length="10" direction="col"></up-line
      ></view>

      <i class="iconfont text-tip text-24 mr-6">&#xe66e;</i>
      收藏{{ Math.floor(Math.random() * 100) }}
    </view>
    <view
      class="mt-50 bg-000-04 p-main rounded-20 flex flex-wrap justify-start"
    >
      <view
        class="flex flex-wrap items-center w-1/2 h-50"
        v-for="item in theme"
        :key="item"
      >
        <i class="iconfont text-tip text-24 mr-6" v-html="item.icon" />{{
          item.label
        }}
        <span class="pl-40">{{ item.name }}</span>
      </view>
    </view>
  </view>
  <view class="mt-50 px-main relative">
    <Title
      title="设计效果"
      subTitle="美好生活轻松实现"
      className="text-main"
      classLine="bg-main ml-20"
    />
    <up-line></up-line>
    <view
      class=""
      v-for="item in showMore ? info : dataFilter(info, 1)"
      :key="item"
    >
      <view class="text-36 font-600 w-full flex justify-center py-30">{{
        item.name
      }}</view>
      <view
        class="rounded-32 overflow-hidden mb-20 last:mb-0"
        v-for="e in item.images"
        :key="e"
      >
        <up-image width="100%" height=" " :src="e" mode="widthFix" />
      </view>
    </view>
    <view
      class="absolute bottom-0 left-0 right-0 h-160 pt-30 bg-gradient-to-t from-fff from-10% via-fff-5 via-70% to-fff-0 flex flex-wrap justify-center items-center text-32 text-main"
      @click="showMoreClick"
      v-if="!showMore"
    >
      点击查看更多 <i class="iconfont text-24 ml-6">&#xfd90;</i>
    </view>
  </view>
  <view class="py-40 px-main flex flex-col items-center">
    <view class="w-350">
      <up-divider
        text="猜你喜欢"
        textSize="32rpx"
        textColor="#cf5d38"
        lineColor="#aaa"
      />
    </view>
    <view class="grid grid-rows-2 grid-cols-2 gap-20">
      <Case v-for="item in 20" />
    </view>
  </view>
  <ScrollTop />
  <BottomFun />
</template>
<script setup>
import Title from "@/components/title/index.vue";
import Navbar from "@/components/navbar/index.vue";
import Case from "@/components/case/index.vue";
import BottomFun from "@/components/bottomFun/index.vue";
import ScrollTop from "@/components/scrollTop/index.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { dataFilter } from "@/utils/utils";
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
  path: "/pages/caseDetail/index",
});
// 使用 ref 创建响应式引用
const currentNum = ref(0);
const list3 = ref([
  "https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png",
  "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
  "https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg",
]);
const theme = ref([
  { icon: "&#xe662;", label: "风格", name: "奶油风" },
  { icon: "&#xe662;", label: "面积", name: "100-200m²" },
  { icon: "&#xe662;", label: "系列", name: "帕马尔" },
  { icon: "&#xe662;", label: "小区", name: "绿地v岛" },
]);
const showMore = ref(false);
const info = ref([
  {
    name: "客厅",
    images: [
      "https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png",
      "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
      "https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg",
    ],
  },
  {
    name: "餐厅",
    images: [
      "https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png",
      "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
      "https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg",
    ],
  },
]);

const showMoreClick = () => {
  showMore.value = true;
};
</script>
