<template>
  <view class="w-full h-110"></view>
  <view
    class="fixed bottom-0 left-0 right-0 h-110 flex flex-wrap justify-around items-center bg-bg border-0 border-t-2 border-solid px-main text-24"
  >
    <view class="flex flex-col justify-center items-center min-w-110">
      <i class="iconfont leading-1">&#xe662;</i>
      点赞1
    </view>
    <view class="flex flex-col justify-center items-center min-w-110">
      <i class="iconfont leading-1">&#xe66e;</i>
      收藏15
    </view>
    <view class="flex flex-col justify-center items-center min-w-110">
      <i class="iconfont leading-1">&#xe643;</i>
      分享
    </view>
    <view class="flex-1 pl-20">
      <up-button
        class="custom-style"
        text="一键报价"
        shape="circle"
        color="#cf5d38"
        size="normal"
      ></up-button>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);
defineProps(["obj", "className"]);
const list = [
  { name: "dian", className: "bg-[#faeef3] text-[#ad7680]" },
  { name: "123m²", className: "bg-[#e6eefc] text-[#707eb7]" },
];
</script>
