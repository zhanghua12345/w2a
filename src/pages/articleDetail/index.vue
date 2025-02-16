<template>
  <view class="w-full relative h-600">
    <image
      class="w-full h-full"
      :src="detail?.image_input?.length ? detail.image_input[0] : ''"
      mode="aspectFill"
      alt=""
    />
    <view class="px-main absolute top-0 left-0 text-fff">
      <view class="flex flex-wrap items-start text-48 pt-100">
        <i class="iconfont leading-1 text-48">&#xe644;</i>
        <view class="flex-1 pl-main leading-1.3">{{ detail.title }}</view>
      </view>
      <view class="pb-20">{{ detail.dec }}</view>
    </view>
    <view class="px-main absolute bottom-60 left-0 text-fff">
      <view class="pb-20">{{ detail.realBrowse }} 人看过</view>
      <up-avatar-group :urls="urls" size="35" gap="0.4" extraValue=" " />
    </view>
  </view>
  <view
    class="bg-bg rounded-t-40 mt-[-40rpx] relative flex flex-col items-center overflow-hidden"
  >
    <view
      class="w-full bg-gradient-to-b from-[#feeac5] to-bg pb-100 text-36 text-000 flex justify-center items-center font-600 px-90 text-center"
    >
    </view>
    <view
      class="rounded-t-40 htmlContianer overflow-hidden mt-[-80rpx]"
      v-html="detail.content"
    ></view>
  </view>
  <BottomFun :obj.sync="detail" @click="setBottom" />
</template>
<script setup>
import { onShareAppMessage, onShareTimeline, onLoad } from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
import {
  article_detail,
  setPraise,
  setCollect,
  setCancelCollect,
} from "@/api/article";
import { ref } from "vue";
import BottomFun from "@/components/bottomFunArticle/index.vue";

// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));

const id = ref("");

useWxShare({
  path: `/pages/articleDetail/index?id=${id.value}`,
});

const urls = ref([
  "https://gips3.baidu.com/it/u=2619873661,315331996&fm=3028&app=3028&size=w931&q=75&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000",
  "https://gips3.baidu.com/it/u=2619873661,315331996&fm=3028&app=3028&size=w931&q=75&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000",
  "https://gips3.baidu.com/it/u=2619873661,315331996&fm=3028&app=3028&size=w931&q=75&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000",
  "https://gips3.baidu.com/it/u=2619873661,315331996&fm=3028&app=3028&size=w931&q=75&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000",
  "https://gips3.baidu.com/it/u=2619873661,315331996&fm=3028&app=3028&size=w931&q=75&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000",
  "https://gips3.baidu.com/it/u=2619873661,315331996&fm=3028&app=3028&size=w931&q=75&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000",
  "https://gips3.baidu.com/it/u=2619873661,315331996&fm=3028&app=3028&size=w931&q=75&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000",
]);
const detail = ref({});

onLoad((options) => {
  // options是传递过来的参数对象
  id.value = options.id;
  getDetail();
});

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
  } else if (name === "button") {
    uni.navigateTo({ url: "/pagesForm/baojia/index" });
  } else {
  }
};

const getDetail = async () => {
  const data = await article_detail({ id: id.value });
  uni.setNavigationBarTitle({
    title: data.title,
  });
  data.content = data.content.replace(
    /\<img/g,
    '<img style="max-width:100%;height:auto" '
  );
  detail.value = data;
};
</script>
<style lang="scss" scoped>
.htmlContianer img {
  max-width: 100%;
}
</style>
