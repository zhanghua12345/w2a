<template>
  <view class="min-h-100vh bg-fff">
    <Article className="bg-transparent" v-for="item in 20" :key="item" />
  </view>
</template>
<script setup>
import Article from "@/components/article/index.vue";
</script>
<style lang="sass" scoped></style>
