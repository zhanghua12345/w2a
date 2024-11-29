import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

export const useWxShare = (options) => {
  const title = options?.title ?? "梵米尼家具优选";
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
