<template>
  <view
    class="w-full rounded-main shadow-sm bg-fff tn-animation-fade-in flex flex-wrap justify-between p-main"
    :class="className"
    @click="emit('click', obj)"
  >
    <image
      class="w-240 h-180 bg-cover rounded-main"
      :src="obj.image_input[0]"
      alt=""
    />
    <view class="flex-1 flex flex-col justify-between pl-main">
      <view class="line-clamp-2 font-600">
        {{ obj.title }}
      </view>
      <view class="flex flex-wrap justify-between leading-1">
        <view class="flex items-center">
          <i class="iconfont text-tip text-24 mr-6">&#xe89d;</i
          >{{ obj.add_time }}
        </view>
        <view class="flex items-center">
          <i class="iconfont text-tip text-24 mr-6">&#xe662;</i
          >{{ obj.realBrowse || 0 }}
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);
defineProps(["obj", "className"]);
</script>
