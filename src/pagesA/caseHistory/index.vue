<template>
  <view class="px-main text-24">
    <view
      class="flex flex-wrap items-center py-16 border-0 border-b-2 border-solid last:border-b-0 relative"
      v-for="(item, index) in list"
      @click="openDetail(item)"
      :key="index"
    >
      <div class="h-158 w-200 rounded-16 relative overflow-hidden">
        <image
          class="w-full h-full"
          :src="item.info.coverImg"
          alt=""
          mode="aspectFill"
        />
        <div
          class="h-50 w-50 absolute top-0 left-0 flex items-center justify-center text-fff"
          :class="item.info.userCollection ? 'bg-main' : 'bg-000-4'"
        >
          <i
            class="iconfont text-26 leading-1"
            @click.stop="setCollects(item, index)"
          >
            &#xe629;
          </i>
        </div>
      </div>

      <view class="flex-1 pl-main">
        <view class="line-clamp-2 text-32">
          {{ item.info.name }}
        </view>
        <view class="line-clamp-1 mt-20 text-tip">{{
          item.info.description
        }}</view>
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
import { browseList, setCollect, setCancelCollect } from "@/api/case";

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
  uni.navigateTo({ url: `/pages/caseDetail/index?id=${data.id}` });
};

const setCollects = async (item, index) => {
  //  收藏和取消收藏
  if (!item.info.userCollection) {
    const data = await setCollect({ id: item.info.id });
    if (data.status === 200) {
      list.value[index].info.userCollection = true;
      wx.showToast({
        title: "收藏成功",
        icon: "none",
        duration: 2000,
      });
    }
  } else {
    const data = await setCancelCollect({ id: item.info.id });
    if (data.status === 200) {
      list.value[index].info.userCollection = false;
      wx.showToast({
        title: "取消收藏",
        icon: "none",
        duration: 2000,
      });
    }
  }
};

const getList = async (params) => {
  const data = await browseList(params);
  list.value = (list.value || []).concat(data.list);
  params.page++;
  status.value = data.list.length < params.limit ? "nomore" : "loadmore";
};
</script>
<style lang="sass" scoped></style>
