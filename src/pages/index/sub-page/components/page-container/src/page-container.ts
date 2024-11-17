import { buildProps, definePropType } from '@tuniao/tnui-vue3-uniapp/utils'

import type { ExtractPropTypes } from 'vue'
import type PageContainer from './page-container.vue'

export interface PageContainerData {
  title: string
  tip: string
  type: string
  list: PageContainerDataItem[]
}

export interface PageContainerDataItem {
  image_url: string
  name?: string
  url: string
}

export const pageContainerProps = buildProps({
  /**
   * @description 页面列表数据
   */
  data: {
    type: definePropType<PageContainerData[]>(Array),
  },
})

export type PageContainerProps = ExtractPropTypes<typeof pageContainerProps>

export type TnDemoPageContainerInstance = InstanceType<typeof PageContainer>
