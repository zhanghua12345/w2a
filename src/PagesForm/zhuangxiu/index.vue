<template>
  <up-swiper
    :list="data.banner"
    indicator
    indicatorMode="line"
    circular
    easingFunction="easeInOutCubic"
    height="410rpx"
    radius="0"
  />
  <view class="relative flex justify-center h-62 mt-[-30rpx] z-full">
    <view
      class="px-20 h-full text-24 text-[#592a0a] flex items-center bg-gradient-to-r from-[#fcd087] to-[#ffefce] rounded-main"
    >
      <i class="iconfont mr-6 text-[#ad581b]">&#xe663;</i>
      中国建筑装饰协会授予梵米尼“<span class="font-600">互联网装修领导者</span>”
    </view>
  </view>
  <view
    class="mt-60 mx-main shadow rounded-20 p-main flex flex-col items-center bg-fff"
  >
    <view class="text-32 font-600">开启安心装修第一步</view>
    <view class="w-full mt-main">
      <view class="mt-main">
        <view class="mb-36">选择房屋所在位置</view>
        <view
          class="h-90 px-main rounded-main flex items-center justify-between bg-[#f6f6f6]"
          @click="openPicker"
        >
          <view class="pr-main truncate text-ellipsis flex-1 text-24">
            湖南省 长沙市 开福区 月湖街道
          </view>

          <i class="iconfont text-24 ml-10 text-tip">&#xe671;</i>
        </view>
      </view>
      <view class="mt-50">
        <view class="mb-36">您的装修类型</view>

        <view class="grid grid-cols-4 gap-20 text-24">
          <view
            class="h-90 rounded-main bg-[#f6f6f6] px-10 truncate leading-[90rpx] text-center"
            v-for="item in 4"
          >
            毛坯装修
          </view>
        </view>
      </view>
      <view class="mt-50">
        <view class="mb-36">预计什么时候装修</view>
        <view class="grid grid-cols-3 gap-20 text-24">
          <view
            class="h-90 rounded-main bg-[#f6f6f6] px-10 truncate leading-[90rpx] text-center"
            v-for="item in 4"
          >
            毛坯装修
          </view>
        </view>
      </view>
    </view>
    <view class="w-full mt-main">
      <formBottom @click="openKefu" :data="data" />
      <!-- <view
        class="h-110 flex justify-center items-center bg-[#0ccc83] text-fff rounded-16 text-32 font-600"
        @click="emit('click')"
        >查看装修报价</view
      >
      <view class="flex flex-wrap pt-main justify-center">
        <i class="iconfont text-20 mr-6 text-tip">&#xe663;</i>
        <view class="text-18 text-tip"
          >允许梵米尼装修顾问稍后来电了解装修需求</view
        >
      </view> -->
    </view>
  </view>
  <image
    class="w-full mt-main"
    src="http://120.27.141.193:8088//uploads/attach/2025/01/20250124/a49c65eef5d7b6fe1accf72a20c0b7fe.jpg"
    mode="widthFix"
  />

  <view
    class="fixed left-0 right-0 transition-all bg-fff flex justify-center py-main"
    :class="scrollNum > 500 ? 'bottom-0' : 'bottom-[-240rpx]'"
  >
    <view class="w-650">
      <formBottom @click="openKefu" :data="data" />
    </view>
  </view>
  <up-picker
    :show="showPicker"
    ref="uPickerRef"
    :columns="columns"
    @confirm="confirmPicker"
    @change="changeHandler"
  />
  <!-- <formKefu :status="status" :data="data" /> -->
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { JSON_zhuangxiu } from "@/utils/mock.js";
import formBottom from "@/components/formBottom/index.vue";
// import formKefu from "@/components/formKefu/index.vue";

import {
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";

// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/home/index",
});

const data = ref({});
const status = ref(0);

const showPicker = ref(false);
const openPicker = () => {
  showPicker.value = true;
};
const columns = reactive([
  ["中国", "美国"],
  ["深圳", "厦门", "上海", "拉萨"],
]);
const columnData = reactive([
  ["深圳", "厦门", "上海", "拉萨"],
  ["得州", "华盛顿", "纽约", "阿拉斯加"],
]);
const uPickerRef = ref(null);

const scrollNum = ref(0);
// 页面加载时自动加载数据
onMounted(() => {
  status.value = 0;
  data.value = JSON_zhuangxiu;
  data.value.list[0].show = true; // TODO
});

// 监听滚动
onPageScroll((e) => {
  console.log(e);
  scrollNum.value = e.scrollTop;
  console.log(scrollNum.value);
});

const changeHandler = (e) => {
  const { columnIndex, value, values, index } = e;

  if (columnIndex === 0) {
    uPickerRef.value.setColumnValues(1, columnData[index]);
  }
};

const confirmPicker = (e) => {
  console.log("confirm", e);
  showPicker.value = false;
};

const openKefu = () => {
  uni.showLoading({
    title: "计算中...",
    mask: true, // 是否显示透明蒙层，防止触摸穿透
  });
  setTimeout(() => {
    uni.hideLoading();
    uni.showLoading({
      title: "生成结果中...",
      mask: true, // 是否显示透明蒙层，防止触摸穿透
    });
    setTimeout(() => {
      uni.hideLoading();
      status.value = 2;
    }, 1000);
  }, 500);
};
</script>

<style lang="scss" scoped>
body {
  background: #fdfdfd !important;
}
</style>
