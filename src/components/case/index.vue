<template>
  <view
    class="w-full rounded-main overflow-hidden shadow bg-fff tn-animation-fade-in relative tracking-normal"
    :class="className"
    @click="emit('click', obj)"
  >
    <!-- https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg -->
    <image
      class="w-full h-300 bg-cover"
      src="https://img2.baidu.com/it/u=3788447690,3423920042&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500"
      alt=""
    />

    <view
      v-show="!noNew"
      class="absolute left-20 top-0 w-90 h-100 flex flex-wrap justify-center"
    >
      <i class="iconfont text-main text-64 leading-1">&#xe62d;</i>
      <view
        class="absolute w-full top-4 h-full text-fff text-24 font-600 flex flex-wrap justify-center"
        >NEW</view
      >
    </view>
    <view
      v-show="!no720"
      class="absolute right-20 top-10 flex flex justify-center items-center h-54 bg-000-6 rounded-full px-14 text-fff"
    >
      <i class="iconfont text-34 leading-1">&#xe603;</i>
    </view>
    <view
      v-show="!noView"
      class="absolute right-20 top-236 flex justify-center items-center bg-000-6 rounded-full px-14 h-54 text-fff leading-1 text-24"
    >
      <i class="iconfont leading-1 text-24 mr-4">&#xe662;</i>1K+
    </view>
    <view class="px-main py-14 w-full">
      <view class="truncate"
        >最1佳“灰+白”搭配！138m²美式温馨四居室，餐厅利用率100%</view
      >
      <view
        class="flex flex-wrap items-center justify-between mt-6 text-24 text-000-4"
      >
        <view class="flex-1 flex flex-wrap justify-start">
          <view
            v-for="(item, index) in list"
            :key="item"
            class="flex justify-center items-center px-10 py-6 leading-1 mr-10 last:mr-0 rounded-6"
            :class="item.className"
          >
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);
defineProps(["obj", "className", "noNew", "no720", "noView"]);
const list = [
  { name: "三居室", className: "bg-[#faeef3] text-[#ad7680]" },
  { name: "123m²", className: "bg-[#e6eefc] text-[#707eb7]" },
];
</script>
