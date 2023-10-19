<template>
  <q-select
    rounded
    outlined
    v-model="model"
    use-input
    hide-selected
    fill-input
    input-debounce="2000"
    :options="options"
    @filter="filterFn"
    label="姓名或身份证ID"
    style="margin: 2%"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          啥都没有，换个试试！
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { ref, watch } from "vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";
const objetOption = [];

export default {
  setup() {
    const model = ref(null);
    const options = ref(objetOption);
    const store = useVillageStore();
    // villageName,搜索的村庄名称
    // searchString,人名或身份证号
    // 返回值为对象数组
    function findObjectWithNameOrID(array, searchString) {
      const personList = [];
      for (var key in array) {
        for (var i = 0; i < array[key].length; i++) {
          if (array[key][i].姓名 && array[key][i].姓名 == searchString) {
            array[key][i].label =
              array[key][i].姓名 +
              "," +
              array[key][i].性别 +
              "," +
              array[key][i].街路巷;
            array[key][i].value =
              array[key][i].姓名 +
              "," +
              array[key][i].性别 +
              "," +
              array[key][i].街路巷;
            personList.push(array[key][i]);
          } else if (
            array[key][i].公民身份证号 &&
            array[key][i].公民身份证号 == searchString
          ) {
            array[key][i].label =
              array[key][i].姓名 +
              "," +
              array[key][i].性别 +
              "," +
              array[key][i].街路巷;
            personList.push(array[key][i]);
            array[key][i].value =
              array[key][i].姓名 +
              "," +
              array[key][i].性别 +
              "," +
              array[key][i].街路巷;
            personList.push(array[key][i]);
          }
        }
      }
      return personList; // 如果未找到匹配项
    }
    function filterFn(val, update, abort) {
      // console.log(val);
      if (val.length < 2) {
        abort();
        return;
      }

      update(() => {
        // 去除空格
        const needle = val.replace(/\s/g, "");
        options.value.splice(0, options.value.length);
        options.value = findObjectWithNameOrID(store.houseHolderMsg, needle);
      });
    }
    watch(model, (newVlaue, _oldValue) => {
      //获取户id，通过户id获取家庭成员信息
      console.log(newVlaue);
    });
    return {
      model,
      options,
      filterFn,
    };
  },
};
</script>
