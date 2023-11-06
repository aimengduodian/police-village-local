import { defineStore } from "pinia";

export const useVillageStore = defineStore("village", {
  state: () => ({
    // 登录用户
    user: null,
    // 软件名称，
    softName: "",
    // 软件介绍
    softDes: "",
    // 所有户主信息
    allHouseHolderMsg: [],
    // 所有村民信息
    allVillagerMsg: {},
    // 村庄信息
    villageMsg: {},
    // 选择的村庄信息（坐标、名称、缩放等级等）
    selectedVillageMsg: {},
    // 锁定区域,当lockArea为false，MaxBounds赋值为villageMaxBounds
    // 否则设置为lockMaxBounds
    nowMaxBounds: {
      lockArea: false,
      MaxBounds: [
        [34.98626, 114.97584],
        [34.44839, 113.87584],
      ],
      villageMaxBounds: [],
    },
    // 选择的村民信息（姓名、家坐标、户id，等信息）
    selectedVillagerMsg: {},
    // 户成员信息(eg: 妻子、儿子、女儿...)
    houseNumberArr: [],
    // 开发测试功能，circleMarker标志开关
    circleMarkerState: "transparent",
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // 加载软件名称和版本号
    setSoftNameAndVersionMsg(aName, aDes) {
      this.softName = aName;
      this.softDes = aDes;
    },
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

    // 存储maxBounds信息
    saveMaxBounds(bounds) {
      this.nowMaxBounds.villageMaxBounds = bounds;
    },

    // 存储lockArea信息,是否锁定区域
    saveLockArea(lock) {
      this.nowMaxBounds.lockArea = lock;
    },

    // 存储选择的一户成员信息
    saveHouseNumberMsg(aHouseNumber) {
      if (aHouseNumber !== null) {
        this.houseNumberArr = aHouseNumber;
      }
    },

    // 存储选择的一户成员信息
    saveCircleMarkerState(state) {
      if (state !== null) {
        this.circleMarkerState = state;
      }
    },

    // 存储所有户主信息
    savehouseHolder(state) {
      if (state !== null) {
        this.allHouseHolderMsg.push(state);
      }
    },

    // 存储所有villager信息
    // villageName: String; villageMsg: Object
    saveAllVillagerMsg(villageName, villageMsg) {
      if (villageName !== "" && villageMsg !== null) {
        this.allVillagerMsg[villageName] = villageMsg;
      }
    },
  },
});
