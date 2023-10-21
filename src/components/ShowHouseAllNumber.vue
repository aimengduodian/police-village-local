<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn flat label="显示户成员信息" color="primary" @click="dialog = true" />

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section
          class="q-pt-none"
          v-for="(house, index) in store.houseNumberArr"
          :key="index"
        >
          <div class="text-h4 q-mb-md">
            {{ house.与户主关系 }}:{{ house.姓名 }}
          </div>
          <p>
            性别: {{ house.性别 }} <br />
            出生日期: {{ house.出生日期 }} <br />
            公民身份证号: {{ house.公民身份证号 }}<br />
            电话号码: {{ house.电话号码 }}<br />
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";

export default {
  setup() {
    const store = useVillageStore();
    store.houseNumberArr;
    return {
      store,
      dialog: ref(false),
      maximizedToggle: ref(true),
    };
  },
};
</script>
