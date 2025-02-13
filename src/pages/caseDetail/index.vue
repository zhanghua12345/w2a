<template>
  <up-navbar-mini
    @leftClick="leftClick"
    :autoBack="true"
    homeUrl="/pages/home/index"
  >
  </up-navbar-mini>
  <Navbar />
  <view class="w-full h-700 relative">
    <up-swiper
      :list="detail?.banner || []"
      indicator
      indicatorMode="line"
      circular
      easingFunction="easeInOutCubic"
      height="700rpx"
      indicatorStyle="bottom: 50rpx"
      @change="(e) => (currentNum = e.current)"
      radius="0"
    >
      <template #indicator>
        <view class="flex justify-between w-690 h-50 text-24">
          <view class="w-80"></view>
          <view class="bg-000-5 w-240 rounded-full flex text-fff">
            <view class="w-1/2 flex justify-center items-center" @click="openVR"
              >720
              <i class="iconfont text-30 leading-1 ml-10">&#xe76e;</i></view
            >
            <view
              class="w-1/2 flex justify-center items-center bg-main rounded-full"
              >图片</view
            >
          </view>
          <view
            class="bg-000-5 w-76 rounded-full text-fff flex justify-center items-center"
            >{{ currentNum + 1 }}/{{ detail?.banner.length || 0 }}</view
          >
        </view>
      </template>
    </up-swiper>
    <view class="absolute bottom-0 left-0 right-0 h-30 rounded-t-full bg-bg" />
  </view>
  <view class="px-main">
    <view class="text-48 text-000 font-600">{{ detail.name || "--" }}</view>
    <text class="mt-main">{{ detail.description }}</text>
    <view class="flex flex-wrap items-center mt-main">
      <i class="iconfont text-tip text-24 mr-6">&#xe662;</i>浏览量{{
        Number(detail.browse || 0) + Number(detail.realBrowse || 0)
      }}
      <view class="px-20">
        <up-line length="10" direction="col"></up-line
      ></view>

      <i class="iconfont text-tip text-24 mr-6">&#xe66e;</i>
      点赞{{ Number(detail.praise || 0) + Number(detail.realPraise || 0) }}
    </view>
    <view
      class="mt-50 bg-000-04 p-main rounded-20 flex flex-wrap justify-start"
    >
      <view
        class="flex flex-wrap items-center w-1/2 h-50"
        v-for="(key, index) in Object.keys(detail.cate_list)"
        :key="index"
      >
        <!-- <i class="iconfont text-tip text-24 mr-6" v-html="detail.cate_list[key]" /> -->
        {{ key }}:
        <span class="pl-40">{{ detail.cate_list[key] }}</span>
      </view>
    </view>
  </view>
  <view class="mt-50 px-main relative" v-if="detail.attrsImagesNew?.length">
    <Title
      title="设计效果"
      subTitle="美好生活轻松实现"
      className="text-main"
      classLine="bg-main ml-20"
    />
    <up-line></up-line>
    <view
      v-for="item in showMore
        ? detail.attrsImagesNew
        : dataFilter(detail.attrsImagesNew, 1)"
      :key="item"
    >
      <template v-if="item.images?.length">
        <view class="text-36 font-600 w-full flex justify-center py-30">{{
          item.value
        }}</view>
        <view
          class="rounded-32 overflow-hidden mb-20 last:mb-0"
          v-for="e in item.images"
          :key="e"
        >
          <up-image width="100%" height=" " :src="e" mode="widthFix" />
        </view>
      </template>
    </view>
    <view
      class="absolute bottom-0 left-0 right-0 h-160 pt-30 bg-gradient-to-t from-fff from-10% via-fff-5 via-70% to-fff-0 flex flex-wrap justify-center items-center text-32 text-main"
      @click="showMoreClick"
      v-if="!showMore"
    >
      点击查看更多 <i class="iconfont text-24 ml-6">&#xfd90;</i>
    </view>
  </view>
  <view class="mt-main px-main" v-html="detail.content" v-if="detail.content">
  </view>

  <view class="py-40 px-main flex flex-col items-center">
    <view class="w-350">
      <up-divider
        text="猜你喜欢"
        textSize="32rpx"
        textColor="#cf5d38"
        lineColor="#aaa"
      />
    </view>
    <view class="grid grid-rows-2 grid-cols-2 gap-20">
      <Case v-for="item in 20" />
    </view>
  </view>
  <ScrollTop />
  <BottomFun :obj.sync="detail" @click="setBottom" />
</template>
<script setup>
import { product_new_detail, setPraise } from "@/api/case";
import Title from "@/components/title/index.vue";
import Navbar from "@/components/navbar/index.vue";
import Case from "@/components/case/index.vue";
import BottomFun from "@/components/bottomFun/index.vue";
import ScrollTop from "@/components/scrollTop/index.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { dataFilter } from "@/utils/utils";
import {
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
  onLoad,
} from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";

const app = getApp();
const id = ref("");

// 监听滚动
onPageScroll((e) => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: `/pages/caseDetail/index?id=${id.value}`,
});

const detail = ref({});
const showMore = ref(false);
const currentNum = ref(0);

onLoad((options) => {
  // options是传递过来的参数对象
  id.value = options.id;
  getDetail();
});

// 详情查看更多
const showMoreClick = () => {
  showMore.value = true;
  // if (!app.globalData.userInfo?.phone) {
  //   uni.navigateTo({ url: "/pages/login/index" });
  // } else {
  //   showMore.value = true;
  // }
};

const openVR = () => {
  uni.navigateTo({ url: `/pages/VR/index?url=${detail.value.VR_link}` });
  // if (!app.globalData.userInfo?.phone) {
  //   uni.navigateTo({ url: "/pages/login/index" });
  // } else {
  //   uni.navigateTo({ url: `/pages/VR/index?url=${detail.value.VR_link}` });
  // }
};

const setBottom = async (name) => {
  console.log(name);
  if (name === "praise") {
    const data = await setPraise({
      id: detail.value.id, //案例id
      type: 1, // 案例1 文章2
      funType: 1, // 点赞1 收藏2 (名词)
      fun: detail.value.isPraise ? 2 : 1, // 点赞1 取消2  (动词)
    });
    if (data.status === 200) {
      wx.showToast({
        title: detail.value.isPraise ? "取消成功" : "点赞成功",
        icon: "none",
        duration: 2000,
      });
      setTimeout(() => {
        getDetail();
      }, 2000);
    }
    console.log(data);
  } else if (name === "collect") {
    const data = await setPraise({
      id: detail.value.id,
      type: 1,
      funType: 2,
      fun: detail.value.isPraise ? 0 : 1,
    });
    if (data.status === 200) {
      wx.showToast({
        title: detail.value.isPraise ? "取消成功" : "收藏成功",
        icon: "none",
        duration: 2000,
      });
      setTimeout(() => {
        getDetail();
      }, 2000);
    }
  } else if (name === "button") {
    uni.navigateTo({ url: "/pagesForm/baojia/index" });
  } else {
  }
};

const getDetail = async () => {
  const data = await product_new_detail({ id: id.value });
  data.detail.attrsImagesNew = data.detail.attrsImages.filter(
    (e) => e.images?.length
  );
  detail.value = data.detail;
  console.log(detail.value);
};
</script>
