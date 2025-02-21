<template>
  <view class="px-main text-24">
    <view
      class="py-main border-0 border-b-2 last:border-b-0 border-solid border-[#eee]"
      v-for="(item, index) in list"
      :key="this"
    >
      <view class="flex flex-wrap items-center justify-between">
        <view>
          <view class="text-24 text-[#999]">2025-02-20 19:18</view>
          <view class="pt-10">{{
            index % 2 === 1 ? "签到赠送" : "用户到店"
          }}</view>
        </view>
        <view class="{{index%2===1  ? 'text-[#1A1A1A]' : 'text-main'}}">
          + 99
        </view>
      </view>
      <view
        class="flex flex-wrap justify-between pt-16 text-24"
        v-if="index % 2 === 0"
      >
        <view class="flex flex-wrap items-center text-main">
          <i class="iconfont leading-1 pr-8 text-24">&#xe644;</i>
          您推荐的xxx到店啦
        </view>
        <view class="text-[#8B8B8B]">余额：599</view>
      </view>
    </view>
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
import { browseList } from "@/api/case";

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
  const data = await browseList(params);
  list.value = (list.value || []).concat(data.list);
  params.page++;
  status.value = data.list.length < params.limit ? "nomore" : "loadmore";
};
</script>
<style lang="sass" scoped></style>
