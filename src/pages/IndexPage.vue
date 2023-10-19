<template>
  <q-page class="flex flex-center">
    <leaflet-map></leaflet-map>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LeafletMap from "components/LeafletMap.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    LeafletMap,
  },
});
</script>
