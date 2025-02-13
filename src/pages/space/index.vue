<template>
  <view class="mx-main flex flex-wrap items-end h-150">
    <image
      class="w-140"
      mode="widthFix"
      src="http://120.27.141.193:8088//uploads/attach/2025/01/20250124/2f986aa6dd4691c469527b42a3242957.jpg"
      alt=""
    />
    <view class="flex-1 h-full flex flex-wrap items-center pl-30 text-tip">
      万事开头难!装修前做好以下准备能保证后续装修更顺利哦~
    </view>
  </view>
  <view class="px-main bg-fff rounded-t-40 pt-20 pb-60">
    <view class="text-32 text-[#1a1a1a] font-600 mt-main">
      一分钟了解装修流程
    </view>
    <video
      class="w-full h-400 rounded-main mt-40"
      src="https://vr.justeasy.cn/view/16zho9528286sa52-1695819876.html"
      muted
      autoplay
    />
    <view class="flex flex-wrap items-center mt-main">
      <up-tag
        text="小白必看"
        bgColor="#e1f7ef"
        color="#37b88d"
        borderColor="#e1f7ef"
      />
      <view class="pl-main">快速了解装修流程，让你装修不迷茫</view>
    </view>
    <view class="text-32 text-[#1a1a1a] font-600 mt-main">
      看看你家怎么装修
    </view>
    <view
      class="mt-main grid grid-rows-6 grid-cols-6 gap-main h-500"
      v-if="info.length"
    >
      <view
        class="bg-000 rounded-main text-fff relative overflow-hidden shadow-md"
        :class="{
          'row-span-4 col-span-2': [0].includes(index),
          'row-span-2 col-span-2': [1, 2, 3, 4].includes(index),
          'row-span-2 col-span-3': [5, 6].includes(index),
        }"
        v-for="(item, index) in info[4].list"
        :key="index"
        @click="openDetail(item)"
      >
        <image class="w-full h-full bg-cover" :src="item.img" alt="" />
        <view class="absolute bottom-10 left-0 right-0 flex justify-center">
          <view class="bg-000-6 text-fff rounded-full px-20 py-6">
            {{ item.title }}
          </view>
        </view>
      </view>
    </view>
    <view class="text-32 text-[#1a1a1a] font-600 mt-main">
      打算花多少钱来装修
    </view>
    <video
      class="w-full h-400 rounded-main mt-40"
      src="https://vr.justeasy.cn/view/16zho9528286sa52-1695819876.html"
      muted
      autoplay
    />
  </view>
</template>
<script setup>
import { getHomeData } from "@/api/main";
import { onMounted, ref } from "vue";

const info = ref([]);
// 页面加载时自动加载数据
onMounted(() => {
  getInfo();
});

const openDetail = (item) => {
  console.log(item.router);
  const type = item.router.type;
  uni[type]({
    url: item.router.isId
      ? `/${item.router.page}?id=${item.routerId}`
      : `/${item.router.page}`,
  });
};

// 获取详情
const getInfo = async () => {
  const data = await getHomeData();
  console.log(data.data);
  info.value = data.data;
};
</script>
<style lang="scss" scoped></style>
