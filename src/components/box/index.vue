<template>
  <view
    class="w-full rounded-main overflow-hidden shadow-md bg-fff tn-animation-fade-in"
    :class="className"
    @click="emit('click', obj)"
  >
    <!-- https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg -->
    <image
      class="w-full h-300 bg-cover"
      src="https://img2.baidu.com/it/u=3788447690,3423920042&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500"
      alt=""
    />
    <view class="px-main py-14 w-full">
      <view class="truncate"
        >最佳“灰+白”搭配！138m²美式温馨四居室，餐厅利用率100%</view
      >
      <view
        class="flex flex-wrap items-center justify-between mt-6 text-24 text-000-4"
      >
        <view class="flex-1 flex flex-wrap justify-start">
          <view v-for="(item, index) in list" :key="item" class="">
            {{ item }}
            <TnIcon v-show="index !== list.length - 1" name="title" />
          </view>
        </view>
        <view class="flex flex-wrap items-center justify-end">
          <i class="iconfont text-tip text-24 mr-6">&#xe662;</i
          >{{ Math.floor(Math.random() * 100) }}
          <view class="px-20">
            <up-line length="10" direction="col"></up-line
          ></view>

          <i class="iconfont text-tip text-24 mr-6">&#xe66e;</i>
          {{ Math.floor(Math.random() * 100) }}
          <!-- <TnIcon name="title" /> -->
          <!-- <TnIcon name="carousel" /> -->
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);
defineProps(["obj", "className"]);
const list = ["三居室", "123m²", "现代简约", "马克色"];
</script>
