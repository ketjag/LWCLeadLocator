import { LightningElement, track } from "lwc";

export default class ChilComp extends LightningElement {
  @track childmyname;
  @track fromgrandchildmyname;

  handlesubmit(event) {
    this.fromgrandchildmyname = event.detail;
  }

  updateName(event) {
    console.log("text box changed " + event.target.value);
    this.childmyname = event.target.value;
  }
}
