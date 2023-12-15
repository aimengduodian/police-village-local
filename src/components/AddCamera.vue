<template>
  <l-marker
    draggable
    :lat-lng="messageFromParent"
    ref="myMarkObj"
    @move="targetMarker(myMarkObj.leafletObject._latlng)"
  />

  <l-marker
    draggable
    :lat-lng="messageFromParent"
    ref="centerMarkerObj"
    @moveend="centerMarkerLog(centerMarkerObj.leafletObject._latlng)"
  >
    <l-icon
      icon-url="/icons/crosshair-icon.svg"
      :icon-size="[28, 28]"
      :icon-anchor="[15, 15]"
    >
    </l-icon>
    <l-popup>
      <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="max-width: 300px">
          <q-input color="purple-12" v-model="aCameraID" label=" 摄像头编号：">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>

          <q-input
            color="purple-12"
            v-model="aBrandModel"
            label=" 摄像头型号："
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>
          <q-input
            color="purple-12"
            v-model="aCameraUser"
            label=" 摄像头所属用户： "
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>
          <q-input color="purple-12" v-model="aBrandMsg" label=" 其他信息: ">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>
        </div>
        <q-btn flat @click="saveToLocalStorage">保存信息</q-btn>
        <q-btn flat @click="savecameraMsg">导出信息</q-btn>
      </div>
    </l-popup>
  </l-marker>

  <l-polyline
    :lat-lngs="[beginLatLng, centercamera, endLatLng]"
    color="black"
  />
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { LMarker, LIcon, LPolyline, LPopup } from "@vue-leaflet/vue-leaflet";

import * as XLSX from "xlsx";

export default {
  components: {
    LMarker,
    LIcon,
    LPolyline,
    LPopup,
  },
  props: {
    initialMessage: Array,
  },
  setup(props) {
    // 使用 ref 来声明响应式变量
    const messageFromParent = ref(props.initialMessage);

    // 使用 ref 创建一个 ref 对象
    const myMarkObj = ref(null);
    const centerMarkerObj = ref(null);

    const aCameraID = ref("");
    const aBrandModel = ref("");
    const aCameraUser = ref("");
    const aBrandMsg = ref("");
    // 摄像头的三点坐标
    const beginLatLng = ref([0, 0]);
    const centercamera = ref([0, 0]);
    const endLatLng = ref([0, 0]);

    const calculateDiamondVertices = (pointA, pointB, sideLength) => {
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
    };

    const targetMarker = (endPoind) => {
      // 已知的两个点
      const pointA = { x: centercamera.value[0], y: centercamera.value[1] };
      const pointB = { x: endPoind.lat, y: endPoind.lng };

      // 固定长度和角度
      const length = 0.0001;
      const [diamondPoint3, diamondPoint4] = calculateDiamondVertices(
        pointA,
        pointB,
        length
      );
      const point1 = [];
      const point2 = [];
      point1.push(diamondPoint3.x);
      point1.push(diamondPoint3.y);
      point2.push(diamondPoint4.x);
      point2.push(diamondPoint4.y);

      beginLatLng.value = point1;
      endLatLng.value = point2;
    };

    const centerMarkerLog = (event) => {
      const tempArr = [];
      tempArr.push(event.lat);
      tempArr.push(event.lng);
      centercamera.value = tempArr;
    };

    // 所有的摄像头数据信息
    const cameraData = {};

    // 保存到 localStorage 的方法
    const saveToLocalStorage = () => {
      const aItem = {};
      aItem["timeStamp"] = new Date().getTime();
      aItem["cameraID"] = aCameraID.value;
      aItem["brandModel"] = aBrandModel.value;
      aItem["brandMsg"] = aBrandMsg.value;
      aItem["cameraUser"] = aCameraUser.value;
      aItem["locationOne"] = JSON.stringify(beginLatLng.value);
      aItem["locationTwo"] = JSON.stringify(centercamera.value);
      aItem["locationThree"] = JSON.stringify(endLatLng.value);
      aItem["roadPic"] = "";
      aItem["carmerPic"] = "";

      cameraData.newMsg.push(aItem);

      // 将输入的消息保存到 localStorage
      localStorage.setItem(
        "cameraMessageNew",
        JSON.stringify(cameraData.newMsg)
      );
    };

    // 导出摄像头数据到表格
    const savecameraMsg = () => {
      // 合并数据
      const aMergedArray = cameraData.oldMsg.concat(cameraData.newMsg);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(aMergedArray);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(wb, "cameraMessageNew.xlsx");

      // 导出后删除localStorage数据
      localStorage.removeItem("cameraMessageNew");
    };

    // 在组件挂载后，将组件实例分配给 ref 对象
    // 这里使用 onMounted 钩子，确保组件已经挂载
    onMounted(() => {
      const newMsg = localStorage.getItem("cameraMessageNew") || "";
      const oldMsg = localStorage.getItem("cameraMessage") || "";
      if (newMsg !== "") {
        cameraData.newMsg = JSON.parse(newMsg);
      } else {
        cameraData.newMsg = [];
      }
      if (oldMsg !== "") {
        cameraData.oldMsg = JSON.parse(oldMsg);
      } else {
        cameraData.oldMsg = [];
      }
    });

    // 使用 watch 监听 props 的变化，并更新内部变量
    watch(
      () => props.initialMessage,
      (newMessage) => {
        messageFromParent.value = newMessage;
        centercamera.value = newMessage;
      }
    );

    return {
      myMarkObj,
      centerMarkerObj,

      aCameraID,
      aBrandModel,
      aCameraUser,
      aBrandMsg,
      beginLatLng,
      centercamera,
      endLatLng,

      targetMarker,
      centerMarkerLog,
      savecameraMsg,
      saveToLocalStorage,

      messageFromParent,
    };
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  width: 250px;
}
</style>
