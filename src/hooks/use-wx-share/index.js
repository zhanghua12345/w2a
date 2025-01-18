import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

export const useWxShare = (options) => {
  const title = options?.title ?? "梵米尼全屋定制 - 细致打造品质生活";
  const path = options?.path ?? "";
  const query = options?.query ?? "";
  const imageUrl = options?.imageUrl ?? "";
  console.log({
    title,
    path: path ? `${path}${query ? `?${query}` : ""}` : "",
    imageUrl,
  });
  onShareAppMessage({
    title,
    path: path ? `${path}${query ? `?${query}` : ""}` : "",
    imageUrl,
  });
  onShareTimeline({
    title,
    query: options?.query ?? "",
    imageUrl,
  });
};
