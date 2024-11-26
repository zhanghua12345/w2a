<template>
  <view class="pb-10 relative" :class="className" @click="emit('click')">
    <view class="text-main text-32 leading-1.4" v-if="title">{{ title }}</view>
    <view class="text-main-sub text-20 leading-1.2" v-if="subTitle">
      {{ subTitle }}
    </view>
    <view class="absolute left-10 w-50 h-10 rounded-full bg-main"></view>
  </view>
</template>

<script setup>
const emit = defineEmits(["click"]);

defineProps(["title", "subTitle", "className"]);
</script>

<style scoped></style>
