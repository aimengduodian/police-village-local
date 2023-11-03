<template>
  <q-layout view="lHh Lpr fFf" class="bg-grey-1">
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
        <q-toolbar-title shrink class="row items-center no-wrap">
          <img src="/pic/title.png" v-if="$q.screen.gt.sm" />
          <span class="q-ml-sm" v-if="$q.screen.gt.xs"
            >万隆派出所智慧警务平台</span
          >
        </q-toolbar-title>

        <q-space />

        <search-person class="GPL__toolbar-input" />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn-dropdown
            round
            dense
            flat
            color="text-grey-7"
            dropdown-icon="apps"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">辅助功能</div>
                <q-toggle
                  v-model="showCircleMarker"
                  label="显示加载的户主信息"
                  @update:model-value="switchMarkerState"
                />
              </div>
            </div>
          </q-btn-dropdown>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <!--           <q-badge color="red" text-color="white" floating> 2 </q-badge> -->
            <q-tooltip>消息提醒</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="/pic/avatar.jpeg" />
            </q-avatar>
            <q-tooltip>账号</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      behavior="mobile"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            v-for="link in links1"
            :key="link.text"
            clickable
            class="GPL__drawer-item GPL__drawer-item--storage"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <router-link :to="link.router">
                <q-item-label>{{ link.text }}</q-item-label>
              </router-link>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links2"
            :key="link.text"
            clickable
            class="GPL__drawer-item GPL__drawer-item--storage"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <router-link :to="{ name: link.name, params: { id: link.key } }">
                <q-item-label>{{ link.text }}</q-item-label>
              </router-link>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links3"
            :key="link.text"
            clickable
            class="GPL__drawer-item GPL__drawer-item--storage"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <router-link :to="link.router">
                <q-item-label>{{ link.text }}</q-item-label>
              </router-link>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="/pic/material.jpg" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="/pic/avatar.jpeg" />
          </q-avatar>
          <div class="text-weight-bold">万隆派出所智慧警务平台</div>
          <div>@gpj</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
// 引入pinia插件
import { useVillageStore } from "stores/village-store";
import SearchPerson from "components/SearchPerson.vue";

export default {
  components: {
    SearchPerson,
  },
  created() {},
  setup() {
    const store = useVillageStore();
    const leftDrawerOpen = ref(false);
    const storage = ref(0.26);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    let showCircleMarker = ref(false);

    function switchMarkerState(aItem) {
      if (aItem == false) {
        store.saveCircleMarkerState("transparent");
      } else {
        store.saveCircleMarkerState("green");
      }
    }

    return {
      leftDrawerOpen,
      storage,
      showCircleMarker,
      switchMarkerState,

      links1: [{ icon: "map", router: "/", text: "主页" }],
      links2: [
        { icon: "help", key: 1, name: "html-doc", text: "软件下载" },
        { icon: "help", key: 2, name: "html-doc", text: "表格配置" },
        { icon: "help", key: 3, name: "html-doc", text: "web版配置" },
      ],
      links3: [
        { icon: "settings", router: "/editor", text: "编辑文档" },
        { icon: "settings", router: "/aboutSoft", text: "关于软件" },
      ],

      createMenu: [
        {
          icon: "photo_album",
          model: false,
          key: "1",
          label: "显示加载的户主信息",
        },
      ],

      toggleLeftDrawer,
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
