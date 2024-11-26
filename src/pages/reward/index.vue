<template>
  <view class="px-32 py-24">
    <!-- <view class="w-full flex flex-wrap justify-end">
      <image
        class="w-36 h-36"
        src="/static/reward/question.png"
        @click="showReadme = true"
      ></image>
    </view> -->
    <view class="daily w-full h-528">
      <view class="ml-32 pt-46 h-134">
        <view class="text-fff">{{ $t("reward.Donate Balance") }}</view>
        <view class="flex flex-wrap items-center justify-start mt-4">
          <image class="w-32 h-32" src="/static/reward/gold.png"></image>
          <view
            class="text-FF477C pl-12 text-36 font-400"
            style="line-height: 42rpx"
          >
            {{ data.send_coin_left_total }}
          </view>
        </view>
      </view>
      <view class="mt-54">
        <view
          class="px-32 h-full w-full z-10 top-0 left-0"
          :class="data.sign_in.sign_in_list.length <= 0 && 'hidden'"
        >
          <view class="text-fff">{{ $t("reward.Daily Cheak-in") }}</view>
          <up-skeleton
            :loading="initLoading"
            :animate="true"
            rows="3"
            class="mt-24"
          >
            <view class="flex flex-wrap justify-between mt-24">
              <view
                class="flex flex-col items-center w-88"
                v-for="(item, index) in data.sign_in.sign_in_list"
                :key="index"
              >
                <view
                  class="w-72 h-108 rounded-8 bg-353535 flex flex-col justify-center items-center"
                  :class="item.is_sign_in === 1 && 'opacity-60'"
                >
                  <image
                    class="w-32 h-32"
                    :src="`/static/reward/${
                      item.is_sign_in ? 'gold-check' : 'gold'
                    }.png`"
                  ></image>

                  <view class="text-fff pt-2 text-20 font-400"
                    >+{{ item.sign_in_coin }}</view
                  >
                </view>

                <view
                  class="pt-14 text-20"
                  :class="item.is_sign_in ? 'text-8B8B8B' : 'text-fff'"
                  >{{
                    item.is_today
                      ? $t("reward.Today")
                      : locale === "zh" || locale === "zh_hk"
                      ? $t("reward.di") +
                        " " +
                        item.day_num +
                        " " +
                        $t("reward.tian")
                      : $t("reward.Day") + " " + item.day_num
                  }}</view
                >
              </view>
            </view>
            <up-button
              class="mt-18 custom-style"
              size="small"
              :disabled="!!data.sign_in.today_is_sign"
              shape="circle"
              :color="data.sign_in.today_is_sign ? '#8B8B8B' : buttonColor"
              :loading="loading"
              :loadingText="$t('reward.Cheak in')"
              @click="checkSignIn"
              >{{
                $t(
                  data.sign_in.today_is_sign
                    ? "reward.Come back tomorrow"
                    : "reward.Cheak in"
                )
              }}</up-button
            >
          </up-skeleton>
        </view>
      </view>
    </view>
    <view class="mt-24" v-for="(item, index) in list" :key="index">
      <view class="text-fff">{{ $t("reward." + item.label) }} </view>
      <view
        class="rounded-32 pl-36 pr-26 py-24 flex flex-wrap justify-between items-start mt-24 relative overflow-hidden"
        v-for="(value, key, i) in item.items"
        :key="i"
        v-show="value.is_show"
      >
        <view
          class="absolute top-0 left-0 w-full h-full rounded-32 bg-gradient-to-t from-8E8E8E to-707070 opacity-20"
        ></view>
        <image
          class="w-48 h-48 mt-12"
          :src="`/static/reward/${value.icon}.png`"
        ></image>
        <view class="px-30 flex-1 text-24">
          <view class="text-fff">
            {{ $t("reward." + value.label) }}
            <span class="pl-4" v-if="index === 1 && i === 0">
              {{ value.user_watch_ad_num }}/{{ value.watch_ad_conf_num }}
            </span>
            <span class="pl-4" v-if="index === 1 && i === 1 && value.watch_num">
              ({{ value.watch_num }}/{{ value.watch_num_all }})
            </span>
          </view>
          <view class="text-FF477C"
            >+{{ `${value.coin} ${$t("reward." + value.text)}` }}</view
          >
          <view
            class="step w-292 flex flex-wrap items-start pt-8"
            v-if="index === 1"
          >
            <pro-gress :StepInfo="value"></pro-gress>
          </view>
        </view>
        <view class="w-144 mt-4">
          <up-button
            size="small"
            shape="circle"
            class="custom-style"
            :disabled="!!value.is_complete"
            @click="!value.is_complete && clickButton(value)"
            :color="!value.is_complete ? buttonColor : '#8B8B8B'"
            :text="$t('reward.' + value.buttonText)"
          />
        </view>
      </view>
    </view>
  </view>
  <view
    class="text-20 text-center text-8B8B8B"
    v-if="mobileType === 'ios' && locale === 'en'"
    >{{ $t("common.This event is not related to Apple Inc") }}</view
  >
  <up-popup mode="center" v-model:show="successGold" bgColor="transparent">
    <view class="flex flex-col relative items-center">
      <image
        class="w-250 h-250 relative z-50"
        :src="`/static/reward/popup-icon.png`"
      ></image>
      <view
        class="w-608 pb-40 bg-200-95 rounded-32 flex flex-col items-center px-100"
        :style="{ 'margin-top': ' -68px' }"
      >
        <view class="text-FF477C pt-140 text-40">{{
          popupData?.itemType === "sign"
            ? $t("reward.Successful Check")
            : $t("reward.Congratulations")
        }}</view>
        <view class="flex flex-wrap items-center justify-start mt-32">
          <image class="w-48 h-48" src="/static/reward/gold.png"></image>
          <view class="text-fff pl-12 text-40 font-600 leading-1">
            +{{ popupData.coin }}
          </view>
        </view>
        <up-button
          size="small"
          shape="circle"
          class="custom-style mt-44"
          @click="successGold = false"
          :color="buttonColor"
          :text="$t('reward.ok')"
        />
      </view>
    </view>
  </up-popup>
  <up-popup
    mode="center"
    v-model:show="showReadme"
    bgColor="transparent"
    closeable
  >
    <view class="flex flex-col items-center">
      <view class="text w-600 pt-38 pb-56 px-42 text-fff bg-2F3034 rounded-28">
        <view class="text-28">{{ $t("reward.Reward Rules") }}</view>
        <view class="text-28 pt-24" v-html="$t('reward.readme')"> </view>
      </view>
    </view>
  </up-popup>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import proGress from "@/components/progress/progress.vue";
import {
  activeViewData,
  activeUserSignIn,
  getAllCoinWithActivity,
  postFollowUsOnDifferentPlatforms,
} from "@/api/header";
import { useI18n } from "vue-i18n";
const loading = ref(false);
const successGold = ref(false);
const popupData = ref(null);
const { locale } = useI18n();
const showReadme = ref(false);
import { storeToRefs } from "pinia";
import { userStore } from "@/store/userStore";

const { token, headersParam } = storeToRefs(userStore());
const list = reactive([
  {
    label: "Novice task",
    items: {
      user_first_login_send: {
        type: "novice",
        icon: "task-1",
        itemType: "login",
        label: "Bind my account",
        text: "Donate",
        buttonText: "GO",
        disabled: false,
      },
      open_sys_notify: {
        type: "novice",
        icon: "task-8",
        itemType: "open_notify",
        label: "Turn push notification",
        text: "Donate",
        buttonText: "GO",
        disabled: false,
      },
      follow_tiktok_send: {
        type: "novice",
        icon: "task-2",
        itemType: "go_tiktok",
        link: "https://www.tiktok.com/@guyantv",
        label: "Follow us on TikTok",
        text: "Donate",
        buttonText: "GO",
        disabled: false,
      },
      follow_youtube_send: {
        type: "novice",
        icon: "task-3",
        itemType: "go_youtube",
        link: "https://www.youtube.com/@GuYanTV-x7n",
        label: "Follow us on Youtube",
        text: "Donate",
        buttonText: "GO",
        disabled: false,
      },
      follow_facebook_send: {
        type: "novice",
        icon: "task-4",
        itemType: "go_facebook",
        label: "Follow us on Facebook",
        link: "https://www.facebook.com/profile.php?id=61566611231172",
        text: "Donate",
        buttonText: "GO",
        disabled: false,
      },

      follow_instagram_send: {
        type: "novice",
        icon: "task-5",
        itemType: "go_instagram",
        label: "Follow us on Instagram",
        link: "https://www.instagram.com/guyan_168/",
        text: "Donate",
        buttonText: "GO",
        disabled: false,
      },
    },
  },
  {
    label: "Daily task",
    items: {
      watch_ad: {
        type: "novice",
        icon: "task-6",
        itemType: "watch_ads",
        label: "Watch Ads",
        text: "Donate per episode",
        buttonText: "Watch",
        disabled: false,
      },
      watch_video: {
        type: "novice",
        icon: "task-7",
        itemType: "watch_video",
        label: "Watch a whole series",
        text: "Donate",
        buttonText: "Watch",
        disabled: false,
      },
    },
  },
]);
const initLoading = ref(true);
const height = ref(0);
const data = ref({ sign_in: { today_is_sign: null, sign_in_list: [] } });
window.loginCallback = (e) => {
  token.value = e;
  getCoinWithActivity();
};
window.watchVideoCallBack = () => {
  getCoinWithActivity();
};
window.appCallBack = () => {
  getCoinWithActivity();
};
const getCoinWithActivity = (isInit = true) => {
  getAllCoinWithActivity().then((res) => {
    if (isInit) {
      initData();
      if (res.coins) {
        popupData.value = {
          ...popupData.value,
          coin: res.coins,
        };
        successGold.value = true;
      } else {
        successGold.value = false;
      }
    }
  });
};
const mobileType = ref("");
const buttonColor =
  "linear-gradient(135deg,rgba(254, 83, 81, 1) 0, rgba(254, 52, 91, 1) 50.999999%, rgba(254, 57, 100, 1) 100%)";
onMounted(async () => {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    mobileType.value = "ios";
  } else if (navigator.userAgent.match(/android/i)) {
    mobileType.value = "android";
  }
  height.value = window.innerHeight;
  try {
    await appGet();
  } catch (error) {}
});

/**
 * 与app交互
 * type：login  go_tiktok  go_youtube  go_facebook  go_instagram  watch_ads  watch_video
 * is_complete:是否禁用
 * is_show：是否显示
 * data：数据
 * */
const obj = {
  go_facebook: "follow_facebook_send_coin",
  go_tiktok: "follow_tiktok_send_coin",
  go_youtube: "follow_youtube_send_coin",
  go_instagram: "follow_instagram_send_coin",
};
const appGet = async (data) => {
  if (
    data?.type &&
    ["go_facebook", "go_tiktok", "go_youtube", "go_instagram"].includes(
      data.type
    )
  ) {
    followUsOnDifferentPlatforms({ follow_platform: obj[data.type] });
  }
  if (mobileType.value === "android") {
    if (data) {
      window.AndroidInterface.js2app(JSON.stringify(data));
    } else {
      try {
        const res = await window.AndroidInterface.getUserInfo();
        headersParam.value = JSON.parse(res);
        token.value = JSON.parse(res).token;
        locale.value = headersParam.value.lang;
        console.log(headersParam.value);
        initData();
      } catch (error) {
        initData();
      }
    }
  } else {
    if (data) {
      window.webkit.messageHandlers["js2app"].postMessage(data);
    } else {
      try {
        window.receiveDataFromNative = function (value) {
          headersParam.value = value;
          token.value = value.token;
          locale.value = value.lang;
          initData();
        };
      } catch (error) {
        initData();
      }
    }
  }
};

const clickButton = (e) => {
  if (e.itemType !== "watch_video") {
    appGet({
      type: e.itemType,
      is_complete: e.is_complete,
      is_show: e.is_show,
      data: {
        link: e.link || "",
      },
    });
  } else {
    appGet({
      type: e.itemType,
      is_complete: e.is_complete,
      is_show: e.is_show,
      data: {
        watch_num: String(e.watch_num || 0),
        // lineList: e.lineList || "",
        activity_id: e.activity_id || "",
        short_play_id: e.short_play_id || "",
      },
    });
  }
};
// 签到
const checkSignIn = () => {
  if (data.value.sign_in.today_is_sign) return false;
  loading.value = true;
  activeUserSignIn()
    .then((res) => {
      loading.value = false;
      popupData.value = data.value.sign_in.sign_in_list.find(
        (e) => e.is_today === 1
      );
      popupData.value = {
        ...popupData.value,
        coin: popupData.value.sign_in_coin,
        itemType: "sign",
      };
      successGold.value = true;
      getCoinWithActivity();
    })
    .catch((res) => {
      loading.value = false;
      uni.showToast({
        title: res.msg || "签到失败",
        icon: "none", //如果要纯文本，不要icon，将值设为'none'
        success: function () {
          initData();
        },
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

const followUsOnDifferentPlatforms = (data) => {
  postFollowUsOnDifferentPlatforms(data).then(() => {
    initData();
  });
};
// 获取数据
const initData = () => {
  activeViewData()
    .then((res) => {
      initLoading.value = false;
      data.value = res;
      for (const key in res.active_list) {
        if (list[0].items[key]) {
          list[0].items[key] = {
            ...list[0].items[key],
            ...res.active_list[key],
          };
        }
      }
      list[1].items.watch_ad = {
        ...list[1].items.watch_ad,
        is_complete: !!(
          res.watch_ad.user_watch_ad_num >= res.watch_ad.watch_ad_conf_num
        ),
        ...res.watch_ad,
        coin: res.watch_ad.watch_ad_conf_coin,
        lineStep: res.watch_ad.watch_ad_conf_num,
        lineInStep: res.watch_ad.user_watch_ad_num,
        lineList: [],
      };
      const rule_list = Object.keys({ 0: 0, ...res.watch_video.rule_list });
      let lineInStep = 0;
      if (
        Number(rule_list[rule_list.length - 1]) <= res.watch_video.watch_num
      ) {
        lineInStep = rule_list.length - 1;
      } else {
        lineInStep = rule_list.findIndex((e, index) => {
          return (
            Number(e) <= res.watch_video.watch_num &&
            Number(rule_list[index + 1]) > res.watch_video.watch_num
          );
        });
      }
      if (res.watch_video.rule_list) {
        list[1].items.watch_video = {
          ...list[1].items.watch_video,
          ...res.watch_video,
          is_complete: !!(
            res.watch_video.watch_num >=
            Number(
              Object.keys(res.watch_video.rule_list)[
                Object.keys(res.watch_video.rule_list).length - 1
              ]
            )
          ),
          coin: Object.values(res.watch_video.rule_list).reduce(
            (a, b) => Number(a) + Number(b)
          ),
          lineStep: rule_list.length,
          lineInStep: lineInStep,
          lineList: { 0: 0, ...res.watch_video.rule_list },
          watch_num_all: Object.keys(res.watch_video.rule_list)[
            Object.keys(res.watch_video.rule_list).length - 1
          ],
        };
      }
      getCoinWithActivity(false);
    })
    .catch((error) => {
      uni.showToast({
        title: error.message || "ERR_BAD_REQUEST",
        icon: "none", //如果要纯文本，不要icon，将值设为'none'
      });
    });
};
</script>

<style scoped lang="scss">
body {
  background: transparent;
}
.daily {
  background-image: url("@/static/reward/gift-bg.png");
  background-size: cover;
  background-size: 100% 100%;
}
.custom-style {
  opacity: 1 !important;
  height: 72rpx;
  line-height: 72rpx;
}
.step-active {
  &::before {
    width: var(--stepActive);
  }
}
</style>
