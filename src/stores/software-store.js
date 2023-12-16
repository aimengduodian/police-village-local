import { defineStore } from "pinia";

export const useSoftwareStore = defineStore("software", {
  state: () => ({
    // 软件名称，
    softName: "",
    // 软件介绍
    softDes: "",
    // 软件版本
    version: "",
  }),
  getters: {},
  actions: {
    // 加载软件名称和版本号
    setSoftNameAndVersionMsg(rMsg) {
      this.softName = rMsg.软件名称;
      this.softDes = rMsg.软件介绍;
      this.version = rMsg.软件版本;
    },
  },
});
