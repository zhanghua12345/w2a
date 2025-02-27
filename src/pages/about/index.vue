<template>
  <view class="pt-main">
    <view class="text-000 text-32 w-full flex justify-center">
      请搜索并关注 {{ title }}
    </view>
  </view>
  <image class="w-full py-main" :src="img" mode="widthFix" />
</template>
<script setup>
import { onShareAppMessage, onShareTimeline, onLoad } from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
import { ref } from "vue";

const type = ref("");
const title = ref("");
const img = ref("");
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: `/pages/about/index?type=${type.value}`,
});
onLoad((options) => {
  // options是传递过来的参数对象
  type.value = options?.type;
  img.value = options?.img;
  console.log(options);
  switch (options.type) {
    case "mall":
      title.value = "「梵米尼家具」";
      break;
    case "official":
      title.value = "「梵米尼商城」";
      break;
    case "tikTok":
      title.value = "抖音号「石头哥」";
      break;
    case "video":
      title.value = "视频号「梵米尼视频号」";
      break;
    case "H5":
      title.value = "H5网站「梵米尼H5」";
      break;
    default:
      title.value = "公众号「梵米尼家具」";
      break;
  }
});
</script>
<style lang="scss" scoped></style>
