<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="./assets/icon512px.png"
        transition="scale-transition"
        width="3rem"
      />
      <v-app-bar-title>ExoForm - Vue Example</v-app-bar-title>
      <v-spacer />
      <div>Your name is: {{ userName }}</div>
      <notification-menu
        v-if="exo && formData"
        :notifications="formData.notifications.items"
        :exo="exo"
      ></notification-menu>
    </v-app-bar>

    <v-navigation-drawer
      app
      permanent
      :mini-variant="isMobile"
      clipped
      dark
      class="elevation-2"
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Amount of button clicks: {{ btnClicks }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script src="./App.vue.ts"></script>
<style lang="scss" src="./styles/style.scss"></style>
<style lang="scss">
@import url("https://xo-js.dev/v1.0/exf.css");
@import url("https://xo-js.dev/v1.0/pwa.css");
</style>
