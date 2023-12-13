<template>
  <q-page class="flex flex-center">
    <leaflet-map />
    <page-sticky />
  </q-page>
</template>

<script>
// 引入pinia插件
import LeafletMap from "components/LeafletMap.vue";
import PageSticky from "components/PageSticky.vue";

export default {
  components: {
    LeafletMap,
    PageSticky,
  },
};
</script>
