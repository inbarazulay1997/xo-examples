// import xo from '@mvneerven/xo-js';
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import schema from '../exoform/schemas/home';
import xo from "@mvneerven/xo-js";

@Component({ name: 'Home' })
export default class Home extends Vue {
  formData: any = {};
  form: HTMLElement = {} as HTMLElement;
  numberOfClicks = 0;

  async mounted(): Promise<void> {
    // connect the formData value to the data instance of the XO form
    xo.form.data("home-form", "data", (o: any) => this.formData = o);

    // run the schema and append it to the document
    this.form = await xo.form.run(schema, { id: "home-form" }) as HTMLElement;
    document.getElementById("exoform")?.appendChild(this.form);
  }

  /**
   * Update the amount of clicks in the formData
   * This will update the XO form model and the form itself as well
   */
  btnClicked(): void {
    this.formData.clicks.amount += 1;
  }
}
