<template>
  <view class="pb-10 relative" :class="className" @click="emit('click')">
    <view class="text-32 leading-1.4 flex items-center font-600" v-if="title">
      {{ title }}
      <view
        class="text-22 leading-1.2 pt-14 pl-main font-400 text-tip"
        v-if="subTitle"
      >
        {{ subTitle }}
      </view>
    </view>
    <view class="font-20 pt-10 text-tip" v-if="subTitleBottom">
      {{ subTitleBottom }}
    </view>
    <view
      class="absolute left-10 w-50 h-10 rounded-full bg-000-9"
      v-if="!subTitleBottom"
    ></view>
  </view>
</template>

<script setup>
const emit = defineEmits(["click"]);

defineProps(["title", "subTitle", "subTitleBottom", "className"]);
</script>

<style scoped></style>
