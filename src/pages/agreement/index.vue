<template>
  <view class="p-main" v-html="detail.content"></view>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getAgreement } from "@/api/main";
const title = ref("");
let id = "";
const detail = ref({});
onLoad((options) => {
  // options是传递过来的参数对象
  id = options?.id;
  switch (options.id) {
    case "2":
      title.value = "代理商协议";
      break;
    case "4":
      title.value = "服务须知";
      break;
    case "3":
      title.value = "隐私政策";
      break;
    case "6":
      title.value = "关于我们";
      break;
    default:
      title.value = options.title;
      break;
  }
  uni.setNavigationBarTitle({
    title: title.value,
  });
  get_agreement();
});
const get_agreement = async () => {
  const data = await getAgreement({ id });
  data.content = data.content.replace(
    /\<img/g,
    '<img style="width:100%;height:auto" '
  );
  detail.value = data;
};
</script>
<style lang="scss" scoped></style>
