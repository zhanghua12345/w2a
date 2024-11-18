<script lang="ts" setup>
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import TnListItem from '@tuniao/tnui-vue3-uniapp/components/list/src/list-item.vue'
import CustomPage from '@/components/custom-page/src/custom-page.vue'
import DemoContainer from '@/components/demo-container/src/demo-container.vue'
import { useDemoH5Page, useWxShare } from '@/hooks'

import PrivacyBox from '@/components/privacy-box/index.vue'

// 微信分享
onShareAppMessage(() => ({}))
onShareTimeline(() => ({}))
useWxShare({
  path: '/demo-pages/component/list/index',
})
const { isDemoH5Page } = useDemoH5Page()
</script>

<template>
  <CustomPage
    title="列表"
    page-bg-color="tn-gray-light"
    :is-h5-demo-page="isDemoH5Page"
  >
    <DemoContainer title="基础使用">
      <view class="list-container">
        <view class="list-item">
          <TnListItem>关于图鸟</TnListItem>
        </view>
      </view>
    </DemoContainer>
  </CustomPage>
  <PrivacyBox />
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
