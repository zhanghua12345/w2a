<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import TnDropDown from 'tnuiv3p-tn-dropdown/index.vue'
import TnGraphicCard from 'tnuiv3p-tn-graphic-card/index.vue'
import TnSticky from '@tuniao/tnui-vue3-uniapp/components/sticky/src/sticky.vue'
import { useUniAppSystemRectInfo } from '@tuniao/tnui-vue3-uniapp/hooks'
import CustomPage from '@/components/custom-page/src/custom-page.vue'
import { useDemoH5Page, useWxShare } from '@/hooks'

const { navBarInfo } = useUniAppSystemRectInfo()
// 微信分享
onShareAppMessage(() => ({}))
onShareTimeline(() => ({}))
useWxShare({
  path: '/demo-pages/component/graphic-card/index',
})
const { isDemoH5Page } = useDemoH5Page()

const graphicCardData = {
  id: 1,
  avatar: 'https://resource.tuniaokj.com/images/logo/tuniao.jpg',
  title: '张三李四',
  description: '2024年11月5日',
  tags: ['装修踩雷', '毛坯整装', '全包'],
  content: '整装是一种全新的室内装修模式，更加方便、省事、有保障。',
  images: ['https://resource.tuniaokj.com/images/album/xiong1.jpg'],
  hotCount: 999,
  viewCount: 245,
  commentCount: 99,
  likeCount: 888,
  viewUserAvatars: [
    'https://resource.tuniaokj.com/images/avatar/default/1.png',
    'https://resource.tuniaokj.com/images/avatar/default/2.png',
    'https://resource.tuniaokj.com/images/avatar/default/3.png',
    'https://resource.tuniaokj.com/images/avatar/xiong.jpg',
    'https://resource.tuniaokj.com/images/avatar/default/4.png',
    'https://resource.tuniaokj.com/images/avatar/default/5.png',
    'https://resource.tuniaokj.com/images/avatar/default/6.png',
    'https://resource.tuniaokj.com/images/avatar/default/7.png',
    'https://resource.tuniaokj.com/images/avatar/default/8.png',
  ],
}

// 下拉逻辑 开始
type SelectOrderConditionDataItem = {
  title: string
  condition: string
  select: boolean
}
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

<template>
  <CustomPage title="文章" padding="0" :is-h5-demo-page="true">
    <!-- 下拉框 -->
    <TnSticky :offset-top="navBarInfo.height">
      <div class="dropdown-container relative w-full">
        <TnDropDown v-model:open="openDropdown">
          <template #menu>
            <view
              class="relative w-full flex items-center justify-around bg-fff"
            >
              <view
                class="flex-1 flex items-center justify-center py-[10rpx]"
                @tap.stop="dropdownMenuItemClickHandle(0)"
              >
                <view class="text">{{ orderConditionTitle }}</view>
                <view
                  class="origin-center ml-[6prx] rotate-0 transition-transform leading-1"
                  :class="[{ active: 'rotate-180' }]"
                >
                  <TnIcon name="down-triangle" />
                </view>
              </view>
              <view
                class="flex-1 flex items-center justify-center px-[10rpx]"
                :class="[{ 'tn-red_text': dropdownItemIndex === 1 }]"
                @tap.stop="dropdownMenuItemClickHandle(1)"
              >
                销量
              </view>
              <view
                class="flex-1 flex items-center justify-center px-[10rpx]"
                @tap.stop="dropdownMenuItemClickHandle(2)"
              >
                <view class="text">价格</view>
                <view
                  class="ml-[6rpx] flex flex-col items-center justify-center"
                >
                  <view
                    class="translate-y-[14rpx]"
                    :class="[{ 'tn-red_text': priceSort === 'up' }]"
                  >
                    <TnIcon name="up-triangle" />
                  </view>
                  <view
                    class="translate-y-[-12rpx]"
                    :class="[{ 'tn-red_text': priceSort === 'down' }]"
                  >
                    <TnIcon name="down-triangle" />
                  </view>
                </view>
              </view>
            </view>
          </template>

          <view class="relative w-full px-[30rpx]">
            <view class="relative w-full">
              <view
                v-for="(item, index) in selectOrderConditionData"
                :key="index"
                class="relative w-full flex items-center px-[20rpx]"
                @tap.stop="sortConditionSelectHandle(index)"
              >
                <view v-if="item.select" class="mr-[20rpx] tn-red_text">
                  <TnIcon name="check" />
                </view>
                <view class="item-text">{{ item.condition }}</view>
              </view>
            </view>
          </view>
        </TnDropDown>
      </div>
    </TnSticky>

    <view class="tn-mt" />
    <view class="graphic-card-container tn-gray-light_bg">
      <view v-for="item in 10" :key="item" class="graphic-card-item">
        <TnGraphicCard
          :avatar="graphicCardData.avatar"
          :title="graphicCardData.title"
          :description="graphicCardData.description"
          :tags="graphicCardData.tags"
          :content="graphicCardData.content"
          :hot-count="graphicCardData.hotCount"
          :comment-count="graphicCardData.commentCount"
          :like-count="graphicCardData.likeCount"
          :view-count="graphicCardData.viewCount"
          :view-user-avatars="graphicCardData.viewUserAvatars"
        />
      </view>
    </view>
  </CustomPage>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
