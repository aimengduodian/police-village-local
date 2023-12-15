<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="/pic/avatar.jpeg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">用户登录</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="username" label="用户名" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                label="密码"
                lazy-rules
              />

              <div>
                <q-btn label="登录" to="/" type="button" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  setup() {
    return {
      username: ref("admin"),
      password: ref("123456"),
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(180deg, hwb(0 0% 2%) 0%, #0a018c 100%);
}
</style>
