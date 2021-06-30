<template>
  <div
    class="exf-notification"
    :class="{
      'has-progress-bar': notification.timeout,
      'has-stack': stackAmount,
    }"
    @mouseenter="paused = true;"
    @mouseleave="paused = false;"
  >
    <v-snackbar
      v-model="showSnackbar"
      class="exf-notification__stack second"
      timeout="-1"
      v-if="stackAmount > 1"
    ></v-snackbar>
    <v-snackbar
      v-model="showSnackbar"
      class="exf-notification__stack first"
      timeout="-1"
      v-if="stackAmount > 0"
    ></v-snackbar>
    <v-snackbar
      v-model="showSnackbar"
      timeout="-1"
      multi-line
      :class="`exf-notification-${notification.type}`"
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3">{{ icon }}</v-icon>
        <v-layout column>
          <div>
            {{ text }}
            <a
              v-if="notification.text.length > maxCharacters"
              @click="toggleText()"
            >
              {{ expanded ? "View less" : "View more" }}
            </a>
          </div>
        </v-layout>
      </v-layout>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="close"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-progress-linear
      v-model="progress.percentage"
      :color="color"
      v-if="notification.timeout"
    ></v-progress-linear>
  </div>
</template>

<style lang="scss" scoped src="./NotificationControl.scss"></style>
<script src="./NotificationControl.vue.ts"></script>
