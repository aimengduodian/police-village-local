<template>
  <div id="app">
    <div ref="map" style="height: 400px"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";
import "leaflet-rotatedmarker/dist/leaflet.rotatedMarker.css";

export default {
  name: "App",
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 创建地图
      this.map = L.map(this.$refs.map).setView([51.505, -0.09], 13);

      // 添加地图图层
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);

      // 定义自定义图标
      var customIcon = L.icon({
        iconUrl: "path/to/your/icon.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      // 在地图上添加带有自定义图标的标记
      var marker = L.marker([51.505, -0.09], { icon: customIcon }).addTo(
        this.map
      );

      // 使用 leaflet-rotatedmarker 插件设置标记的旋转角度
      L.DomEvent.on(marker._icon, "click", () => {
        marker.setRotationAngle(45); // 设置旋转角度为45度
      });

      // 添加标记的弹出窗口
      marker.bindPopup(
        "This is a custom icon marker with rotation angle 45 degrees."
      );
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#map {
  width: 100%;
}
</style>
