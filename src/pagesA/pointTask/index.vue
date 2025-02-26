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
      class="px-20 h-full text-24 text-[#ef3d3d] flex items-center bg-gradient-to-r from-[#ffd4d0] to-[#f6e5e3] rounded-main"
    >
      <i class="iconfont mr-6">&#xe663;</i>
      邀请客户签单最低获得“<span class="font-600">1000元</span>”
    </view>
  </view>
  <view
    class="mt-60 mx-main shadow rounded-20 p-main flex flex-col items-center bg-fff relative"
  >
    <view class="absolute right-main top-main" @click="showPopup = true">
      <i class="iconfont px-10">&#xe8c8;</i>
    </view>
    <view class="text-32">开启邀请第一步</view>
    <view class="w-full">
      <view class="mt-main" v-for="(item, index) in data.list" :key="index">
        <view class="mb-10"
          ><span class="text-[#ef3d3d] w-20">
            {{ item.isSelect ? "*" : "" }}
          </span>
          {{ item.title }}
        </view>
        <view
          class="h-90 px-main rounded-main flex items-center justify-between bg-[#f6f6f6]"
        >
          <up-input
            v-model="item.select"
            :placeholder="item.placeholder || '请选择'"
            fontSize="24rpx"
            border="none"
          />
        </view>
      </view>
    </view>
    <view class="w-full mt-50">
      <formBottom @click="submit" :data="data" />
      <view class="mt-40 underline text-main text-center" @click="openPointTask"
        >查看我的邀请</view
      >
    </view>
  </view>
  <up-popup
    :show="showPopup"
    @close="showPopup = false"
    mode="center"
    closeable
    round="10"
  >
    <view class="">
      <view class="text-center font-32 py-20">现金到账说明</view>
      <view class="px-20 text-tip" v-html="popupText"> </view>
    </view>
  </up-popup>

  <image
    class="w-full mt-main"
    src="http://120.27.141.193:8088//uploads/attach/2025/02/20250224/41956c62c0dadc818480d83c95402d4f.jpg"
    mode="widthFix"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { JSON_yaoqing } from "@/utils/mock.js";
import formBottom from "@/components/formBottom/index.vue";
import { invite } from "@/api/my";

const app = getApp();
const data = ref({});
const status = ref(0);
const showPopup = ref(false);
const popupText =
  "您在提交资料后，该用户在门店完成下单。<br />您即可获取一笔1000-2000的金额奖励";
const showPicker = ref(false);
const openPicker = () => {
  showPicker.value = true;
};

// 页面加载时自动加载数据
onMounted(() => {
  status.value = 0;
  data.value = JSON_yaoqing;
  data.value.list[0].show = true; // TODO
});

const submit = async () => {
  console.log(data.value);
  let list = data.value.list;
  if (!list[0].select && !list[1].select) {
    wx.showToast({
      title: "邀请人姓名和微信昵称必须填写一个",
      icon: "none",
    });
    return false;
  } else if (!list[2].select) {
    wx.showToast({
      title: "邀请人手机号不能为空",
      icon: "none",
    });
    return false;
  } else if (!list[3].select) {
    wx.showToast({
      title: "邀请人房屋具体位置不能为空",
      icon: "none",
    });
    return false;
  }
  const params = {
    name: list[0].select,
    phone: list[2].select,
    wechat_name: list[1].select,
    area: list[3].select,
  };
  uni.showToast({
    title: "数据提交中...",
    icon: "none",
    mask: true, // 是否显示透明蒙层，防止触摸穿透
  });
  const res = await invite(params);
  console.log(res);
  uni.navigateTo({ url: "/pagesA/pointTask/success?msg=" + res.msg });
};

const openPointTask = () => {
  uni.navigateTo({ url: "/pagesA/pointTask/list" });
};
</script>

<style lang="scss" scoped>
body {
  background: #fdfdfd !important;
}
</style>
