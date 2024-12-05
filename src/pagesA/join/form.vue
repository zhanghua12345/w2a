<template>
  <view class="tabbar-contain">
    <image
      src="https://hsl76.jiaodaoren.com/profile/upload/images/slice.png"
      mode="scaleToFill"
      class="slice"
    />

    <u-sticky :bgColor="scrollTop > 60 && '#fff'" :offset-top="0">
      <view
        :style="'padding-top:' + height + 'rpx'"
        class="custom flex-y-center"
      >
        <image
          mode=""
          src="/static/images/icon/back.png"
          @click="navBack"
          style="width: 38upx; height: 38upx; padding: 10upx 0 10upx 30upx"
        ></image>
        <view
          class="font30 fontBold colorNormal"
          style="margin-right: 68rpx; text-align: center; flex: 1"
          v-show="scrollTop > 60"
          >厘舍SPA品牌合作申请表</view
        >
      </view>
    </u-sticky>
    <view class="title">厘舍SPA品牌合作申请表</view>
    <view class="sub-tip">
      <view>感谢您对厘舍的关注</view>
      <view>诚邀您填写以下内容</view>
    </view>
    <u--form labelWidth="0" :model="form" :rules="rules" ref="uForm">
      <template v-for="(item, index) in list">
        <template v-if="item.seq <= 100">
          <view class="card" :key="index">
            <u-form-item :prop="item.id">
              <view class="">
                <view class="question-box">
                  <view class="title-box">
                    <view class="lines"></view>
                    <view class="titles">{{ item.question }}</view>
                  </view>
                  <view class="tips">{{ item.subTitle }}</view>
                </view>
                <template v-if="item.type === 'radio'">
                  <u-radio-group v-model="form[item.id]" placement="column">
                    <u-radio
                      activeColor="#805844"
                      :customStyle="{ marginBottom: '8px' }"
                      v-for="(i, k) in item.option"
                      :key="k"
                      :label="i.name"
                      :name="i.name"
                    >
                    </u-radio>
                  </u-radio-group>
                </template>
                <template v-if="item.type === 'select'">
                  <view class="select-box" @click="selectClick(item, index)">
                    <u--input
                      v-model="form[item.id]"
                      disabled
                      disabledColor="#ffffff"
                      placeholder="请选择"
                      border="none"
                    ></u--input>
                    <u-icon name="arrow-right" size="20upx" />
                  </view>
                </template>
                <template v-if="item.type === 'input'">
                  <view class="select-box">
                    <u--input
                      v-model="form[item.id]"
                      placeholder="请输入"
                    ></u--input>
                  </view>
                </template>
                <template v-if="item.type === 'textarea'">
                  <view class="select-box">
                    <u--textarea v-model="form[item.id]" height="120" />
                  </view>
                </template>
              </view>
            </u-form-item>
          </view>
        </template>
      </template>
      <template>
        <view class="card">
          <view class="question-box">
            <view class="title-box">
              <view class="lines"></view>
              <view class="titles">基本信息</view>
            </view>
          </view>
          <view class="info">
            <template v-for="(item, index) in list">
              <template v-if="item.seq > 100">
                <view class="info-box" :key="index">
                  <view class="name">{{ item.question }}：</view>
                  <view class="value">
                    <u-form-item :prop="item.id">
                      <template v-if="item.type === 'select'">
                        <view @click="selectClick(item, index)">
                          <u--input
                            v-model="form[item.id]"
                            disabled
                            disabledColor="#ffffff"
                            placeholder="请选择"
                          ></u--input>
                        </view>
                      </template>

                      <template v-else-if="item.type === 'textarea'">
                        <u--textarea
                          v-model="form[item.id]"
                          autoHeight
                          disableDefaultPadding
                          @focus="openMap(item.id)"
                          placeholder="请选择地址"
                        />
                      </template>
                      <template v-else>
                        <u--input
                          :type="item.type || 'text'"
                          v-model="form[item.id]"
                          placeholder="请输入"
                        ></u--input>
                      </template>
                      <view class="info-tip">{{ item.tip }}</view>
                    </u-form-item>
                  </view>
                </view>
              </template>
            </template>
          </view>
        </view>
      </template>
    </u--form>
    <u-action-sheet
      :show="showSheet"
      :actions="actions"
      title="请选择"
      @close="showSheet = false"
      @select="selectSheet"
    >
    </u-action-sheet>
    <div class="warn" v-html="warn"></div>
    <view class="warn2"
      >此方案最终解释权在法律范围内归湖南厘舍健康科技集团有限公司所有</view
    >

    <view class="bottoms">
      <view class="btn2" @click="submit">提交申请</view>
    </view>
  </view>
</template>
<script>
// import list from "./form.json";
// const chooseLocation = requirePlugin("chooseLocation");
// import { questionList, questionSubmit, profile } from "@/api/custormer.js";
import form from "./form.json";
export default {
  components: {},
  data() {
    return {
      addressId: null,
      height: 0,
      scrollTop: 0,
      list: [],
      rules: {},
      form,
      showSheet: false,
      selectIndex: 0,
      actions: [],
      detail: {},

      warn: "市场有风险，投资需谨慎!<br>请确保您填写的信息真实有效!<br>收到您的申请后，我们将会认真评估!<br>如符合要求，我们将会尽快与您取得联系!",
    };
  },
  onLoad() {
    const res = uni.getSystemInfoSync();
    this.height = res.statusBarHeight * 2;
    // questionList({}, (res) => {
    //   if (res.code === 0) {
    //     this.list = res.data
    //       .sort(function (a, b) {
    //         return a["seq"] - b["seq"];
    //       })
    //       .map((e) => {
    //         const obj = e.options && JSON.parse(e.options);
    //         this.form = { ...this.form, [e.id]: "" };
    //         this.rules = {
    //           ...this.rules,
    //           [e.id]: {
    //             required: true,
    //             message: "内容不能为空",
    //             trigger: ["blur", "change"],
    //           },
    //         };
    //         return (e = { ...e, ...obj });
    //       });
    //   }
    // });
  },
  onShow() {
    const location = chooseLocation.getLocation();
    if (location != null) {
      this.form[this.addressId] = location.address + location.name;
    }
  },
  onReady() {
    // profile({}, (res) => {
    //   if (res.code === 0) {
    //     this.detail = res.data;
    //   }
    // });
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules);
  },
  onPageScroll(e) {
    // 页面滚动时会触发
    this.scrollTop = e.scrollTop; // 更新滚动位置
  },

  methods: {
    selectClick(e, i) {
      this.selectIndex = i;
      this.actions = e.option;
      this.showSheet = true;
    },
    submit() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          const answerList = [];
          const info = {};
          this.list.forEach((e) => {
            let answer = "";
            if (e.option) {
              answer =
                e.option[e.option.findIndex((n) => n.name === this.form[e.id])]
                  .id;
            } else {
              answer = this.form[e.id];
            }

            if (e.seq < 100 && !e.ids) {
              const obj = {
                questionId: e.id,
                ids: e.ids,
                answer,
              };
              answerList.push(obj);
            } else {
              info[e.ids] = answer;
            }
          });
          // questionSubmit(
          //   {
          //     answerList,
          //     franchiseIntention: { ...info, userId: this.detail.id },
          //   },
          //   (res) => {
          //     if (res.code === 0) {
          //       uni.$u.toast("提交成功");
          //       setTimeout(() => {
          //         uni.redirectTo({
          //           url: "/pagesA/join/success",
          //         });
          //       }, 1000);
          //     }
          //   }
          // );
        })
        .catch((errors) => {
          uni.showToast({
            title: "请仔细检查表单",
            icon: "none",
          });
        });
    },
    navBack() {
      uni.navigateBack();
    },
    selectSheet(e) {
      const id = this.list[this.selectIndex].id;
      this.form[id] = e.name;
      this.$refs.uForm.validateField([id]);
    },
    openMap(id) {
      this.addressId = id;
      const key = "HLKBZ-63FC3-TIB3F-OVW2T-EEMTZ-O5BT5";
      const referer = "厘舍SPA";
      uni.navigateTo({
        url: "plugin://chooseLocation/index?key=" + key + "&referer=" + referer,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar-contain {
  color: #1c0808;
  position: relative;
  line-height: 1.5;
  font-size: 24upx;
  letter-spacing: 1upx;
  padding-bottom: 190upx;
  .custom {
    width: 100%;
    height: 80upx;
    view {
      margin: 0 auto;
    }
  }
  .slice {
    position: fixed;
    left: 0;
    top: 0;
    width: 750upx;
    z-index: -1;
  }
  .title {
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 48upx;
    color: #805844;
    padding-top: 30upx;
  }
  .sub-tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #805844;
    font-size: 30upx;
    padding: 10upx 0 40upx;
  }
}
.card {
  margin: 0 24upx 20upx;
  padding: 24upx;
  border-radius: 8upx;
  background: #ffffff;
  .question-box {
    padding-bottom: 24upx;
    border-bottom: 2upx solid #f7f7f7;
    color: #9e9e9e;
    .title-box {
      display: flex;
      flex-wrap: wrap;
      align-items: start;
      text-align: left;
      .lines {
        width: 4upx;
        height: 28upx;
        background: #805844;
        margin: 12upx 12upx 0 0;
      }
      .titles {
        font-size: 30upx;
        font-weight: 400;
        line-height: 52upx;
        letter-spacing: 0;
        flex: 1;
      }
    }
    .tips {
      font-size: 22upx;
      line-height: 38upx;
      margin-top: 2upx;
      margin-left: 16upx;
    }
  }
  .select-box {
    margin-top: 32upx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
.warn {
  font-size: 30upx;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 80upx;
  letter-spacing: 0upx;
  color: #333;
  line-height: 52upx;
}
.warn2 {
  display: flex;
  justify-content: center;
  letter-spacing: 0upx;
  font-size: 20upx;
  color: #9e9e9e;
  margin-top: 40upx;
}
.bottoms {
  position: fixed;
  z-index: 10000;
  left: 0;
  bottom: 0;
  background: #fff;
  height: 156upx;
  width: 100%;
  .btn2 {
    width: 660upx;
    height: 96upx;
    background: #805844;
    margin: 30upx auto;
    color: #fff;
    border-radius: 4upx;
    line-height: 96upx;
    font-size: 30upx;
    text-align: center;
  }
}
::v-deep .u-form-item__body {
  padding: 0 !important;
  .u-radio-group {
    margin-top: 8upx !important;
    .u-radio {
      padding-top: 12upx;
      margin-top: 0upx;
      margin-bottom: 0 !important;
      .u-radio__icon-wrap {
        width: 30upx !important;
        height: 30upx !important;
        .u-icon__icon {
          font-size: 24upx !important;
          line-height: 24upx !important;
          top: 2upx !important;
        }
      }
      .u-radio__text {
        color: #333333 !important;
        font-size: 30upx !important;
        line-height: 52upx !important;
        flex: 1;
      }
    }
  }
}
::v-deep .u-form-item__body__right__message {
  margin-top: 20upx !important;
  font-size: 24upx !important;
  line-height: 24upx !important;
}
::v-deep .u-textarea {
  padding: 10upx !important;
}

::v-deep .info {
  padding: 20upx 0;
  .info-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20upx;
    color: #333333;
    .name {
      padding-left: 20upx;
      width: 200upx;
      font-size: 30upx;
    }
    .value {
      flex: 1;
      .u-form-item__body__right__message {
        margin-top: 10upx !important;
      }
    }
    .info-tip {
      font-size: 22upx;
      margin-top: 6upx;
      color: #888;
    }
    .u-input {
      padding: 2upx 18upx !important;
    }
  }
}
</style>
