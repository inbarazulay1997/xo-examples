import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { EventBus } from './event-bus';
import './exoform/customContols';
import NotificationMenu from '@/components/NotificationMenu.vue';
import { INotification } from './exoform/types/domainTypes';
import notifications from './data/notifications';
import xo from '@mvneerven/xo-js';

@Component({ name: 'App', components: { NotificationMenu } })
export default class App extends Vue {
  items = [{ icon: 'mdi-home', title: 'Home' }];
  notifications: Array<INotification> = notifications;
  formData: any = null;
  exo: any = null;

  mounted() {
    xo.form.bind((obj: any) => {
      if (obj.state === "ready") {
        this.formData = obj.instances;
        this.exo = obj.exo;
      }
    }, true);
  }

  get userName() {
    return this.formData?.person?.title || "Unknown";
  }

  get btnClicks() {
    return this.formData?.clicks?.amount || 0;
  }

  get isMobile(): boolean {
    return this.$vuetify.breakpoint.smAndDown;
  }
}
