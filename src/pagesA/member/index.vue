<template>
  <Navbar leftIcon=" " title="会员" />
  <view class="tabbar-container">
    <image src="/static/member-bg.png" mode="scaleToFill" class="slice" />
    <view class="containerc pt-80">
      <view
        :style="'padding-top:' + height + 'rpx'"
        class="custom flex-y-center"
      >
        <view class="font30 fontBold colorNormal text-center font-600 text-30"
          >会员</view
        >
      </view>
      <view class="container-box px-main pt-main">
        <view class="card">
          <image class="card-bg" src="/static/vip.png" />
          <view class="info">
            <view class="info-name">
              <view class="text-48 font-600">尊敬的梵米尼会员</view>
              <view class="">No.645645456456</view>
            </view>
            <!-- <view class="h-44">会员激活后生效</view> -->
            <view class="mt-16">累计已获得</view>
            <view class="info-box">
              <view class="font-600">
                <span class="text-64 leading-1"> 1267 </span>积分
              </view>
              <view class="change">修改资料</view>
            </view>
          </view>
        </view>
        <view
          class="card-2 flex-around"
          style="margin-top: 24upx; align-items: flex-start"
        >
          <view
            class="box flex flex-col items-center"
            v-for="(item, index) in list"
            :key="index"
          >
            <img style="width: 80upx; height: 80upx" :src="item.icon" alt="" />
            <view
              style="padding-top: 10upx; font-size: 26upx; color: #673f2b"
              >{{ item.name }}</view
            >
            <view style="color: #bfbfbf; font-size: 18upx; margin-top: 2upx">{{
              item.text
            }}</view>
          </view>
          <image class="card-huiyuan" src="/static/login-w.jpg" />
        </view>
        <view class="mt-main">
          <view class="grid grid-rows-2 grid-cols-9 gap-20 h-330">
            <view
              class="rounded-main text-fff relative"
              v-for="(item, index) in actives"
              :key="index"
              :class="
                index === 0
                  ? ['row-span-2', 'col-span-4', 'bg-fdf2e0']
                  : index === 1
                  ? ['col-span-5', 'bg-f5f4d6']
                  : ['row-span-1', 'col-span-5', 'bg-f9ebea']
              "
            >
              <view class="p-main absolute z-10 flex flex-col justify-between">
                <view class="text-[#866350] text-36 font-600">{{
                  item.name
                }}</view>
                <view class="text-tip text-24 pt-10 flex items-center">
                  {{ item.subName }}
                  <i class="iconfont text-20">&#xe671;</i>
                </view>
              </view>
              <view
                class="border-[#e1a490] text-[#e1a490] px-20 py-10 border-2 border-solid rounded-8 absolute bottom-80 left-main"
                v-if="index === 0"
              >
                立即邀请
              </view>

              <image
                class="w-100 h-100 bg-cover absolute right-0 bottom-30"
                :src="item.image_url"
                alt=""
              />
            </view>
          </view>
        </view>
        <view class="card-2 text-tip text-26" style="padding: 30upx 26upx">
          <view class="tip">温馨提示：</view>
          <view class="mt-12"
            >1、注册成为会员并且成功分享一个会员可得店内大礼包一个；</view
          >
          <view>2、推荐客户即可获得积分，积分可兑换大额奖品；</view>
          <view>3、成交一户，达到指定条件解锁相应奖励，最高奖金2000元。</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import Title from "@/components/title/index.vue";
import Navbar from "@/components/navbar/index.vue";
import ScrollTop from "@/components/scrollTop/index.vue";
import { onMounted, onUnmounted, ref } from "vue";
import {
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
// 监听滚动
onPageScroll((e) => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/home/index",
});
const list = ref([
  {
    icon: "/static/images/member-icon2.png",
    name: "分享有奖",
    text: "为我代言，获赠大礼包。",
  },
  {
    icon: "/static/images/member-icon3.png",
    name: "积分任务",
    text: "赚取积分，开启薅羊毛模式",
  },
  {
    icon: "/static/images/member-icon1.png",
    name: "成交赠现",
    text: "专项权益，享你所想",
  },
  {
    icon: "/static/images/member-icon4.png",
    name: "更多权益",
    text: "解锁中...",
  },
]);
//活动
const actives = ref([
  {
    image_url: "/static/active_1.png",
    router: "/pages/join/index",
    name: "分享有礼",
    subName: "查看我推荐的用户",
  },
  {
    image_url: "/static/active_1.png",
    router: "/demo-pages/basic/color/index",
    name: "成交返现",
    subName: "为梵米尼代言",
  },
  {
    image_url: "/static/active_1.png",
    router: "/demo-pages/basic/color/index",
    name: "积分兑换",
    subName: "共有1280积分",
  },
]);
</script>

<style lang="scss" scoped>
.tabbar-container {
  color: #1c0808;
  position: relative;
  .clickActiveBg2 {
    background: #805844 !important;
    opacity: 0.6;
  }
  .containerc {
    line-height: 1.5;
    font-size: 24upx;
    letter-spacing: 2upx;
  }
  .slice {
    position: fixed;
    left: 0;
    top: 0;
    width: 750upx;
    z-index: -1;
  }
  // background: linear-gradient(to bottom, red, blue);
  .custom {
    width: 100%;
    height: 80upx;
    view {
      margin: 0 auto;
    }
  }
}
.container-box {
  margin-top: 48upx;
  .card {
    position: relative;
    width: 100%;
    height: 316upx;
    .card-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      left: 0;
    }
    .info {
      color: #673f2c;
      font-size: 24upx;
      padding: 40upx 60upx;
      .info-name {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-end;
      }
      .info-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-end;
        padding-top: 10upx;
        .change {
          opacity: 0.8;
          width: 140upx;
          height: 44upx;
          border: 2upx solid #ffeee6;
          text-align: center;
          line-height: 44upx;
          font-size: 24upx;
          color: #ffeee6;
          border-radius: 100upx;
        }
      }
    }
  }
  .card-2 {
    min-height: 80upx;
    border-radius: 32upx;
    background: #fff;
    margin-top: 30upx;
    .card-huiyuan {
      margin: 20upx auto 30upx;
      height: 230upx;
      width: 600upx;
    }
    .box {
      padding: 40upx 0 0;
      text-align: center;
      width: 160upx;
    }
    .tip {
      font-size: 26upx;
    }
  }
  .flex-around {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
}
.btn {
  width: 660upx;
  height: 96upx;
  background: #805844;
  margin: 36upx auto 0;
  color: #fff;
  border-radius: 48upx;
  line-height: 96upx;
  font-size: 50upx;
  display: flex;
  justify-content: center;
  align-items: center;
  .bth-d {
    font-size: 40upx;
  }
  .bl {
    height: 42upx;
    width: 2upx;
    background: #fff;
    margin: 0 16upx;
    opacity: 0.6;
  }
}
</style>
