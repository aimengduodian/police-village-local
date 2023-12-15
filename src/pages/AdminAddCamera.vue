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

      <!--添加到地图上 -->
      <marker-standard />

      <!-- 添加搜索到的用户信息 -->
      <marker-circle />

      <!-- 添加标记信息 -->
      <camera-marker />
      <add-camera :initialMessage="clickLatLng" />
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
import MarkerStandard from "components/MarkerStandard.vue";
import MarkerCircle from "components/MarkerCircle.vue";
import CameraMarker from "components/MarkerCamera.vue";
import AddCamera from "components/AddCamera.vue";

export default {
  components: {
    LMap,
    LTileLayer,
    MarkerStandard,
    MarkerCircle,
    CameraMarker,
    AddCamera,
  },
  setup() {
    const store = useVillageStore();
    const zoom = ref(16);
    const maxZoom = ref(19);
    const minZoom = ref(15);
    const center = ref([34.60999648, 114.43005323]);
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
      // 将住户信息标注在地图上
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
      }, 2000);
    });

    return {
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
