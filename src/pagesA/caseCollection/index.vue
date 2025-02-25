<template>
  <view
    class="fixed z-full bottom-40 right-40 w-90 h-90 bg-main rounded-full flex justify-center items-center text-fff"
    @click="editChange"
  >
    <i class="iconfont text-36">{{ !isEdit ? "&#xe6b7;" : "&#xe605;" }}</i>
  </view>
  <view class="grid grid-rows-2 grid-cols-2 gap-20 p-main">
    <view
      class="relative rounded-main overflow-hidden"
      v-for="(item, index) in list"
      :key="index"
    >
      <view
        v-show="isEdit"
        class="absolute left-0 top-0 h-full w-full bg-000-4 z-[1] flex items-center justify-center"
      >
        <i
          class="iconfont leading-1 text-fff text-48 p-50"
          @click="deleteItem(item, index)"
          >&#xe684;</i
        >
      </view>
      <Case
        :obj="item.info"
        :showTip="false"
        :noNew="true"
        :no720="true"
        @click="openDetail"
      />
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
import Case from "@/components/case/index.vue";

import { praiseList, setCancelCollect } from "@/api/case";

import { onMounted, ref } from "vue";

import { onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";

const list = ref([]);

let params = {
  page: 1,
  limit: 10,
};
const isEdit = ref(false);

const status = ref("loading");

// 页面加载时自动加载数据
onMounted(() => {
  getList(params);
});

const deleteItem = (item, index) => {
  uni.showModal({
    title: "提示",
    content: "是否取消收藏",
    success: async function (res) {
      if (res.confirm) {
        const data = await setCancelCollect({ id: item.info.id });
        if (data.status === 200) {
          list.value.splice(index, 1);
          wx.showToast({
            title: "取消收藏",
            icon: "none",
            duration: 2000,
          });
        }
      } else if (res.cancel) {
        console.log("用户点击取消");
      }
    },
  });
};

const editChange = () => {
  isEdit.value = !isEdit.value;
};

const openDetail = (data) => {
  uni.navigateTo({ url: `/pages/caseDetail/index?id=${data.id}` });
};
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
  const data = await praiseList(params);
  list.value = (list.value || []).concat(data.list);
  params.page++;
  status.value = data.list.length < params.limit ? "nomore" : "loadmore";
};
</script>
<style lang="sass" scoped></style>
