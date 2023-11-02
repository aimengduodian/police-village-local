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
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle
                  v-for="menu in createMenu"
                  :key="menu.text"
                  v-model="mobileData"
                  :label="menu.label"
                />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
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

    <q-drawer v-model="leftDrawerOpen" bordered behavior="mobile">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <span class="q-ml-sm">万隆派出所智慧警务平台</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-separator class="q-my-md" />
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
              <router-link :to="link.router">
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import SearchPerson from "components/SearchPerson.vue";

export default {
  components: {
    SearchPerson,
  },
  created() {},
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const storage = ref(0.26);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    const firstLevelOptions = ref(null);
    const secondLevelOptions = ref(null);

    return {
      leftDrawerOpen,
      storage,

      links1: [{ icon: "map", router: "/", text: "主页" }],
      links2: [
        { icon: "help", router: "/doc", text: "软件下载" },
        { icon: "help", router: "/doc", text: "使用指南" },
        { icon: "help", router: "/doc", text: "web版配置" },
      ],
      links3: [
        { icon: "settings", router: "/editor", text: "编辑文档" },
        { icon: "settings", router: "/aboutSoft", text: "关于软件" },
      ],

      createMenu: [{ icon: "photo_album", text: "功能1", label: "测试功能1" }],

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
