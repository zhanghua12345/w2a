<template>
  <up-popup
    :show="show"
    mode="bottom"
    @close="$emit('update:show', false)"
    round="20"
    bgColor="#fff"
    closeable
    closeOnClickOverlay
  >
    <view
      class="popup-box tracking-[4rpx] px-44 py-main flex flex-col items-center"
    >
      <image class="w-250" mode="widthFix" src="/static/login-w.png" />
      <button
        class="mt-40 overflow-hidden rounded-full w-168 h-168 px-0"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <image
          class="w-full h-full"
          :src="newDetail.avatar || '/static/user.png'"
          mode="aspectFill"
        />
      </button>
      <input
        type="nickname"
        class="mt-60 px-18 h-84 rounded-full leading-[84rpx] border-4 border-solid border-line text-32 w-full"
        placeholder="请输入昵称"
        @change="inputChange"
        v-model="newDetail.nickname"
      />
      <up-button
        shape="circle"
        text="确认"
        color="#805844"
        class="mt-60"
        @click="submit"
      />
    </view>
  </up-popup>
</template>

<script>
// import { userEdit } from "@/api/custormer.js";
// import { urls } from "@/api/api.js";
export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:show", "update:detail"],
  data() {
    return {
      newDetail: {},
      payType: 1,
      loading: false,
    };
  },
  onLoad() {
    const res = uni.getSystemInfoSync();
    this.height = res.statusBarHeight * 2;
    uni.getStorageSync("token") ? this.loadData() : "";
  },
  watch: {
    detail(val) {
      this.newDetail = { ...val };
    },
  },
  methods: {
    loginOpen() {
      this.$refs.login.open("bottom");
    },
    close() {
      this.$refs.login.close();
    },
    onChooseAvatar(e) {
      this.newDetail = { ...this.newDetail, avatar: e.detail.avatarUrl };
    },
    inputChange(e) {
      this.newDetail = { ...this.newDetail, nickname: e.detail.value };
    },
    submit() {
      if (!this.newDetail.avatar) {
        uni.showToast({
          title: "请点击头像获取微信头像",
          icon: "none",
        });
      } else if (
        !this.newDetail.nickname ||
        this.newDetail.nickname === "微信用户"
      ) {
        uni.showToast({
          title: "请输入正确的昵称",
          icon: "none",
        });
      } else {
        if (this.newDetail.avatar === this.detail.avatar) this.userEdit();
        else this.upload(this.newDetail.avatar);
      }
    },
    upload(path) {
      // uni.uploadFile({
      //   url: urls + "/u/common/upload",
      //   filePath: path,
      //   name: "file",
      //   header: {
      //     token: uni.getStorageSync("token"),
      //   },
      //   formData: {},
      //   success: (uploadFileRes) => {
      //     uni.hideLoading();
      //     let data = JSON.parse(uploadFileRes.data);
      //     if (data.code === 0) {
      //       this.newDetail = { ...this.newDetail, avatar: data.url };
      // $emit('update:detail',  this.newDetail )"
      //       this.userEdit();
      //     } else {
      //       uni.showToast({
      //         title: res.msg || "上传失败！",
      //         icon: "none",
      //       });
      //     }
      //   },
      //   fail: (uploadFileResErr) => {
      //     uni.hideLoading();
      //     uni.showToast({
      //       title: res.msg || "上传失败！",
      //       icon: "none",
      //     });
      //   },
      // });
    },
    userEdit() {
      userEdit(this.newDetail, (res) => {
        if (res.code === 0) {
          this.close();
          this.$emit("update:detail", this.newDetail);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
