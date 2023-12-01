<template>
  <q-btn @click="requestGeolocationPermission">手机端请求地理位置权限</q-btn>
  <p>{{ msg }}</p>
</template>

<script>
import { ref } from "vue";
import { Geolocation } from "@capacitor/geolocation";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const msg = ref("");
    const requestGeolocationPermission = async () => {
      try {
        const result = await Geolocation.requestPermissions();
        msg.value = result;
        if (result.coords) {
          // 用户已授权，可以在这里获取和处理地理位置数据
          $q.notify({
            message: "已授权地理位置权限",
            color: "purple",
          });
        } else {
          // 用户拒绝了权限请求，可以在这里处理拒绝情况
          $q.notify({
            message: "拒绝了地理位置权限",
            color: "purple",
          });
        }
      } catch (error) {
        msg.value = error;
        console.log(error);
        // 处理请求权限时发生的错误
        $q.notify({
          message: "请求地理位置权限时发生错误",
          color: "purple",
        });
      }
    };
    return {
      msg,
      requestGeolocationPermission,
    };
  },
};
</script>
