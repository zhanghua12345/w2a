/**
 * 获取状态栏元素信息，获取胶囊信息，获取导航栏元素信息
 * @returns {{boundWidth: (number|number), statusBarHeight: number, boundTop: number}}
 */
export const getBoundInfo = () => {
  const systemInfo = uni.getSystemInfoSync();
  if (systemInfo.uniPlatform !== "mp-weixin") {
    return {
      statusBarHeight: 0,
      boundWidth: 0,
      boundTop: 20,
      navBarHeight: 20, // 导航栏的高度
    };
  }
  console.log(uni.getMenuButtonBoundingClientRect());
  const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
  const boundWidth = uni.getMenuButtonBoundingClientRect()?.width || 0; // 胶囊宽度
  const boundHeight = uni.getMenuButtonBoundingClientRect()?.height || 0; // 胶囊高度
  const boundRight =
    systemInfo.windowWidth - uni.getMenuButtonBoundingClientRect()?.right || 7; // 胶囊距离右边宽度
  const boundTop =
    uni.getMenuButtonBoundingClientRect()?.top || statusBarHeight; // 胶囊距离状态栏的高度

  const navBarHeight = boundHeight + (boundTop - statusBarHeight) * 2; // 获取导航栏的高度（手机状态栏高度 + 胶囊高度 + 胶囊的上下间距）
  return {
    statusBarHeight, // 状态栏高度
    boundWidth, // 胶囊宽度
    boundHeight, // 胶囊高度
    boundTop, // 胶囊距离状态栏的高度
    boundRight,
    navBarHeight, // 导航栏的高度
  };
};
