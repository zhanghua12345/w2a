<template>
  <view class="h-full w-full">
    <web-view :src="urls[urlIndex]">
      <cover-view class="fixed right-22 bottom-180 z-full" bindtap="nextStep1">
        <cover-view
          class="w-90 h-180 rounded-8 overflow-hidden shadow text-fff text-30"
        >
          <cover-view
            class="w-full h-1/2 bg-main text-center leading-[90rpx]"
            @click="next('top')"
          >
            上
          </cover-view>
          <cover-view
            class="w-full h-1/2 bg-[#007aff] text-center leading-[90rpx]"
            @click="next('bottom')"
          >
            下
          </cover-view>
        </cover-view>
      </cover-view>
    </web-view>
  </view>
</template>
<script setup>
import { onShareAppMessage, onShareTimeline, onLoad } from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
import { ref } from "vue";

const urls = ref([]);
const urlIndex = ref(0);

// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: `/pages/VR/index?url=${urls.value}`,
});
onLoad((options) => {
  // options是传递过来的参数对象
  urls.value = JSON.parse(options.urls);
});
const next = (type) => {
  if (type === "top") {
    if (urlIndex.value <= 0) urlIndex.value = urls.value.length - 1;
    else urlIndex.value--;
  } else {
    if (urlIndex.value >= urls.value.length - 1) urlIndex.value = 0;
    else urlIndex.value++;
  }
};
</script>
<style lang="scss" scoped></style>
