<template>
  <view class="w-full h-110 padb"></view>
  <view
    class="fixed bottom-0 left-0 right-0 pt-20 flex flex-wrap justify-around items-center bg-bg border-0 border-t-2 border-solid px-main text-24 padb"
  >
    <view
      class="flex flex-col justify-center items-center min-w-110"
      @click="click('praise')"
    >
      <i class="iconfont font-600 leading-1 pb-6">&#xe65e;</i>
      点赞{{ obj.realPraise || 0 }}
    </view>
    <view
      class="flex flex-col justify-center items-center min-w-110"
      :class="obj.userCollection ? 'text-main' : 'text-tip'"
      @click="click('collect')"
    >
      <i class="iconfont font-600 leading-1 pb-6">&#xe629;</i>
      {{ obj.userCollection ? "  已收藏" : "收藏" }}
    </view>
    <button
      class="flex flex-col justify-center items-center min-w-110 share"
      open-type="share"
    >
      <i class="iconfont font-600 leading-1 pb-6">&#xe647;</i>
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
.padb {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}
</style>
