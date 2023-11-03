<template>
  <div class="q-pa-md q-gutter-sm">
    <div v-html="qeditor" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const qeditor = ref("");
    const loadTxtFile = async () => {
      try {
        const response = await axios.get("/txt/aboutus.txt");
        qeditor.value = response.data;
      } catch (error) {
        console.error("Error fetching the file:", error);
      }
    };

    onMounted(() => {
      loadTxtFile();
    });
    return {
      qeditor,
      loadTxtFile,
    };
  },
};
</script>
