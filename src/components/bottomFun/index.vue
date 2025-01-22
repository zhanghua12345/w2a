<template>
  <view class="w-full h-110"></view>
  <view
    class="fixed bottom-0 left-0 right-0 h-110 flex flex-wrap justify-around items-center bg-bg border-0 border-t-2 border-solid px-main text-24"
  >
    <view
      class="flex flex-col justify-center items-center min-w-110"
      @click="click('praise')"
    >
      <i class="iconfont leading-1">&#xe662;</i>
      点赞{{ Number(obj.praise || 0) + Number(obj.realPraise || 0) }}
    </view>
    <view
      class="flex flex-col justify-center items-center min-w-110"
      @click="click('collect')"
    >
      <i class="iconfont leading-1">&#xe66e;</i>
      收藏15
    </view>
    <button
      class="flex flex-col justify-center items-center min-w-110 share"
      open-type="share"
    >
      <i class="iconfont leading-1">&#xe643;</i>
      分享
    </button>
    <view class="flex-1 pl-20">
      <up-button
        class="custom-style"
        text="一键报价"
        shape="circle"
        color="#cf5d38"
        size="normal"
        @click="click('button')"
      ></up-button>
    </view>
  </view>
</template>
<script setup>
const emit = defineEmits(["click"]);
defineProps(["obj", "className"]);

const click = (name) => {
  emit("click", name);
};
</script>
<style lang="scss" scoped>
.share {
  border: none;
  //透明色
  background-color: transparent !important;
  box-shadow: none;

  /* 去除伪元素样式 */
  &::before,
  &::after {
    content: none;
    /* 去除伪元素 */
    display: none;
    /* 隐藏伪元素 */
  }
}
</style>
