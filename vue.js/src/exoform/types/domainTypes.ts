export interface INotificationType {
  name: string;
  color: string;
  icon: string;
  progressBarColor?: string;
}

export interface INotificationButton {
  text: string;
  action: string;
}

export interface INotification {
  id: string,
  text: string,
  pauseOnHover?: boolean,
  timeout?: number,
  type: string,
  buttons?: Array<INotificationButton>,
  dismissible?: boolean,
  expanded?: boolean,
  status?: NotificationStatus
}

export interface IDetailedEvent extends Event {
  detail: any;
}

export enum NotificationStatus {
  OPEN = 1,
  READ = 2,
  CLOSED = 3
}
