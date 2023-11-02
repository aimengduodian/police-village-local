<template>
  <div class="q-pa-md q-gutter-sm">
    <div v-html="qeditor" />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  async loadTxtFile() {
    try {
      const response = await axios.get("/txt/doc1.txt");
      this.qeditor = response.data;
    } catch (error) {
      console.error("Error fetching the file:", error);
    }
  },
  setup() {
    const qeditor = ref("");
    return {
      qeditor,
    };
  },
};
</script>
