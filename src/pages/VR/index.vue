<template>
  <view class="h-full w-full">
    <web-view :src="url"></web-view>
  </view>
</template>
<script setup>
import { onShareAppMessage, onShareTimeline, onLoad } from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
import { ref } from "vue";

const url = ref("");

// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: `/pages/VR/index?url=${url.value}`,
});
onLoad((options) => {
  // options是传递过来的参数对象
  url.value = options.url;
});
</script>
<style lang="scss" scoped></style>
