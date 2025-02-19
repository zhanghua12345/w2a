<template>
  <view
    v-show="status === 1"
    class="fixed bottom-0 left-0 right-0 h-[900rpx] rounded-t-40 z-full bg-gradient-to-b from-[#feeac5] via-[#f2f2f2] via-20% to-[#f8f8f8] flex flex-col items-center"
    :class="{
      'text-bf6c22': data.color === 'bf6c22',
      'text-[#0ccc83]': data.color === '0ccc83',
    }"
  >
    <view
      class="w-140 h-140 rounded-full border-10 border-fff border-solid bg-bg mt-[-70rpx]"
    >
      <image
        class="w-full h-full rounded-full"
        src="http://120.27.141.193:8088//uploads/attach/2025/01/20250121/840c57f126d0134bb7ee32a9c3173963.png"
        mode="aspectFill"
      />
    </view>
    <view
      class="px-20 text-20 h-46 text-[#bf6c22] flex flex-row items-center w-auto bg-gradient-to-r from-[#fef4ea] from-20% via-[#ffe8bf] to-[#efdbb7] rounded-full mt-[-24rpx] z-10"
    >
      <i class="iconfont text-24 mr-6">&#xe663;</i>
      梵米尼推荐官XX
    </view>
    <view class="mt-main text-000-9">xx正在为您计算中...</view>
    <view class="mt-80 bottom relative text-36 text-000-9"
      >登录后即可查看报价</view
    >
    <view class="mt-80 text-[#bf6c22] text-center">
      <view class="">梵米尼专注装修15年</view>
      <view class="mt-20">6000多万累计业主报价</view>
    </view>
    <view class="absolute bottom-100 left-0 right-0 w-524 mx-auto">
      <formBottom @click="emit('click')" :data="data" />
    </view>
  </view>
</template>
<script setup>
import formBottom from "@/components/formBottom/index.vue";
const emit = defineEmits(["click"]);
defineProps(["data", "status"]);
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
