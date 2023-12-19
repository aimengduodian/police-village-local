import { boot, store } from "quasar/wrappers";
import * as XLSX from "xlsx";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";
import { useUsersStore } from "stores/users-store";
import { useSoftwareStore } from "stores/software-store";

export default boot(({ app }) => {
  const softwareStore = useSoftwareStore();
  const villageStore = useVillageStore();
  const usersStore = useUsersStore();

  // 加载config文件
  fetch("/csv/config.xlsx")
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData.forEach((Element) => {
        // 存储软件信息信息
        softwareStore.setSoftNameAndVersionMsg(Element);

        // 设置初始行政区信息，用于设置初始地图信息
        villageStore.setVillageCode(Element.行政区代码);
      });
    })
    .catch((error) => {
      console.error("Error loading Excel data:", error);
    });

  // 加载摄像头配置文件
  fetch("/csv/cameraMessage.xlsx")
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const aTempArr = [];
      jsonData.forEach((Element) => {
        // 存储村庄信息
        aTempArr.push(Element);
      });
      // 信息存储到localStorage
      localStorage.setItem("cameraMessage", JSON.stringify(aTempArr));
      // 存储所有的监控信息
      villageStore.saveAllCameraMsg();
    })
    .catch((error) => {
      console.error("Error loading Excel data:", error);
    });

  // 加载地图相关文件
  fetch("/csv/city.xlsx")
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData.forEach((Element) => {
        // 序列化center和maxBounds
        Element.center = JSON.parse(Element.center);
        Element.maxBounds = JSON.parse(Element.maxBounds);
        if (Element.行政区代码.toString().length == 12) {
          const villageName = Element.行政区;
          const villageCode = Element.行政区代码;
          const villageFilePath = "/csv/" + villageCode + ".xlsx";
          // 获取村庄信息
          fetch(villageFilePath)
            .then((response) => response.arrayBuffer())
            .then((data) => {
              const workbook = XLSX.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const jsonData2 = XLSX.utils.sheet_to_json(worksheet);

              const aAllHouseHolderMsg = [];
              // 存储户主信息
              jsonData2.forEach((houseHolder) => {
                const item = [];
                item.push(houseHolder.纬度);
                item.push(houseHolder.经度);
                houseHolder.经纬度 = item;
                if (houseHolder.与户主关系 === "户主") {
                  aAllHouseHolderMsg.push(houseHolder);
                }
              });
              villageStore.saveHouseHolder(villageCode, aAllHouseHolderMsg);
              villageStore.saveAllVillagerMsg(villageName, jsonData2);
            })
            .catch((error) => {
              console.error("Error loading Excel data:", error);
            });
        }
      });
      // 存储村庄信息
      villageStore.villageMsg["祥符区"] = jsonData;
    })
    .catch((error) => {
      console.error("Error loading Excel data:", error);
    });

  // 加载用户信息
  fetch("/csv/login.xlsx")
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const aTempArr = [];
      jsonData.forEach((Element) => {
        // 存储村庄信息
        aTempArr.push(Element);
      });
      // 保存用户信息
      usersStore.saveAllUsersMsg(aTempArr);
    })
    .catch((error) => {
      console.error("Error loading Excel data:", error);
    });
});
