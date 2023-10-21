<template>
  <!-- 遍历建筑数据，将标注添加到地图上 -->
  <l-marker
    v-for="(house, index) in store.allHouseHolderMsg"
    :key="index"
    :lat-lng="house.经纬度"
    @click="showHouseMsg(store.allVillagerMsg, house.户号)"
  >
    <l-popup>
      户号： {{ house.户号 }}
      <q-splitter v-model="splitterModel" style="height: 250px">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-teal">
            <q-tab
              v-for="(aNumber, index2) in aHousePersonList"
              :key="index2"
              :name="aNumber.与户主关系"
              icon="mail"
              :label="aNumber.与户主关系"
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
            <q-tab-panel
              v-for="(aNumber1, index3) in aHousePersonList"
              :key="index3"
              :name="aNumber1.与户主关系"
            >
              <div class="text-h4 q-mb-md">{{ aNumber1.姓名 }}</div>
              <p>
                与户主关系:{{ aNumber1.与户主关系 }} <br />
                姓名:{{ aNumber1.姓名 }} <br />
                性别: {{ aNumber1.性别 }} <br />
                出生日期: {{ aNumber1.出生日期 }} <br />
                电话号码: {{ aNumber1.电话号码 }}<br />
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </l-popup>
  </l-marker>
</template>

<script>
import { ref } from "vue";
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
    const aHousePersonList = [];

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
      console.log(aHousePersonList);
    }

    return {
      customIcon,
      store,
      aHousePersonList,
      showHouseMsg,

      tab: ref("户主"),
      splitterModel: ref(20),
    };
  },
};
</script>
