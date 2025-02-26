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
    class="fixed bottom-0 left-0 right-0 h-720 rounded-t-40 z-full bg-[#fde9c8]"
    v-if="status === 0"
  >
    <view class="h-110 text-36 text-000 flex justify-center items-center">
      <image
        class="h-20 mr-10"
        mode="heightFix"
        src="https://fanminitop.com//uploads/attach/2025/02/20250219/274c6dba7fcdaf3f07a68e9da4393e65.png"
      />
      {{ data.subTitle }}
      <image
        class="h-20 ml-10"
        mode="heightFix"
        src="https://fanminitop.com//uploads/attach/2025/02/20250219/cbd8dccce771bd35758a99776c75599f.png"
      />
    </view>

    <view
      class="w-full h-610 bg-gradient-to-t from-[#feefd2] to-[#fff] rounded-t-40"
    >
      <template v-for="(item, index) in data.list" :key="index">
        <up-transition
          :show="item.show"
          :mode="item.show ? 'slide-right' : 'slide-left'"
        >
          <view class="text-center pt-main text-32">
            <view class=""
              >{{ index + 1 }}/{{ data.list?.length }} {{ item.title }}</view
            >
            <view class="text-tip text-22">（{{ item.subTitle }}）</view>
          </view>
          <view class="flex flex-wrap justify-between px-main">
            <view
              class="w-330 h-190 p-20 bg-[#fdddac] shadow rounded-20 mt-main flex flex-col justify-center items-center active:bg-[#b8833a] border-2 border-solid border-[#b8833a] text-[#6d4406]"
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
  </view>
  <formResult :status="status" :data="data" @click="openKefu" />
  <formKefu :status="status" :data="data" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { JSON_baojia } from "@/utils/mock.js";
import formResult from "@/components/formResult/index.vue";
import formKefu from "@/components/formKefu/index.vue";
import { offerForm } from "@/api/form";

const app = getApp();
const data = ref({});
const status = ref(0);

// 页面加载时自动加载数据
onMounted(() => {
  status.value = 0;
  data.value = JSON_baojia;
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
        data.value.select = `${data.value.list[0].select} | ${data.value.list[1].select.name} | ${data.value.list[2].select.name}`;
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
        offerForm({
          area: data.value.list[0].select,
          type: data.value.list[1].select.name,
          grade: data.value.list[2].select.name,
        });
        status.value = 2;
      }
    }, 1000);
  }, 500);
};
</script>
