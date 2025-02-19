<template>
  <view
    class="w-full rounded-main overflow-hidden shadow-sm bg-fff tn-animation-fade-in"
    :class="className"
    @click="emit('click', obj)"
  >
    <!-- https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg -->
    <image
      class="w-full h-300 bg-cover"
      :src="obj.coverImg"
      alt=""
      mode="aspectFill"
    />
    <view class="px-16 py-14 w-full">
      <view class="truncate text-30">{{ obj.name }}</view>
      <view
        class="flex flex-wrap items-center justify-between mt-10 text-24 text-000-4"
      >
        <view class="flex-1 flex flex-wrap justify-start">
          <view
            v-for="(key, index) in Object.keys(obj.cate_list || [])"
            :key="index"
            :class="{
              'pr-10': index < 3,
            }"
          >
            {{ index < 3 ? obj.cate_list[key] : "" }}
          </view>
        </view>
        <view class="flex flex-wrap items-center justify-end">
          <i class="iconfont text-tip text-24 mr-6">&#xe662;</i
          >{{ obj.realBrowse || 0 }}
          <view class="px-20">
            <up-line length="10" direction="col"></up-line
          ></view>

          <i class="iconfont text-tip text-24 mr-6">&#xe66e;</i>
          {{ obj.realPraise || 0 }}
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);
defineProps(["obj", "className"]);
</script>
