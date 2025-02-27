<template>
  <view class="w-full flex flex-col items-center" :class="className">
    <!-- 导航内容 -->
    <view v-if="navigator.length" class="flex flex-wrap items-center">
      <template v-for="(item, index) in navigator" :key="index">
        <view
          class="px-20 text-tip font-400"
          :style="{ color: item.textColor }"
          @click="navClick(item)"
        >
          {{ item.title }}
        </view>
        <up-line
          length="10"
          direction="col"
          v-if="index !== navigator.length - 1"
        ></up-line>
      </template>
    </view>

    <!-- 页脚内容 -->
    <view class="text-tip">
      {{ content }}
    </view>
  </view>
</template>

<script setup>
const emit = defineEmits(["click"]);

defineProps({
  content: {
    type: String,
    required: true,
  },
  navigator: {
    type: String,
    required: true,
    default: () => [
      {
        title: "回到首页",
        url: "/pages/home/index",
        type: "switch",
        textColor: "#cf5d38",
      },
      {
        title: "了解梵米尼",
        type: "navigate",
        url: "/pages/agreement/index?id=6",
      },
    ],
  },
  className: String,
});
// 导航点击事件
const navClick = (item) => {
  console.log(item);
  if (item.type === "switch") {
    uni.switchTab({ url: item.url });
  } else if (item.type === "navigate") {
    uni.navigateTo({ url: item.url });
  } else if (item.type === "redirect") {
    uni.redirectTo({ url: item.url });
  }
};
</script>

<style scoped></style>
