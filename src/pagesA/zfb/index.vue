<template>
  <view
    class="mt-main mx-main shadow rounded-20 p-main flex flex-col items-center bg-fff relative"
  >
    <view class="absolute right-main top-main" @click="showPopup = true">
      <i class="iconfont px-10">&#xe8c8;</i>
    </view>
    <view class="text-32">绑定信息</view>
    <view class="w-full">
      <view
        class="mt-main first:mt-0"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="mb-10"
          ><span class="text-[#ef3d3d] w-20"> * </span>
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
  </view>
  <view class="mx-main mt-main flex flex-col items-center">
    <up-button text="提交" shape="circle" type="error" color="#ef3d3d" />
    <view class="mt-main underline text-main text-24">
      注：请确认您的支付宝信息，以免提现失败
    </view>
  </view>
  <image
    class="w-full mt-40 pb-40"
    src="http://120.27.141.193:8088//uploads/attach/2025/02/20250221/7d61bc1568e02aca9bad9d0bb7904eb4.jpg"
    mode="widthFix"
  />
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
</template>

<script setup>
import { ref, onMounted } from "vue";

const app = getApp();
const list = ref([
  {
    title: "真实姓名",
    select: "",
  },
  {
    title: "支付宝账号",
    select: "",
  },
  {
    title: "手机号码",
    select: "",
  },
  {
    title: "微信号",
    select: "",
  },
]);
const showPopup = ref(false);
const popupText =
  "您在提交资料后，该用户在门店完成下单。<br />您即可获取一笔1000-2000的金额奖励";
const showPicker = ref(false);
const openPicker = () => {
  showPicker.value = true;
};

// 页面加载时自动加载数据
onMounted(() => {});

const openKefu = () => {
  uni.navigateTo({ url: "/pagesForm/success/index" });
};
const openMoneyList = () => {
  uni.navigateTo({ url: "/pagesA/moneyList/index" });
};
</script>

<style lang="scss" scoped>
body {
  background: #fdfdfd !important;
}
</style>
