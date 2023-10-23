<template>
  <!-- 遍历建筑数据，将标注添加到地图上 -->
  <l-circle
    v-for="(house, index) in store.allHouseHolderMsg"
    :key="index"
    :lat-lng="house.经纬度"
    :radius="circleRadius"
    :color="circleColor"
    :fillOpacity="fillOpacity"
  >
    <l-popup>
      <show-house-all-number
        @click="showHouseMsg(store.allVillagerMsg, house.户号)"
      >
      </show-house-all-number>

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
import { ref } from "vue";
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
    const aHousePersonList = [];

    // 圆形标记的中心坐标
    const showCircle = ref(true);
    const circleLatLng = ref([0, 0]);
    const circleRadius = ref(10);
    const circleColor = ref("red");
    const fillOpacity = ref(0.8); // 透明度 0 -1

    // 户成员信息
    function showHouseMsg(array, aParams) {
      aHousePersonList.splice(0, aHousePersonList.length);
      for (var key in array) {
        for (var i = 0; i < array[key].length; i++) {
          if (array[key][i].户号 == aParams) {
            aHousePersonList.push(array[key][i]);
          }
        }
      }
      store.saveHouseNumberMsg(aHousePersonList);
    }

    return {
      store,
      aHousePersonList,
      showHouseMsg,
      tab: ref("户主"),
      splitterModel: ref(20),

      circleLatLng,
      circleRadius,
      circleColor,
      fillOpacity,
    };
  },
};
</script>
