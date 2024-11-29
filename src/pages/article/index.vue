<template>
  <view class="h-full w-full flex flex-col">
    <view class="pb-10">
      <up-tabs
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
    </view>

    <view class="flex-1 w-full h-full">
      <swiper
        @change="change"
        @click="click"
        :style="{ height: 'calc(100vh - 98rpx)' }"
      >
        <swiper-item>
          <scroll-view
            :scroll-y="true"
            class="h-full"
            @scrolltolower="onReachBottom"
            @scrolltoupper="onPullDownRefresh"
          >
            <view class="px-main pb-main">
              <Article className="mb-main" v-for="item in list" :key="item" />
              <up-loadmore
                :status="status"
                loading-text="努力加载中，先喝杯茶"
                loadmore-text="轻轻上拉"
                nomore-text="实在没有了"
              />
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view :scroll-y="true" class="h-full">
            <view class="px-main pb-main">
              <Article className="mb-main" v-for="item in list" :key="item" />
              <up-loadmore
                :status="status"
                loading-text="努力加载中，先喝杯茶"
                loadmore-text="轻轻上拉"
                nomore-text="实在没有了"
              />
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
  <!-- 
 
  </up-swiper> -->
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

import Article from "@/components/article/index.vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/article/index",
});
const lineBg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=";

const status = ref("loading");

// 响应式数据
const list4 = reactive([
  { name: "梵米尼精选" },
  { name: "空间设计" },
  { name: "装修攻略" },
  { name: "家居风水" },
  { name: "收纳攻略" },
  { name: "家居生活" },
]);

const list = ref([]);
let pageNo = 1;
let pageSize = 10;

// 下拉刷新
const onPullDownRefresh = () => {
  pageNo = 1;
  list.value = [];
  loadData(true).then(() => {
    uni.stopPullDownRefresh();
  });
};

// 上拉加载
const onReachBottom = () => {
  loadData();
};

// 加载数据的函数
const loadData = async (isRefresh = false) => {
  if (isRefresh) {
    list.value = []; // 刷新时清空数据
    status.value = "loadmore";
  }
  if (status.value === "nomore") return;
  console.log(status.value);
  status.value = "loading";
  // 模拟数据加载，实际中应该是API请求
  setTimeout(() => {
    for (let i = 0; i < pageSize; i++) {
      console.log(status.value);

      list.value.push(`Item ${pageNo * pageSize + i}`);
      status.value = pageNo >= 4 ? "nomore" : "loadmore";
    }
    pageNo++;
    console.log(pageNo);
  }, 500);
};

// 页面加载时自动加载数据
onMounted(() => {
  loadData(true);
});
</script>

<style scoped lang="scss"></style>
