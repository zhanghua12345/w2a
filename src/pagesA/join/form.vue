<template>
  <Navbar leftIcon=" " />
  <view class="tabbar-contain">
    <image
      src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
      mode="scaleToFill"
      class="slice"
    />
    <view class="title">梵米尼AI测试表</view>
    <view class="sub-tip">
      <view>感谢您对梵米尼的关注</view>
      <view>诚邀您填写以下内容</view>
    </view>

    <up-form labelWidth="0" :model="form" :rules="rules" ref="uFormRef">
      <template v-for="(item, index) in list">
        <template v-if="item.seq <= 100">
          <view class="card" :key="index">
            <up-form-item :prop="item.id">
              <view class="w-full">
                <view class="question-box">
                  <view class="title-box">
                    <view class="lines"></view>
                    <view class="titles">{{ item.question }}</view>
                  </view>
                  <view class="tips">{{ item.subTitle }}</view>
                </view>
                <template v-if="item.type === 'radio'">
                  <up-radio-group v-model="form[item.id]" placement="column">
                    <up-radio
                      activeColor="#805844"
                      :customStyle="{ marginBottom: '8px' }"
                      v-for="(i, k) in item.option"
                      :key="k"
                      :name="i.id"
                    >
                      <template #label>
                        <view class="flex items-center">
                          <view class="mr-main">{{ i.name }}</view>
                          <up-input
                            v-show="form[item.id] === i.id"
                            v-model="form[item.id + 'input']"
                            :style="{ height: '44rpx', 'font-size': '20rpx' }"
                          />
                        </view>
                      </template>
                    </up-radio>
                  </up-radio-group>
                </template>

                <template v-if="item.type === 'select'">
                  <view class="select-box" @click="selectClick(item, index)">
                    <up-input
                      v-model="form[item.id]"
                      style="pointer-events: none"
                      readonly
                      placeholder="请选择1"
                      border="none"
                    />
                    <up-icon name="arrow-right" size="20rpx" />
                  </view>
                </template>
                <template v-if="item.type === 'input'">
                  <view class="select-box">
                    <up-input v-model="form[item.id]" placeholder="请输入" />
                  </view>
                </template>
                <template v-if="item.type === 'textarea'">
                  <view class="select-box">
                    <up-textarea v-model="form[item.id]" height="120" />
                  </view>
                </template>
              </view>
            </up-form-item>
          </view>
        </template>
      </template>
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
                  <up-form-item :prop="item.id">
                    <template v-if="item.type === 'select'">
                      <view @click="selectClick(item, index)" class="w-full">
                        <up-input
                          style="pointer-events: none; width: 100%"
                          readonly
                          v-model="form[item.id]"
                          placeholder="请选择"
                        />
                      </view>
                    </template>

                    <template v-else-if="item.type === 'textarea'">
                      <up-textarea
                        v-model="form[item.id]"
                        autoHeight
                        disableDefaultPadding
                        @focus="openMap(item.id)"
                        placeholder="请选择地址"
                      />
                    </template>
                    <template v-else>
                      <up-input
                        :type="item.type || 'text'"
                        v-model="form[item.id]"
                        placeholder="请输入"
                      />
                    </template>
                    <view class="info-tip">{{ item.tip }}</view>
                  </up-form-item>
                </view>
              </view>
            </template>
          </template>
        </view>
      </view>
    </up-form>
    <up-action-sheet
      :show="showSheet"
      :actions="actions"
      title="请选择"
      @close="showSheet = false"
      @select="selectSheet"
    >
    </up-action-sheet>
    <div class="warn" v-html="warn"></div>
    <view class="warn2"
      >此方案最终解释权在法律范围内归湖南厘舍健康科技集团有限公司所有</view
    >

    <view class="bottoms">
      <view class="btn2" @click="submit">提交申请</view>
    </view>
  </view>
</template>
<script setup>
import list from "./form.json";
import { onMounted, onUnmounted, ref } from "vue";
import Navbar from "@/components/navbar/index.vue";
// const chooseLocation = requirePlugin("chooseLocation");
// import { questionList, questionSubmit, profile } from "@/api/custormer.js";
import {
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
import { useWxShare } from "@/hooks/index.js";
// 监听滚动
onPageScroll((e) => {});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "/pages/home/index",
});
const detail = ref("");
const actions = ref([]);
const selectIndex = ref(0);
const showSheet = ref(false);
const form = ref({
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
});
const rules = ref({});
const scrollTop = ref(0);
const height = ref(0);
const addressId = ref(null);
const uFormRef = ref(null);
const warn = ref(
  "市场有风险，投资需谨慎!<br>请确保您填写的信息真实有效!<br>收到您的申请后，我们将会认真评估!<br>如符合要求，我们将会尽快与您取得联系!"
);
onMounted(() => {});
const selectClick1 = () => {
  console.log(111);
};
const selectClick = (e, i) => {
  console.log(e, i);
  selectIndex.value = i;
  actions.value = e.option;
  showSheet.value = true;
};

const submit = () => {
  uFormRef.value
    .validate()
    .then((res) => {
      const answerList = [];
      const info = {};
      this.list.forEach((e) => {
        let answer = "";
        if (e.option) {
          answer =
            e.option[e.option.findIndex((n) => n.name === this.form[e.id])].id;
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
};
const navBack = () => {
  uni.navigateBack();
};
const selectSheet = (e) => {
  const id = this.list[this.selectIndex].id;
  this.form[id] = e.name;
  this.$refs.uForm.validateField([id]);
};
const openMap = (id) => {
  this.addressId = id;
  const key = "HLKBZ-63FC3-TIB3F-OVW2T-EEMTZ-O5BT5";
  const referer = "厘舍SPA";
  uni.navigateTo({
    url: "plugin://chooseLocation/index?key=" + key + "&referer=" + referer,
  });
};
</script>

<style lang="scss" scoped>
.tabbar-contain {
  color: #1c0808;
  position: relative;
  line-height: 1.5;
  font-size: 24rpx;
  letter-spacing: 1rpx;
  padding-bottom: 190rpx;
  .custom {
    width: 100%;
    height: 80rpx;
    view {
      margin: 0 auto;
    }
  }
  .slice {
    position: fixed;
    left: 0;
    top: 0;
    width: 750rpx;
    z-index: -1;
  }
  .title {
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 48rpx;
    color: #805844;
    padding-top: 30rpx;
  }
  .sub-tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #805844;
    font-size: 30rpx;
    padding: 10rpx 0 40rpx;
  }
}
.card {
  margin: 0 24rpx 20rpx;
  padding: 24rpx;
  border-radius: 8rpx;
  background: #ffffff;
  .question-box {
    padding-bottom: 24rpx;
    border-bottom: 2rpx solid #f7f7f7;
    color: #9e9e9e;
    .title-box {
      display: flex;
      flex-wrap: wrap;
      align-items: start;
      text-align: left;
      .lines {
        width: 4rpx;
        height: 28rpx;
        background: #805844;
        margin: 12rpx 12rpx 0 0;
      }
      .titles {
        font-size: 30rpx;
        font-weight: 400;
        line-height: 52rpx;
        letter-spacing: 0;
        flex: 1;
      }
    }
    .tips {
      font-size: 22rpx;
      line-height: 38rpx;
      margin-top: 2rpx;
      margin-left: 16rpx;
    }
  }
  .select-box {
    margin-top: 32rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
.warn {
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 80rpx;
  letter-spacing: 0rpx;
  color: #333;
  line-height: 52rpx;
}
.warn2 {
  display: flex;
  justify-content: center;
  letter-spacing: 0rpx;
  font-size: 20rpx;
  color: #9e9e9e;
  margin-top: 40rpx;
}
.bottoms {
  position: fixed;
  z-index: 10000;
  left: 0;
  bottom: 0;
  background: #fff;
  height: 156rpx;
  width: 100%;
  .btn2 {
    width: 660rpx;
    height: 96rpx;
    background: #805844;
    margin: 30rpx auto;
    color: #fff;
    border-radius: 4rpx;
    line-height: 96rpx;
    font-size: 30rpx;
    text-align: center;
  }
}
::v-deep .u-form-item__body {
  padding: 0 !important;
  .u-radio-group {
    margin-top: 8rpx !important;
    .u-radio {
      padding-top: 12rpx;
      margin-top: 0rpx;
      margin-bottom: 0 !important;
      .u-radio__icon-wrap {
        width: 30rpx !important;
        height: 30rpx !important;
        .u-icon__icon {
          font-size: 24rpx !important;
          line-height: 24rpx !important;
          top: 2rpx !important;
        }
      }
      .u-radio__text {
        color: #333333 !important;
        font-size: 30rpx !important;
        line-height: 52rpx !important;
        flex: 1;
      }
    }
  }
}
::v-deep .u-form-item__body__right__message {
  margin-top: 20rpx !important;
  font-size: 24rpx !important;
  line-height: 24rpx !important;
}
::v-deep .u-textarea {
  padding: 10rpx !important;
}

::v-deep .info {
  padding: 20rpx 0;
  .info-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20rpx;
    color: #333333;
    .name {
      padding-left: 20rpx;
      width: 200rpx;
      font-size: 30rpx;
    }
    .value {
      flex: 1;
      .u-form-item__body__right__message {
        margin-top: 10rpx !important;
      }
    }
    .info-tip {
      font-size: 22rpx;
      margin-top: 6rpx;
      color: #888;
    }
    .u-input {
      padding: 2rpx 18rpx !important;
    }
  }
}
</style>
