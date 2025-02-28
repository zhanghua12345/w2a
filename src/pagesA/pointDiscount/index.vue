<template>
  <view class="px-main py-16 flex items-center justify-between bg-[#fff6e5]">
    <view class="flex-1 text-[#ab363b] flex items-center">
      <i class="iconfont mr-10">&#xe658;</i>
      提现如有疑问，请联系专属客服
    </view>
    <button open-type="contact" class="share">
      <view
        class="flex items-center justify-center border-2 text-[#ab363b] border-[#ab363b] px-10 py-2 rounded-full text-24"
      >
        去联系
      </view>
    </button>
  </view>
  <view
    class="px-40 rounded-main bg-fff relative shadow-sm mx-main mt-main flex flex-col items-center"
  >
    <view class="text-48 pt-60">￥{{ memberInfo.money || "0.00" }}</view>
    <view class="">可提现金额</view>
    <view class="w-full flex flex-wrap items-center justify-between mt-main">
      <up-input
        disabled
        v-model="moneyValue"
        border="bottom"
        disabledColor="#fff"
        class="flex-1"
      >
        <template #prefix>
          <up-text text="￥" margin="0 3px 0 0" type="tips" />
        </template>
      </up-input>
      <view
        class="pl-main py-6 text-[#ab363b] ml-50"
        @click="moneyValue = memberInfo.money"
        >全部</view
      >
    </view>
    <view class="pb-main w-full">
      <view class="flex flex-wrap items-center justify-between mt-50">
        到账zfb {{ memberInfo.alipay }}
        <view
          class="py-12 px-30 text-fff rounded-full bg-[#ef3d3d] relative"
          @click="openZFB()"
        >
          去修改
        </view>
      </view>
      <view class="mt-20">姓名 {{ memberInfo.rename }}</view>
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
    <view class="mt-main text-tip"
      >*提现后请点击顶部「去联系」或微信联系客服</view
    >
    <view class="mt-80 underline text-tip" @click="openAgreement"
      >提现说明</view
    >
  </view>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { withdrawal, getMemberInfo } from "@/api/my";
import { onShow } from "@dcloudio/uni-app";

const app = getApp();
const moneyValue = ref(null);
const memberInfo = ref({});
onMounted(() => {});
const openAgreement = () => {
  uni.navigateTo({
    url: `/pages/agreement/index?id=1&title=梵米尼提现说明`,
  });
};
onShow(async () => {
  const data = await getMemberInfo();
  app.globalData.memberInfo = data.data;
  memberInfo.value = data.data;
});

const submit = async () => {
  if (!moneyValue.value) {
    wx.showToast({
      title: "请先点击「全部」导入提现金额",
      icon: "none",
    });
    return false;
  }
  const params = {
    money: moneyValue.value,
  };
  uni.showToast({
    title: "数据提交中...",
    icon: "none",
    mask: true, // 是否显示透明蒙层，防止触摸穿透
  });
  const res = await withdrawal(params);
  console.log(res);
  uni.navigateTo({ url: "/pagesA/pointDiscount/success?msg=" + res.msg });
};
const openZFB = () => {
  uni.navigateTo({
    url: `/pagesA/pointDiscount/zfb`,
  });
};
</script>
<style lang="scss" scoped>
.share {
  border: none;
  //透明色
  background-color: transparent !important;
  box-shadow: none;

  /* 去除伪元素样式 */
  &::before,
  &::after {
    content: none;
    /* 去除伪元素 */
    display: none;
    /* 隐藏伪元素 */
  }
}
</style>
