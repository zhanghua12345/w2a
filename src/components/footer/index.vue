<template>
  <view class="w-full flex flex-col items-center" :class="className">
    <!-- 导航内容 -->
    <view v-if="navigator.length" class="flex flex-wrap items-center">
      <template v-for="(item, index) in navigator">
        <view
          class="px-20 text-9c9c9c"
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
    <view class="text-9c9c9c">
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
        textColor: "blue",
      },
      {
        title: "关于图鸟",
        type: "navigate",
        url: "/pages/about/index",
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
