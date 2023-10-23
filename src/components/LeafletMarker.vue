<template>
  <!-- 遍历建筑数据，将标注添加到地图上 -->
  <l-marker :lat-lng="circleLatLng">
    <l-popup>
      <show-house-all-number
        @click="
          showHouseMsg(store.allVillagerMsg, store.selectedVillagerMsg.户号)
        "
      >
      </show-house-all-number>

      <q-splitter v-model="splitterModel" style="height: 200px">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-teal">
            <q-tab
              name="home"
              icon="mail"
              :label="store.selectedVillagerMsg.与户主关系"
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
            <q-tab-panel name="home">
              <div class="text-h4 q-mb-md">
                {{ store.selectedVillagerMsg.姓名 }}
              </div>
              <p>
                与户主关系:{{ store.selectedVillagerMsg.与户主关系 }} <br />
                姓名:{{ store.selectedVillagerMsg.姓名 }} <br />
                性别: {{ store.selectedVillagerMsg.性别 }} <br />
                出生日期: {{ store.selectedVillagerMsg.出生日期 }} <br />
                电话号码: {{ store.selectedVillagerMsg.电话号码 }}<br />
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </l-popup>
  </l-marker>
</template>

<script>
import { ref, computed, watch } from "vue";
// 导入leaflet样式和库
import { LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";
// 显示所有户成员信息
import ShowHouseAllNumber from "components/ShowHouseAllNumber.vue";

export default {
  components: {
    LMarker,
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
    // 搜索住户的户号
    const selectHouseId = ref(0);

    // 监测搜索框搜索住户的数据变换
    const aMapCenter2 = computed(() => store.selectedVillagerMsg.公民身份证号);
    watch(aMapCenter2, (_newVlaue, _oldValue) => {
      console.log(store.selectedVillagerMsg);
      // 将住户信息标注在地图上
      circleLatLng.value = store.selectedVillagerMsg.经纬度;
      // 复制houseId
      selectHouseId.value = store.selectedVillagerMsg.户号;
    });

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
      showCircle,
      aHousePersonList,
      showHouseMsg,
      tab: ref("home"),
      splitterModel: ref(20),

      circleLatLng,
      circleRadius,
      circleColor,
    };
  },
};
</script>
