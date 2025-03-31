<template>
  <view
    class="w-full rounded-main overflow-hidden shadow-sm bg-fff tn-animation-fade-in"
    :class="className"
    @click="emit('click', obj)"
  >
    <!-- https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg -->
    <div class="w-full h-390 relative">
      <view
        v-if="obj?.VR_link"
        class="absolute z-full top-0 left-0 right-0 bottom-0 flex justify-center items-center"
      >
        <view
          class="bg-000-6 rounded-full px-24 py-14 text-fff flex items-center text-32 animation-zoom-in-out"
          @click.stop="emit('openVR', obj)"
        >
          <i class="iconfont leading-1 text-32">&#xe71c;</i>
          全屋漫游
        </view>
      </view>
      <image
        class="w-full h-full"
        :src="obj.coverImg"
        alt=""
        mode="aspectFill"
      />
    </div>

    <view class="px-16 py-14 w-full">
      <view class="truncate text-32">{{ obj.name }}</view>
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
          <i class="iconfont text-tip text-24 mr-6">&#xe8bf;</i>
          {{ obj.realBrowse || 0 }}
          <view class="px-20">
            <up-line length="10" direction="col" />
          </view>

          <i class="iconfont text-tip text-24 mr-6">&#xe623;</i>
          {{ obj.realPraise || 0 }}
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click", "openVR"]);
defineProps(["obj", "className"]);
</script>
