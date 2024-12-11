<template>
  <Handle />
</template>
<script setup>
import { onMounted, ref } from "vue";
import Handle from "@/components/handle/index.vue";
import { getLocationInf } from "@/utils/getLocation.js";
onMounted(() => {
  getLocationInf()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
});
</script>
<style lang="scss" scoped></style>
