import { defineStore } from "pinia";

export const userStore = defineStore({
  id: "user",
  state: () => {
    return {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6MzUzNjQsImlzX3RvdXJpc3QiOnRydWUsImV4cGlyZV90aW1lIjoxNzMwNjg5NjU2fQ.e1jIZOrecvAHaDq1Qnj09hBPdHPvmnsJ-13j7pUcOAQ",
      headersParam: {
        time_zone: "GMT+00:00",
        lang: "en",
        type: "ios", // android & ios
      },
    };
  },
  getters: {},
  actions: {},
});
