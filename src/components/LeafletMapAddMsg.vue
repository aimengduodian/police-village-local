<template>
  <div id="leaflet-map" ref="mapContainer" />
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
// 引入leaflet插件的样式和脚本
import L from "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import * as R from "leaflet-responsive-popup";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";

export default {
  components: {},
  setup() {
    const store = useVillageStore();
    const mapContainer = ref(null);
    const map = ref(null);
    const center = ref([34.60999648, 114.43005323]);
    const zoom = ref(16);
    const maxZoom = ref(19);
    const minZoom = ref(15);
    // 地图滑动边界设置，设置地图最大边界范围
    const maxBounds = ref(null);

    // 户成员信息
    const aFamilyMembersList = ref(null);
    // 户成员信息弹窗
    const houseNumberDialog = ref(false);
    // 绑定弹出窗口
    const popup = ref(
      R.responsivePopup({
        hasTip: true,
        autoPan: false,
        offset: [15, 20],
      })
    );

    // 监测搜索村庄信息数据变换
    const aMapCenter = computed(() => store.selectedVillageMsg);
    // 监测nowMaxBounds信息
    const aMaxBounds = computed(() => store.nowMaxBounds.lockArea);
    // 监测搜索框搜索住户的数据变换
    const aVillager = computed(() => store.selectedVillagerMsg.公民身份证号);
    // 检测选择的村庄信息变化
    const aSelectVillage = computed(() => store.selectedVillageMsg);

    watch(aMapCenter, (_newVlaue, _oldValue) => {
      zoom.value = store.selectedVillageMsg.zoom;
      maxZoom.value = store.selectedVillageMsg.maxZoom;
      minZoom.value = store.selectedVillageMsg.minZoom;

      center.value = store.selectedVillageMsg.center;
      // 地图滑动边界设置，设置地图最大边界范围
      if (store.nowMaxBounds.lockArea) {
        maxBounds.value = store.nowMaxBounds.villageMaxBounds;
      } else {
        maxBounds.value = store.nowMaxBounds.MaxBounds;
      }
    });

    watch(aMaxBounds, (_newVlaue, _oldValue) => {
      if (aMaxBounds.value) {
        maxBounds.value = store.nowMaxBounds.villageMaxBounds;
      } else {
        maxBounds.value = store.nowMaxBounds.MaxBounds;
      }
    });

    watch(aVillager, (_newVlaue, _oldValue) => {
      // 解除地图锁定
      store.saveLockArea(false);
      // 移动地图到目标位置
      map.value.panTo(store.selectedVillagerMsg.经纬度);
      // 移除所有标记
      removeMarkers();
      // 添加标记
      L.marker(store.selectedVillagerMsg.经纬度)
        .addTo(map.value)
        .bindPopup(popup.value);

      // 更新弹出内容
      updatePopupContent(store.selectedVillagerMsg);
    });

    watch(aSelectVillage, (_newVlaue, _oldValue) => {
      // 村庄的所有户主信息
      const aAllHouseHolderArr = store.getVillageHouseHolderMsg;
      // 村庄的中心位置
      const aCenter = aSelectVillage.value.center;

      // 移动地图到目标位置
      map.value.panTo(aCenter);

      // 移除所有标记
      removeMarkers();

      // 添加标记
      aAllHouseHolderArr.forEach((element) => {
        L.circle(element.经纬度, {
          villager: element,
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 5,
        })
          .addTo(map.value)
          .bindPopup(popup.value)
          .on("click", function (e) {
            store.saveSelectedVillagerMsg(e.target.options.villager);
          });
      });
    });

    // 更新弹出窗口内容的方法
    const updatePopupContent = (rVillagerMsg) => {
      const popupContent = document.createElement("div");
      popupContent.innerHTML = `
            <button id="popup-btn" outline style="color: blue;">显示户成员</button>
            <div class="text-h6 q-mb-md">
              ${rVillagerMsg.姓名}
            </div>
            <p>
              与户主关系:${rVillagerMsg.与户主关系} <br />
              姓名:${rVillagerMsg.姓名} <br />
              性别: ${rVillagerMsg.性别} <br />
              出生日期: ${rVillagerMsg.出生日期} <br />
              电话号码: ${rVillagerMsg.电话号码}<br />
            </p>
          `;
      popup.value.setContent(popupContent);

      const btn = popupContent.querySelector("#popup-btn");
      btn.addEventListener("click", handleButtonClick);
    };

    // 处理按钮点击事件的方法
    const handleButtonClick = () => {
      aFamilyMembersList.value = store.getHouseNumberMsg;
      houseNumberDialog.value = true;
    };

    // 移除所有的标记
    const removeMarkers = () => {
      // Remove all markers from the map
      map.value.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.value.removeLayer(layer);
        }
      });
    };

    onMounted(() => {
      map.value = L.map(mapContainer.value).setView(center.value, zoom.value);
      L.tileLayer("/map/{z}/{x}/{y}.jpg", {
        center: center.value,
        attribution: "© OpenStreetMap",
        maxZoom: maxZoom.value,
        minZoom: minZoom.value,
        maxBounds: maxBounds.value,
      }).addTo(map.value);
    });

    return {
      mapContainer,
      popup,
      houseNumberDialog,
      maximizedToggle: ref(true),
      aFamilyMembersList,
    };
  },
};
</script>

<style scoped>
#leaflet-map {
  height: 110vh;
  width: 100vw;
}
</style>
