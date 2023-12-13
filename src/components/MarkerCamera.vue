<template>
  <div v-for="(aItem, index) in cameraData" :key="index">
    <l-marker :lat-lng="aItem.centercamera" @click="open(aItem)">
      <l-icon
        icon-url="/icons/crosshair-icon.svg"
        :icon-size="[28, 28]"
        :icon-anchor="[15, 15]"
      >
      </l-icon>
    </l-marker>

    <l-polyline
      :lat-lngs="[aItem.beginLatLng, aItem.centercamera, aItem.endLatLng]"
      color="black"
    />
  </div>
  <q-dialog v-model="dialog" seamless position="bottom">
    <q-card style="width: 550px">
      <q-carousel swipeable animated v-model="slide" thumbnails infinite>
        <q-carousel-slide
          :name="1"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        >
          <div>
            <div class="text-weight-bold">摄像头编号：</div>
            <div class="text-grey">{{ aCameraID }}</div>

            <div class="text-weight-bold">摄像头型号：</div>
            <div class="text-grey">{{ aBrandModel }}</div>

            <div class="text-weight-bold">摄像头所属用户：</div>
            <div class="text-grey">{{ aCameraUser }}</div>

            <div class="text-weight-bold">其他信息：</div>
            <div class="text-grey">{{ aBrandMsg }}</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        >
          <div>
            <div class="text-weight-bold">摄像头编号：</div>
            <div class="text-grey">{{ aCameraID }}</div>

            <div class="text-weight-bold">摄像头型号：</div>
            <div class="text-grey">{{ aBrandModel }}</div>

            <div class="text-weight-bold">摄像头所属用户：</div>
            <div class="text-grey">{{ aCameraUser }}</div>

            <div class="text-weight-bold">其他信息：</div>
            <div class="text-grey">{{ aBrandMsg }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <q-space />
      <q-card-actions align="right">
        <q-btn flat right label="隐藏面板" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, onMounted } from "vue";
import { LMarker, LIcon, LPolyline } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMarker,
    LIcon,
    LPolyline,
  },

  setup() {
    // 所有的摄像头数据信息
    const cameraData = ref([]);
    // 摄像头信息
    const aCameraID = ref("");
    const aBrandModel = ref("");
    const aCameraUser = ref("");
    const aBrandMsg = ref("");
    // 摄像头的三点坐标
    const beginLatLng = ref([34.61249479271678, 114.42976610593284]);
    const centercamera = ref([34.61275078378782, 114.43026087665758]);
    const endLatLng = ref([34.61250856185064, 114.43076253194927]);

    onMounted(() => {
      const newMsg = JSON.parse(localStorage.getItem("cameraMessageNew")) || [];
      const oldMsg = JSON.parse(localStorage.getItem("cameraMessage")) || [];

      // const aTempArr = []
      newMsg.forEach((element) => {
        element["beginLatLng"] = JSON.parse(element.locationOne);
        element["centercamera"] = JSON.parse(element.locationTwo);
        element["endLatLng"] = JSON.parse(element.locationThree);
      });

      oldMsg.forEach((element) => {
        element["beginLatLng"] = JSON.parse(element.locationOne);
        element["centercamera"] = JSON.parse(element.locationTwo);
        element["endLatLng"] = JSON.parse(element.locationThree);
      });

      cameraData.value = oldMsg.concat(newMsg);
      // cameraData.value = aTempDada;
      console.log(cameraData.value);
    });

    const dialog = ref(false);

    const open = (rItem) => {
      dialog.value = true;

      console.log(rItem);
      aCameraID.value = rItem.cameraID;
      aBrandModel.value = rItem.brandModel;
      aCameraUser.value = rItem.cameraUser;
      aBrandMsg.value = rItem.BrandMsg;
      beginLatLng.value = rItem.beginLatLng;
      centercamera.value = rItem.centercamera;
      endLatLng.value = rItem.endLatLng;
    };

    return {
      aCameraID,
      aBrandModel,
      aCameraUser,
      aBrandMsg,
      beginLatLng,
      centercamera,
      endLatLng,

      cameraData,
      dialog,
      slide: ref(1),
      open,
    };
  },
};
</script>

<style scoped></style>
