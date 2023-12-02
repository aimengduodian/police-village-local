<template>
  <!-- 遍历建筑数据，将标注添加到地图上 -->
  <l-circle
    v-for="(house, index) in aAllHouseHolderArr"
    :key="index"
    :lat-lng="house.经纬度"
    :radius="circleRadius"
    :color="circleColor"
    :fillOpacity="fillOpacity"
  >
    <l-popup>
      <show-house-all-number @click="showHouseMsg(house)" />

      <q-splitter v-model="splitterModel" style="height: 200px">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-teal">
            <q-tab
              :name="house.与户主关系"
              icon="mail"
              :label="house.与户主关系"
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel :name="house.与户主关系">
              <div class="text-h4 q-mb-md">{{ house.姓名 }}</div>
              <p>
                与户主关系:{{ house.与户主关系 }} <br />
                姓名:{{ house.姓名 }} <br />
                性别: {{ house.性别 }} <br />
                出生日期: {{ house.出生日期 }} <br />
                电话号码: {{ house.电话号码 }}<br />
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </l-popup>
  </l-circle>
</template>

<script>
import { ref, watch, computed } from "vue";
// 导入leaflet样式和库
import { LCircle, LPopup } from "@vue-leaflet/vue-leaflet";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";
// 显示所有户成员信息
import ShowHouseAllNumber from "components/ShowHouseAllNumber.vue";

export default {
  components: {
    LCircle,
    LPopup,
    ShowHouseAllNumber,
  },
  setup() {
    const store = useVillageStore();

    // 圆形标记的中心坐标
    const circleLatLng = ref([0, 0]);
    const circleRadius = ref(10);
    const circleColor = ref("transparent"); // 'transparent' 透明
    const fillOpacity = ref(0.3); // 透明度 0 -1

    const aCircleColor = computed(() => store.circleMarkerState);
    // 显示选中村庄的所有户主信息
    const aAllHouseHolderArr = computed(() => store.getVillageHouseHolderMsg);

    watch(aCircleColor, (newVlaue, _oldValue) => {
      circleColor.value = newVlaue;
    });

    // 户成员信息
    const showHouseMsg = (aParams) => {
      store.saveSelectedVillagerMsg(aParams);
    };

    return {
      store,
      showHouseMsg,
      tab: ref("户主"),
      splitterModel: ref(20),
      aAllHouseHolderArr,

      circleLatLng,
      circleRadius,
      circleColor,
      fillOpacity,
    };
  },
};
</script>
