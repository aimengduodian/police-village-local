import { boot } from "quasar/wrappers";
import * as XLSX from "xlsx";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";

export default boot(({ app }) => {
  const store = useVillageStore();
  // 加载xlsx文件
  fetch("/csv/city.xlsx")
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData.forEach((Element) => {
        Element.center = JSON.parse(Element.center);
        Element.maxBounds = JSON.parse(Element.maxBounds);
        if (Element.行政区代码.toString().length == 12) {
          const villageName = Element.行政区;
          const villageFilePath = "/csv/" + Element.行政区代码 + ".xlsx";
          // 存储村庄信息
          fetch(villageFilePath)
            .then((response) => response.arrayBuffer())
            .then((data) => {
              const workbook = XLSX.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const jsonData2 = XLSX.utils.sheet_to_json(worksheet);

              // 存储户主信息
              jsonData2.forEach((Element) => {
                const item = [];
                item.push(Element.纬度);
                item.push(Element.经度);
                Element.经纬度 = item;
                if (Element.与户主关系 === "户主") {
                  store.allHouseHolderMsg.push(Element);
                }
              });

              store.allVillagerMsg[villageName] = jsonData2;
            })
            .catch((error) => {
              console.error("Error loading Excel data:", error);
            });
        }
      });
      // 存储村庄信息
      store.villageMsg["祥符区"] = jsonData;
    })
    .catch((error) => {
      console.error("Error loading Excel data:", error);
    });
});
