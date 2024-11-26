<template>
  <view class="container">
    <view class="title">欢迎购买厘舍会籍</view>
    <view class="sub-title">请填写您的实名信息</view>
    <form @submit="formSubmit" class="form">
      <view class="form-box">
        <view
          class="input-box"
          @click="focused(1)"
          v-if="inputFocused !== 1"
        ></view>
        <view
          class="label"
          :class="{ 'label-focused': inputFocused === 1 || form.mobile }"
          >您的手机号</view
        >
        <input
          type="number"
          v-model="form.mobile"
          maxlength="11"
          :focus="inputFocused === 1"
          @blur="inputFocused = 0"
        />
      </view>
      <!-- <view class="form-box">
        <view
          class="input-box"
          @click="focused(2)"
          v-if="inputFocused !== 2"
        ></view>
        <view
          class="label"
          :class="{ 'label-focused': inputFocused === 2 || form.idcardType }"
          >证件类型</view
        >
        <input
          type="text"
          v-model="form.idcardType"
          disabled
          :focus="inputFocused === 2"
          @blur="inputFocused = 0"
        />
      </view> -->
      <view class="form-box">
        <view
          class="input-box"
          @click="focused(3)"
          v-if="inputFocused !== 3"
        ></view>
        <view
          class="label"
          :class="{ 'label-focused': inputFocused === 3 || form.name }"
          >您的真实姓名</view
        >
        <input
          type="text"
          v-model="form.name"
          :focus="inputFocused === 3"
          @blur="inputFocused = 0"
        />
      </view>

      <view class="form-box">
        <view
          class="input-box"
          @click="focused(5)"
          v-if="inputFocused !== 5"
        ></view>
        <view class="label label-focused">您的常去门店</view>
        <picker
          @change="bindPickerChange"
          :value="storeId"
          :range="list"
          range-key="name"
        >
          <view class="uni-input">{{ name }}</view>
        </picker>
      </view>
      <!-- <view class="form-box">
        <view
          class="input-box"
          @click="focused(4)"
          v-if="inputFocused !== 4"
        ></view>
        <view
          class="label"
          :class="{ 'label-focused': inputFocused === 4 || form.idcardNo }"
          >您的证件号码</view
        >
        <input
          type="text"
          v-model="form.idcardNo"
          :focus="inputFocused === 4"
          @blur="inputFocused = 0"
        />
      </view> -->
      <view class="tip">
        <view class="tip-text">
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
        <view
          >4、此页面所填写信息仅作为厘舍会员注册使用，不作为会员对外公开使用。</view
        >
      </view>
      <button
        class="btn"
        :class="
          form.mobile === '' || form.idcardNo === '' || form.name === ''
            ? 'clickActiveBg2'
            : ''
        "
        form-type="submit"
      >
        <view
          style="
            font-size: 38upx;
            color: #dbdbdb;
            text-decoration: line-through;
            padding-right: 8upx;
          "
          >￥298</view
        >
        <view>
          <span style="font-size: 50upx">￥</span
          >{{ detail.price || "??" }}</view
        >

        <view class="bl"></view>
        <view class="bth-d">立即开通</view>
      </button>
    </form>
    <uni-popup ref="popup" type="bottom">
      <view class="popup-box">
        <!-- <image
          class="close"
          @click="close"
          mode=""
          src="/static/images/icon/icon-close.png"
        /> -->
        <view class="title">授权同意页面</view>
        <view class="checkbox">
          <checkbox-group @change="checkboxChange">
            <label class="label">
              <checkbox value="1" style="transform: scale(0.7)" />
              我已阅读并同意<span
                style="color: #805844"
                @click.stop="docClick(1)"
                >《厘舍SPA门店会员章程》</span
              >
            </label>

            <label class="label" style="margin-top: 20upx">
              <checkbox
                value="2"
                style="transform: scale(0.7)"
              />我已阅读并同意<span
                style="color: #805844"
                @click.stop="docClick(2)"
                >《个人证件信息使用条款》</span
              >
            </label>
          </checkbox-group>
        </view>
        <view class="btn" hover-class="clickActiveBg2" @click="checkboxClick">
          同意并继续
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
// import { createCard, storeList } from "@/api/custormer.js";
// import Coupon from "@/pages/member/coupon.vue";
// import { profile } from "@/api/custormer.js";
export default {
  data() {
    return {
      titleTranslateX: 0, // 标题的水平位置
      checkboxList: [],
      checkbox: false,
      focusState: true,
      form: {
        mobile: "",
        idcardNo: "432503198205277711",
        name: "",
        storeId: 0,
        id: "",
        idcardType: "身份证",
      },
      payType: 1,
      inputFocused: 0,
      couponId: 0,
      detail: {
        price: "",
      },
      list: [],
      name: "",
      city: 22907,
    };
  },
  onLoad(options) {
    this.detail = {
      price: options.price,
      memberRuleId: options.memberRuleId,
    };
    this.open();
    // this.init();
    // this.loadUser();
  },
  methods: {
    init() {
      const cityinfo = uni.getStorageSync("cityinfo");
      if (cityinfo) {
        this.cityName = cityinfo.name;
        this.city = cityinfo.id;
      }
      this.loadList();
    },
    loadList() {
      storeList(
        {
          name: "",
          city: this.city,
          lat: uni.getStorageSync("latV"),
          lng: uni.getStorageSync("lonV"),
        },
        (res) => {
          if (res.code === 0) {
            this.name = res.rows[0].name;
            this.form.storeId = res.rows[0].deptId;
            this.list = res.rows;
          }
        }
      );
    },
    loadUser() {
      profile({}, (res) => {
        if (res.code === 0) {
          this.form.mobile = res.data.phoneNumber;
        }
      });
    },
    bindPickerChange: function (e) {
      this.name = this.list[e.detail.value].name;
      this.form.storeId = this.list[e.detail.value].deptId;
    },
    docClick(index) {
      if (index === 1) {
        uni.navigateTo({
          url: "/pagesA/member/doc-1",
        });
      } else {
        uni.navigateTo({
          url: "/pagesA/member/doc-2",
        });
      }
    },
    formSubmit() {
      const { mobile, idcardNo, name } = this.form;
      if (mobile === "" || idcardNo === "" || name === "") {
        return false;
      } else if (!/^1\d{10}$/.test(mobile)) {
        uni.showToast({
          icon: "none",
          title: "手机号码填写错误",
        });
        return;
      }
      if (!this.checkbox) {
        this.open();
      } else {
        this.submit();
      }
    },
    checkboxChange(e) {
      this.checkboxList = e.detail.value;
    },
    checkboxClick() {
      if (this.checkboxList.length !== 2) {
        return uni.showToast({
          icon: "none",
          title: "请认真阅读并授权条款！",
        });
      }
      this.checkbox = true;
      this.close();
      this.formSubmit();
    },
    open() {
      this.$refs.popup.open("bottom");
    },
    close() {
      this.$refs.popup.close();
    },
    submit() {
      console.log(
        { ...this.form, memberRuleId: this.detail.memberRuleId },
        "/memberCard/createCard"
      );
      createCard(
        {
          ...this.form,
          memberRuleId: this.detail.memberRuleId,
          cityId: this.city,
        },
        (res) => {
          if (res.code === 0) {
            this.couponId = res.data.id;
            this.$refs.couponComponent.couponOpen();
          }
        }
      );
    },
    focused(index) {
      setTimeout(() => {
        this.inputFocused = index;
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 650upx;
  letter-spacing: 2upx;
  color: #333333;
  line-height: 1.5;
  font-size: 26upx;
  position: relative;
  .clickActiveBg2 {
    background: #805844 !important;
    opacity: 0.6;
  }
  .title {
    margin-top: 64upx;
  }
  .sub-title {
    margin-top: 16upx;
    font-size: 36upx;
  }
  .form {
    margin-top: 36rpx;
    .form-box {
      padding-top: 40rpx;
      border-bottom: solid 2upx #f0f0f0;
      position: relative;
      .input-box {
        position: absolute;
        z-index: 10;
        top: 22upx;
        left: 0;
        height: 98upx;
        width: 100%;
      }
      .label {
        transition: all 0.3s ease;
        position: absolute;
        z-index: 0;
        top: 44upx;
        left: 0;
        color: #999;
        font-size: 28upx;
      }
      .label-focused {
        top: 20upx;
        left: 0;
        font-size: 24upx;
      }
      input {
        margin: 20upx 0 20rpx;
        height: 48upx;
        line-height: 48upx;
        width: 100%;
      }
      .uni-input {
        height: 88upx;
        width: 100%;
        font-size: 28upx;
        line-height: 88upx;
      }
    }
    .tip {
      margin-top: 56rpx;
      color: #999999;
      .tip-text {
        display: flex;
        align-items: center;
      }
    }
  }
}
.popup-box {
  padding: 0 40upx 80upx;
  background: #f6ede7;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40upx;
  width: calc(100% - 80upx);

  .close {
    position: absolute;
    right: 30upx;
    top: 50upx;
    width: 40upx;
    height: 40upx;
    padding: 10upx;
  }
  .title {
    margin-top: 52upx;
    font-size: 30upx;
    font-weight: bold;
  }
  .checkbox {
    background: #fff;
    width: 100%;
    margin-top: 52upx;
    border-radius: 28upx;
    checkbox-group {
      padding: 44upx 26upx;
      display: flex;
      flex-direction: column;
    }
  }
  .btn {
    width: 100%;
    margin-top: 40upx;
    font-size: 30upx;
  }
  .coupon {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 40upx;
    color: #000;

    .icon-paytype {
      width: 50upx;
      height: 50upx;
    }

    .icon-check {
      width: 30upx;
      height: 30upx;
      display: block;
      margin-left: auto;
    }
  }
}

.btn {
  width: 660upx;
  height: 96upx;
  background: #805844;
  margin: 46upx auto;
  color: #fff;
  border-radius: 48upx;
  line-height: 96upx;
  font-size: 55upx;
  display: flex;
  justify-content: center;
  align-items: center;
  .bth-d {
    font-size: 40upx;
  }
  .bl {
    height: 42upx;
    width: 2upx;
    background: #fff;
    margin: 0 16upx;
    opacity: 0.6;
  }
}
</style>
