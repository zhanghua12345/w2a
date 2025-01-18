/**
 * 跳转到小程序
 * @param appId 小程序appId
 * @param path 打开页面的路径，如果为空则打开首页
 * @param envVersion 打开的小程序版本
 * @returns Promise<void>
 */
export const navMiniProgram = (appId, path = "", envVersion = "release") => {
  return new ((resolve, reject) => {
    uni.navigateToMiniProgram({
      appId,
      path,
      envVersion,
      success: () => {
        resolve();
      },
      fail: (err) => {
        reject(err);
      },
    });
  })();
};
