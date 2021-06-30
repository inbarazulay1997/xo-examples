import Vue from 'vue'
import { Component } from 'vue-property-decorator'
// import the XO custom controls for use in the application
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
      // bind home-form if the form state is ready
      if (obj.state === "ready" && obj.exo.id === "home-form") {
        // set formData for reactivity between Vue and XO
        this.formData = obj.instances.data;
        this.exo = obj.exo;
      }
    }, false);
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
