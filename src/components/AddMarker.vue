<template>
  <l-circle
    :lat-lng="messageFromParent"
    :radius="10"
    color="red"
    :illOpacity="0.3"
  >
    <l-popup>
      <q-input
        label="请输入户主的id"
        v-model.number="aVillagerID"
        type="number"
      />

      <p>
        姓名: {{ aSearchVillagerMsg.姓名 }} <br />
        性别: {{ aSearchVillagerMsg.性别 }} <br />
        公民身份证号: {{ aSearchVillagerMsg.公民身份证号 }} <br />
        与户主关系: {{ aSearchVillagerMsg.与户主关系 }} <br />
      </p>

      <div class="q-pa-md q-gutter-sm">
        <q-btn
          align="left"
          class="btn-fixed-width"
          color="primary"
          @click="showVillagerMsg"
          label="查看信息"
        />
        <q-btn
          align="right"
          class="btn-fixed-width"
          color="secondary"
          @click="saveVillagerMsg"
          label="保存"
        />
      </div>
    </l-popup>
  </l-circle>
</template>

<script>
import { ref, watch } from "vue";
// 导入leaflet样式和库
import { LCircle, LPopup } from "@vue-leaflet/vue-leaflet";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";

export default {
  components: {
    LCircle,
    LPopup,
  },
  props: {
    initialMessage: Array,
  },
  setup(props) {
    const store = useVillageStore();
    // 使用 ref 来声明响应式变量
    const messageFromParent = ref(props.initialMessage);
    // 表格ID
    const aVillagerID = ref(null);

    // 搜索用户信息
    const aSearchVillagerMsg = ref({});

    // 显示用户信息通过ID
    const showVillagerMsg = () => {
      const allVillageMsg = store.getSelectVillageAllVillagerMsg;
      aSearchVillagerMsg.value = {};
      allVillageMsg.forEach((item) => {
        if (item.序号 == aVillagerID.value) {
          aSearchVillagerMsg.value = item;
        }
      });
    };

    // 保存用户信息，保存用户的经纬度
    const saveVillagerMsg = () => {
      if (aVillagerID.value !== null && messageFromParent.value !== null) {
        const aSuccess = store.saveVillagerLngMsg(
          aVillagerID.value,
          messageFromParent.value
        );
        if (aSuccess) {
          console.log("保存成功");
        } else {
          console.log("保存失败");
        }
      }
    };

    // 使用 watch 监听 props 的变化，并更新内部变量
    watch(
      () => props.initialMessage,
      (newMessage) => {
        messageFromParent.value = newMessage;
      }
    );

    return {
      messageFromParent,
      aVillagerID,
      aSearchVillagerMsg,
      showVillagerMsg,
      saveVillagerMsg,
    };
  },
};
</script>
