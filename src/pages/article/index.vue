<template>
  <up-sticky offset-top="0">
    <up-tabs
      class="bg-bg"
      :list="classList"
      :current="activeClass"
      lineWidth="20"
      lineHeight="7"
      keyName="title"
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
      itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 88rpx; "
      @click="tabsClick"
    />
  </up-sticky>
  <view class="px-main w-full">
    <Article
      className="mb-main"
      v-for="(item, index) in list"
      :key="index"
      :obj="item"
      @click="openDetail"
    />
  </view>
  <up-loadmore
    class="pt-20 pb-40"
    :status="status"
    loading-text="努力加载中，先喝杯茶"
    loadmore-text="轻轻上拉···"
    nomore-text="实在没有了~"
  />
  <ScrollTop />
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
  onReachBottom,
  onPullDownRefresh,
} from "@dcloudio/uni-app";
import { articleClass, article_list } from "@/api/article";
import Article from "@/components/article/index.vue";
import ScrollTop from "@/components/scrollTop/index.vue";
import { useWxShare } from "@/hooks/index.js";
// 监听滚动
onPageScroll((e) => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/case/index",
});

const classList = ref([]); // 分类
const activeClass = ref(0);

const list = ref([]);
let params = {
  page: 1,
  limit: 10,
};
const status = ref("loading");
const lineBg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=";

// 页面加载时自动加载数据
onMounted(async () => {
  await getClass();
  getList(params);
});

// 下拉刷新
onPullDownRefresh(async () => {
  list.value = [];
  params.page = 1;
  status.value = "loading";
  getList(params);
  uni.stopPullDownRefresh();
});

// 上拉加载
onReachBottom(() => {
  if (status.value === "nomore") return;
  status.value = "loading";
  getList();
});

const tabsClick = (item, index) => {
  activeClass.value = index;
  list.value = [];
  params.page = 1;
  status.value = "loading";
  getList(params);
};

// 跳转到详情
const openDetail = (item) => {
  uni.navigateTo({ url: `/pages/articleDetail/index?id=${item.id}` });
};

// 获取分类
const getClass = async () => {
  const data = await articleClass();
  classList.value = data || [];
  activeClass.value = 0;
};

// 获取列表数据
const getList = async () => {
  console.log(params);
  const data = await article_list({
    ...params,
    cid: classList.value[activeClass.value].id,
  });
  list.value = (list.value || []).concat(data);
  params.page++;
  status.value = data.length < params.limit ? "nomore" : "loadmore";
};
</script>

<style scoped lang="scss"></style>
