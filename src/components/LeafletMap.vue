<template>
  <div id="leaflet-map">
    <l-map
      :center="center"
      :zoom="zoom"
      :max-zoom="maxZoom"
      :min-zoom="minZoom"
    >
      <l-tile-layer :url="'/map/{z}/{x}/{y}.jpg'" :max-zoom="maxZoom" />
      <!--添加到地图上 -->
      <leaflet-marker />
    </l-map>
  </div>
</template>

<script>
// 引入leaflet插件的样式和脚本
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import LeafletMarker from "components/LeafletMarker.vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";
import { computed, ref, watch } from "vue";

export default {
  components: {
    LMap,
    LTileLayer,
    LeafletMarker,
  },
  setup() {
    const store = useVillageStore();
    const zoom = ref(16);
    const maxZoom = ref(19);
    const minZoom = ref(15);

    const center = ref([34.60999648, 114.43005323]);
    // 地图滑动边界设置，设置地图最大边界范围
    const maxBounds = ref([
      [34.61936, 114.44316],
      [34.59549, 114.41917],
    ]);
    // 自定义图标
    const customIcon = null;

    // 监测数据变换
    const aMapCenter = computed(() => store.selectedVillageMsg.center);
    watch(aMapCenter, (newVlaue, oldValue) => {
      zoom.value = store.selectedVillageMsg.zoom;
      maxZoom.value = store.selectedVillageMsg.maxZoom;
      minZoom.value = store.selectedVillageMsg.minzoom;

      center.value = store.selectedVillageMsg.center;
      // 地图滑动边界设置，设置地图最大边界范围
      maxBounds.value = store.selectedVillageMsg.maxBounds;
    });

    return {
      zoom,
      maxZoom,
      minZoom,
      center,
      maxBounds,
      customIcon,
      store,
    };
  },
};
</script>

<style scoped>
#leaflet-map {
  width: 100%;
  height: 600px;
}
</style>
