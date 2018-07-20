@isTest
public class DE_FetchRecordsTest 
{
    static testMethod void testFetchRecords()
    {
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com', 
                          EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                          LocaleSidKey='en_US', ProfileId = p.Id, City='San Francisco', Street='Market Street', Country='CA', Speciality__c='Cardiology', 
                          TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@example1.com');
        insert u;
        DE_FetchRecords.getUsers('Test','San','Cardiology');
        
        Case cs = new Case(Subject='test');
        insert cs;
            
        Account a = new Account(Name='testAccount',HealthCloudGA__CarePlan__c=cs.Id);
        insert a; 
        
        Contact c = new Contact(LastName='testContact',AccountId=a.Id);
        insert c;
                
        String strJSON = '[{"flag":true,"u":{"Name":"'+u.Name+'","City":"San Francisco","Street":"Market Street","Country":"CA","Speciality__c":"Cardiology","Id":"'+u.Id+'"}}]';
        System.debug('strJSON::'+strJSON);
        
        DE_FetchRecords.saveUsers(strJSON, c.Id);
    }
}