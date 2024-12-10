<template>
  <view
    class="w-full rounded-main shadow-sm bg-fff tn-animation-fade-in flex flex-wrap justify-between p-main"
    :class="className"
    @click="emit('click', obj)"
  >
    <image
      class="w-240 h-180 bg-cover rounded-main"
      src="https://img2.baidu.com/it/u=3788447690,3423920042&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500"
      alt=""
    />
    <view class="flex-1 flex flex-col justify-between pl-main">
      <view class="line-clamp-2 font-600">
        最佳“灰+白”搭配！138m²美式温馨四居室，餐厅利用率100%四居室，餐厅利用率100%
      </view>
      <view class="flex flex-wrap justify-between leading-1">
        <view>
          <i class="iconfont text-tip text-24 mr-6">&#xe89d;</i>2024-01-22
        </view>
        <view>
          <i class="iconfont text-tip text-24 mr-6">&#xe662;</i
          >{{ Math.floor(Math.random() * 100) }}
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);
defineProps(["obj", "className"]);
</script>
