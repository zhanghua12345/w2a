<template>
  <up-swiper
    v-show="bannerList.length"
    :list="bannerList"
    keyName="recommend_img"
    indicator
    indicatorMode="dot"
    circular
    easingFunction="easeInOutCubic"
    height="420rpx"
    radius="0"
    @click="bannerClick"
  ></up-swiper>
  <up-sticky offset-top="0">
    <view class="py-20 bg-bg">
      <view
        class="mx-main rounded-main flex flex-row justify-between flex justify-between items-center"
      >
        <up-input
          placeholder="搜索"
          shape="circle"
          v-model="searchValue"
          prefixIcon="search"
          prefixIconStyle="font-size: 22px;color: #909399"
          @confirm="searchCase"
        >
          <template #suffix>
            <up-button
              text="搜索"
              type="error"
              size="mini"
              shape="circle"
              @click="searchCase"
            />
          </template>
        </up-input>
      </view>
      <view
        class="mx-main rounded-main flex flex-row justify-between shadow bg-000-04 mt-20"
      >
        <view
          v-for="(item, index) in classList"
          :key="index"
          class="flex justify-center items-center py-12 w-full px-4"
          @click="pickerClick(index)"
        >
          {{ item.cate_name }}
          <i
            class="iconfont text-tip text-20 ml-6 transition-transform duration-300"
            :class="{
              'rotate-180': index === pickerIndex && openPicker,
            }"
          >
            &#xfd90;
          </i>
        </view>
      </view>
    </view>
  </up-sticky>

  <view class="px-main w-full">
    <Box
      className="mb-main"
      v-for="item in list"
      :obj="item"
      :key="item"
      @click="openDetail(item)"
      @openVR="openVR(item)"
    />
  </view>
  <up-loadmore
    v-if="list.length > 8"
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
  <up-picker
    v-if="openPicker"
    :show="openPicker"
    :columns="[classList[pickerIndex]?.children || []]"
    @confirm="pickerConfirm"
    keyName="cate_name"
    closeOnClickOverlay
    :defaultIndex="classList[pickerIndex]?.cate_index || ''"
    @cancel="openPicker = false"
    @close="openPicker = false"
  >
  </up-picker>
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
import { caseList, caseClass, product_new_list } from "@/api/case";
import ScrollTop from "@/components/scrollTop/index.vue";
import Box from "@/components/box/index.vue";
import { useWxShare } from "@/hooks/index.js";

const app = getApp();
// 监听滚动
onPageScroll((e) => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/case/index",
});

const bannerList = ref([]); // 顶部banner
const searchValue = ref(""); // 搜索
const classList = ref([]); // 分类
const openPicker = ref(false);
const pickerIndex = ref(0);

const list = ref([]);
let params = {
  page: 1,
  limit: 10,
  cate_id: [],
};
const status = ref("loading");

// 页面加载时自动加载数据
onMounted(async () => {
  getBanner();
  getClass();
  getList(params);
});
const searchCase = () => {
  console.log(searchValue.value);
  list.value = [];
  params.page = 1;
  status.value = "loading";
  getList();
};
// 点击分类菜单
const pickerClick = (index) => {
  openPicker.value = true;
  pickerIndex.value = index;
};

// 点击分类菜单确认
const pickerConfirm = (value) => {
  openPicker.value = false;
  classList.value[pickerIndex.value] = {
    ...classList.value[pickerIndex.value],
    cate_name: value.value[0].cate_name,
    cate_id: value.value[0].id,
    cate_index: value.indexs,
  };
  list.value = [];
  params.page = 1;
  status.value = "loading";
  params.cate_id = classList.value
    .filter((e) => !!e.cate_id)
    .map((item) => item.cate_id);
  getList();
};

// 下拉刷新
onPullDownRefresh(async () => {
  params.cate_id = [];
  list.value = [];
  params.page = 1;
  status.value = "loading";
  getBanner();
  getClass();
  getList(params);
  uni.stopPullDownRefresh();
});

// 上拉加载
onReachBottom(() => {
  if (status.value === "nomore") return;
  status.value = "loading";
  getList(params);
});

// 点击轮播图
const bannerClick = (index) => {
  openDetail({ id: bannerList.value[index].id });
};
// 跳转到详情
const openDetail = (item) => {
  uni.navigateTo({ url: `/pages/caseDetail/index?id=${item.id}` });
};

// 跳转到VR
const openVR = (item) => {
  if (!app.globalData.userInfo?.phone) {
    uni.navigateTo({ url: "/pages/login/index" });
  } else {
    uni.navigateTo({ url: `/pages/VR/index?url=${item.VR_link}` });
  }
};

// 获取顶部banner
const getBanner = async () => {
  const data = await caseList({ type: 1 });
  bannerList.value = data.list;
};

// 获取分类
const getClass = async () => {
  const data = await caseClass();
  data.list.forEach((e) => {
    e?.children?.length
      ? e.children.unshift({ id: 0, cate_name: "全部" })
      : (e.children = [{ id: 0, cate_name: "全部" }]);
  });
  classList.value = data.list || [];
};

// 获取列表数据
const getList = async () => {
  params.cate_id = params.cate_id.toString();
  console.log(params);
  const data = await product_new_list({
    ...params,
    cate_id: params.cate_id || "",
    name: searchValue.value,
  });
  list.value = (list.value || []).concat(data.list);
  params.page++;
  status.value = data.list.length < params.limit ? "nomore" : "loadmore";
};
</script>

<style scoped></style>
