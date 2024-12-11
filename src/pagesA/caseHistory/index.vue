<template>
  <view class="px-main text-24">
    <view
      class="flex flex-wrap items-center py-16 border-0 border-b-2 border-solid last:border-b-0"
      v-for="item in 4"
    >
      <image class="w-48 h-48" src="/static/images/articleHistory.png" alt="" />
      <image
        class="h-158 ml-main max-w-200 rounded-16"
        src="/static/vip.png"
        alt=""
        mode="heightFix"
      />

      <view class="flex-1 pl-main">
        <view class="line-clamp-2 font-600"
          >After A Breakup,the Ex-girlfriend Makes A Stunning Return</view
        >
        <view class="line-clamp-1 text-400 mt-20">EP.1/EP.1</view>
      </view>
    </view>
  </view>
</template>
<script setup></script>
<style lang="sass" scoped></style>
