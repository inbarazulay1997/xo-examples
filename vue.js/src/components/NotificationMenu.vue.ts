import notificationTypes from '@/data/notificationTypes';
import { INotification, INotificationType, NotificationStatus } from '@/exoform/types/domainTypes';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class NotificationMenu extends Vue {
  @Prop()
  notifications!: Array<INotification>;
  @Prop()
  exo: any;
  types: Array<INotificationType> = notificationTypes;
  private _menuOpen = false;

  get activeNotifications(): Array<INotification> {
    const nots: Array<INotification> = JSON.parse(JSON.stringify(this.notifications)).reverse();
    return [
      ...nots.filter(n => !n.status || n.status === NotificationStatus.OPEN),
      ...nots.filter(n => n.status === NotificationStatus.READ)
    ]
  }

  get unreadNotifications(): Array<INotification> {
    return this.notifications.filter(n => !n.status || n.status === NotificationStatus.OPEN);
  }

  getIcon(type: string): string {
    return this.types.find(t => t.name === type)?.icon || "";
  }

  getColor(type: string): string {
    return this.types.find(t => t.name === type)?.color || "";
  }

  close(n: INotification): void {
    n.status = NotificationStatus.CLOSED;
    this.exo.get("notification_stack")._control.events.trigger("action", { id: "statusChange", status: "closed", notification: n });
  }

  get menuOpen(): boolean {
    return this.activeNotifications.length <= 0 ? false : this._menuOpen;
  }

  set menuOpen(open: boolean) {
    this._menuOpen = open;
  }
}
