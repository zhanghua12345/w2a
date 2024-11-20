<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import TnDropDown from 'tnuiv3p-tn-dropdown/index.vue'
import TnLoadmore from '@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.vue'
import Box from '@/components/box.vue'
import { useDemoH5Page, useWxShare } from '@/hooks'

const topSwiperData = [
  'https://resource.tuniaokj.com/images/vue3/banner/vue3-2-min.jpg',
]

// 下拉逻辑

type SelectOrderConditionDataItem = {
  title: string
  condition: string
  select: boolean
}

// 微信分享
onShareAppMessage(() => ({}))
onShareTimeline(() => ({}))
useWxShare({
  path: '/plugin-demo/tn-dropdown/index',
})
const { isDemoH5Page } = useDemoH5Page()

const openDropdown = ref<boolean>(false)
const dropdownItemIndex = ref<number>(-1)
const priceSort = ref<'up' | 'down'>('up')

const selectOrderConditionData = ref<SelectOrderConditionDataItem[]>([
  {
    title: '综合推荐',
    condition: '综合推荐',
    select: true,
  },
  {
    title: '评论',
    condition: '评论数从高到低',
    select: false,
  },
])
const orderConditionTitle = computed<string>(
  () => selectOrderConditionData.value.find((item) => item.select)?.title || ''
)

// 下拉框菜单选项点击事件
const dropdownMenuItemClickHandle = (index: number) => {
  dropdownItemIndex.value = index
  switch (index) {
    case 0:
      openDropdown.value = true
      break
    case 1:
      uni.showToast({
        icon: 'none',
        title: '按照销量排序',
      })
      break
    case 2:
      if (priceSort.value === 'up') {
        priceSort.value = 'down'
        uni.showToast({
          icon: 'none',
          title: '按照价格降序排序',
        })
      } else {
        priceSort.value = 'up'
        uni.showToast({
          icon: 'none',
          title: '按照价格升序排序',
        })
      }
      break
  }
}

// 排序条件选择事件
const sortConditionSelectHandle = (index: number) => {
  selectOrderConditionData.value.forEach((item, i) => {
    if (index === i) item.select = true
    else item.select = false
  })
  openDropdown.value = false
}
</script>

<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>

<template>
  <view class="main">
    <!-- 顶部轮播 -->
    <swiper class="banner">
      <swiper-item
        v-for="(e, index) in topSwiperData"
        :key="index"
        class="swiper-item"
      >
        <image class="tn-w-full" :src="e" mode="heightFix" />
      </swiper-item>
    </swiper>
    <!-- 下拉框 -->
    <div class="dropdown-container">
      <TnDropDown v-model:open="openDropdown">
        <template #menu>
          <view class="dropdown-menu">
            <view
              class="dropdown-menu-item"
              @tap.stop="dropdownMenuItemClickHandle(0)"
            >
              <view class="text">{{ orderConditionTitle }}</view>
              <view class="icon" :class="[{ active: openDropdown }]">
                <TnIcon name="down-triangle" />
              </view>
            </view>
            <view
              class="dropdown-menu-item"
              :class="[{ 'tn-red_text': dropdownItemIndex === 1 }]"
              @tap.stop="dropdownMenuItemClickHandle(1)"
            >
              销量
            </view>
            <view
              class="dropdown-menu-item"
              @tap.stop="dropdownMenuItemClickHandle(2)"
            >
              <view class="text">价格</view>
              <view class="double-icon">
                <view
                  class="top"
                  :class="[{ 'tn-red_text': priceSort === 'up' }]"
                >
                  <TnIcon name="up-triangle" />
                </view>
                <view
                  class="bottom"
                  :class="[{ 'tn-red_text': priceSort === 'down' }]"
                >
                  <TnIcon name="down-triangle" />
                </view>
              </view>
            </view>
          </view>
        </template>

        <view class="dropdown-content">
          <view class="recommend-list">
            <view
              v-for="(item, index) in selectOrderConditionData"
              :key="index"
              class="recommend-list-item"
              @tap.stop="sortConditionSelectHandle(index)"
            >
              <view v-if="item.select" class="item-select-icon tn-red_text">
                <TnIcon name="check" />
              </view>
              <view class="item-text">{{ item.condition }}</view>
            </view>
          </view>
        </view>
      </TnDropDown>
    </div>
    <div class="content-container">
      <Box v-for="item in 30" :key="item" />
    </div>
    <TnLoadmore status="nomore" color="tn-gray-disabled" />
    <TnLoadmore status="loading" color="tn-gray-disabled" />
  </view>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  .banner {
    width: 100%;
    height: 400rpx;
  }
  .dropdown-container {
    position: relative;
    width: 100%;

    .dropdown-menu {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: var(--tn-color-white);

      .dropdown-menu-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10rpx 0rpx;

        .icon {
          margin-left: 6rpx;
          transform-origin: center center;
          transform: rotate(0deg);
          transition: transform 0.25s linear;
          line-height: 1;

          &.active {
            transform: rotate(-180deg);
          }
        }

        .double-icon {
          margin-left: 6rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .top {
            transform: translateY(14rpx);
          }
          .bottom {
            transform: translateY(-12rpx);
          }
        }
      }
    }

    .dropdown-content {
      position: relative;
      width: 100%;
      padding: 0rpx 30rpx;

      .recommend-list {
        position: relative;
        width: 100%;

        .recommend-list-item {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 20rpx 0rpx;

          .item-select-icon {
            margin-right: 20rpx;
          }
        }
      }
    }
  }

  .content-container {
    position: relative;
    width: 100%;
    padding: 32rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
