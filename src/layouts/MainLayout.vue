<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.sm"
          shrink
          class="row items-center no-wrap"
        >
          <img src="/pic/title.png" />
          <span class="q-ml-sm">万隆乡地理信息系统</span>
        </q-toolbar-title>

        <q-space />

        <search-person class="GPL__toolbar-input" />

        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          dense
          no-wrap
          color="primary"
          icon="add"
          no-caps
          label="Create"
          class="q-ml-sm q-px-md"
        >
          <q-menu anchor="top end" self="top end">
            <q-list class="text-grey-8" style="min-width: 100px">
              <q-item aria-hidden="true">
                <q-item-section
                  class="text-uppercase text-grey-7"
                  style="font-size: 0.7rem"
                  >Create New</q-item-section
                >
              </q-item>
              <q-item
                v-for="menu in createMenu"
                :key="menu.text"
                clickable
                v-close-popup
                aria-hidden="true"
              >
                <q-item-section avatar>
                  <q-icon :name="menu.icon" />
                </q-item-section>
                <q-item-section>{{ menu.text }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          dense
          no-wrap
          color="primary"
          icon="cloud_upload"
          no-caps
          label="Upload"
          class="q-ml-sm q-px-md"
        />
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>更多功能选项</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>消息提醒</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>账号</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered behavior="mobile">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <img class="q-pl-md" src="74x24px.svg" />
            <span class="q-ml-sm">功能列表</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <div class="q-gutter-md row items-start">
            <q-separator class="q-my-md" />
            <search-house />
            <!-- 两个select下拉框，实现地图定位功能 -->
          </div>
          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links3"
            :key="link.text"
            clickable
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item clickable class="GPL__drawer-item GPL__drawer-item--storage">
            <q-item-section avatar>
              <q-icon name="photo" />
            </q-item-section>
            <q-item-section top>
              <router-link to="/aboutSoft">
                <q-item-label>关于软件</q-item-label>
              </router-link>
            </q-item-section>
          </q-item>
          <q-item clickable class="GPL__drawer-item GPL__drawer-item--storage">
            <q-item-section avatar>
              <q-icon name="cloud" />
            </q-item-section>
            <q-item-section top>
              <q-item-label>进度条</q-item-label>
              <q-linear-progress :value="storage" class="q-my-sm" />
              <q-item-label caption>2.6 GB of 15 GB</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, watch } from "vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";

import SearchHouse from "components/SearchHouse.vue";
import SearchPerson from "components/SearchPerson.vue";

export default {
  components: {
    SearchHouse,
    SearchPerson,
  },
  created() {},
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const storage = ref(0.26);
    // 状态管理
    const store = useVillageStore();

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    // 加载数据
    store.loadHouseHolderCSVData("zhonggang", "/csv/zhonggang.csv");
    store.loadHouseHolderCSVData("xiezhuang", "/csv/xiezhuang.csv");
    store.loadVillageCSVData("祥符区", "/csv/祥符区.csv");

    function loadHouseHolderCSV() {}
    function loadVillage() {}

    const firstLevelOptions = ref(null);
    const secondLevelOptions = ref(null);

    return {
      leftDrawerOpen,
      storage,

      links3: [
        { icon: "settings", text: "设置" },
        { icon: "help", text: "帮助文档" },
      ],
      createMenu: [{ icon: "photo_album", text: "功能1" }],

      toggleLeftDrawer,
      loadVillage,
      loadHouseHolderCSV,
    };
  },
};
</script>

<style lang="sass">
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
