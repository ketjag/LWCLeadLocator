import { LightningElement, track, wire } from "lwc";
import searchLeads from "@salesforce/apex/LeadSelectorController.searchLeads";
import { NavigationMixin } from "lightning/navigation";

const columns = [
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "Title", fieldName: "Title", type: "text" },
  { label: "Company", fieldName: "Company", type: "text" },
  {
    label: "View",
    type: "button-icon",
    initialWidth: 75,
    typeAttributes: {
      title: "View Details",
      iconName: "action:info",
      alternaticeText: "View Details"
    }
  }
];

export default class LeadList extends NavigationMixin(LightningElement) {
  @track searchTerm = "timepass";
  @track searchTerm1 = "timepass";
  @track leads = [];
  @track columns = columns;
  @track error = [];
  @track record;
  constructor() {
    super();
    console.log("constructor is called");
  }
  connectedCallback() {
    console.log("connected call back is called ");
  }

  @wire(searchLeads, { searchTerm: "$searchTerm" })
  searchLeads(data) {
    if (data.data) {
      console.log("wire method - data received " + JSON.stringify(data));
      this.leads = data.data;
      const selectedEvent = new CustomEvent("searchcomplete", {
        detail: this.searchTerm
      });
      this.dispatchEvent(selectedEvent);
      this.error = undefined;
    } else if (data.error) {
      console.log("error encountered " + JSON.stringify(data.error));
      this.error = data.error.body;
      this.leads = undefined;
    }
  }

  handleSearchTermChange(event) {
    if (this.leads) {
      console.log("value of leads :" + JSON.stringify(this.leads));
      console.log("handler handleSearchTermChange" + this.searchTerm);
      this.searchTerm = event.target.value;
      window.clearTimeout(this.delayTimeout);
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.delayTimeout = setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent("newsearch", { detail: this.searchTerm })
        );
      }, 300);
    }
  }

  handleRowAction(event) {
    const row = event.detail.row;
    this.record = row;
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: row.Id,
        actionName: "view"
      }
    });
  }

  /*leads = [
    {
      Id: "1",
      Name: "ketki Jagdale",
      Title: "VP",

      Company: "Infosys"
    },
    {
      Id: "2",
      Name: "Vibhor T",
      Title: "Director",

      Company: "Kindergarfen"
    },
    {
      Id: "3",
      Name: "Pritesh Talwanker",
      Title: "Consultant",

      Company: "Trigyn"
    }
  ];*/
}
