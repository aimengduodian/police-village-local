<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-select
        filled
        v-model="model"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        hint="姓名或身份证ID"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <q-btn @click="testbtn">测试搜索框</q-btn>
  </div>
</template>

<script>
import { ref } from "vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  setup() {
    const store = useVillageStore();
    const options = ref(store.houseHolderMsg);
    return {
      model: ref(null),
      options,
      testbtn() {
        console.log(options.value);
      },

      filterFn(val, update, abort) {
        if (val.length < 2) {
          abort();
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
