export function getLocationInf() {
  return new Promise((resolve, reject) => {
    const rejectGetLocation = () => {
      uni.showToast({
        title: "您拒绝了位置授权，小程序无法继续提供服务~",
        icon: "none",
        duration: 3000,
      });
    };
    const getLocation = () => {
      uni.getLocation({
        type: "gcj02",
        success: (res) => {
          const { latitude, longitude } = res;
          resolve({
            latitude,
            longitude,
          });
        },
        fail: (err) => {
          reject("获取位置信息失败：" + JSON.stringify(err));
        },
      });
    };
    const openSetting = () => {
      uni.showModal({
        title: "提示",
        content: "我们需要获取您的位置信息，为您提供服务~",
        success: (res) => {
          if (res.confirm) {
            uni.openSetting({
              success: (res) => {
                if (res.authSetting["scope.userLocation"] === true) {
                  getLocation();
                } else {
                  rejectGetLocation();
                }
              },
              fail: (err) => {
                reject("小程序授权弹窗打开失败");
              },
            });
          } else if (res.cancel) {
            rejectGetLocation();
          }
        },
      });
    };
    const getAuthorize = (a = "scope.userLocation") => {
      // uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
      uni.authorize({
        scope: a,
        success: () => {
          getLocation();
        },
        fail: () => {
          openSetting();
        },
      });
    };
    // 小程序是否拥有访问定位信息的权限
    const isAuthorized = (a = "scope.userLocation") => {
      // 检查当前是否已经授权访问scope属性
      uni.getSetting({
        success: (res) => {
          let userLocation = res.authSetting[a];
          if (!userLocation) {
            // 判断当前是否获得授权，如果没有就去申请授权
            getAuthorize();
          } else {
            getLocation();
          }
        },
        fail: (err) => {
          openSetting();
        },
      });
    };
    const openAppAuthorizeSetting = () => {
      uni.openAppAuthorizeSetting({
        success: (res) => {
          isAuthorized();
        },
        fail: (err) => {
          reject("打开系统微信授权管理页失败");
        },
      });
    };
    // 手机GPS定位已开启则判断微信APP是否已获取访问定位信息的权限
    const isAppAuthorized = () => {
      // 微信APP授权设置
      const appAuthorizeSetting = uni.getAppAuthorizeSetting();
      // 是否允许微信使用定位信息的开关
      let locationAuthorized = appAuthorizeSetting.locationAuthorized;
      // 'authorized'：表示用户已经允许应用程序使用定位服务。
      // 'denied'：表示用户已经拒绝了应用程序使用定位服务的请求。
      // 'not determined'：表示用户尚未做出是否允许应用程序使用定位服务的决定，这可能是因为用户还未收到相关的授权请求。
      // 'config error'：表示定位服务配置错误，可能是由于应用程序的设置或环境配置问题导致的。
      switch (locationAuthorized) {
        case "authorized":
          isAuthorized();
          break;
        case "denied":
          uni.showModal({
            title: "提示",
            content:
              "已拒绝微信获取定位权限，即将打开权限管理页面，请把定位权限设置为允许~",
            confirmText: "前往设置",
            success: (res) => {
              if (res.confirm) {
                openAppAuthorizeSetting();
              } else if (res.cancel) {
                rejectGetLocation();
              }
            },
          });
          break;
        case "not determined":
          uni.showModal({
            title: "提示",
            content: "请授权微信获取定位权限~",
            confirmText: "同意授权",
            success: (res) => {
              if (res.confirm) {
                openAppAuthorizeSetting();
              } else if (res.cancel) {
                rejectGetLocation();
              }
            },
          });
          break;
      }
    };
    // 首先判断手机是否开启GPS
    const isLocationEnable = () => {
      //获取用户手机系统信息
      uni.getSystemInfo({
        success: (res) => {
          const locationEnabled = res.locationEnabled;
          if (locationEnabled) {
            isAppAuthorized();
          } else {
            // 手机GPS定位未开启则引导用户手动前往开启
            uni.showModal({
              title: "提示",
              content:
                '小程序需要基于您的手机定位信息为您提供服务，当前检测到您的手机并未打开定位开关，请关闭小程序后前往 "设置 - 定位服务/位置信息" 开启手机定位，然后重新进入小程序~',
              showCancel: false,
              confirmText: "我已知悉",
            });
          }
        },
        fail: (err) => {
          reject("用户手机系统信息获取失败");
        },
      });
    };
    isLocationEnable();
  });
}
