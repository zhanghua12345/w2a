<template>
  <view class="px-main text-24">
    <Article
      className="bg-fff mt-20"
      :obj="item.info"
      v-for="(item, index) in list"
      :key="index"
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
</template>
<script setup>
import Article from "@/components/article/index.vue";

import { browseList } from "@/api/article";

import { onMounted, ref } from "vue";

import { onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";

const list = ref([]);

let params = {
  page: 1,
  limit: 8,
};

const status = ref("loading");

// 页面加载时自动加载数据
onMounted(() => {
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
  getList(params);
});

const openDetail = (data) => {
  uni.navigateTo({ url: `/pages/articleDetail/index?id=${data.id}` });
};

const getList = async (params) => {
  const data = await browseList(params);
  list.value = (list.value || []).concat(data.list);
  params.page++;
  status.value = data.list.length < params.limit ? "nomore" : "loadmore";
};
</script>
