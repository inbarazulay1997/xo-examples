<template>
  <div class="exf-notification-stack">
    <template
      v-for="(n, i) in visibleNotifications"
    >
      <notification-control
        :key="i"
        :notification="n"
        :maxCharacters="maxCharacters"
        :types="types"
        :stackAmount="stackAmount(i)"
        @closeNotification="close(n)"
      ></notification-control>
    </template>
  </div>
</template>

<style lang="scss" scoped src="./NotificationStackControl.scss"></style>
<script src="./NotificationStackControl.vue.ts"></script>
