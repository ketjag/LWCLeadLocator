/**
 * @File Name          : LeadSelectorController.cls
 * @Description        : 
 * @Author             : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Group              : 
 * @Last Modified By   : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Last Modified On   : 7/2/2020, 9:33:26 AM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    6/30/2020   ChangeMeIn@UserSettingsUnder.SFDoc     Initial Version
**/
public with sharing class LeadSelectorController {
    
    @AuraEnabled(cacheable=true)
    public static List<Lead> searchLeads(String searchTerm){
        List<Lead> leads=new List<Lead>();
        if(String.isNotBlank(searchTerm)){
            List<List<SObject>> searchResults=[
                find :searchTerm
                RETURNING Lead(
                    Id,Name,Title,Company 
                    Order by Name
                    limit 10
                )
                
            ];
            leads=searchResults[0];

        }
        return leads;
    }
    
}
