<template>
  <view class="h-full w-full flex flex-col">
    <up-tabs
      class="pb-10"
      :list="list4"
      lineWidth="20"
      lineHeight="7"
      :lineColor="`url(${lineBg}) 100% 100%`"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
      }"
      :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)',
      }"
      itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 88rpx;"
    />
    <view class="flex-1 w-full h-full">
      <swiper @change="change" @click="click" class="h-full">
        <scroll-view scroll-y="true" class="h-full">
          <view class="px-main">
            <Article className="mb-main" v-for="item in 30" :key="item" />
          </view>
        </scroll-view>
      </swiper>
    </view>
  </view>
  <!-- 
 
  </up-swiper> -->
</template>

<script setup>
import { reactive } from "vue";

import Article from "@/components/article/index.vue";

const lineBg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=";

// 响应式数据
const list4 = reactive([
  { name: "关注" },
  { name: "推荐", badge: { isDot: true } },
  { name: "电影" },
  { name: "科技" },
  { name: "音乐" },
  { name: "美食" },
  { name: "文化" },
  { name: "财经" },
  { name: "手工" },
]);
</script>

<style scoped lang="scss">
body {
  height: 100% !important;
}
</style>
