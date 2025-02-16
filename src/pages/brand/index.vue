<template>
  <view class="h-full w-full"> {{ title }} </view>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const title = ref("");
onLoad((options) => {
  // options是传递过来的参数对象
  switch (options.type) {
    case "serve":
      title.value = "服务须知";
      break;
    case "privacy":
      title.value = "隐私政策";
      break;
    default:
      break;
  }
  uni.setNavigationBarTitle({
    title: title.value,
  });
});
</script>
<style lang="scss" scoped></style>
