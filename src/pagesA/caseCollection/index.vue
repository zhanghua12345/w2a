<template>
  <up-navbar title="收藏" @rightClick="rightClick" :autoBack="true" placeholder>
    <template #right>
      <i class="iconfont leading-1" @click="showDelete = !showDelete"
        >&#xe645;</i
      >
    </template>
  </up-navbar>
  <view class="grid grid-rows-2 grid-cols-2 gap-20 p-main">
    <view class="relative rounded-main overflow-hidden" v-for="item in 20">
      <view
        v-show="showDelete"
        class="absolute left-0 top-0 h-full w-full bg-000-4 z-[1] flex items-center justify-center"
      >
        <i class="iconfont leading-1 text-fff text-48 p-50">&#xe684;</i>
      </view>
      <Case :showTip="false" :noNew="true" :no720="true" :noView="true" />
    </view>
  </view>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Case from "@/components/case/index.vue";
const list = [
  { name: "三居室", className: "bg-[#faeef3] text-[#ad7680]" },
  { name: "123m²", className: "bg-[#e6eefc] text-[#707eb7]" },
];
const showDelete = ref(false);
</script>
<style lang="scss" scoped></style>
