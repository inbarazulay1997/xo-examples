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
  progress = 0;

  @Emit('closeNotification')
  close() {
    return;
  }

  @Watch("notification.id")
  setNewNotification() {
    if (this.notification.timeout) {
      this.notification.hideOn = new Date().getTime() + this.notification.timeout;
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

  @Watch("progress")
  progressChange(newVal: number) {
    if (newVal >= 100) this.close();
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
    if (this.notification.timeout && this.notification.hideOn && this.notification.status !== NotificationStatus.CLOSED) {
      const timeLeft = this.notification.hideOn - new Date().getTime();
      this.progress = 100 - timeLeft / this.notification.timeout * 100;
    }
  }

  get color(): string {
    const type = this.types.find(t => t.name === this.notification.type);
    return type?.progressBarColor || type?.color || "blue";
  }
}
