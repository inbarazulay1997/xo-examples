<template>
  <v-menu
    max-width="300"
    offset-y
    :close-on-content-click="false"
    v-model="menuOpen"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        overlap
        color="red"
        :content="unreadNotifications.length"
        class="ml-2"
        :value="unreadNotifications.length > 0"
      >
        <v-icon v-bind="attrs" v-on="on">mdi-bell</v-icon>
      </v-badge>
    </template>

    <v-list>
      <v-list-item
        v-for="n in activeNotifications"
        :key="n.id"
        :class="{ unread: !n.status || n.status === 1 }"
      >
        <v-list-item-icon>
          <v-icon :color="getColor(n.type)">{{ getIcon(n.type) }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title :title="n.text">{{ n.text }}</v-list-item-title>
        <v-list-item-icon>
          <v-icon small @click="close(n)">mdi-close</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script src="./NotificationMenu.vue.ts"></script>
<style lang="scss" scoped src="./NotificationMenu.scss"></style>
