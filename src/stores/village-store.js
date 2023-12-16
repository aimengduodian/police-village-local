import { defineStore } from "pinia";

export const useVillageStore = defineStore("village", {
  state: () => ({
    nowVillageCode: "",
    // 所有户主信息
    allHouseHolderMsg: {},
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
    // 开发测试功能，circleMarker标志开关
    circleMarkerState: "green",
  }),
  getters: {
    // 通过行政区代码获取选择的村庄地图信息（中心位置缩放等级等）
    getVillageMapMsgByVillageCode: (state) => {
      const aMapMsg = {};
      state.villageMsg["祥符区"].forEach((element) => {
        if (element.行政区代码 == state.nowVillageCode) {
          aMapMsg.maxBounds = element.maxBounds;
          aMapMsg.center = element.center;
          aMapMsg.zoom = element.zoom;
          aMapMsg.maxZoom = element.maxZoom;
          aMapMsg.minZoom = element.minZoom;
        }
      });
      return aMapMsg;
    },

    // 获取户成员信息
    getHouseNumberMsg: (state) => {
      const aHousePersonList = [];
      const array = state.allVillagerMsg;
      for (let key in array) {
        for (let i = 0; i < array[key].length; i++) {
          if (array[key][i].户号 == state.selectedVillagerMsg.户号) {
            aHousePersonList.push(array[key][i]);
          }
        }
      }
      return aHousePersonList;
    },

    // 获取村庄的户主信息列表
    getVillageHouseHolderMsg: (state) => {
      const aVillageCode = state.selectedVillageMsg.value;

      return state.allHouseHolderMsg[aVillageCode];
    },
  },
  actions: {
    // 存储选择的村民信息
    saveSelectedVillagerMsg(rVillagerMsg) {
      if (rVillagerMsg !== null) {
        this.selectedVillagerMsg = rVillagerMsg;
      }
    },

    // 存储选择的乡镇信息
    // villageMsg
    saveSelectedVillageMsg(rVillageMsg) {
      if (rVillageMsg !== null) {
        this.selectedVillageMsg = rVillageMsg;
      }
    },

    // 存储maxBounds信息
    saveMaxBounds(rBounds) {
      this.nowMaxBounds.villageMaxBounds = rBounds;
    },

    // 存储lockArea信息,是否锁定区域
    saveLockArea(rLock) {
      this.nowMaxBounds.lockArea = rLock;
    },

    // 存储选择的一户成员信息
    // rMsg = transparent 透明
    saveCircleMarkerState(rMsg) {
      if (rMsg !== null) {
        this.circleMarkerState = rMsg;
      }
    },

    // 存储所有户主信息
    saveHouseHolder(rVillageCode, rVillageHouseHolderArr) {
      if (rVillageCode !== "" && rVillageHouseHolderArr !== null) {
        this.allHouseHolderMsg[rVillageCode] = rVillageHouseHolderArr;
      }
    },

    // 存储所有villager信息
    // villageName: String; villageMsg: Object
    saveAllVillagerMsg(rVillageName, rVillageMsg) {
      if (rVillageName !== "" && rVillageMsg !== null) {
        this.allVillagerMsg[rVillageName] = rVillageMsg;
      }
    },

    // 设置进入软件后地图的中心位置、最大缩放等级等信息
    setVillageCode(rVillageCode) {
      this.nowVillageCode = rVillageCode;
    },
  },
});
