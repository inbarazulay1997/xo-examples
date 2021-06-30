import notifications from "@/data/notifications";

export default {
  navigation: "static",
  model: {
    instance: {
      data: {
        person: {
          title: "",
          name: {
            first: "John",
            last: "Doe",
          },
          tags: ["good", "will", "hunting"],
          age: 57,
          gender: "male",
        },
        contract: {
          agree: false,
        },
        clicks: {
          amount: 0
        },
        notifications: {
          items: notifications
        }
      }
    },
    logic: (context: any) => {
      const m = context.model,
        person = m.instance.data.person,
        b = m.bindings;
      b.genderUnknown = !["male", "female"].includes(person.gender);
      person.title =
        (b.genderUnknown ? "" : person.gender === "male" ? "Mr " : "Mrs ") +
        person.name.first +
        " " +
        person.name.last;
    },
  },
  pages: [
    {
      legend: "Page 1",
      intro: "My form description",
      fields: [
        {
          type: "notification_stack",
          name: "notification_stack",
          maxItems: 2,
          bind: "instance.data.notifications.items",
        },
        {
          name: "name",
          type: "name",
          caption: "Your name",
          bind: "instance.data.person.name",
        },
        {
          name: "gender",
          type: "dropdown",
          disabled: "@bindings.under18",
          caption: "Gender",
          required: true,
          items: [
            {
              name: "Please choose",
              value: "unknown",
            },
            {
              name: "Male",
              value: "male",
            },
            {
              name: "Female",
              value: "female",
            },
            {
              name: "Not important",
              value: "unspecified",
            },
          ],
          bind: "instance.data.person.gender",
        },
        {
          name: "clicks",
          type: "element",
          tagName: "p",
          html: "You've clicked the button @instance.data.clicks.amount time(s)",
        },
      ]
    },
  ],
};
