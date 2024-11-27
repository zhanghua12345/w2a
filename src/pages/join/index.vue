<template>
  <view class="fixed z-[9999] left-0 w-full" v-show="scrollTop > 60">
    <up-navbar
      :style="{ 'z-index': 9999 }"
      title="厘舍SPA品牌合作指南"
      leftIcon=""
    />
  </view>
  <view class="tabbar-contain">
    <image
      src="https://nfassetoss.southcn.com/__asset/c8ecec36a0/f8b2fabad4.webp"
      mode="scaleToFill"
      class="slice"
    />
    <view class="px-main" :style="{ paddingTop: tops + 'px' }">
      <i
        class="iconfont text-vip-main text-40 flex justify-end items-center"
        :style="{ height: height || 0 + 'px' }"
        >&#xe632;</i
      >
      <view class="flex justify-center text-40 text-main-vip"
        >厘舍SPA品牌合作指南1</view
      >
    </view>
    <up-sticky :offset-top="height + tops" bgColor="#fff">
      <up-tabs
        :current="current"
        :list="list1"
        lineWidth="28"
        lineHeight="4"
        lineColor="#805844"
        :activeStyle="{
          color: '#805844',
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

    <view class="images">
      <image
        v-for="item in list1"
        :key="item"
        :id="item.id"
        :src="item.src"
        mode="widthFix"
      />
    </view>
    <view class="bottoms">
      <view class="btn2" @click="goForm">
        申请合作 <i class="iconfont text-fff text-40">&#xeaf6;</i>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      tops: 0,
      height: 44,
      scrollTop: 0, // 记录滚动位置
      current: 0,
      list1: [
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
      ],
    };
  },
  onLoad() {
    // const res = uni.getSystemInfoSync();
    // console.log(res);
    // this.height = res.statusBarHeight * 2;
    uni.getSystemInfo({
      success: (e) => {
        this.tops = e.statusBarHeight;

        let custom = uni.getMenuButtonBoundingClientRect();

        this.height = custom.height + (custom.top - e.statusBarHeight) * 2;
      },
    });
  },
  onReady() {
    setTimeout(() => {
      this.list1.forEach((e) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select("#" + e.id)
          .boundingClientRect((res) => {
            e.scrollTop = res.top - this.height / 2 - 84;
          })
          .exec();
      });
      this.loading = false;
    }, 1000);
  },
  onShareAppMessage(e) {
    return {
      title: "厘舍SPA品牌合作指南",
      path: "pages/join/index",
    };
  },
  onPageScroll(e) {
    // 页面滚动时会触发
    this.scrollTop = e.scrollTop; // 更新滚动位置
    if (e.scrollTop + 6 >= this.list1[5].scrollTop) {
      this.current = 5;
    } else if (e.scrollTop + 6 >= this.list1[4].scrollTop) {
      this.current = 4;
    } else if (e.scrollTop + 6 >= this.list1[3].scrollTop) {
      this.current = 3;
    } else if (e.scrollTop + 6 >= this.list1[2].scrollTop) {
      this.current = 2;
    } else if (e.scrollTop + 6 >= this.list1[1].scrollTop) {
      this.current = 1;
    } else {
      this.current = 0;
    }
  },
  methods: {
    click(item) {
      if (this.loading) return false;
      this.current = item.index;
      uni
        .createSelectorQuery()
        .in(this)
        .select("#" + item.id)
        .boundingClientRect((res) => {
          this.top = res.top - this.height / 2 - 84;
          uni.pageScrollTo({
            duration: 0,
            scrollTop: this.scrollTop + this.top,
          });
        })
        .exec();
    },
    goForm() {
      uni.navigateTo({
        url: "/pagesA/join/form",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar-contain {
  color: #1c0808;
  position: relative;
  line-height: 1.5;
  font-size: 24rpx;
  letter-spacing: 2rpx;
  padding-bottom: 320rpx;
  .custom {
    width: 100%;
    height: 80rpx;
    view {
      margin: 0 auto;
    }
  }
  .slice {
    position: fixed;
    left: 0;
    top: 0;
    width: 750rpx;
    z-index: -1;
  }
  .title {
    width: 100%;
    text-align: center;
    font-size: 36rpx;
    color: #805844;
    padding-bottom: 50rpx;
  }
  .images {
    width: 100%;
    image {
      width: 100%;
    }
  }
}
::v-deep .u-tabs__wrapper__nav__line {
  width: 28px !important;
}
.bottoms {
  position: fixed;
  left: 0;
  bottom: 0;
  padding-bottom: 100rpx;
  background: #fff;
  height: 156rpx;
  width: 100%;
  .btn2 {
    width: 660rpx;
    height: 96rpx;
    background: #805844;
    margin: 30rpx auto;
    color: #fff;
    border-radius: 4rpx;
    line-height: 96rpx;
    font-size: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
