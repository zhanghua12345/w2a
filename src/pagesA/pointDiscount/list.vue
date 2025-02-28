<template>
  <view class="px-main text-24">
    <view
      class="py-main border-0 border-b-2 last:border-b-0 border-solid border-[#eee]"
      v-for="(item, index) in list"
      :key="index"
    >
      <view class="flex flex-wrap items-center justify-between">
        <view class="flex-1">
          <view class="text-main"> {{ item.note }} </view>
          <view class="text-24 text-[#999] mt-10">{{ item.created_at }}</view>
        </view>
        <view
          class="max-w-200 text-right text-24"
          :class="item.type === 1 ? 'text-main' : 'text-tip'"
        >
          {{ item.type === 1 ? "+" : "-" }}{{ item.money }}
        </view>
      </view>

      <view class="flex flex-wrap justify-between pt-16 text-24">
        <view class="flex flex-wrap items-start text-tip flex-1 pr-40">
          <i class="iconfont pr-8 text-24">&#xe644;</i>
          <view class="flex-1"> {{ item.desc }} </view>
        </view>
        <view class="text-[#8B8B8B]">余额：{{ item.new_money }}</view>
      </view>
    </view>
  </view>
  <up-loadmore
    v-if="list.length > 5"
    class="pt-20 pb-40"
    :status="status"
    loading-text="努力加载中，先喝杯茶"
    loadmore-text="轻轻上拉···"
    nomore-text="实在没有了~"
  />
  <up-empty
    v-else-if="!list?.length"
    text="没有数据~"
    icon="/static/no-info.png"
    marginTop="200"
  />
</template>
<script setup>
import { balanceDetails } from "@/api/my";

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
  const data = await balanceDetails(params);
  list.value = (list.value || []).concat(data.list);
  params.page++;
  status.value = data.list.length < params.limit ? "nomore" : "loadmore";
};
</script>
<style lang="sass" scoped></style>
