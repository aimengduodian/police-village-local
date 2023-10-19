<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-select
        filled
        label="选择乡镇"
        v-model="selectedOption"
        @input="handleSelectChange"
        style="width: 250px"
        :options="selectedOption"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";

const stringOptions = [];

export default {
  setup() {
    const selectedOption = ref([]);

    const options = ref(null);
    const store = useVillageStore();

    //const allHouseHolder = store.houseHolderMsg();
    return {
      model: ref(null),

      handleSelectChange() {
        // 在这里执行你的函数逻辑
        console.log("选中的选项是: ", this.selectedOption);
        // 执行其他操作
      },
    };
  },
};
</script>
