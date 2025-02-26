<template>
  <view
    class="fixed z-[20]"
    v-if="isBack"
    :style="{
      top: boundInfo.boundTop + 'px',
      left: boundInfo.boundRight + 'px',
    }"
  >
    <i
      class="iconfont leading-1 pl-10 text-fff"
      @click="goBack"
      :style="{
        fontSize: boundInfo.boundHeight + 'px',
      }"
      >&#xe6ad;</i
    >
  </view>
  <Navbar title="梵米尼家具优选" leftIcon=" " />
  <view class="w-full h-700 relative">
    <view
      class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
    >
      <view
        class="bg-000-6 rounded-full px-30 py-12 text-fff flex items-center z-[9]"
        @click="openVR"
      >
        <i class="iconfont leading-1 pr-8">&#xe71c;</i>全屋漫游
      </view>
    </view>
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
          <view class="w-76"></view>
          <view class="bg-000-5 w-240 rounded-full flex text-fff">
            <view class="w-1/2 flex justify-center items-center" @click="openVR"
              >720 <i class="iconfont text-30 leading-1 ml-6">&#xe76e;</i></view
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
    <view class="text-36 text-000">{{ detail.name || "--" }}</view>
    <view class="pt-20 text-tip text-24">
      <text>{{ detail.description }}</text>
    </view>

    <view class="flex flex-wrap items-center mt-main">
      <i class="iconfont font-600 text-tip text-24 mr-6">&#xe8bf;</i>浏览量{{
        detail.realBrowse || 0
      }}
      <view class="px-20">
        <up-line length="10" direction="col"></up-line
      ></view>

      <i class="iconfont font-600 text-tip text-24 mr-6">&#xe623;</i>
      点赞{{ detail.realPraise || 0 }}
    </view>
    <view
      class="mt-50 bg-000-04 p-main rounded-20 flex flex-wrap justify-start"
      v-if="detail.cate_list.length > 0"
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
        <view class="text-36 w-full flex justify-center py-30">{{
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
      点击查看更多 <i class="iconfont font-600 text-24 ml-6">&#xfd90;</i>
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
      <Case
        :obj="item"
        v-for="(item, index) in likes"
        :key="index"
        @click="openDetail"
      />
    </view>
  </view>
  <ScrollTop />
  <BottomFun :obj.sync="detail" @click="setBottom" />
</template>
<script setup>
import {
  product_new_detail,
  setPraise,
  setCollect,
  setCancelCollect,
  guessLikes,
} from "@/api/case";
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
import { useWxShare, getBoundInfo } from "@/hooks/index.js";

const app = getApp();
const id = ref("");
const isBack = ref(true);
// 监听滚动
onPageScroll((e) => {
  if (e.scrollTop > 60 && isBack.value) {
    isBack.value = false;
  } else if (e.scrollTop <= 60 && !isBack.value) {
    isBack.value = true;
  }
});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: `/pages/caseDetail/index?id=${id.value}`,
});

const detail = ref({});
const likes = ref([]);
const showMore = ref(false);
const currentNum = ref(0);
const boundInfo = ref({});

onLoad((options) => {
  // options是传递过来的参数对象
  id.value = options.id;
  getDetail();
  getGuessLikes();
  boundInfo.value = getBoundInfo();
});

// 详情查看更多
const showMoreClick = () => {
  if (!app.globalData.userInfo?.phone) {
    uni.navigateTo({ url: "/pages/login/index" });
  } else {
    showMore.value = true;
  }
};

const openVR = () => {
  if (!app.globalData.userInfo?.phone) {
    uni.navigateTo({ url: "/pages/login/index" });
  } else {
    uni.navigateTo({ url: `/pages/VR/index?url=${detail.value.VR_link}` });
  }
};

const openDetail = (data) => {
  uni.navigateTo({ url: `/pages/caseDetail/index?id=${data.id}` });
};

const goBack = () => {
  console.log(111);
  if (getCurrentPages().length > 1) {
    uni.navigateBack({
      delta: 1,
    });
  } else {
    uni.switchTab({
      url: "/pages/case/index",
    });
  }
};
const setBottom = async (name) => {
  if (name === "praise") {
    // 点赞
    const data = await setPraise({ id: detail.value.id });
    await getDetail();
    if (data.status === 200) {
      wx.showToast({
        title: "点赞成功",
        icon: "none",
        duration: 2000,
      });
    }
  } else if (name === "collect") {
    if (!app.globalData.userInfo?.phone) {
      uni.navigateTo({ url: "/pages/login/index" });
    } else {
      //  收藏和取消收藏
      if (!detail.value.userCollection) {
        const data = await setCollect({ id: detail.value.id });
        await getDetail();
        if (data.status === 200) {
          wx.showToast({
            title: "收藏成功",
            icon: "none",
            duration: 2000,
          });
        }
      } else {
        const data = await setCancelCollect({ id: detail.value.id });
        await getDetail();
        if (data.status === 200) {
          wx.showToast({
            title: "取消收藏",
            icon: "none",
            duration: 2000,
          });
        }
      }
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
  data.detail.content = data.detail.content.replace(
    /\<img/g,
    '<img style="width:100%;height:auto" '
  );
  detail.value = data.detail;
};

const getGuessLikes = async () => {
  const data = await guessLikes({ id: id.value });
  likes.value = data.list;
};
</script>
