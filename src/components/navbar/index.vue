<template>
  <view
    class="fixed z-full left-0 w-full"
    v-show="Number(scrollNum) > (Number(scrollTop) || 60)"
  >
    <up-navbar
      :style="{ 'z-index': 9999 }"
      :title="title || '梵米尼'"
      :leftIcon="leftIcon || 'arrow-left'"
    />
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
</script>
<style lang="sass" scoped></style>
