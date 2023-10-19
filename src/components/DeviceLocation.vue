<template>
  <l-marker :lat-lng="deviceLatLng">
    <l-popup> 设备位置: {{ deviceLatLng }} </l-popup>
  </l-marker>
</template>

<script>
import { ref, onMounted, SetupContext, nextTick } from "vue";

// 导入leaflet样式和库
import "leaflet/dist/leaflet.css";
import { LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMarker,
    LPopup,
  },
  setup() {
    // 设备位置标记
    const deviceLatLng = ref([0, 0]);

    // 获取设备位置信息
    function startDeviceLocationUpdates() {
      // 获取设备地理位置
      navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // 更新设备位置
        deviceLatLng.value = [lat, lon];
      });
    }

    async function updateMsg() {
      await nextTick();
      // 这里的代码会在 DOM 更新后执行
      startDeviceLocationUpdates();
      console.log("DOM 更新完成");
    }

    onMounted(() => {
      // 更新设备位置
      console.log("组件已挂载");
    });

    return {
      updateMsg,
      deviceLatLng,
    };
  },
};
</script>
