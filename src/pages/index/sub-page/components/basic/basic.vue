<script lang="ts" setup>
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'

const bannerList = [
  {
    image_url:
      'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
    url: '/demo-pages/basic/color/index',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
    url: '/demo-pages/basic/color/index',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
    url: '/demo-pages/basic/color/index',
  },
]
const bannerSub = [
  {
    image_url:
      'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
    url: '/demo-pages/basic/color/index',
    name: '奶1油风',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
    url: '/demo-pages/basic/color/index',
    name: '奶1油风',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
    url: '/demo-pages/basic/color/index',
    name: '奶1油风',
  },
  {
    image_url: 'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
    url: '/demo-pages/basic/color/index',
    name: '奶1油风',
  },
]
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>
// #endif

<template>
  <view class="page-container">
    <view class="swiper-wrapper tn-animation-fade-in">
      <TnSwiper
        :data="bannerList"
        indicator
        indicator-position="right-bottom"
        height="600"
      >
        <template #default="{ data, active }">
          <view class="animation" :class="[{ active }]">
            <image class="image" :src="data.image_url" mode="aspectFill" />
          </view>
        </template>
      </TnSwiper>
      <view class="swiper-list tn-flex-center-around">
        <view v-for="e in bannerSub" :key="e.image_url" class="list-wrapper">
          <image class="wrapper-image" :src="e.image_url" mode="aspectFill" />
          <view class="wrapper-name">{{ e.name }}</view>
        </view>
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="家·空间"
        sub-title="潮流新品，一应俱全"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <TnScrollList :indicator="false">
        <view class="scroll-container">
          <view
            v-for="(e, i) in bannerSub"
            :key="i"
            class="scroll-item tn-flex-center tn-flex-column"
          >
            <image
              class="tn-grey-light_bg"
              :src="e.image_url"
              mode="aspectFill"
            />
            <view class="title">{{ e.name }}</view>
          </view>
        </view>
      </TnScrollList>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="家·生活方式"
        sub-title="打造属于您的专属梦想家"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <view class="flex flex-wrap justify-between px-[30rpx] h-[400rpx]">
        <view class="w-[330rpx] h-full rounded-20 relative">
          <img
            class="w-full h-full"
            src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
            alt=""
          />
          <view
            class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
            >梵米尼介绍1
          </view>
        </view>
        <view class="right flex-1 flex flex-col justify-between h-full">
          <view class="w-[330rpx] h-[185rpx] relative rounded-20">
            <img
              class="w-full h-full"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >梵米尼介绍2
            </view>
          </view>
          <view class="w-[330rpx] h-[185rpx] relative rounded-20">
            <img
              class="w-full h-full"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >梵米尼介绍3
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="梵米尼严选"
        sub-title="潮流新品，一应俱全"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <view class="px-[30rpx]">
        <view class="flex justify-between h-[200rpx]">
          <view class="w-[330rpx] h-full relative rounded-20">
            <img
              class="w-full h-full"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >柜子
            </view>
          </view>
          <view class="w-[330rpx] h-full relative rounded-20">
            <img
              class="w-full h-full"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >门墙
            </view>
          </view>
        </view>
        <view class="mt-[30rpx] flex justify-between h-[160rpx]">
          <view class="w-[210rpx] h-full relative rounded-20">
            <img
              class="w-full h-full"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >床沙发
            </view>
          </view>
          <view class="w-[210rpx] h-full relative rounded-20">
            <img
              class="w-full h-full"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >五金工艺
            </view>
          </view>
          <view class="w-[210rpx] h-full relative rounded-20 bg-ccc">
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >更多<TnIcon name="right" />
            </view>
          </view>
        </view>
      </view>
    </view>
    margin: 0 32rpx; padding: 20rpx; background: rgba(0, 0, 0, 0.5);
    border-radius: 10rpx; display: flex; flex-wrap: wrap; justify-content:
    flex-start; align-items: center;
    <view class="">
      <TnTitle
        class="title"
        title="推文装修"
        sub-title="打造属于您的专属梦想家"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <view
        class="mx-30 px-20 py-10 bg-000-5 rounded-[20rpx] flex flex-wrap justify-between"
      >
        <view
          class="py-10 w-[315rpx] rounded-20 relative"
          v-for="item in 4"
          :key="item"
        >
          <img
            class="w-full h-full"
            src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
            alt=""
          />
          <view
            class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
            >全屋类
          </view>
        </view>
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="金牌服务"
        sub-title="售出非终止，服务才开始！"
        color="tn-type-primary"
        size="lg"
        mode="subTitle"
      />
      <view class="mx-[30rpx]">
        <view class="w-full h-[200rpx] rounded-20 relative">
          <img
            class="w-full h-full"
            src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
            alt=""
          />
          <view
            class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex flex-col justify-center items-center"
          >
            <view>梵米尼</view>
            <view>共同见证。开创未来</view>
          </view>
        </view>
        <view class="w-full h-[450rpx] mt-[30rpx]">
          <video
            class="w-full h-full"
            src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e2000204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef2020326e7802040400"
            controls
            poster="http://www.example.com/poster.jpg"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-container {
  padding-bottom: calc(100rpx + 80rpx + env(safe-area-inset-bottom));
}

.title {
  padding: 32rpx 32rpx 0;
  width: 100%;
  display: inline-block;
}

/* 入场动画 end */
.swiper-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;

  .animation {
    width: 100%;
    height: 100%;
    transition: transform 0.5s linear;
    transform: scale(0.8);
  }

  .active {
    transform: scale(1);
  }

  .swiper-list {
    position: absolute;
    bottom: 30rpx;
    left: 30rpx;
    width: 690rpx;
    padding: 30rpx 0;
    height: 100rpx;
    border: 10rpx;
    background: rgba(0, 0, 0, 0.4);

    .list-wrapper {
      width: 150rpx;
      height: 80rpx;
      background: rgba(0, 0, 0, 0.4);
      position: relative;

      .wrapper-image {
        width: 100%;
        height: 100%;
        position: absolute;
        border: 4rpx;
      }
    }
  }
}

.scroll-container {
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;

  .scroll-item {
    flex-grow: 1;
    flex-shrink: 0;
    position: relative;
    margin: 0rpx 20rpx;

    image {
      width: 300rpx;
      height: 200rpx;
      border-radius: 15rpx;
    }

    .title {
      position: absolute;
      right: 10rpx;
      bottom: 10rpx;
    }
  }
}

.bg-cover {
  background-position: center;
  /* 水平垂直居中 */
  background-size: cover;
  /* 保持图片的宽高比，并覆盖整个元素 */
  background-repeat: no-repeat;
  /* 防止背景图片重复 */
}

.box5 {
  margin: 0 32rpx;
  padding: 20rpx;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  .box {
    margin: 10rpx;
    width: 300rpx;
    height: 400rpx;
    background: #f30;
    border-radius: 10rpx;
    background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
  }
}

.box6 {
  padding: 0 32rpx;

  .box1 {
    width: 100%;
    height: 200rpx;
    background: #f30;
    border-radius: 10rpx;
    background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
  }

  .box2 {
    margin-top: 10rpx;
    width: 100%;
    height: 500rpx;
    background: #f30;
    border-radius: 10rpx;
    background-image: url('https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg');
  }
}
</style>
