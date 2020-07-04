import { LightningElement, api, track } from "lwc";

export default class Grandchild extends LightningElement {
  @api myName;

  handleClick() {
    console.log("value of myname in grand child" + this.myName);
    const customevt = new CustomEvent("submit", {
      detail: "hello" + this.myName
    });
    this.dispatchEvent(customevt);
  }
}
