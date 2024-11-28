<template>
  <view class="px-main">
    <view class="mt-64">欢迎加入梵米尼会籍</view>
    <view class="text-36 mt-16">请填写您的实名信息</view>
    <form @submit="formSubmit" class="mt-main">
      <view
        class="form-box pt-40 border-0 border-b-2 border-solid border-line relative"
      >
        <view
          class="absolute z-[10] top-22 left-0 right-0 h-98"
          @click="focused(1)"
          v-if="inputFocused !== 1"
        ></view>
        <view
          class="absolute z-0 top-44 left-0 text-tip transition-all duration-300"
          :class="{
            'label-focused': inputFocused === 1 || form.mobile,
          }"
        >
          您的手机号
        </view>
        <input
          class="my-20 h-48 leading-[48rpx] w-full"
          type="number"
          v-model="form.mobile"
          maxlength="11"
          :focus="inputFocused === 1"
          @blur="inputFocused = 0"
        />
      </view>

      <view
        class="form-box pt-40 border-0 border-b-2 border-solid border-line relative"
      >
        <view
          class="absolute z-[10] top-22 left-0 right-0 h-98"
          @click="focused(2)"
          v-if="inputFocused !== 2"
        ></view>
        <view
          class="absolute z-0 top-44 left-0 text-tip transition-all duration-300"
          :class="{ 'label-focused': inputFocused === 2 || form.name }"
          >您的真实姓名</view
        >
        <input
          class="my-20 h-48 leading-[48rpx] w-full"
          type="text"
          v-model="form.name"
          :focus="inputFocused === 2"
          @blur="inputFocused = 0"
        />
      </view>

      <view
        class="form-box pt-40 border-0 border-b-2 border-solid border-line relative"
      >
        <view
          class="absolute z-[10] top-22 left-0 right-0 h-98"
          @click="focused(3)"
          v-if="inputFocused !== 3"
        ></view>
        <view
          class="absolute z-0 top-44 left-0 text-tip transition-all duration-300"
          :class="{ 'label-focused': inputFocused === 3 || form.role }"
          >您的角色</view
        >
        <view
          class="my-20 h-48 leading-[48rpx] w-full"
          @click="openRoles = true"
        >
          {{ form.role?.label }}
        </view>

        <input type="text" disabled v-model="form.role" class="hidden" />
        <up-picker
          :show="openRoles"
          :columns="[roles]"
          @confirm="rolesConfirm"
          closeOnClickOverlay
          @cancel="openRoles = false"
          keyName="label"
          @close="openRoles = false"
        ></up-picker>
      </view>

      <view
        class="form-box pt-40 border-0 border-b-2 border-solid border-line relative"
        v-if="form.role"
      >
        <view
          class="absolute z-[10] top-22 left-0 right-0 h-98"
          @click="focused(4)"
          v-if="inputFocused !== 4"
        ></view>
        <view
          class="absolute z-0 top-44 left-0 text-tip transition-all duration-300"
          :class="{ 'label-focused': inputFocused === 4 || form.store }"
          >{{
            form.role?.value === 1
              ? "所在小区"
              : form.role?.value === 2
              ? "所在门店"
              : "所在门店"
          }}</view
        >
        <input
          class="my-20 h-48 leading-[48rpx] w-full"
          type="text"
          :disabled="form.role?.value === 3"
          v-model="form.store"
          :focus="inputFocused === 4"
          @blur="inputFocused = 0"
        />
      </view>
      <view class="mt-56 text-tip">
        <view class="flex items-center">
          <!-- <image
            mode=""
            src="/static/images/icon/info.png"
            style="width: 24upx; height: 24upx; margin-right: 8upx"
          /> -->
          温馨提示
        </view>
        <view style="margin-top: 6upx">1、姓名信息请与手机号码保持一致；</view>
        <view>2、请输入真实姓名，勿使用“先生，女士 ”等称谓；</view>
        <view>3、如未填写真实信息可能导致注册后无法享受会员权益；</view>
        <view>4、此页面所填写信息仅梵米尼会员注册，不作为对外使用。</view>
      </view>

      <up-button shape="circle" text="立即加入" color="#805844" class="mt-60" />
    </form>
    <!-- 弹框授权 -->
    <up-popup
      :show="showDocPopup"
      mode="bottom"
      @close="showDocPopup = false"
      round="20"
      bgColor="#f6ede7"
      closeable
      closeOnClickOverlay
    >
      <view class="my-30 flex flex-col items-center px-main">
        <view class="font-600 text-30">授权同意页面</view>
        <view class="bg-fff mt-52 rounded-28">
          <checkbox-group
            @change="checkboxChange"
            class="px-26 py-44 flex flex-col"
          >
            <label class="label">
              <checkbox
                value="1"
                style="transform: scale(0.7)"
              />我已阅读并同意<span
                class="text-main-vip"
                @click.stop="docClick(2)"
                >《梵米尼门店会员章程》</span
              >
            </label>
            <label class="label" style="margin-top: 20upx">
              <checkbox
                value="2"
                style="transform: scale(0.7)"
              />我已阅读并同意<span
                class="text-main-vip"
                @click.stop="docClick(2)"
                >《个人隐私信息保护条款》</span
              >
            </label>
          </checkbox-group>
        </view>
        <up-button
          shape="circle"
          text="同意并继续"
          color="#805844"
          class="mt-60"
        />
      </view>
    </up-popup>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
const showDocPopup = ref(true);
const inputFocused = ref(0);
const form = reactive({
  mobile: "",
  name: "",
  store: "",
  role: null,
});

const openRoles = ref(false);
const roles = ref([
  { label: "会员（普通）", value: 1 },
  { label: "会员（异业）", value: 2 },
  { label: "员工", value: 3 },
]);

const docClick = (index) => {
  if (index === 1) {
    uni.navigateTo({
      url: "/pagesA/member/doc-1",
    });
  } else {
    uni.navigateTo({
      url: "/pagesA/member/doc-2",
    });
  }
};

const formSubmit = () => {
  const { mobile, name } = form;
  if (mobile === "" || name === "") {
    return false;
  } else if (!/^1\d{10}$/.test(mobile)) {
    uni.showToast({
      icon: "none",
      title: "手机号码填写错误",
    });
    return;
  }
  if (!checkbox.value) {
    showDocPopup.value = true;
  } else {
    submit();
  }
};
const checkboxChange = (e) => {
  console.log(e);
  // this.checkboxList = e.detail.value;
};

const submit = () => {
  console.log(
    { ...this.form, memberRuleId: this.detail.memberRuleId },
    "/memberCard/createCard"
  );
};
const focused = (index) => {
  setTimeout(() => {
    inputFocused.value = index;
    if (index === 3) {
      openRoles.value = true;
    }
  }, 300);
};

const rolesConfirm = (e) => {
  console.log(e);
  form.role = e.value[0];
  openRoles.value = false;
  if (e.value[0].value === 3) form.store = "梵米尼全屋定制";
  else form.store = "";
};
</script>

<style lang="scss" scoped>
.form-box {
  .label-focused {
    top: 20upx;
    font-size: 24upx;
  }
}
</style>
