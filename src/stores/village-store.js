import { defineStore } from "pinia";

export const useVillageStore = defineStore("village", {
  state: () => ({
    // 登录用户
    user: null,
    // 所有户主信息
    allHouseHolderMsg: [],
    // 所有村民信息
    allVillagerMsg: {},
    // 村庄信息
    villageMsg: {},
    // 选择的村庄信息（坐标、名称、缩放等级等）
    selectedVillageMsg: {},
    // 选择的村民信息（姓名、家坐标、户id，等信息）
    selectedVillagerMsg: {},
    // 户成员信息(eg: 妻子、儿子、女儿...)
    houseNumberArr: [],
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
    getVillageMsg(state) {
      return state.villageMsg;
    },

    getAllVillagerMsg(state) {
      return state.allVillagerMsg;
    },
  },
  actions: {
    // 存储选择的村民信息
    saveSelectedVillagerMsg(villagerMsg) {
      if (villagerMsg !== null) {
        this.selectedVillagerMsg = villagerMsg;
        console.log(this.selectedVillagerMsg);
      }
    },

    // 存储选择的乡镇信息
    // villageMsg
    saveSelectedVillageMsg(villageMsg) {
      if (villageMsg !== null) {
        this.selectedVillageMsg = villageMsg;
      }
    },

    // 存储选择的一户成员信息
    saveHouseNumberMsg(aHouseNumber) {
      if (aHouseNumber !== null) {
        this.houseNumberArr = aHouseNumber;
      }
    },
  },
});
