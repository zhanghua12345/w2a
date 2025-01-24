<template>
  <view
    v-show="status === 2"
    class="fixed bottom-0 left-0 right-0 h-[900rpx] rounded-t-40 z-full bg-gradient-to-b from-[#feeac5] via-[#f2f2f2] via-20% to-[#f8f8f8] flex flex-col items-center"
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
    <view class="mt-main bottom relative text-36 font-600"
      >加微信自动发送报价结果</view
    >
    <view class="mt-main text-tip">60m²以下", "61m²~90m²"</view>
    <image
      show-menu-by-longpress
      class="w-420 h-420 mt-main"
      src="/static/kefu.png"
      mode="aspectFill"
    />
    <view class="mt-70 text-[#0ccc83]">长按二维码识别微信</view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);

defineProps(["data", "status"]);

import { onMounted, ref } from "vue";
onMounted(() => {
  console.log(54545);
});

const filterBase64 = (codeImages) => {
  return codeImages.replace(/[\r\n]/g, "");
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
