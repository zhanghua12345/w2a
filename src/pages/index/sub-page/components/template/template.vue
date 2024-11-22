<template>
  <CustomPage title="文章" padding="0" :is-h5-demo-page="true">
    <view
      :style="{
        height: `calc(100vh - ${navBarInfo.height}px - 100rpx - env(safe-area-inset-bottom))`,
      }"
    >
      <!-- flist:第一级数组 slist：第二级数组 tlist：第三级数组 @itemClick：点击事件 注意：下一级pid与上一级id对应关联 -->
      <CategorizeView
        :flist="flist"
        :slist="slist"
        :tlist="tlist"
        @item-click="navToList"
      />
    </view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useUniAppSystemRectInfo } from '@tuniao/tnui-vue3-uniapp/hooks'
import CustomPage from '@/components/custom-page/src/custom-page.vue'
import CategorizeView from '@/components/categorizeView/components/cc-categorizeView/cc-categorizeView.vue'

const { navBarInfo } = useUniAppSystemRectInfo()
const flist = ref([
  {
    id: 1,
    name: '定制衣柜',
  },
  {
    id: 2,
    name: '厨房系统',
  },
  {
    id: 3,
    name: '卫浴系统',
  },
  {
    id: 4,
    name: '门墙系统',
  },
  {
    id: 5,
    name: '配套宅品',
  },
  {
    id: 6,
    name: '功能五金',
  },
])
const slist = ref([
  {
    id: 5,
    pid: 1,
    name: '定制衣柜',
  },
  {
    id: 6,
    pid: 1,
    name: '厨房系统',
  },
  {
    id: 17,
    pid: 2,
    name: '卫浴系统',
  },
  {
    id: 18,
    pid: 2,
    name: '门墙系统',
  },
])
const tlist = ref([
  {
    id: 8,
    pid: 5,
    name: '门墙系统',
    picture:
      'https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg',
  },
  {
    id: 9,
    pid: 5,
    name: '门墙系统',
    picture:
      'https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_1280.jpg',
  },
  {
    id: 10,
    pid: 5,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 11,
    pid: 5,
    name: '门墙系统',
    picture:
      'https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg',
  },
  {
    id: 12,
    pid: 5,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 14,
    pid: 6,
    name: '门墙系统',
    picture:
      'https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg',
  },
  {
    id: 15,
    pid: 6,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 16,
    pid: 6,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 19,
    pid: 17,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 20,
    pid: 17,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 21,
    pid: 18,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 22,
    pid: 18,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 23,
    pid: 18,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
  {
    id: 24,
    pid: 18,
    name: '门墙系统',
    picture:
      'https://q6.itc.cn/images01/20240801/8e8b611a60004c62b97895a9eaf31265.png',
  },
])
const navToList = (item: any) => {
  uni.showModal({
    title: '温馨提示',
    content: `点击条目携带信息 = ${JSON.stringify(item)}`,
  })
}
</script>
