import Vue from "vue";
import xo from "@mvneerven/xo-js";
import vuetify from "@/plugins/vuetify";
import NotificationStackControl from "./controls/NotificationStackControl.vue";
import { IDetailedEvent, INotification, INotificationType } from "./types/domainTypes";
import notificationTypes from "@/data/notificationTypes";

class NotificationStack extends xo.form.fields.base.controls.div.type {
  notifications: Array<INotification> = [];
  maxItems = 3;
  maxCharacters = 100;
  events: any = null;
  app: Vue | null = null;
  types: Array<INotificationType> = notificationTypes;

  constructor(context: any) {
    super(context);
    // bind the XO events class to the Notification Stack Control
    this.events = new xo.core.Events(this, {});
    (this as any).htmlElement.data = {};
    // set properties to be approachable directly from 'this'
    (this as any).acceptProperties("notifications", "maxItems", "maxCharacters", "types");
  }

  // create method to retrieve value of field
  get value() {
    return this.notifications;
  }

  // create method to set the value of field
  set value(notifications: Array<INotification>) {
    this.notifications = notifications;
  }

  async render() {
    const _ = this as any;

    // retrieve parent functions ExoForm Div control
    await super.render();

    // start listening to all triggered "action" events
    _.on("action", (ev: IDetailedEvent) => {
      switch (ev.detail.id) {
        case "mounted":
          // once the notification stack control is mounted, add a new notification to the model after 5 seconds
          setTimeout(() => {
            this.value.push({ text: "New notification", id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5), type: "success", timeout: 5000 });
          }, 5000);
          break;
        case "statusChange":
          this.value.splice(this.value.findIndex(n => n.id === ev.detail.notification.id), 1, ev.detail.notification);
          break;
      }
    });

    // generate a new HTML DOM containing the Vue application, so this can be mounted to the generated container by XO
    this.app = new Vue({
      render(createElement) {
        return createElement(
          NotificationStackControl,
          {
            // add props to be used in Vue component
            props: {
              notifications: _.notifications,
              maxItems: _.maxItems,
              maxCharacters: _.maxCharacters,
              types: _.types,
              exo: _
            }
          },
          this.$slots.default
        );
      },
      components: {
        NotificationStackControl,
      },
      // add vuetify to make use of standard vuetify functionality
      vuetify
    }).$mount();

    // mount Vue application to XO form generated HTMLDivElement
    _.container.appendChild(this.app.$el);

    return _.container;
  }
}

// add controls to factory (in bulk if needed)
class MyControls {
  static controls = {
    notification_stack: {
      type: NotificationStack,
      note: "Control containing a stack of notifications",
    },
  };
}

// add custom control(s) to ExoForm Factory
xo.form.factory.add(MyControls.controls);
