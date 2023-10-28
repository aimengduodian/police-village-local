import { defineStore } from "pinia";
import Papa from "papaparse";

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
    // 村庄信息加载信息
    villageMsgLoadDone: [],
    // 选择的村庄信息（坐标、名称、缩放等级等）
    selectedVillageMsg: {},
    // 选择的村民信息（姓名、家坐标、户id，等信息）
    selectedVillagerMsg: {},
    // 一家所有户成员信息
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
        console.log(this.selectedVillageMsg);
      }
    },

    // 存储选择的一户成员信息
    saveHouseNumberMsg(aHouseNumber) {
      if (aHouseNumber !== null) {
        this.houseNumberArr = aHouseNumber;
      }
    },

    // increment() {this.counter++;},
    // 加载AllVillagerMsg信息
    // csvFilePath csv文件路径 '/csv/zhonggang.csv'
    async loadHouseHolderCSVData(aCsvName, csvFilePath) {
      try {
        const response = await fetch(csvFilePath);
        const csvString = await response.text();
        Papa.parse(csvString, {
          header: true, //是否有表头
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            // 存储村庄信息
            results.data.forEach((Element) => {
              Element.经纬度 = JSON.parse(Element.经纬度);
              if (Element.与户主关系 === "户主") {
                this.allHouseHolderMsg.push(Element);
              }
            });

            this.allVillagerMsg[aCsvName] = results.data;
          },
          error: () => {
            console.error("CSV parsing error:");
          },
        });
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    },

    // 加载乡镇信息
    async loadVillageCSVData(aVillage, csvFilePath) {
      try {
        const response = await fetch(csvFilePath);
        const csvString = await response.text();
        Papa.parse(csvString, {
          header: true, //是否有表头
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            // 存储村庄信息
            results.data.forEach((Element) => {
              console.log(Element);
              Element.center = JSON.parse(Element.center);
              Element.maxBounds = JSON.parse(Element.maxBounds);
              if (Element.行政区代码.toString().length == 12) {
                // 存储村庄信息
                this.loadHouseHolderCSVData(
                  Element.行政区,
                  "/csv/" + Element.行政区代码 + ".csv"
                );
              }
            });
            this.villageMsg[aVillage] = results.data;
            console.log(this.villageMsg);
          },
          error: () => {
            console.error("CSV parsing error:");
          },
        });
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    },
  },
});
