<template>
  <view class="w-full h-full relative">
    <view
      class="w-full h-110 flex justify-center items-center text-fff rounded-16 text-32"
      :class="{
        'bg-[#bf6c22]': data.color === 'bf6c22',
        'bg-[#0ccc83]': data.color === '0ccc83',
        'bg-[#ff8921]': data.color === 'ff8921',
      }"
      @click="emit('click')"
    >
      {{ data.bottomTitle || "查看装修报价" }}
    </view>
    <view
      class="absolute top-[-30rpx] right-0 flex items-center rounded-tl-full rounded-r-full px-20 h-50 text-24 text-[#592e04] bg-gradient-to-r from-[#fcd290] to-[#fdefd3]"
      v-if="data.formRead"
    >
      已有{{ data.formRead }}人查看
    </view>
    <view class="flex flex-wrap pt-main justify-center" v-if="data?.bottomTip">
      <i class="iconfont text-20 mr-6 text-tip">&#xe663;</i>
      <view
        class="text-20 text-tip flex-1"
        v-if="data.bottomTip === 'agreement'"
      >
        我已阅读并同意梵米尼
        <span
          :class="{
            'text-bf6c22': data.color === 'bf6c22',
            'text-[#0ccc83]': data.color === '0ccc83',
            'bg-[#ff8921]': data.color === 'ff8921',
          }"
          @click="openAgreement('serve')"
          >《服务须知》</span
        >
        和<span
          :class="{
            'text-bf6c22': data.color === 'bf6c22',
            'text-[#0ccc83]': data.color === '0ccc83',
            'bg-[#ff8921]': data.color === 'ff8921',
          }"
          @click="openAgreement('privacy')"
          >《隐私政策》</span
        >
        且授权平台或平台指定装企联系我</view
      >
      <view class="text-18 text-tip" v-else-if="data.bottomTip"
        >{{ data.bottomTip }}
      </view>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);

defineProps(["data", "status"]);

import { onMounted, ref } from "vue";
onMounted(() => {
  console.log(54545);
});

const openAgreement = (page) => {
  uni.navigateTo({ url: `/pages/agreement/index?type=${page}` });
};
</script>
<style lang="scss" scoped>
.bottom::after {
  content: "";
  background: #f3ddad;
  width: calc(100% + 20rpx);
  height: 20rpx;
  position: absolute;
  left: -10rpx;
  bottom: 0rpx;
  z-index: -1;
}
</style>
