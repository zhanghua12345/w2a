<template>
  <view
    class="w-full rounded-main overflow-hidden shadow bg-fff tn-animation-fade-in relative tracking-normal"
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
      <i class="iconfont leading-1 text-24 mr-4">&#xe662;</i>{{ obj.browse }}
    </view>
    <view class="px-main py-14 w-full">
      <view class="truncate">{{ obj.name }}</view>
      <view
        class="flex flex-wrap items-center justify-between mt-6 text-24 text-000-4"
      >
        <view class="flex-1 flex flex-wrap justify-start">
          <!-- :class="[item.className]" -->
          <view
            v-for="(key, index) in Object.keys(obj.cate_list || [])"
            :key="item"
            class="flex justify-center items-center px-10 py-6 leading-1 rounded-6 bg-[#faeef3] text-[#ad7680]"
            :class="{
              'mr-10': index < 3,
            }"
          >
            {{ index < 3 ? obj.cate_list[key] : "" }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);
defineProps(["obj", "className", "noNew", "no720", "noView"]);
</script>
