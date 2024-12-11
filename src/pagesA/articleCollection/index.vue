<template>
  <up-swipe-action>
    <up-swipe-action-item :options="options1">
      <view class="p-main">
        <view class="swipe-action__content">
          <text class="swipe-action__content__text">基础使用</text>
        </view>
      </view>
    </up-swipe-action-item>
  </up-swipe-action>
</template>
<script setup>
const show = ref(false);
// 使用 reactive 创建响应式对象
const options1 = reactive([
  {
    text: "删除",
  },
]);
</script>
<style lang="sass" scoped></style>
