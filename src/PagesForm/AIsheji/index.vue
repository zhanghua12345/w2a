<template>
  <view
    class="fixed z-[20]"
    v-if="isBack"
    :style="{
      top: boundInfo.boundTop + 'px',
      left: boundInfo.boundRight + 'px',
    }"
  >
    <i
      class="iconfont leading-1 pl-10 text-666"
      @click="goBack"
      :style="{
        fontSize: boundInfo.boundHeight + 'px',
      }"
      >&#xe6ad;</i
    >
  </view>
  <Navbar title="梵米尼家具优选" leftIcon=" " />
  <view class="tabbar-contain">
    <image
      src="https://pic.rmb.bdstatic.com/bjh/240622/ed7252d2cc92f558896a7dea906197e83269.jpeg"
      mode="scaleToFill"
      class="slice"
    />
    <view
      class="title"
      :style="{
        paddingTop: boundInfo.navBarHeight + boundInfo.statusBarHeight + 'px',
      }"
      >梵米尼AI测试表</view
    >
    <view class="sub-tip">
      <view>感谢您对梵米尼的关注</view>
      <view>诚邀您填写以下内容</view>
    </view>

    <up-form labelWidth="0" :model="form" :rules="rules" ref="uFormRef">
      <template v-for="(item, index) in list" :key="index">
        <view class="card top" v-if="item.sort < 100">
          <up-form-item :prop="String(item.id)">
            <view class="w-full">
              <view class="question-box">
                <view class="title-box">
                  <view class="lines"></view>
                  <view class="titles">
                    {{ item.problem }}
                    <span v-if="item.required" class="text-main">*</span>
                  </view>
                </view>
                <view class="tips">{{ item.description }}</view>
              </view>
              <template v-if="item.type === 'input'">
                <view class="select-box">
                  <up-input v-model="form[item.id]" placeholder="请输入" />
                </view>
              </template>
              <template v-if="item.type === 'number'">
                <view class="select-box">
                  <up-input
                    type="number"
                    v-model="form[item.id]"
                    placeholder="请输入"
                  />
                </view>
              </template>
              <template v-if="item.type === 'textarea'">
                <view class="select-box">
                  <up-textarea v-model="form[item.id]" height="120" />
                </view>
              </template>
              <template v-if="item.type === 'radio'">
                <up-radio-group v-model="form[item.id]" placement="column">
                  <up-radio
                    activeColor="#805844"
                    :customStyle="{ marginBottom: '8px' }"
                    v-for="(i, k) in JSON.parse(item.content).sort(
                      (a, b) => a.sort - b.sort
                    )"
                    :key="k"
                    :name="i.value"
                  >
                    <template #label>
                      <view class="flex items-center">
                        <view class="mr-main">{{ i.value }}</view>
                      </view>
                    </template>
                  </up-radio>
                </up-radio-group>
              </template>
              <template v-if="item.type === 'opt'">
                <view class="select-box" @click="selectClick(item, index)">
                  <up-input
                    v-model="form[item.id]"
                    style="pointer-events: none"
                    readonly
                    placeholder="请选择"
                    border="none"
                  />
                  <up-icon name="arrow-right" size="20rpx" />
                </view>
              </template>
            </view>
          </up-form-item>
        </view>
      </template>

      <view class="card">
        <view class="question-box">
          <view class="title-box">
            <view class="lines"></view>
            <view class="titles">基本信息</view>
          </view>
        </view>
        <view class="info">
          <template v-for="(item, index) in list" :key="index">
            <view class="info-box" v-if="item.sort >= 100">
              <view class="name">
                <span v-if="item.required" class="text-main">*</span>
                {{ item.problem }}<span>：</span>
              </view>

              <view class="value">
                <up-form-item :prop="String(item.id)">
                  <template v-if="item.type === 'opt'">
                    <view @click="selectClick(item, index)" class="w-full">
                      <up-input
                        style="pointer-events: none; width: 100%"
                        readonly
                        v-model="form[item.id]"
                        placeholder="请选择"
                      />
                    </view>
                  </template>
                  <template v-else-if="item.type === 'input'">
                    <up-input
                      type="input"
                      v-model="form[item.id]"
                      placeholder="请输入"
                    />
                  </template>
                  <template v-else-if="item.type === 'number'">
                    <up-input
                      type="number"
                      v-model="form[item.id]"
                      placeholder="请输入"
                    />
                  </template>
                  <template v-else-if="item.type === 'textarea'">
                    <up-textarea v-model="form[item.id]" placeholder="" />
                  </template>
                  <template v-if="item.type === 'radio'">
                    <view class="sort-limit-100">
                      <up-radio-group v-model="form[item.id]">
                        <up-radio
                          activeColor="#805844"
                          v-for="(i, k) in JSON.parse(item.content).sort(
                            (a, b) => a.sort - b.sort
                          )"
                          :label="i.value"
                          :key="k"
                          :name="i.value"
                        />
                      </up-radio-group>
                    </view>
                  </template>
                  <view class="info-tip">{{ item.description }}</view>
                </up-form-item>
              </view>
            </view>
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
      <view class="btn2" @click="submit">查看案例</view>
    </view>
  </view>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Navbar from "@/components/navbar/index.vue";
import { problemListAI, aiCaseSubmit } from "@/api/form";

import {
  onShareAppMessage,
  onShareTimeline,
  onPageScroll,
} from "@dcloudio/uni-app";
import { useWxShare, getBoundInfo } from "@/hooks/index.js";
const isBack = ref(true);
// 监听滚动
onPageScroll((e) => {
  if (e.scrollTop > 60 && isBack.value) {
    isBack.value = false;
  } else if (e.scrollTop <= 60 && !isBack.value) {
    isBack.value = true;
  }
});
// 微信分享
onShareAppMessage(() => ({}));
onShareTimeline(() => ({}));
useWxShare({
  path: "pages/join/index",
});
const actions = ref([]);
const selectIndex = ref(0);
const showSheet = ref(false);
const form = ref({
  16: "",
});
const rules = ref({
  0: [{ required: true, message: "请输入用户名", trigger: "change" }],
});

const boundInfo = ref({});
const uFormRef = ref(null);
const warn = ref("查看信息!<br>查看信息!<br>查看信息!<br>如符合要求!");
onMounted(() => {
  boundInfo.value = getBoundInfo();
  getForm();
});
const list = ref([]);

const goBack = () => {
  console.log(111);
  if (getCurrentPages().length > 1) {
    uni.navigateBack({
      delta: 1,
    });
  } else {
    uni.switchTab({
      url: "/pages/case/index",
    });
  }
};

const getForm = async () => {
  const data = await problemListAI();
  console.log(data);
  list.value = data.list;
  data.list.forEach((e) => {
    form.value[e.id] = "";
    if (e.required) {
      rules.value[e.id] = [
        { required: true, message: `必填项不能为空${e.id}`, trigger: "change" },
      ];
    }
  });

  console.log(form.value);
};

const selectClick = (e, i) => {
  selectIndex.value = i;
  actions.value = JSON.parse(e.content)
    .sort((a, b) => a.sort - b.sort)
    .map((e) => {
      return { ...e, name: e.value };
    });
  showSheet.value = true;
};

const submit = () => {
  uFormRef.value
    .validate()
    .then(async (res) => {
      const answer = [];
      Object.keys(form.value).forEach((key) => {
        if (key !== "id") {
          answer.push({ perblem_id: key, answer: form.value[key] });
        }
      });
      const data = await aiCaseSubmit(answer);
      const value = JSON.stringify(data.data.map((e) => e.vr_link));
      console.log(value);
      uni.navigateTo({ url: "/pagesForm/AIsheji/VR?urls=" + value });
    })
    .catch((errors) => {
      uni.showToast({
        title: "请仔细检查表单",
        icon: "none",
      });
    });
};
const selectSheet = (e) => {
  console.log(e, list.value, selectIndex.value);
  const id = list.value[selectIndex.value].id;
  form.value[id] = e.name;
  uFormRef.value.validateField([id]);
};
// const openMap = (id) => {
//   this.addressId = id;
//   const key = "HLKBZ-63FC3-TIB3F-OVW2T-EEMTZ-O5BT5";
//   const referer = "厘舍SPA";
//   uni.navigateTo({
//     url: "plugin://chooseLocation/index?key=" + key + "&referer=" + referer,
//   });
// };
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
        font-size: 28rpx !important;
        flex: 1;
      }
    }
  }
  .sort-limit-100 {
    .u-radio-group {
      margin-top: 0rpx !important;
      .u-radio {
        padding-top: 0rpx;
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
      min-width: 120rpx;
      font-size: 28rpx;
      line-height: 32rpx;
      padding-top: 8rpx;
      text-align: right;
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
