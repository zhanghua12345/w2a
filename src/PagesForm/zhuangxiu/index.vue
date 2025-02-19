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
        <view class="mb-36">{{ data.list[0].title }}</view>
        <view
          class="h-90 px-main rounded-main flex items-center justify-between bg-[#f6f6f6]"
          @click="openPicker"
        >
          <view class="pr-main truncate text-ellipsis flex-1 text-24">
            湖南省 {{ data.list[0].select }}
          </view>

          <i class="iconfont text-24 ml-10 text-tip">&#xe671;</i>
        </view>
      </view>
      <view class="mt-50">
        <view class="mb-36">{{ data.list[3].title }}</view>
        <view
          class="h-90 px-main rounded-main flex items-center justify-between bg-[#f6f6f6]"
        >
          <up-input
            v-model="data.list[3].select"
            placeholder="请选择"
            fontSize="24rpx"
            border="none"
          />
        </view>
      </view>
      <view class="mt-50">
        <view class="mb-36">{{ data.list[1].title }}</view>

        <view class="grid grid-cols-4 gap-20 text-24">
          <view
            class="h-80 rounded-main px-10 truncate text-center relative border-4 leading-[80rpx]"
            :class="{
              'bg-fff border-[#ff8921] ': data.list[1].select === item,
              'bg-[#f6f6f6] border-[#f6f6f6]': data.list[1].select !== item,
            }"
            v-for="(item, index) in data.list[1].data"
            :key="index"
            @click="data.list[1].select = item"
          >
            {{ item }}
            <i
              v-show="data.list[1].select === item"
              class="iconfont absolute top-[-4rpx] right-[-4rpx] text-[#ff8921] leading-1 text-40"
            >
              &#xe604;
            </i>
          </view>
        </view>
      </view>
      <view class="mt-50">
        <view class="mb-36">{{ data.list[2].title }}</view>
        <view class="grid grid-cols-3 gap-20 text-24">
          <view
            class="h-80 rounded-main px-10 truncate text-center relative border-4 leading-[80rpx]"
            :class="{
              'bg-fff border-[#ff8921] ': data.list[2].select === item,
              'bg-[#f6f6f6] border-[#f6f6f6]': data.list[2].select !== item,
            }"
            v-for="(item, index) in data.list[2].data"
            :key="index"
            @click="data.list[2].select = item"
          >
            {{ item }}
            <i
              v-show="data.list[2].select === item"
              class="iconfont absolute top-[-4rpx] right-[-4rpx] text-[#ff8921] leading-1 text-40"
            >
              &#xe604;
            </i>
          </view>
        </view>
      </view>
    </view>
    <view class="w-full mt-50">
      <formBottom @click="openKefu" :data="data" />
    </view>
  </view>
  <image
    class="w-full mt-main"
    src="http://120.27.141.193:8088//uploads/attach/2025/02/20250219/13d2272cc69a8876f81d8e95a6c144d3.jpg"
    mode="widthFix"
  />

  <view
    class="fixed left-0 right-0 transition-all bg-fff flex justify-center py-main"
    :class="scrollNum > 800 ? 'bottom-0' : 'bottom-[-240rpx]'"
  >
    <view class="w-650">
      <formBottom @click="openKefu" :data="data" />
    </view>
  </view>
  <up-picker
    :show="showPicker"
    ref="uPickerRef"
    :columns="data.list[0].data"
    @confirm="confirmPicker"
    @cancel="showPicker = false"
    @change="changeHandler"
  />
  <!-- <formKefu :status="status" :data="data" /> -->
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { JSON_zhuangxiu } from "@/utils/mock.js";
import formBottom from "@/components/formBottom/index.vue";
import { renovationForm } from "@/api/form";

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

const app = getApp();
const data = ref({});
const status = ref(0);

const showPicker = ref(false);
const openPicker = () => {
  showPicker.value = true;
};

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
  scrollNum.value = e.scrollTop;
  console.log(scrollNum.value);
});

const changeHandler = (e) => {
  const { columnIndex, value, values, index } = e;

  if (columnIndex === 0) {
    uPickerRef.value.setColumnValues(1, data.value.list[0].data1[index]);
  }
};

const confirmPicker = (e) => {
  console.log("confirm", e);
  data.value.list[0].select = e.value[0] + " " + e.value[1];
  showPicker.value = false;
};

const openKefu = () => {
  if (!data.value.list[0].select) {
    wx.showToast({
      title: "请选择房屋所在地址",
      icon: "none",
    });
    return false;
  }
  if (!data.value.list[3].select) {
    wx.showToast({
      title: "请填写房屋具体小区",
      icon: "none",
    });
    return false;
  }
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
      console.log(data.value);
      uni.hideLoading();
      if (!app.globalData.userInfo?.phone) {
        uni.navigateTo({ url: "/pages/login/index" });
      } else {
        renovationForm({
          province: "湖南省",
          city: data.value.list[0].select.split(" ")[0],
          area: data.value.list[0].select.split(" ")[1],
          address: data.value.list[3].select,
          type: data.value.list[1].select,
          time: data.value.list[2].select,
        });
        uni.navigateTo({ url: "/pagesForm/success/index" });
      }
    }, 1000);
  }, 500);
};
</script>

<style lang="scss" scoped>
body {
  background: #fdfdfd !important;
}
</style>
