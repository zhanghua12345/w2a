<template>
  <view class="px-main text-24">
    <view
      class="py-main border-0 border-b-2 last:border-b-0 border-solid border-[#eee]"
      v-for="(item, index) in list"
      :key="this"
    >
      <view class="flex flex-wrap items-center justify-between">
        <view>
          <view class="pt-10">姓名：{{ item.name || "--" }}</view>
          <view class="text-24 text-[#999]"
            >微信昵称：{{ item.wechat_name || "--" }}</view
          >
          <view class="text-24 text-[#999]">手机号：{{ item.phone }}</view>
        </view>
        <view class="text-main">{{
          item.status === 0
            ? "已提交"
            : item.status === 1
            ? item.remakes || "用户到店"
            : item.remakes || "用户未到店"
        }}</view>
      </view>
      <view
        class="flex flex-wrap justify-between pt-16 text-24"
        v-if="index % 2 === 0"
      >
        <view
          class="flex flex-wrap items-start justify-start text-main flex-1 pr-20"
        >
          <i class="iconfont leading-1.5 pr-8 text-24">&#xe644;</i>
          <view class="flex-1"> {{ item.area }} </view>
        </view>
        <view class="text-24 text-[#999]">{{
          item.updated_at || item.updated_at
        }}</view>
      </view>
    </view>
  </view>
  <up-loadmore
    class="pt-20 pb-40"
    :status="status"
    loading-text="努力加载中，先喝杯茶"
    loadmore-text="轻轻上拉···"
    nomore-text="没有更多了~"
  />
</template>
<script setup>
import { inviteList } from "@/api/my";

import { onMounted, ref } from "vue";

import { onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";

const list = ref([]);

let params = {
  page: 1,
  limit: 20,
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

const getList = async (params) => {
  const data = await inviteList(params);
  list.value = (list.value || []).concat(data.list);
  params.page++;
  status.value = data.list.length < params.limit ? "nomore" : "loadmore";
};
</script>
<style lang="sass" scoped></style>
