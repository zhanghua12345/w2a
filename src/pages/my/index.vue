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
      class="flex flex-wrap justify-between items-center px-10"
      :style="{
        paddingTop: '90px',
      }"
    >
      <view class="flex-1 pr-30">
        <view
          class="text-48 w-full flex flex-wrap items-center text-000"
          @click="goLogin"
          >{{
            userInfo.phone && userInfo.nickname
              ? userInfo.nickname
              : "您好，请登录"
          }}
          <span>
            <i
              class="iconfont text-48 leading-1 text-tip p-20"
              v-if="userInfo.nickname"
              >&#xe638;</i
            >
          </span>
        </view>
        <view class="text-tip">{{ userInfo.phone }}</view>
        <view class="text-tip">梵米尼-创造您的生活</view>
      </view>
      <image
        @click="goLogin"
        class="h-150 w-150 rounded-full"
        :src="userInfo.avatar || '/static/user.png'"
      />
    </view>
    <view class="pt-80 flex flex-wrap px-10">
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
          {{
            userInfo.regType === -1
              ? "立即加入"
              : userInfo.regType === 1
              ? "立即前往"
              : "查看审核结果"
          }}
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
            <view class="pt-20">{{ item.label }}</view>
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
            <i class="iconfont text-36" v-html="item.icon" />
          </template>
        </up-cell>
      </up-cell-group>
    </view>
    <view class="mt-main pb-main">
      <view class="flex justify-between items-center">
        <view class="" @click="openMap">友情链接</view>
        <!-- <view class="flex items-center">
          全部
          <i class="iconfont text-20 ml-10 text-tip">&#xe671;</i>
        </view> -->
      </view>

      <view class="bg-fff rounded-32 overflow-hidden mt-main shadow-sm">
        <up-scroll-list :indicator="false">
          <template v-for="item in links" :key="item.id">
            <button
              open-type="contact"
              class="share"
              v-if="item.type === 'contact'"
            >
              <view
                class="flex flex-col items-center px-main pt-40 pb-20"
                @click="openLink(item)"
              >
                <image class="h-70 w-70" :src="`/static/my/${item.type}.png`" />
                <view class="whitespace-nowrap pt-20">{{ item.label }}</view>
              </view>
            </button>
            <view
              class="flex flex-col items-center px-main pt-40 pb-20"
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
    <official-account></official-account>
  </view>

  <Footer className=" pt-main pb-60" content="Copyright © 2025 梵米尼" />
  <Login
    v-model:userInfo="userInfo"
    v-model:show="showLoginPopup"
    @close="closeLogin"
  />
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/navbar/index.vue";
import Footer from "@/components/footer/index.vue";
import Login from "@/components/login/index.vue";
import { onPageScroll, onShow } from "@dcloudio/uni-app";
import Handle from "@/components/handle/index.vue";
import { getUserInfo, articleUserLogNum, registerRes } from "@/api/login";
// 监听滚动
onPageScroll(() => {});

const app = getApp();
const userInfo = ref({});
const numData = ref({});

const showLoginPopup = ref(false);
const routers = ref([
  {
    label: "案例",
    router: "pagesA/caseHistory/index",
    number: "10",
  },
  {
    label: "好文",
    router: "pagesA/articleHistory/index",
    number: "10",
  },
  {
    label: "闭坑指南",
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
    routerId: 6,
    icon: "&#xe612;",
  },
  {
    label: "隐私协议",
    router: "pages/agreement/index",
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
    router: "/pages/about/index",
    icon: "&#xe74b;",
    type: "mall",
    img: "https://fanminitop.com/uploads/attach/2025/02/20250227/fa77f3da27f8abf2c9a30019703f21c0.jpg",
  },
  {
    label: "公众号",
    router: "/pages/about/index",
    icon: "&#xe614;",
    type: "official",
    img: "https://fanminitop.com/uploads/attach/2025/02/20250227/4e328cf0e726c001935d7ed472c31e33.png",
  },
  {
    label: "抖音号",
    router: "/pages/about/index",
    icon: "&#xe601;",
    type: "tikTok",
    img: "https://fanminitop.com/uploads/attach/2025/02/20250227/4e328cf0e726c001935d7ed472c31e33.png",
  },
  {
    label: "视频号",
    router: "/pages/about/index",
    icon: "&#xe69c;",
    type: "video",
    img: "https://fanminitop.com/uploads/attach/2025/02/20250227/4e328cf0e726c001935d7ed472c31e33.png",
  },
  {
    label: "H5网站",
    router: "/pages/about/index",
    icon: "&#xe607;",
    type: "H5",
    img: "https://fanminitop.com/uploads/attach/2025/02/20250227/4e328cf0e726c001935d7ed472c31e33.png",
  },
  {
    label: "在线客服",
    icon: "&#xe658;",
    type: "contact",
    img: "https://fanminitop.com/uploads/attach/2025/02/20250227/4e328cf0e726c001935d7ed472c31e33.png",
  },
];

const dataFilter = (list, startIndex, length) => {
  return list.slice(startIndex, length);
};

onShow(async () => {
  console.log("=====onShow=====");
  const userData = await getUserInfo();
  const data = await articleUserLogNum();
  app.globalData.userInfo = userData;
  userInfo.value = userData;
  numData.value = data.data;
  routers.value[0].number = data.data.caseBrowse;
  routers.value[1].number = data.data.articleBrowse;
});

const closeLogin = async () => {
  showLoginPopup.value = false;
  const userData = await getUserInfo();
  app.globalData.userInfo = userData;
  userInfo.value = userData;
};

const goVip = async () => {
  // regType  -1  未申请  0 审核中  1审核通过  2审核拒绝
  if (!app.globalData.userInfo.phone) {
    uni.navigateTo({ url: "/pages/login/index" });
    return false;
  }
  let status = userInfo.value.regType;
  if (status !== -1) {
    const data = await registerRes();
    status = data.data.status;
  }

  switch (status) {
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
  if (!app.globalData.userInfo.phone) {
    uni.navigateTo({ url: "/pages/login/index" });
    return false;
  }
  userInfo.value = app.globalData.userInfo;
  showLoginPopup.value = true;
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
        ? `/${item.router}?id=${item.routerId}`
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

const openLink = (item) => {
  uni.navigateTo({
    url: `${item.router}?type=${item.type}&img=${item.img}`,
  });
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
