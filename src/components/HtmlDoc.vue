<template>
  <div class="q-pa-md q-gutter-sm">
    <div v-html="qeditor" />
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "html-doc",
  setup() {
    const qeditor = ref("");
    const route = useRoute();
    const routePath = ref("");
    const loadTxtFile = async () => {
      try {
        if (routePath.value !== 0) {
          const response = await axios.get(routePath.value);
          qeditor.value = response.data;
        } else {
        }
      } catch (error) {
        console.error("Error fetching the file:", error);
      }
    };

    watch(
      () => route.params.id,
      (_newValue, _oldValue) => {
        if (route.params.id == 1) {
          routePath.value = "/txt/1.txt";
        } else if (route.params.id == 2) {
          routePath.value = "/txt/2.txt";
        } else if (route.params.id == 3) {
          routePath.value = "/txt/3.txt";
        }
        loadTxtFile();
      }
    );
    onMounted(() => {
      if (route.params.id == 1) {
        routePath.value = "/txt/1.txt";
      } else if (route.params.id == 2) {
        routePath.value = "/txt/2.txt";
      } else if (route.params.id == 3) {
        routePath.value = "/txt/3.txt";
      }
      loadTxtFile();
    });
    return {
      qeditor,
      loadTxtFile,
    };
  },
};
</script>
