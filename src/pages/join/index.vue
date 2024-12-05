<template>
  <view class="fixed z-[9999] left-0 w-full" v-show="scrollTop > 60">
    <up-navbar
      :style="{ 'z-index': 9999 }"
      title="梵米尼家具优选"
      leftIcon=""
    />
  </view>

  <view class="tabbar-contain relative pb-200">
    <image
      src="https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png"
      mode="scaleToFill"
      class="slice fixed left-0 top-0 w-full z-1b h-400"
    />

    <view class="px-main" :style="{ paddingTop: statusBarHeight + 'px' }">
      <i
        class="iconfont text-main text-40 flex justify-start items-center"
        :style="{ height: height || 0 + 'px' }"
        >&#xe633;</i
      >
      <view class="flex justify-center text-40 text-main font-600"
        >梵米尼家具优选</view
      >
    </view>
    <up-sticky :offset-top="height + statusBarHeight" bgColor="#fff">
      <up-tabs
        :current="current"
        :list="list1"
        lineWidth="24"
        lineHeight="4"
        lineColor="#cf5d38"
        :activeStyle="{
          color: '#cf5d38',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#9E9E9E',
          transform: 'scale(1)',
        }"
        @click="click"
        :scrollable="false"
      />
    </up-sticky>

    <view>
      <up-image
        width="750rpx"
        height=" "
        v-for="item in list1"
        :key="item"
        :id="item.id"
        :src="item.src"
        mode="widthFix"
      />
    </view>
    <view
      class="fixed left-0 bottom-0 pb-100 bg-fff w-full flex justify-center"
    >
      <view
        class="w-660 h-96 my-30 text-fff rounded-4 flex justify-center items-center text-30 bg-main"
        @click="goForm"
      >
        客服咨询 <i class="iconfont text-fff text-24">&#xe671;</i>
      </view>
    </view>
  </view>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useWxShare, getBoundInfo } from "@/hooks/index.js";
import {
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "pages/join/index",
});

const list1 = ref([
  {
    id: "a",
    name: "理念",
    src: "https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png",
  },
  {
    id: "b",
    name: "要求",
    src: "https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg",
  },
  {
    id: "c",
    name: "模式",
    src: "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
  },
  {
    id: "d",
    name: "资金",
    src: "https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg",
  },
  {
    id: "e",
    name: "流程",
    src: "https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png",
  },
  {
    id: "f",
    name: "问答",
    src: "https://tgi1.jia.com/111/760/11760562.jpg",
  },
]);
let loading = true;
const statusBarHeight = ref(0);
const height = ref(44);
const scrollTop = ref(0);
const current = ref(0);

onMounted(() => {
  height.value = getBoundInfo().navBarHeight; // 导航栏的高度
  statusBarHeight.value = getBoundInfo().statusBarHeight;
  setTimeout(() => {
    list1.value.forEach((e) => {
      uni
        .createSelectorQuery()
        .in(this)
        .select("#" + e.id)
        .boundingClientRect((res) => {
          e.scrollTop = res.top - height.value / 2 - 84;
        })
        .exec();
    });
    loading = false;
  }, 1000);
});
// 监听滚动
onPageScroll((e) => {
  scrollTop.value = e.scrollTop; // 更新滚动位置
  if (e.scrollTop + 6 >= list1.value[5].scrollTop) {
    current.value = 5;
  } else if (e.scrollTop + 6 >= list1.value[4].scrollTop) {
    current.value = 4;
  } else if (e.scrollTop + 6 >= list1.value[3].scrollTop) {
    current.value = 3;
  } else if (e.scrollTop + 6 >= list1.value[2].scrollTop) {
    current.value = 2;
  } else if (e.scrollTop + 6 >= list1.value[1].scrollTop) {
    current.value = 1;
  } else {
    current.value = 0;
  }
});
const click = (item) => {
  if (loading) return false;
  current.value = item.index;
  uni
    .createSelectorQuery()
    .in(this)
    .select("#" + item.id)
    .boundingClientRect((res) => {
      const top = res.top - height.value / 2 - 84;
      uni.pageScrollTo({
        duration: 200,
        scrollTop: scrollTop.value + top,
      });
    })
    .exec();
};
const goForm = () => {
  wx.openCustomerServiceChat({
    corpid: "你的客服消息corpid", // 必填，公众号的corpid，必须与当前登录的微信号是同一个公众号
    kfaccount: "客服微信号", // 必填，客服账号
  });
  // uni.navigateTo({
  //   url: "/pagesA/join/form",
  // });
};
</script>
