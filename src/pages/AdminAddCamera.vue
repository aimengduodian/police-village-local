<template>
  <div id="leaflet-map">
    <l-map
      :center="center"
      :zoom="zoom"
      :max-zoom="maxZoom"
      :min-zoom="minZoom"
      :max-bounds="maxBounds"
      ref="myComponentRef"
      @click="onMapClick"
    >
      <l-tile-layer :url="'/map/{z}/{x}/{y}.jpg'" :max-zoom="maxZoom" />
      <add-camera :initialMessage="clickLatLng" />
      <camera-marker />
    </l-map>
  </div>
</template>

<script>
// 引入leaflet插件的样式和脚本
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

// 引入pinia插件
import { useVillageStore } from "stores/village-store";
import { onMounted, computed, ref, watch } from "vue";

// 引入组件
import AddCamera from "components/AddCamera.vue";
import CameraMarker from "components/MarkerCamera.vue";

export default {
  components: {
    LMap,
    LTileLayer,
    AddCamera,
    CameraMarker,
  },
  setup() {
    const store = useVillageStore();
    const aMapMsg = store.getVillageMapMsgByVillageCode;
    const zoom = ref(aMapMsg.zoom);
    const maxZoom = ref(aMapMsg.maxZoom);
    const minZoom = ref(aMapMsg.minZoom);
    const center = ref(aMapMsg.center);
    const maxBounds = ref(null);
    // 使用 ref 创建一个 ref 对象
    const myComponentRef = ref(null);
    const clickLatLng = ref([0, 0]);
    // 监测搜索村庄信息数据变换
    const aMapCenter = computed(() => store.selectedVillageMsg);
    // 监测nowMaxBounds信息
    const aMaxBounds = computed(() => store.nowMaxBounds.lockArea);
    // 监测搜索框搜索住户的数据变换
    const aMapCenter2 = computed(() => store.selectedVillagerMsg.公民身份证号);
    const onMapClick = (event) => {
      // 将信息标注在地图上
      clickLatLng.value = [event.latlng.lat, event.latlng.lng];
    };
    watch(aMapCenter, (_newVlaue, _oldValue) => {
      zoom.value = store.selectedVillageMsg.zoom;
      maxZoom.value = store.selectedVillageMsg.maxZoom;
      minZoom.value = store.selectedVillageMsg.minZoom;

      myComponentRef.value.leafletObject.panTo(store.selectedVillageMsg.center);

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

    watch(aMapCenter2, (_newVlaue, _oldValue) => {
      // 解除地图锁定
      store.saveLockArea(false);

      // 更改地图中心位置
      myComponentRef.value.leafletObject.panTo(
        store.selectedVillagerMsg.经纬度
      );
    });

    // 在组件挂载后，将组件实例分配给 ref 对象
    // 这里使用 onMounted 钩子，确保组件已经挂载
    onMounted(() => {
      setTimeout(() => {
        // 在这里可以执行一些延时操作
        myComponentRef.value.leafletObject.attributionControl.setPrefix(false);
      }, 1000);
    });

    return {
      store,
      zoom,
      maxZoom,
      minZoom,
      center,
      maxBounds,
      myComponentRef,
      clickLatLng,
      onMapClick,
    };
  },
};
</script>

<style scoped>
#leaflet-map {
  width: 100vw;
  height: 100vh;
}
</style>
