<template>
  <up-popup
    :show="show"
    mode="bottom"
    @close="$emit('update:show', false)"
    round="8"
    bgColor="#fff"
    closeable
    closeOnClickOverlay
    :safeAreaInsetBottom="false"
  >
    <view
      class="popup-box px-main py-60 flex flex-col items-center leading-1.3"
    >
      <view class="text-36 text-000 font-700 w-full">获取您的昵称、头像</view>
      <view class="text-26 text-[#aaa] mt-12 w-full"
        >获取用户头像、昵称，主要用于向用户提供具有辨识度的用户体验</view
      >
      <view class="avatar relative mt-60 rounded-full w-180 h-180">
        <button
          class="w-full h-full bg-f8f7f8 rounded-full flex justify-center items-center px-0"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <i
            class="iconfont text-100 leading-1 text-[#e4e9ec]"
            v-if="!newUserInfo.avatar"
            >&#xe617;</i
          >
          <image
            v-else
            class="w-full h-full bg-cover"
            :src="newUserInfo.avatar"
            alt=""
          />
        </button>
        <view
          class="absolute bottom-[-12rpx] right-[-10rpx] h-64 w-64 border-4 border-fff border-solid rounded-full bg-000 flex justify-center items-center"
        >
          <i class="iconfont text-40 leading-1 text-fff">&#xe6c9;</i>
        </view>
      </view>

      <input
        type="nickname"
        class="mt-50 px-20 h-80 rounded-12 leading-[80rpx] bg-[#f8f7f8] text-32 w-full"
        placeholder="请输入昵称"
        @change="inputChange"
        v-model="newUserInfo.nickname"
      />
      <view class="mt-70 w-full">
        <up-button
          text="保 存"
          :color="
            newUserInfo.nickname && newUserInfo.avatar ? '#31ba52' : '#e6e6e6'
          "
          :customStyle="{
            color:
              newUserInfo.nickname && newUserInfo.avatar ? '#fff' : '#838383',
          }"
          @click="submit"
        />
      </view>
    </view>
  </up-popup>
</template>

<script>
import { editUserInfo } from "@/api/login";
import { base_url } from "@/utils/request";

export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:show", "close"],
  data() {
    return {
      newUserInfo: {},
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
    userInfo(val) {
      this.newUserInfo = { ...val };
    },
  },
  methods: {
    onChooseAvatar(e) {
      this.newUserInfo = { ...this.newUserInfo, avatar: e.detail.avatarUrl };
    },
    inputChange(e) {
      this.newUserInfo = { ...this.newUserInfo, nickname: e.detail.value };
    },
    submit() {
      if (!this.newUserInfo.avatar) {
        uni.showToast({
          title: "请点击头像获取微信头像",
          icon: "none",
        });
      } else if (
        !this.newUserInfo.nickname ||
        this.newUserInfo.nickname === "微信用户"
      ) {
        uni.showToast({
          title: "请输入正确的昵称",
          icon: "none",
        });
      } else {
        if (
          this.newUserInfo.avatar === this.userInfo.avatar &&
          this.newUserInfo.nickname === this.userInfo.nickname
        ) {
          this.$emit("close");
        } else if (this.newUserInfo.avatar === this.userInfo.avatar) {
          this.userEdit();
        } else {
          this.upload(this.newUserInfo.avatar);
        }
      }
    },
    upload(path) {
      uni.uploadFile({
        url: base_url + "/api/upload/image",
        filePath: path,
        fileType: "image",
        name: "avatar",
        formData: {
          filename: "avatar",
        },
        header: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + uni.getStorageSync("token"),
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes);
          uni.hideLoading();
          let data = JSON.parse(uploadFileRes.data);
          if (data.status === 200) {
            this.newUserInfo = { ...this.newUserInfo, avatar: data.data.url };
            this.userEdit();
          } else {
            uni.showToast({
              title: res.msg || "上传失败！",
              icon: "none",
            });
          }
        },
        fail: (res) => {
          uni.hideLoading();
          uni.showToast({
            title: res.msg || "上传失败！",
            icon: "none",
          });
        },
      });
    },
    async userEdit() {
      if (this.newUserInfo) await editUserInfo(this.newUserInfo);
      uni.showToast({
        title: "修改成功",
        icon: "none",
      });
      setTimeout(() => {
        this.$emit("close");
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 2.5rem 0 rgba(0, 0, 0, 0.15);
}
::v-deep(.uni-button)::after {
  border: 0;
}
</style>
