<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-item clickable class="GPL__drawer-item">
        <q-item-section avatar>
          <q-icon name="photo" />
        </q-item-section>
        <q-item-section>
          <q-select
            style="min-width: 200px; max-width: 300px"
            v-model="selectedItem"
            :options="firstLevelOptions"
            label="选择搜索的乡镇"
            @filter="filterFn"
            @popup-hide="handleSelectChange(selectedItem.value)"
          />
        </q-item-section>
      </q-item>

      <q-item clickable class="GPL__drawer-item">
        <q-item-section avatar>
          <q-icon name="photo" />
        </q-item-section>
        <q-item-section>
          <q-select
            style="min-width: 200px; max-width: 300px"
            v-model="selectedSubItem"
            :options="secondLevelOptions"
            label="选择搜索的村庄"
            @popup-open="freshDom"
            @popup-hide="saveVillageMsg(selectedSubItem)"
            :disable="!selectedItem"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";
const tempXiangZhengOptions = [];
const tempCunZhuangOptions = [];

export default {
  setup() {
    const store = useVillageStore();
    const villageMsgOptions = ref(null);
    const firstLevelOptions = ref(null);
    const secondLevelOptions = ref(null);

    return {
      selectedItem: ref(null),
      selectedSubItem: ref(null),
      firstLevelOptions,
      secondLevelOptions,
      filterFn(val, update, abort) {
        if (firstLevelOptions.value !== null) {
          // already loaded
          update();
          return;
        }

        setTimeout(() => {
          update(() => {
            tempXiangZhengOptions.splice(0, tempXiangZhengOptions.length);
            store.villageMsg.祥符区.forEach((element) => {
              const aOptions = {};
              if (element.行政区代码.toString().length == 9) {
                aOptions.center = element.center;
                aOptions.maxBounds = element.maxBounds;
                aOptions.maxZoom = element.maxZoom;
                aOptions.minZoom = element.minZoom;
                aOptions.zoom = element.zoom;
                aOptions.label = element.行政区;
                aOptions.value = element.行政区代码;
                tempXiangZhengOptions.push(aOptions);
              }
            });
            firstLevelOptions.value = tempXiangZhengOptions;
          });
        }, 500);
      },

      handleSelectChange(val) {
        console.log(val);
        tempCunZhuangOptions.splice(0, tempCunZhuangOptions.length);
        console.log(tempCunZhuangOptions);
        store.villageMsg.祥符区.forEach((element) => {
          const aOptions = {};
          if (val.toString() === element.行政区代码.toString().slice(0, 9)) {
            aOptions.center = element.center;
            aOptions.maxBounds = element.maxBounds;
            aOptions.maxZoom = element.maxZoom;
            aOptions.minZoom = element.minZoom;
            aOptions.zoom = element.zoom;
            aOptions.label = element.行政区;
            aOptions.value = element.行政区代码;
            tempCunZhuangOptions.push(aOptions);
          }
        });
        secondLevelOptions.value = tempCunZhuangOptions;
        console.log(secondLevelOptions.value);
      },
      freshDom() {
        console.log("弹框打开：" + store.selectedVillageMsg);
      },
      saveVillageMsg(itemMsg) {
        if (itemMsg !== null) {
          const aVillageMsg = {};
          aVillageMsg.center = itemMsg.center;
          aVillageMsg.label = itemMsg.label;
          aVillageMsg.maxBounds = itemMsg.maxBounds;
          aVillageMsg.minZoom = itemMsg.minZoom;
          aVillageMsg.value = itemMsg.value;
          aVillageMsg.zoom = itemMsg.zoom;
          console.log("弹框关闭：");
          console.log(aVillageMsg);

          store.saveSelectedVillageMsg(aVillageMsg);
        }
      },
    };
  },
};
</script>
