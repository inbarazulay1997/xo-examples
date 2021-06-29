import { INotification } from "@/exoform/types/domainTypes";

const notifications: Array<INotification> = [
  { id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5), text: "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test", type: "info" },
  { id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5), text: "test2", type: "warning" },
  { id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5), text: "test1", type: "error" },
];

export default notifications;
