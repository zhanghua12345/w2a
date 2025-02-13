<template>
  <up-navbar
    :title="data.title"
    :autoBack="true"
    bgColor="rgba(0,0,0,0)"
    leftIconColor="#fff"
    :titleStyle="{ color: '#fff' }"
  />
  <up-swiper
    :list="data.banner"
    indicator
    indicatorMode="line"
    circular
    easingFunction="easeInOutCubic"
    height="1300rpx"
    radius="0"
  />

  <formKefu :status="2" :data="data" />
</template>
<script setup>
import { ref, onMounted } from "vue";

import { JSON_success } from "@/utils/mock.js";

import formKefu from "@/components/formKefu/index.vue";
const data = ref({});
const status = ref(1);

// 页面加载时自动加载数据
onMounted(() => {
  data.value = JSON_success;
  console.log(data.value);
});
</script>
