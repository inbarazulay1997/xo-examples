import Vue from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { INotification, INotificationType, NotificationStatus } from '../types/domainTypes';

@Component
export default class NotificationControl extends Vue {
  @Prop()
  notification!: INotification;
  @Prop()
  maxCharacters!: number;
  @Prop()
  types!: Array<INotificationType>;
  @Prop()
  stackAmount?: number;
  showSnackbar = true;
  text = "";
  expanded = false;
  progress = { amount: 0, percentage: 0 };
  paused = false;

  @Emit('closeNotification')
  close() {
    return;
  }

  @Watch("notification.id")
  setNewNotification() {
    if (this.notification.timeout) {
      setInterval(() => this.setProgressStatus(), 10);
    }
  }

  @Watch("notification.text")
  setText() {
    this.text = this.notification.text;

    if (!this.expanded && this.maxCharacters && this.notification.text.length > this.maxCharacters) {
      this.text = `${this.notification.text.substr(0, this.maxCharacters)}...`;
    }
  }

  mounted() {
    this.expanded = Boolean(this.notification.expanded);
    this.setText();
    this.setNewNotification();
  }

  get icon(): string {
    return this.types.find(t => t.name === this.notification.type)?.icon || "";
  }

  toggleText() {
    this.expanded = !this.expanded;
    this.setText();
  }

  setProgressStatus(): void {
    if (this.notification.timeout && this.notification.status !== NotificationStatus.CLOSED && !this.paused) {
      this.progress.amount += 10;
      this.progress.percentage = this.progress.amount / this.notification.timeout * 100;
      if (this.progress.amount >= this.notification.timeout) {
        this.close();
      }
    }
  }

  get color(): string {
    const type = this.types.find(t => t.name === this.notification.type);
    return type?.progressBarColor || type?.color || "blue";
  }
}
