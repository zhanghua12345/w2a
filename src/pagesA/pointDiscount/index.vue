<template>
  <view class="px-main py-16 flex items-center justify-between bg-[#fff6e5]">
    <view class="flex-1 text-[#ab363b] flex items-center">
      <i class="iconfont text-18 mr-10"> &#xe671; </i>
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
    <view class="text-48 pt-60">￥35.74</view>
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
        @click="moneyValue = 35.74"
        >全部</view
      >
    </view>
    <view class="pb-main w-full">
      <view class="flex flex-wrap items-center justify-between mt-50">
        到账支付宝 15879081640
        <view
          class="py-12 px-30 text-fff rounded-full bg-[#ef3d3d] relative"
          @click="openZFB()"
        >
          去修改
        </view>
      </view>
      <view class="mt-20">姓名 张华</view>
    </view>
  </view>
  <view class="mx-main mt-main flex flex-col items-center">
    <up-button text="提交" shape="circle" type="error" color="#ef3d3d" />
    <view class="mt-main text-[#ef3d3d]">*每月25号后可提现</view>
    <view class="mt-80 underline text-tip" @click="openAgreement"
      >提现说明</view
    >
  </view>
</template>
<script setup>
import { onMounted, ref } from "vue";
const moneyValue = ref(null);
onMounted(() => {});
const openAgreement = () => {
  uni.navigateTo({
    url: `/pages/agreement/index?id=1&title=梵米尼提现说明`,
  });
};

const openZFB = () => {
  uni.navigateTo({
    url: `/pagesA/zfb/index`,
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
