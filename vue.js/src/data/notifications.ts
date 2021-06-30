import { INotification } from "@/exoform/types/domainTypes";

const notifications: Array<INotification> = [
  { id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5), text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac elementum felis. Pellentesque gravida dui eu lacus malesuada, a convallis ante efficitur. Etiam imperdiet lacus ac ornare accumsan. Curabitur et dignissim lorem. Maecenas semper orci eget sapien finibus vestibulum.", type: "info" },
  { id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5), text: "Pellentesque pulvinar nec sapien ac dignissim.", type: "warning" },
  { id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5), text: "Maecenas quis augue sed libero pretium placerat ac et ipsum.", type: "error" },
];

export default notifications;
