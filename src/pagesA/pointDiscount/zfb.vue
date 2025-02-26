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
            v-model="item.value"
            :placeholder="item.placeholder || '请选择'"
            fontSize="24rpx"
            border="none"
          />
        </view>
      </view>
    </view>
  </view>
  <view class="mx-main mt-main flex flex-col items-center">
    <up-button
      text="提交"
      shape="circle"
      type="error"
      color="#ef3d3d"
      @click="submit"
    />
    <view class="mt-main underline text-main text-24">
      注：请确认您的支付宝信息，以免提现失败
    </view>
  </view>
  <image
    class="w-full mt-40 pb-40"
    src="https://fanminitop.com//uploads/attach/2025/02/20250221/7d61bc1568e02aca9bad9d0bb7904eb4.jpg"
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
import { memberSave } from "@/api/my";

const app = getApp();
const list = ref([
  {
    title: "真实姓名",
    value: "",
  },
  {
    title: "支付宝账号",
    value: "",
  },
  {
    title: "手机号码",
    value: "",
  },
  {
    title: "微信号",
    value: "",
  },
]);
const showPopup = ref(false);
const popupText =
  "您在提交资料后，该用户在门店完成下单。<br />您即可获取一笔1000-2000的金额奖励";

// 页面加载时自动加载数据
onMounted(() => {
  const memberInfo = app.globalData.memberInfo;
  list.value[0].value = memberInfo.rename;
  list.value[1].value = memberInfo.alipay;
  list.value[2].value = memberInfo.phone;
  list.value[3].value = memberInfo.wechat;
});
const submit = async () => {
  if (
    list.value[0].value &&
    list.value[1].value &&
    list.value[2].value &&
    list.value[3].value
  ) {
    const params = {
      rename: list.value[0].value,
      alipay: list.value[1].value,
      phone: list.value[2].value,
      wechat: list.value[3].value,
    };
    await memberSave(params);
    uni.showToast({
      title: "信息修改成功",
      icon: "none",
      mask: true, // 是否显示透明蒙层，防止触摸穿透
    });
  } else {
    wx.showToast({
      title: "必填数据不能为空",
      icon: "none",
    });
    return false;
  }
};
</script>

<style lang="scss" scoped>
body {
  background: #fdfdfd !important;
}
</style>
