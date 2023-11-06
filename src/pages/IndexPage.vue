<template>
  <q-page class="flex flex-center">
    <leaflet-map />
    <q-page-sticky id="fab-class" position="bottom-right" :offset="[18, 18]">
      <q-fab
        color="primary"
        label="功能"
        icon="keyboard_arrow_up"
        direction="up"
        external-label
      >
        <q-fab-action
          @click="seamless = true"
          color="primary"
          icon="map"
          label="传送门"
        />
      </q-fab>
    </q-page-sticky>

    <div id class="q-pa-md q-gutter-sm">
      <q-dialog v-model="seamless" seamless position="bottom">
        <q-card style="width: 350px">
          <q-card-actions align="left">
            <q-toggle
              v-model="lockArea"
              checked-icon="check"
              color="primary"
              label="锁定区域"
              unchecked-icon="clear"
              :disable="lockAreaToggle"
            />
          </q-card-actions>
          <q-card-section class="items-center no-wrap">
            <q-item>
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
                  @popup-hide="handleSelectChange(selectedItem)"
                />
              </q-item-section>
            </q-item>
            <q-space />
            <q-item>
              <q-item-section avatar>
                <q-icon name="photo" />
              </q-item-section>
              <q-item-section>
                <q-select
                  style="min-width: 200px; max-width: 300px"
                  v-model="selectedSubItem"
                  :options="secondLevelOptions"
                  label="选择搜索的村庄"
                  :key="selectKey"
                  :disable="!selectedItem"
                >
                </q-select>
              </q-item-section>
            </q-item>
            <q-space />
            <q-card-actions align="right">
              <q-btn
                flat
                right
                label="隐藏面板"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref, watch } from "vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";
import LeafletMap from "components/LeafletMap.vue";

const tempXiangZhengOptions = [];
const tempCunZhuangOptions = [];

export default {
  components: {
    LeafletMap,
  },
  setup() {
    const store = useVillageStore();
    const seamless = ref(false);
    const firstLevelOptions = ref(null);
    const secondLevelOptions = ref(null);
    const selectedItem = ref(null);
    const selectedSubItem = ref(null);
    let selectKey = 1;
    let lockArea = ref(false);
    let lockAreaToggle = ref(true);

    watch(selectedSubItem, (_newVlaue, _oldValue) => {
      if (selectedSubItem.value !== null) {
        const aVillageMsg = {};
        aVillageMsg.center = selectedSubItem.value.center;
        aVillageMsg.label = selectedSubItem.value.label;
        aVillageMsg.minZoom = selectedSubItem.value.minZoom;
        aVillageMsg.value = selectedSubItem.value.value;
        aVillageMsg.zoom = selectedSubItem.value.zoom;
        aVillageMsg.maxBounds = selectedSubItem.value.maxBounds;

        store.saveSelectedVillageMsg(aVillageMsg);
        store.saveMaxBounds(selectedSubItem.value.maxBounds);

        // 锁定区域按钮可以使用
        lockAreaToggle.value = false;
      }
    });

    watch(lockArea, (newVlaue, _oldValue) => {
      const selectLen = Object.keys(store.selectedVillageMsg).length;
      if (selectLen > 0) {
        store.saveMaxBounds(store.selectedVillageMsg.maxBounds);
        store.saveLockArea(newVlaue);
      }
    });

    function filterFn(_val, update, _abort) {
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
    }
    function handleSelectChange(items) {
      if (items !== null) {
        const val = items.value;
        tempCunZhuangOptions.splice(0, tempCunZhuangOptions.length);
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
            aOptions.key = element.行政区代码;
            tempCunZhuangOptions.push(aOptions);
          }
        });
        secondLevelOptions.value = tempCunZhuangOptions;
        this.selectKey++;
      }
    }

    return {
      lockArea,
      lockAreaToggle,
      seamless,
      selectedItem,
      selectedSubItem,
      firstLevelOptions,
      secondLevelOptions,
      selectKey,
      filterFn,
      handleSelectChange,
    };
  },
};
</script>

<style scoped>
#fab-class {
  z-index: 1000;
}
</style>
