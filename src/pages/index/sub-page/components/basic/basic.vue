<script lang="ts" setup>
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnTitle from '@tuniao/tnui-vue3-uniapp/components/title/src/title.vue'
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'

const bannerList = [
  {
    image_url:
      'https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg',
    url: '/demo-pages/basic/color/index',
  },
  {
    image_url:
      'https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg',
    url: '/demo-pages/basic/color/index',
  },
  {
    image_url:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
    url: '/demo-pages/basic/color/index',
  },
]
const bannerSub = [
  {
    image_url:
      'https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg',
    url: '/demo-pages/basic/color/index',
    icon: 'reload-home',
    name: '家具风格',
  },
  {
    image_url:
      'https://q4.itc.cn/images01/20240817/8e56470b608145e0a79d2293f146a442.png',
    url: '/demo-pages/basic/color/index',
    icon: 'receipt',
    name: '10秒算报价',
  },
  {
    image_url: 'https://tgi1.jia.com/111/760/11760562.jpg',
    url: '/demo-pages/basic/color/index',
    icon: 'tips',
    name: '梵米尼攻略',
  },
  {
    image_url:
      'https://pic.rmb.bdstatic.com/bjh/240515/events/c6504bf50d27c072e7f2927f0f5d75849572.jpeg',
    url: '/demo-pages/basic/color/index',
    icon: 'carousel',
    name: '新品首发',
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
        autoplay
        indicator-position="right-bottom"
        height="600"
      >
        <template #default="{ data, active }">
          <view class="animation" :class="[{ active }]">
            <image
              class="w-full h-full"
              :src="data.image_url"
              mode="aspectFill"
            />
          </view>
        </template>
      </TnSwiper>

      <view
        class="absolute bottom-[30rpx] left-[30rpx] w-[690rpx] py-[10rpx] rounded-[10rpx] bg-000-4 tn-flex-center-around"
      >
        <view
          v-for="e in bannerSub"
          :key="e.image_url"
          class="relative w-[150rpx] h-[100rpx] overflow-hidden tn-shadow tn-gray-disabled_shadow rounded-[10rpx]"
        >
          <image class="w-full h-full bg-cover" :src="e.image_url" />
          <view
            class="absolute flex flex-col items-center justify-center w-full h-full top-0 left-0 text-fff bg-000-4"
          >
            <TnIcon :name="e.icon" size="40" />
            <view class="text-24">{{ e.name }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="家·空间"
        sub-title="潮流新品，一应俱全"
        size="lg"
        mode="subTitle"
        assist-color="rgba(0,0,0,.1)"
      />
      <TnScrollList :indicator="false">
        <view class="scroll-container">
          <view
            v-for="(e, i) in bannerSub"
            :key="i"
            class="scroll-item tn-flex-center tn-flex-column"
          >
            <image class="tn-grey-light_bg bg-cover" :src="e.image_url" />
            <view class="title text-fff">{{ e.name }}</view>
          </view>
        </view>
      </TnScrollList>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="家·生活方式"
        sub-title="打造属于您的专属梦想家"
        size="lg"
        mode="subTitle"
        assist-color="rgba(0,0,0,.1)"
      />
      <view
        class="flex flex-wrap justify-between px-[30rpx] h-[400rpx] text-fff"
      >
        <view
          class="w-[300rpx] h-full rounded-20 relative overflow-hidden tn-shadow tn-gray-disabled_shadow"
        >
          <image
            class="w-full h-full bg-cover"
            src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
            alt=""
          />
          <view
            class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
            >梵米尼介绍1
          </view>
        </view>
        <view class="flex-1 flex flex-col justify-between h-full items-end">
          <view
            class="w-[360rpx] h-[185rpx] relative rounded-20 overflow-hidden tn-shadow tn-gray-disabled_shadow"
          >
            <image
              class="w-full h-full bg-cover"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >梵米尼介绍2
            </view>
          </view>
          <view
            class="w-[360rpx] h-[185rpx] relative rounded-20 overflow-hidden tn-shadow tn-gray-disabled_shadow"
          >
            <image
              class="w-full h-full bg-cover"
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
        size="lg"
        mode="subTitle"
        assist-color="rgba(0,0,0,.1)"
      />
      <view class="px-[30rpx] text-fff">
        <view class="flex justify-between h-[200rpx]">
          <view
            class="w-[330rpx] h-full relative rounded-20 overflow-hidden tn-shadow tn-gray-disabled_shadow"
          >
            <image
              class="w-full h-full bg-cover"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >柜子
            </view>
          </view>
          <view
            class="w-[330rpx] h-full relative rounded-20 overflow-hidden tn-shadow tn-gray-disabled_shadow"
          >
            <image
              class="w-full h-full bg-cover"
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
          <view
            class="w-[210rpx] h-full relative rounded-20 overflow-hidden tn-shadow tn-gray-disabled_shadow"
          >
            <image
              class="w-full h-full bg-cover"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >床沙发
            </view>
          </view>
          <view
            class="w-[210rpx] h-full relative rounded-20 overflow-hidden tn-shadow tn-gray-disabled_shadow"
          >
            <image
              class="w-full h-full bg-cover"
              src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
              alt=""
            />
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center"
              >五金工艺
            </view>
          </view>
          <view
            class="w-[210rpx] h-full relative rounded-20 overflow-hidden tn-shadow tn-gray-disabled_shadow"
          >
            <view
              class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex justify-center items-center text-mains"
              >更多<TnIcon name="right" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="">
      <TnTitle
        class="title"
        title="推文装修"
        sub-title="打造属于您的专属梦想家"
        size="lg"
        mode="subTitle"
        assist-color="rgba(0,0,0,.1)"
      />
      <view
        class="mx-[30rpx] px-[20rpx] py-[10rpx] bg-000-1 rounded-20 flex flex-wrap justify-between"
      >
        <view
          v-for="item in 4"
          :key="item"
          class="my-[10rpx] w-[315rpx] h-[200rpx] rounded-20 relative overflow-hidden tn-shadow tn-gray-disabled_shadow"
        >
          <image
            class="w-full h-full bg-cover"
            src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
            alt=""
          />
          <view
            class="w-full h-full absolute left-0 top-0 z-1 bg-000-2 text-fff flex justify-center items-center font-32"
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
        size="lg"
        mode="subTitle"
        assist-color="rgba(0,0,0,.1)"
      />
      <view class="mx-[30rpx]">
        <view
          class="w-full h-[200rpx] rounded-20 relative overflow-hidden tn-shadow tn-gray-disabled_shadow"
        >
          <image
            class="w-full h-full bg-cover"
            src="https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg"
            alt=""
          />
          <view
            class="w-full h-full absolute left-0 top-0 z-1 bg-000-1 flex flex-col justify-center items-center text-fff"
          >
            <view>梵米尼</view>
            <view>共同见证。开创未来</view>
          </view>
        </view>
        <view class="w-full h-[450rpx] mt-[30rpx]">
          <video
            class="w-full h-full"
            src="https://static.guyantv.com/videom3u8/8a56ea34086faddab80e/8a56ea34086faddab80e.m3u8"
            controls
            poster="https://ww4.sinaimg.cn/mw690/630584a6gy1hlhz3xt2cpj20u0140aft.jpg"
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
</style>
