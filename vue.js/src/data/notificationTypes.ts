import { INotificationType } from "@/exoform/types/domainTypes";

const notificationTypes: Array<INotificationType> = [
  {
    name: 'info',
    color: '#71C3DD',
    progressBarColor: 'blue',
    icon: 'mdi-information-outline'
  },
  {
    name: 'success',
    color: '#54A668',
    progressBarColor: 'green',
    icon: 'mdi-check-circle-outline'
  },
  {
    name: 'warning',
    color: '#F3CC6B',
    progressBarColor: 'orange',
    icon: 'mdi-alert-outline'
  },
  {
    name: 'error',
    color: '#DF6962',
    progressBarColor: 'red',
    icon: 'mdi-alert-circle-outline'
  },
];

export default notificationTypes;
