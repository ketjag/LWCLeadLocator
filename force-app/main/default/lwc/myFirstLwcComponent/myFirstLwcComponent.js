import { LightningElement, track } from "lwc";

export default class MyFirstLwcComponent extends LightningElement {
  @track searchTerm;
  @track searchInput;
  @track isSearchComplete = false;

  handleNewSearch(event) {
    console.log("newSearch event is handled !" + event.detail);
    this.searchTerm = event.target.value;
  }
  handleSearchComplete(event) {
    this.searchInput = event.detail;
    this.isSearchComplete = true;
  }
}
