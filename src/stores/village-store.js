import { defineStore } from "pinia";
import Papa from "papaparse";

export const useVillageStore = defineStore("village", {
  state: () => ({
    // 登录用户
    user: null,
    // 房屋住户
    houseHolderMsg: {},
    // 村庄信息
    villageMsg: {},
    // 村庄信息加载信息
    villageMsgLoadDone: [],
    // 选择的村庄信息（坐标、名称、缩放等级等）
    selectedVillageMsg: {},
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
    getVillageMsg(state) {
      return state.villageMsg;
    },

    getHouseHolderMsg(state) {
      return state.houseHolderMsg;
    },
  },
  actions: {
    // 存储选择的乡镇信息
    // villageMsg类型String
    saveSelectedVillageMsg(villageMsg) {
      if (villageMsg !== null) {
        this.selectedVillageMsg = villageMsg;
        console.log(this.selectedVillageMsg);
      }
    },

    // increment() {this.counter++;},
    // 加载houseHolderMsg信息
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
            });
            console.log(results.data);
            this.houseHolderMsg[aCsvName] = results.data;
            // 数据加载完成存储到数组中
            this.villageMsgLoadDone.push(aCsvName);
          },
          error: () => {
            console.error("CSV parsing error:");
          },
        });
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    },

    async loadCSVData(aVillage, csvFilePath) {
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
              Element.center = JSON.parse(Element.center);
              Element.maxBounds = JSON.parse(Element.maxBounds);
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
