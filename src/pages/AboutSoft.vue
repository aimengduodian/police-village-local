<template>
  <div class="q-pa-md q-gutter-sm">
    <div v-html="qeditor" />
  </div>
  <q-card class="q-mt-md row no-shadow" bordered>
    <q-card-section class="col-12 row text-center q-pa-lg">
      <br />
      <div class="text-body1 col-12 q-mt-sm text-grey-8 text-weight-bold">
        版权 © 2023 开封市祥符区公安局万隆派出所
      </div>
      <br />
    </q-card-section>
  </q-card>
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
