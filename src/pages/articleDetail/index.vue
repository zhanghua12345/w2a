<template>
  <view class="w-full relative h-600">
    <image
      class="w-full h-full"
      :src="detail?.image_input?.length ? detail.image_input[0] : ''"
      mode="aspectFill"
      alt=""
    />
    <view
      class="absolute bottom-60 left-main right-main text-fff p-20 bg-000-4 rounded-main"
    >
      <view class="flex flex-wrap items-start text-36">
        <i class="iconfont leading-1.3 text-36">&#xe644;</i>
        <view class="flex-1 pl-10 leading-1.3">{{ detail.title }}</view>
      </view>
      <view class="pt-10 text-fff-8 text-24">{{ detail.synopsis }}</view>
      <view class="flex flex-wrap justify-between items-center w-full mt-20">
        <up-avatar-group
          :urls="[...detail.head, '']"
          size="35"
          gap="0.4"
          :extraValue="
            detail.realBrowse > 9999
              ? Math.floor(detail.realBrowse / 10000) + 'w'
              : detail.realBrowse > 999
              ? Math.floor(detail.realBrowse / 1000) + 'k'
              : detail.realBrowse
          "
        />
        <view class="text-24">{{ detail.realBrowse }}人看过</view>
      </view>
    </view>
  </view>
  <view
    class="bg-bg rounded-t-40 mt-[-40rpx] relative flex flex-col items-center overflow-hidden w-full"
  >
    <view
      class="w-full bg-gradient-to-b from-[#feeac5] to-bg pb-90 text-36 text-000 flex justify-center items-center px-90 text-center"
    >
    </view>
    <view
      class="rounded-t-40 htmlContianer overflow-hidden mt-[-80rpx] bg-bg p-main"
      v-html="detail.content"
    />
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

const app = getApp();
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));

const id = ref("");

useWxShare({
  path: `/pages/articleDetail/index?id=${id.value}`,
});

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
    detail.value.realPraise++;
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
  const data = await article_detail({ id: id.value });
  // uni.setNavigationBarTitle({
  //   title: data.title,
  // });
  data.content = data.content.replace(
    /\<img/g,
    '<img style="width:100%;height:auto" '
  );
  data.content = data.content.replace(
    /\<p>/g,
    '<p style="font-size:16px; line-height:1.8">'
  );
  console.log(data.content);
  detail.value = data;
};
</script>
<style lang="scss" scoped>
.htmlContianer img {
  max-width: 100%;
}
</style>
