/**
 * 图片压缩
 * imgSrc 地址
 * scale 压缩质量 0-1
 * type 文件类型
 */
export const compressImgs = (imgSrc, scale, type, callback) => {
  // uni.$u.toast('压缩中')
  var img = new Image();
  img.src = imgSrc;
  img.onload = function () {
    var that = this;
    var h = (img.height * scale).toFixed(0); // 默认按质量比例压缩
    var w = (img.width * scale).toFixed(0);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var width = document.createAttribute("width");
    width.nodeValue = w;
    var height = document.createAttribute("height");
    height.nodeValue = h;
    canvas.setAttributeNode(width);
    canvas.setAttributeNode(height);
    ctx.drawImage(that, 0, 0, w, h);
    var base64 = canvas.toDataURL("image/jpeg", scale); //压缩比例
    canvas = null;
    if (type == "base64") {
      let data = {
        size: getBase64Size(base64),
        type: type,
        source: base64,
      };
      callback(base64);
    } else {
      let blob = base64ToBlob(base64);
      console.log("压缩后的大小", blob.size);
      const blobUrl = window.URL.createObjectURL(blob); //blob地址
      blob.source = blobUrl;
      callback(blob);
    }
  };
};
/**base转Blob */
const base64ToBlob = (base64) => {
  var arr = base64.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
};
/**获取base64的文件大小 */
const getBase64Size = () => {
  let size = 0;
  if (base64Str) {
    // 获取base64图片byte大小
    const equalIndex = base64Str.indexOf("="); // 获取=号下标
    if (equalIndex > 0) {
      const str = base64Str.substring(0, equalIndex); // 去除=号
      const strLength = str.length;
      const fileLength = strLength - (strLength / 8) * 2; // 真实的图片byte大小
      size = Math.floor(fileLength); // 向下取整
    } else {
      const strLength = base64Str.length;
      const fileLength = strLength - (strLength / 8) * 2;
      size = Math.floor(fileLength); // 向下取整
    }
  } else {
    size = null;
  }
  return size;
};
