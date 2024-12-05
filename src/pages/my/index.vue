<template>
  <Navbar title="梵米尼家具优选" leftIcon=" " />
  <!-- 背景毛玻璃 -->
  <view
    class="bg-frosted-glass fixed z-1b left-0 top-0 right-0 h-690 bg-no-repeat"
  >
    <view class="h-full backdrop-opacity-20 bg-f8f8f8-5"></view>
  </view>
  <!-- 顶部容器 -->
  <view class="px-main pt-main">
    <view
      class="flex flex-wrap justify-between items-center"
      :style="{
        paddingTop: '90px',
      }"
    >
      <view>
        <view class="text-48 font-700"
          >{{ detail.phoneNumber ? "您好，" : "" }}{{ detail.nickname }}</view
        >
        <view class="mt-20">{{ detail.phoneNumber }}</view>
        <view class="" @click="goLogin">梵米尼-创造您的生活</view>
      </view>
      <image
        class="h-150 w-150 rounded-full"
        :src="detail.avatar || '/static/user.png'"
        @click="showLoginPopup = true"
      ></image>
    </view>
    <view class="pt-80 flex flex-wrap">
      <view
        class="pr-50"
        v-for="item in dataFilter(routers, 0, 3)"
        @click="openMenu(item)"
      >
        <view class="text-40">{{ item.number }}</view>
        <view class="text-tip">{{ item.label }}</view>
      </view>
    </view>
    <view class="bg-fff rounded-32 overflow-hidden mt-50">
      <view
        class="bg-131313 px-main flex flex-wrap justify-between items-center"
      >
        <view class="py-30" @click="openPage('/pagesA/member/index')">
          <i class="iconfont text-main-vip text-40">&#xe6ca;</i>
          <view class="text-fff">加入我们</view>
        </view>
        <view
          class="py-12 px-30 text-5e3d05 rounded-full bg-vip-gradient relative"
          @click="goVip"
        >
          立即加入
          <view class="absolute z-100 right-50 top-4">
            <Handle />
          </view>
        </view>
      </view>
      <view class="flex flex-wrap justify-around py-main">
        <view
          class="flex flex-col items-center"
          v-for="item in dataFilter(routers, 3, 7)"
          @click="openMenu(item)"
        >
          <i class="iconfont text-64" v-html="item.icon" />
          <view>{{ item.label }}</view>
        </view>
      </view>
    </view>
    <view class="mt-main bg-fff rounded-32 overflow-hidden">
      <up-cell-group :border="false">
        <up-cell
          v-for="item in dataFilter(routers, 7, 11)"
          @click="openMenu(item)"
          icon="map"
          :title="item.label"
          :border="false"
          :isLink="true"
        >
          <template #icon>
            <i class="iconfont text-36 text-tip" v-html="item.icon" />
          </template>
        </up-cell>
      </up-cell-group>
    </view>
    <view class="mt-main">
      <view class="flex justify-between items-center">
        <view class="">友情链接</view>
        <view class="flex items-center">
          全部
          <i class="iconfont text-20 ml-10 text-tip">&#xe671;</i>
        </view>
      </view>

      <view class="bg-fff rounded-32 overflow-hidden mt-main">
        <up-scroll-list :indicator="false">
          <view
            class="flex flex-col items-center px-main py-20"
            :class="item.class"
            v-for="item in links"
            :key="item.id"
            @click="openLink(item)"
          >
            <i class="iconfont text-64" v-html="item.icon" />
            <view class="whitespace-nowrap mt-10">{{ item.label }}</view>
          </view>
        </up-scroll-list>
      </view>
    </view>
  </view>
  <Footer className="py-60" content="Copyright © 2023 图鸟科技" />
  <Login v-model:detail="detail" v-model:show="showLoginPopup" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/navbar/index.vue";
import Footer from "@/components/footer/index.vue";
import Login from "@/components/login/index.vue";
import {
  onShareAppMessage,
  onShareTimeline,
  onPageScroll,
} from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
import Handle from "@/components/handle/index.vue";

// 监听滚动
onPageScroll(() => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/my/index",
});

const detail = ref({ nickname: "去登录", avatar: "" });

const showLoginPopup = ref(false);
const routers = ref([
  {
    label: "案例",
    router: "/pagesA/caseHistory/index",
    number: 10,
  },
  {
    label: "好文",
    router: "/pagesA/articleHistory/index",
    number: 10,
  },
  {
    label: "严选",
    router: "/pagesA/carefullySelectedHistory/index",
    number: 10,
  },
  {
    label: "案例收藏",
    router: "/pagesA/caseCollection/index",
    icon: "&#xe681;",
  },
  {
    label: "好文收藏",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe628;",
  },
  {
    label: "0元设计",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe76c;",
  },
  {
    label: "分享",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe6d5;",
  },
  {
    label: "查看门店",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe622;",
  },
  {
    label: "关于我们",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe612;",
  },
  {
    label: "隐私协议",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe740;",
  },
  {
    label: "低价量房",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe817;",
  },
  {
    label: "设置",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe7eb;",
  },
]);
const links = [
  {
    label: "梵米尼商城",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe74b;",
    class: "",
  },
  {
    label: "公众号",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe614;",
    class: "text-main",
  },
  {
    label: "抖音号",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe601;",
    class: "",
  },
  {
    label: "视频号",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe69c;",
    class: "",
  },

  {
    label: "H5网站",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe607;",
    class: "",
  },
  {
    label: "在线客服",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe658;",
    class: "",
  },
];
const dataFilter = (list, startIndex, length) => {
  return list.slice(startIndex, length);
};
const goVip = () => {
  uni.navigateTo({ url: "/pages/register/index" });
};
const goLogin = () => {
  uni.navigateTo({ url: "/pages/login/index" });
};
const openPage = (page, type = "navigateTo") => {
  console.log(245);
  uni[type]({ url: page });
};
const openMenu = (item) => {
  console.log();
  uni.navigateTo({ url: item.router });
};
</script>

<style scoped lang="scss">
$top-container-height: 690rpx;
/* 背景毛玻璃 start */
.bg-frosted-glass {
  background-image: linear-gradient(180deg, #d6f4fa 0%, #f8f8f8 100%);
  background-size: 100% 590rpx;
}
.bg-vip-gradient {
  background-image: linear-gradient(270deg, #feeacc 0%, #ffe3a3 100%);
}
</style>
