<template>
  <view
    class="pb-10 flex flex-wrap justify-between items-center"
    :class="[className, color]"
    @click="emit('click')"
  >
    <view class="flex flex-col">
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
        class="mt-10 w-50 h-10 rounded-full bg-000-9"
        :class="classLine"
        v-if="!subTitleBottom"
      ></view>
    </view>
    <view class="flex items-center" v-if="isMore">
      {{ moreTitle }}
      <i class="iconfont text-24 ml-10 text-tip">&#xe671;</i>
    </view>
  </view>
</template>

<script setup>
const emit = defineEmits(["click"]);

defineProps([
  "title",
  "subTitle",
  "subTitleBottom",
  "className",
  "classLine",
  "isMore",
  "moreTitle",
]);
</script>

<style scoped></style>
