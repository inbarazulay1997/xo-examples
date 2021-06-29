import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IDetailedEvent, INotification, INotificationType, NotificationStatus } from '../types/domainTypes';
import NotificationControl from './NotificationControl.vue';

@Component({ components: { NotificationControl } })
export default class NotificationStackControl extends Vue {
  @Prop()
  exo: any;
  @Prop()
  notifications!: Array<INotification>;
  @Prop()
  maxItems!: number;
  @Prop()
  maxCharacters!: number;
  @Prop()
  types!: Array<INotificationType>;

  showSnackbar = true;
  visibleNotifications: Array<INotification> = [];
  progress: any = {};

  mounted(): void {
    this.renderStyleSheet();
    this.setVisibleNotifications();
    this.listen();
    this.exo.events.trigger("action", { id: "mounted", data: "screen is mounted" });
  }

  get unclosedNotifications(): Array<INotification> {
    return this.notifications.filter(n => n.status !== NotificationStatus.CLOSED);
  }

  stackAmount(i: number): number {
    return i === this.visibleNotifications.length - 1 ? this.notifications.filter(n => n.status !== NotificationStatus.CLOSED).length - this.maxItems : 0;
  }

  setVisibleNotifications(): void {
    this.visibleNotifications = this.notifications.filter(n => n.status !== NotificationStatus.CLOSED)
      .reverse()
      .slice(0, this.maxItems);

    this.notifications
      .filter(n => this.visibleNotifications.find(vn => vn.id === n.id) && (!n.status || n.status === NotificationStatus.OPEN))
      .forEach(n => {
        n.status = NotificationStatus.READ;
        this.exo.events.trigger("action", { id: "statusChange", status: "read", notification: n });
      });

    this.$forceUpdate();
  }

  listen(): void {
    this.exo.on("action", (event: IDetailedEvent) => {
      switch (event.detail.id) {
        case "addNotification":
          this.notifications = event.detail.notifications;
          break;
        case "markAsRead":
          this.notifications.map(n => n.status = NotificationStatus.READ);
          break;
      }
      this.setVisibleNotifications();
    });
  }

  renderStyleSheet(): void {
    const prevStyleSheet = document.getElementById(
      `notification-types`
    );
    if (prevStyleSheet) prevStyleSheet.remove();

    const cssSheet = document.createElement("style");
    cssSheet.id = `notification-types`;
    cssSheet.innerHTML = this.maxItems ? `
      .exf-notification:nth-child(-n+0),
      .exf-notification:nth-child(n+${this.maxItems + 1}) {
        display: none;
      }` : '';
    this.types.forEach(t => {
      cssSheet.innerHTML += `
        .v-snack.exf-notification-${t.name},
        .v-snack.exf-notification-${t.name} .v-btn,
        .v-snack.exf-notification-${t.name} .v-icon {
          color: ${t.color};
        }
      `;
    });
    document.querySelector("head")?.appendChild(cssSheet);
  }

  close(notification: INotification): void {
    notification.status = NotificationStatus.CLOSED;
    this.exo.events.trigger("action", { id: "statusChange", status: "closed", notification });
    this.setVisibleNotifications();
  }
}
