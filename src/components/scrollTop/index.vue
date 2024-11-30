<template>
  <up-back-top
    :scroll-top="scrollTop"
    mode="square"
    :customStyle="{ backgroundColor: '#cf5d38' }"
    :iconStyle="{ color: '#fff' }"
    icon="arrow-up"
  ></up-back-top>
</template>

<script setup>
import { ref } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
// 监听滚动
const scrollTop = ref(0);
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});
</script>
