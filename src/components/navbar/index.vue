<template>
  <view
    class="fixed z-10 left-0 w-full"
    v-show="Number(scrollNum) > (Number(scrollTop) || 60)"
  >
    <up-navbar :style="{ 'z-index': 11 }" :title="title || '梵米尼全屋定制 +'">
      <template #left>
        <view
          v-show="leftIcon"
          class="flex items-center border-2 border-[#aaa] border-solid rounded-full px-16 py-6"
        >
          <up-icon name="arrow-left" size="20" @click="back"></up-icon>
          <up-line
            direction="column"
            :hairline="false"
            length="16"
            margin="0 16rpx"
          ></up-line>
          <up-icon name="home" size="20" @click="openHome"></up-icon>
        </view>
      </template>
    </up-navbar>
  </view>
</template>
<script setup>
defineProps(["title", "scrollTop", "leftIcon"]);

import { ref } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";

const scrollNum = ref(0);

onPageScroll((e) => {
  scrollNum.value = e.scrollTop;
});
const back = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({
      delta: 1,
    });
  } else {
    uni.switchTab({
      url: "/pages/home/index",
    });
  }
};
const openHome = () => {
  uni.switchTab({
    url: "/pages/home/index",
  });
};
</script>
<style lang="sass" scoped></style>
