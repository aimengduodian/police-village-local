<template>
  <!-- 遍历建筑数据，将标注添加到地图上 -->
  <l-marker
    v-for="(house, index) in store.houseHolderMsg.xiezhuang"
    :key="index"
    :lat-lng="house.经纬度"
  >
    <l-popup>
      <h5>户主：{{ house.户主 }}</h5>
      <p>{{ house }}</p>
    </l-popup>
  </l-marker>
</template>

<script>
// 导入leaflet样式和库
import { LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";

export default {
  components: {
    LMarker,
    LPopup,
  },
  setup() {
    const customIcon = null;
    const store = useVillageStore();

    return {
      customIcon,
      store,
    };
  },
};
</script>
