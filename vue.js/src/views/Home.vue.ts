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
    xo.form.bind((obj: any) => {
      if (obj.state === "ready") {
        this.formData = obj.instances;
      }
    }, true);

    this.form = await xo.form.run(schema, {}) as HTMLElement;
    document.getElementById("exoform")?.appendChild(this.form);
  }

  btnClicked(): void {
    this.formData.clicks.amount += 1;
  }
}
