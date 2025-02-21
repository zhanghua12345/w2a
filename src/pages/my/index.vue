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
      <view class="flex-1 pr-30">
        <view
          class="text-48 w-full flex flex-wrap items-center"
          @click="goLogin"
          >{{ userInfo.nickname || "您好，请登录" }}
          <span>
            <i
              class="iconfont text-48 leading-1 text-tip p-20"
              v-if="userInfo.nickname"
              @click="showLoginPopup = true"
              >&#xe638;</i
            >
          </span>
        </view>
        <view class="mt-10">{{ userInfo.phone }}</view>
        <view class="mt-10">梵米尼-创造您的生活</view>
      </view>
      <image
        class="h-150 w-150 rounded-full"
        :src="userInfo.avatar || '/static/user.png'"
      />
    </view>
    <view class="pt-80 flex flex-wrap">
      <view
        class="pr-50"
        v-for="(item, index) in dataFilter(routers, 0, 3)"
        :key="index"
        @click="openDetail(item)"
      >
        <view class="text-40">{{ item.number }}</view>
        <view class="text-tip">{{ item.label }}</view>
      </view>
    </view>
    <view class="bg-fff rounded-32 overflow-hidden mt-50 shadow-sm">
      <view
        class="px-main flex flex-wrap justify-end items-center relative h-156"
      >
        <image
          class="w-full absolute top-0 left-0 h-full"
          src="/static/my/vip.png"
          mode="aspectFill"
        />
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
        <template
          v-for="(item, index) in dataFilter(routers, 3, 7)"
          :key="index"
        >
          <button
            class="flex flex-col items-center share"
            open-type="share"
            v-if="item.type === 'share'"
          >
            <image class="h-50 w-50" :src="`/static/my/${item.icon}.png`" />
            <view class="pt-16">{{ item.label }}</view>
          </button>
          <view
            class="flex flex-col items-center"
            @click="openDetail(item)"
            v-else
          >
            <image class="h-50 w-50" :src="`/static/my/${item.icon}.png`" />
            <view class="pt-20">{{ item.label }}</view>
          </view>
        </template>
      </view>
    </view>
    <view class="mt-main bg-fff rounded-32 overflow-hidden shadow-sm">
      <up-cell-group :border="false">
        <up-cell
          v-for="(item, index) in dataFilter(routers, 7, 11)"
          :key="index"
          @click="openDetail(item)"
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
        <view class="" @click="openMap">友情链接</view>
        <view class="flex items-center">
          全部
          <i class="iconfont text-20 ml-10 text-tip">&#xe671;</i>
        </view>
      </view>

      <view class="bg-fff rounded-32 overflow-hidden mt-main shadow-sm">
        <up-scroll-list :indicator="false">
          <template v-for="item in links" :key="item.id">
            <official-account
              v-if="item.type === 'official'"
              appId="你的公众号的appId"
              path=""
              @click="onOfficialAccountTap"
            >
              <view
                class="flex flex-col items-center px-main pt-40 pb-20"
                :class="item.class"
              >
                <image class="h-70 w-70" :src="`/static/my/${item.type}.png`" />
                <view class="whitespace-nowrap pt-20">{{ item.label }}</view>
              </view>
              <!-- 组件内部的内容 -->
            </official-account>
            <button
              open-type="contact"
              class="share"
              v-else-if="item.type === 'contact'"
            >
              <view
                class="flex flex-col items-center px-main pt-40 pb-20"
                :class="item.class"
                @click="openLink(item)"
              >
                <image class="h-70 w-70" :src="`/static/my/${item.type}.png`" />
                <view class="whitespace-nowrap pt-20">{{ item.label }}</view>
              </view>
            </button>
            <view
              class="flex flex-col items-center px-main pt-40 pb-20"
              :class="item.class"
              @click="openLink(item)"
              v-else
            >
              <image class="h-70 w-70" :src="`/static/my/${item.type}.png`" />
              <view class="whitespace-nowrap pt-20">{{ item.label }}</view>
            </view>
          </template>
        </up-scroll-list>
      </view>
    </view>
  </view>
  <Footer className="py-60" content="Copyright © 2025 梵米尼" />
  <Login
    v-model:userInfo="userInfo"
    v-model:show="showLoginPopup"
    @close="closeLogin"
  />
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
  onShow,
} from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
import Handle from "@/components/handle/index.vue";
const chooseLocation = requirePlugin("chooseLocation");
import { getUserInfo } from "@/api/login";
// 监听滚动
onPageScroll(() => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/home/index",
});
const app = getApp();
const userInfo = ref({});
onMounted(async () => {
  //判断是否获取到动态设置的globalData
  // const userData = await getUserInfo();
  // app.globalData.userInfo = userData;
  // userInfo.value = userData;
});

const showLoginPopup = ref(false);
const routers = ref([
  {
    label: "案例",
    router: "pagesA/caseHistory/index",
    number: 10,
  },
  {
    label: "好文",
    router: "pagesA/articleHistory/index",
    number: 10,
  },
  {
    label: "优选设计",
    router: "pages/space/index",
    number: 5,
  },
  {
    label: "案例收藏",
    router: "pagesA/caseCollection/index",
    icon: "caseCollection",
  },
  {
    label: "好文收藏",
    router: "pagesA/articleCollection/index",
    icon: "articleCollection",
  },
  {
    label: "0元设计",
    router: "pagesForm/mianfeisheji/index",
    icon: "mianfeisheji",
  },
  {
    label: "分享",
    icon: "share",
    type: "share",
  },
  {
    label: "查看门店",
    icon: "&#xe622;",
    type: "openMap",
  },
  {
    label: "关于我们",
    router: "pages/agreement/index",
    type: "about",
    routerId: 6,
    icon: "&#xe612;",
  },
  {
    label: "隐私协议",
    router: "pages/agreement/index",
    type: "privacy",
    routerId: 3,
    icon: "&#xe740;",
  },
  {
    label: "了解装修",
    router: "pagesForm/zhuangxiu/index",
    icon: "&#xe817;",
  },
  // {
  //   label: "设置",
  //   router: "pagesA/articleCollection/index",
  //   icon: "&#xe7eb;",
  // },
]);
const links = [
  {
    label: "梵米尼商城",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe74b;",
    type: "mall",
    class: "",
  },
  {
    label: "公众号",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe614;",
    type: "official",
    class: "text-main",
  },
  {
    label: "抖音号",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe601;",
    type: "tikTok",
    class: "",
  },
  {
    label: "视频号",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe69c;",
    type: "video",
    class: "",
  },
  {
    label: "H5网站",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe607;",
    type: "H5",
    class: "",
  },
  {
    label: "在线客服",
    router: "/pagesA/articleCollection/index",
    icon: "&#xe658;",
    type: "contact",
    class: "",
  },
];

const dataFilter = (list, startIndex, length) => {
  return list.slice(startIndex, length);
};

onShow(async () => {
  const userData = await getUserInfo();
  app.globalData.userInfo = userData;
  userInfo.value = userData;
  // 获取用户地理位置
  const location = chooseLocation.getLocation();
  console.log(location);
});

const closeLogin = async () => {
  showLoginPopup.value = false;
  const userData = await getUserInfo();
  app.globalData.userInfo = userData;
  userInfo.value = userData;
};

const goVip = () => {
  // regType  -1  未申请  0 审核中  1审核通过  2审核拒绝
  console.log(userInfo.value);
  switch (userInfo.value.regType) {
    case -1:
      uni.navigateTo({ url: "/pages/register/index" });
      break;
    case 0:
      uni.navigateTo({ url: "/pages/register/success" });
      break;
    case 1:
      uni.navigateTo({ url: "/pagesA/member/index" });
      break;
    case 2:
      uni.navigateTo({ url: "/pages/register/fail" });
      break;
    default:
      break;
  }
};

const goLogin = () => {
  if (userInfo.value.phone) return false;
  uni.navigateTo({ url: "/pages/login/index" });
};

// 跳转事件
const openDetail = (item) => {
  console.log(item);
  if (item.type === "share") {
    wxShare();
  } else if (item.type === "openMap") {
    uni.openLocation({
      latitude: 28.113988,
      longitude: 113.033674,
    });
  } else {
    uni.navigateTo({
      url: item.routerId
        ? `/${item.router}?type=${item.type}&id=${item.routerId}`
        : `/${item.router}?type=${item.type}`,
    });
  }
};

// 微信分享
const wxShare = () => {
  uni.shareAppMessage({
    title: "梵米尼全屋定制", // 分享标题
    path: "/pages/home/index", // 分享路径，可以是当前页路径，也可以是其他页的路径
    image: "",
  });
};

const openMap = () => {
  const key = "3GLBZ-22HLF-Y2WJD-NPB7V-STWFO-RHFVS";
  const referer = "梵米尼家具优选";
  uni.navigateTo({
    url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location={"latitude":${28.113988},"longitude":${113.033674}}&name=梵米尼家居(湘府东路店)`,
  });
};

const onOfficialAccountTap = () => {
  console.log("用户点击了公众号链接");
  // 这里可以添加其他逻辑，例如统计点击次数等
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
<style lang="scss" scoped>
.share {
  border: none;
  //透明色
  background-color: transparent !important;
  box-shadow: none;

  /* 去除伪元素样式 */
  &::before,
  &::after {
    content: none;
    /* 去除伪元素 */
    display: none;
    /* 隐藏伪元素 */
  }
}
</style>
