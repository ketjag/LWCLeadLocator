import { LightningElement, track, wire } from "lwc";
import searchLeads from "@salesforce/apex/LeadSelectorController.searchLeads";

export default class LeadMap extends LightningElement {
  @track searchTerm = "timepass";
  @track leads = [];
  @track error = [];
  @track mapMarkers = [];

  @wire(searchLeads, { searchTerm: "$searchTerm" })
  searchLeads(data) {
    if (data.data) {
      console.log("wire method - data received " + JSON.stringify(data));
      this.leads = data.data;
      this.mapMarkers = data.data.map((lead) => {
        return {
          location: {
            Street: lead.Street,
            City: lead.City,
            State: lead.State,
            PostalCode: lead.PostalCode
          },
          title: lead.Name,
          description: {
            Company: lead.Company
          },
          icon: "utility:pinned"
        };
      });
      this.error = undefined;
    } else if (data.error) {
      console.log("error encountered " + JSON.stringify(data.error));
      this.error = data.error.body;
      this.leads = undefined;
    }
  }
}
