<template>
  <l-circle
    :lat-lng="messageFromParent"
    :radius="10"
    color="red"
    :illOpacity="0.3"
  >
    <l-popup>
      <q-input label="请输入户主的id" v-model.number="model" type="number" />

      <p>
        与户主关系: 与户主关系 <br />
        姓名: 姓名 <br />
        性别: 性别 <br />
        出生日期: 出生日期 <br />
        电话号码: 电话号码 <br />
      </p>

      <div class="q-pa-md q-gutter-sm">
        <q-btn
          align="left"
          class="btn-fixed-width"
          color="primary"
          label="查看信息"
        />
        <q-btn
          align="right"
          class="btn-fixed-width"
          color="secondary"
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

export default {
  components: {
    LCircle,
    LPopup,
  },
  props: {
    initialMessage: Array,
  },
  setup(props) {
    // 使用 ref 来声明响应式变量
    const messageFromParent = ref(props.initialMessage);

    // 使用 watch 监听 props 的变化，并更新内部变量
    watch(
      () => props.initialMessage,
      (newMessage) => {
        messageFromParent.value = newMessage;
      }
    );

    return {
      messageFromParent,
      model: ref(10),
    };
  },
};
</script>
