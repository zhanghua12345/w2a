<template>
  <up-navbar
    :title="data.title"
    :autoBack="true"
    bgColor="rgba(0,0,0,0)"
    leftIconColor="#fff"
    :titleStyle="{ color: '#fff' }"
  />
  <up-swiper
    :list="data.banner"
    indicator
    indicatorMode="line"
    circular
    easingFunction="easeInOutCubic"
    height="1300rpx"
    radius="0"
  />
  <view
    class="fixed bottom-0 left-0 right-0 h-600 rounded-t-40 z-full bg-[#f2f2f2]"
    v-if="status === 0"
  >
    <template v-for="(item, index) in data.list" :key="index">
      <up-transition
        :show="item.show"
        :mode="item.show ? 'slide-right' : 'slide-left'"
      >
        <view class="flex justify-center mt-main">
          <view class="bottom relative text-36 text-center inline">
            {{ data.title }}
          </view>
        </view>

        <view class="text-center pt-main">
          <view class="text-tip text-22"
            >{{ index + 1 }}/{{ data.list?.length }} {{ item.title }}</view
          >
        </view>
        <view class="flex flex-wrap justify-between px-main">
          <view
            class="w-330 h-190 p-20 bg-fff shadow rounded-20 mt-main flex flex-col justify-center items-center active:bg-[#1dd18d] active:text-[#fff]"
            v-for="(e, i) in item.data"
            :key="i"
            @click="next(e, index)"
          >
            <view v-if="item.type === 'only'">{{ e }}</view>
            <view
              v-if="item.type === 'img'"
              class="h-full w-full flex flex-col items-center justify-center"
            >
              <image class="w-90 h-90 rounded-full" :src="e.img" alt="" />
              <view class="pt-10">{{ e.name }}</view>
            </view>
          </view>
        </view>
      </up-transition>
    </template>
  </view>
  <formResult :status="status" :data="data" @click="openKefu" />
  <formKefu :status="status" :data="data" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { JSON_mianfeisheji } from "@/utils/mock.js";
import formResult from "@/components/formResult/index.vue";
import formKefu from "@/components/formKefu/index.vue";
import { designForm } from "@/api/form";

const app = getApp();
const data = ref({});
const status = ref(0);

// 页面加载时自动加载数据
onMounted(() => {
  status.value = 0;
  data.value = JSON_mianfeisheji;
  data.value.list[0].show = true; // TODO
  console.log(data.value);
});

const next = (item, index) => {
  wx.vibrateShort();
  setTimeout(() => {
    data.value.list[index].select = item;
    data.value.list[index].show = false;
    setTimeout(() => {
      if (index < data.value.list.length - 1) {
        data.value.list[index + 1].show = true;
      } else {
        data.value.select = `"${data.value.list[0].select} | ${data.value.list[1].select.name}`;
        status.value = 1;
      }
    }, 300);
  }, 200);
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
      if (!app.globalData.userInfo?.phone) {
        uni.navigateTo({ url: "/pages/login/index" });
      } else {
        designForm({
          area: data.value.list[0].select,
          grade: data.value.list[1].select.name,
        });
        status.value = 2;
      }
    }, 1000);
  }, 500);
};
</script>
<style lang="scss" scoped>
.bottom::after {
  content: "";
  background: #cbe7db;
  width: calc(100% + 20rpx);
  height: 20rpx;
  position: absolute;
  left: -10rpx;
  bottom: 0rpx;
  z-index: -1;
}
</style>
