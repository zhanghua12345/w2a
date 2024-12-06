<template>
  <up-swiper
    :list="list3"
    indicator
    indicatorMode="line"
    circular
    easingFunction="easeInOutCubic"
    height="300rpx"
    radius="0"
  ></up-swiper>
  <up-sticky offset-top="0">
    <view class="py-main bg-bg">
      <view
        class="mx-main rounded-main flex flex-row justify-between shadow-md bg-000-04"
      >
        <view
          v-for="(item, index) in pickers"
          :key="index"
          class="flex justify-center items-center py-20 text-24 w-full px-4"
          @click="pickerClick(index)"
        >
          {{ item.label }}
          <i
            class="iconfont text-tip text-20 ml-10 transition-transform duration-300"
            :class="{
              'rotate-180': index === pickerIndex && openPicker,
            }"
            >&#xfd90;</i
          >
        </view>
      </view>
    </view>
  </up-sticky>

  <view class="px-main w-full">
    <Box
      className="mb-main"
      v-for="item in list"
      :key="item"
      @click="goDetail"
    />
  </view>
  <up-loadmore
    :status="status"
    loading-text="努力加载中，先喝杯茶"
    loadmore-text="轻轻上拉···"
    nomore-text="实在没有了"
  />
  <up-picker
    :show="openPicker"
    :columns="[pickerData[pickerIndex]]"
    @confirm="pickerConfirm"
    keyName="label"
    closeOnClickOverlay
    :defaultIndex="[pickers[pickerIndex].index]"
    @cancel="openPicker = false"
    @close="openPicker = false"
  >
  </up-picker>
  <ScrollTop />
</template>

<script setup>
import { ref, onMounted } from "vue";

import ScrollTop from "@/components/scrollTop/index.vue";
import Box from "@/components/box/index.vue";
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
  path: "/pages/case/index",
});

const pickers = ref([
  { label: "户型", value: 0, index: 0 },
  { label: "风格", value: 0, index: 0 },
  { label: "系列", value: 0, index: 0 },
  { label: "颜色", value: 0, index: 0 },
]);

// 使用 ref 创建响应式引用
const list3 = ref([
  "https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png",
  "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
  "https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg",
]);
const openPicker = ref(false);
const pickerIndex = ref(0);
const pickerData = [
  [
    { label: "全部", value: 1, index: 0 },
    { label: "复式", value: 7, index: 1 },
    { label: "别墅", value: 8, index: 2 },
    { label: "一居室", value: 2, index: 3 },
    { label: "两居室", value: 3, index: 4 },
    { label: "三居室", value: 4, index: 5 },
    { label: "四居室", value: 5, index: 6 },
    { label: "五居室", value: 6, index: 7 },
  ],
  [
    { label: "全部", value: 1, index: 0 },
    { label: "现代简约", value: 11, index: 1 },
    { label: "极简东方", value: 21, index: 2 },
    { label: "当代美式", value: 31, index: 3 },
    { label: "混搭风格", value: 41, index: 4 },
  ],
  [
    { label: "帕马尔", value: 12, index: 0 },
    { label: "云端之境", value: 22, index: 1 },
    { label: "城市辉光", value: 32, index: 2 },
    { label: "魔光", value: 42, index: 3 },
    { label: "西格拉底", value: 52, index: 4 },
  ],
  [
    { label: "星空纹", value: 12, index: 0 },
    { label: "卡布其纹", value: 22, index: 1 },
    { label: "星际黑", value: 32, index: 2 },
    { label: "卡其灰", value: 42, index: 3 },
    { label: "光影灰", value: 52, index: 4 },
  ],
];

const pickerClick = (index) => {
  openPicker.value = true;
  pickerIndex.value = index;
};
const pickerConfirm = (value, e) => {
  console.log(value);
  openPicker.value = false;
  console.log();
  pickers.value[pickerIndex.value] = value.value[0];
};

import { onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";

const list = ref([]);
let pageNo = 1;
let pageSize = 5;
const status = ref("loading");

// 下拉刷新
onPullDownRefresh(() => {
  pageNo = 1;
  loadData(true).then(() => {
    uni.stopPullDownRefresh();
  });
});

// 上拉加载
onReachBottom(() => {
  loadData();
});

// 加载数据的函数
const loadData = async (isRefresh = false) => {
  if (isRefresh) {
    list.value = []; // 刷新时清空数据
    status.value = "loadmore";
  }
  if (status.value === "nomore") return;
  console.log(status.value);
  status.value = "loading";
  // 模拟数据加载，实际中应该是API请求
  setTimeout(() => {
    for (let i = 0; i < pageSize; i++) {
      console.log(status.value);

      list.value.push(`Item ${pageNo * pageSize + i}`);
      status.value = pageNo >= 4 ? "nomore" : "loadmore";
    }

    pageNo++;
    console.log(pageNo);
  }, 500);
};

// 页面加载时自动加载数据
onMounted(() => {
  loadData(true);
});

const goDetail = (item) => {
  console.log(item);
  uni.navigateTo({ url: "/pages/caseDetail/index" });
};
</script>

<style scoped></style>
