<template>
  <div id="leaflet-map">
    <l-map
      :center="center"
      :zoom="zoom"
      :max-zoom="maxZoom"
      :min-zoom="minZoom"
      :max-bounds="maxBounds"
      @zoomstart="onZoomStart"
      @zoomend="onZoomEnd"
      ref="myComponentRef"
    >
      <l-tile-layer :url="'/map/{z}/{x}/{y}.jpg'" :max-zoom="maxZoom" />
      <l-marker
        :lat-lng="centerCarmer"
        ref="myMark"
        draggable
        @move="log(myMark.leafletObject._latlng)"
      />

      <l-marker
        draggable
        :lat-lng="centerCarmer"
        ref="centerMarker"
        @moveend="centerMarkerLog(centerMarker.leafletObject._latlng)"
      >
        <l-icon
          class="u-turn-icon"
          icon-url="/icons/crosshair-icon.svg"
          :icon-size="[28, 28]"
          :icon-anchor="[15, 15]"
        >
        </l-icon>
        <l-popup>
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
              <div class="absolute-bottom">
                <div class="text-h6">{{ message }}</div>
                <div class="text-subtitle2">
                  GPS position: <strong>{{ position }}</strong>
                </div>
              </div>
            </q-img>

            <q-card-actions>
              <q-btn flat>添加照片</q-btn>
              <q-btn flat @click="saveToLocalStorage">保存信息</q-btn>
              <q-btn flat @click="saveCarmerMsg">导出信息</q-btn>
            </q-card-actions>
          </q-card>
        </l-popup>
      </l-marker>

      <l-polyline
        :lat-lngs="[beginLatLng, centerCarmer, endLatLng]"
        color="black"
      />
    </l-map>
  </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import * as XLSX from "xlsx";
import { Geolocation } from "@capacitor/geolocation";
import { WebPlugin } from "@capacitor/core";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPolyline,
  LPopup,
} from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPolyline,
    LPopup,
  },
  setup() {
    const zoom = ref(16);
    const maxZoom = ref(19);
    const minZoom = ref(15);

    const center = ref([34.60999648, 114.43005323]);
    // 地图滑动边界设置，设置地图最大边界范围
    const maxBounds = ref(null);

    const beginLatLng = ref([34.61249479271678, 114.42976610593284]);
    const centerCarmer = ref([34.61275078378782, 114.43026087665758]);
    const endLatLng = ref([34.61250856185064, 114.43076253194927]);

    // 使用 ref 创建一个 ref 对象
    const myComponentRef = ref(null);
    const myMark = ref(null);
    const centerMarker = ref(null);

    function calculateDiamondVertices(pointA, pointB, sideLength) {
      // 计算菱形的中心点坐标
      const centerX = (pointA.x + pointB.x) / 2;
      const centerY = (pointA.y + pointB.y) / 2;

      // 计算连线的方向向量
      const directionVector = {
        x: pointB.x - pointA.x,
        y: pointB.y - pointA.y,
      };

      // 计算垂直于连线的向量（钝角方向）
      const perpendicularVector = {
        x: -directionVector.y,
        y: directionVector.x,
      };

      // 标准化垂直向量
      const normalizedVector = {
        x:
          perpendicularVector.x /
          Math.sqrt(
            Math.pow(perpendicularVector.x, 2) +
              Math.pow(perpendicularVector.y, 2)
          ),
        y:
          perpendicularVector.y /
          Math.sqrt(
            Math.pow(perpendicularVector.x, 2) +
              Math.pow(perpendicularVector.y, 2)
          ),
      };

      // 计算两个钝角的端点坐标
      const vertex1 = {
        x: centerX + normalizedVector.x * sideLength * Math.sqrt(3),
        y: centerY + normalizedVector.y * sideLength * Math.sqrt(3),
      };

      const vertex2 = {
        x: centerX - normalizedVector.x * sideLength * Math.sqrt(3),
        y: centerY - normalizedVector.y * sideLength * Math.sqrt(3),
      };

      return [vertex1, vertex2];
    }

    function log(endPoind) {
      // 已知的两个点
      const pointA = { x: centerCarmer.value[0], y: centerCarmer.value[1] };
      const pointB = { x: endPoind.lat, y: endPoind.lng };

      // 固定长度和角度
      const length = 0.0001;
      const [diamondPoint3, diamondPoint4] = calculateDiamondVertices(
        pointA,
        pointB,
        length
      );
      console.log(diamondPoint3);
      console.log(diamondPoint4);
      const point1 = [];
      const point2 = [];
      point1.push(diamondPoint3.x);
      point1.push(diamondPoint3.y);
      point2.push(diamondPoint4.x);
      point2.push(diamondPoint4.y);

      beginLatLng.value = point1;
      endLatLng.value = point2;
    }

    function centerMarkerLog(event) {
      const tempArr = [];
      tempArr.push(event.lat);
      tempArr.push(event.lng);
      centerCarmer.value = tempArr;
    }

    function onZoomStart(event) {
      console.log(event);
    }
    function onZoomEnd(event) {
      console.log(event);
    }

    const data = ref([
      // 这里是你的数据，例如：
      { Name: "John", Age: 30, City: "New York" },
      { Name: "Jane", Age: 25, City: "Chicago" },
    ]);

    const saveCarmerMsg = () => {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data.value);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "output.xlsx");
    };

    // 使用 ref 创建响应式数据
    const message = ref("");
    const messageInput = ref("");

    // 保存到 localStorage 的方法
    const saveToLocalStorage = () => {
      messageInput.value = centerCarmer.value;

      // 将输入的消息保存到 localStorage
      localStorage.setItem("savedMessage", messageInput.value);
      // 更新组件中的数据
      message.value = messageInput.value;
    };

    const position = ref("determining...");

    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();

      console.log("Current position:", coordinates);
    };

    let geoId;

    // 在组件挂载后，将组件实例分配给 ref 对象
    // 这里使用 onMounted 钩子，确保组件已经挂载
    onMounted(() => {
      setTimeout(() => {
        // 在这里可以执行一些延时操作
        myComponentRef.value.leafletObject.attributionControl.setPrefix(false);
      }, 2000);

      message.value = localStorage.getItem("savedMessage") || "";

      getCurrentPosition();

      // 开始监听
      geoId = Geolocation.watchPosition({}, (newPosition, err) => {
        console.log("New GPS position");
        position.value = newPosition;
      });
    });

    onBeforeUnmount(() => {
      // 我们做清理
      Geolocation.clearWatch(geoId);
    });
    return {
      zoom,
      maxZoom,
      minZoom,
      center,
      maxBounds,

      beginLatLng,
      centerCarmer,
      endLatLng,

      myComponentRef,
      myMark,
      centerMarker,
      onZoomStart,
      onZoomEnd,
      log,
      centerMarkerLog,
      saveCarmerMsg,
      saveToLocalStorage,
      message,
      messageInput,

      position,
    };
  },
};
</script>

<style scoped>
.u-turn-icon {
  transform-origin: center;
}
#leaflet-map {
  width: 100vw;
  height: 100vh;
}
.my-card {
  width: 100%;
  width: 250px;
}
</style>
