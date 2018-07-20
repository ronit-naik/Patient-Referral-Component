public class DE_FetchRecords 
{
    @AuraEnabled
    public static List<WrapperUser> getUsers(String na, String ci, String sp)
    {
        system.debug('inside getusers');
        List<WrapperUser> wList = new List<WrapperUser>();
        List<User> uList = new List<User>();
        String qryList = 'select Name,City,Street,Country,Speciality__c from User where' ;
        
        if(na==null)
        {
            na='';
            system.debug('null na');
        }
        if(ci==null)
        {
            ci='';
        }
        uList = [select Name,City,Street,Country,Speciality__c from User where Name like :'%'+na+'%' and City like :'%'+ci+'%' and Speciality__c=:sp];
        system.debug('ss:'+uList);
        system.debug('name: '+na+'::'+ci+'::'+sp);        
        /*if (na!=null && na!=''){
            String name = na+'%';
        	qryList = qryList + ' Name like :name';   
        }
        if (ci!=null && ci!=''){
            String city = ci+'%';
			qryList = qryList + ' and City like :city and';     
        }
        if (sp!=null && sp!=''){
            qryList = qryList + ' and Speciality__c=:sp';
        }
        system.debug('list:'+qryList);
        uList = Database.query(qryList);*/
        for(User u:uList)
        {
            WrapperUser wu = new WrapperUser(u,false);
            wList.add(wu);
        }
        return wList;

        
    }
    @AuraEnabled
    public static void saveUsers(String arr,String cId)
    {
        
        system.debug('cid:'+cId);
        system.debug('arr:'+arr);
        Contact c = [select Name, Account.Name, Account.HealthCloudGA__CarePlan__c from Contact where Id=:cId]; 
        Id caseId = c.Account.HealthCloudGA__CarePlan__c;
        system.debug('caseid:'+caseId);
        
        
        List<DE_FetchRecords.WrapperUser> ids=(List<DE_FetchRecords.WrapperUser>) JSON.deserialize(arr, List<DE_FetchRecords.WrapperUser>.class);
        system.debug('new list:'+ids);
        
        List<CaseTeamRole> ctrList = [Select Id,Name from CaseTeamRole];
        
        CaseTeamMember ctm = new CaseTeamMember();        
        
        for(WrapperUser wu:ids)
        {
            system.debug('wu:'+wu.u.Speciality__c);
            for(CaseTeamRole ctr:ctrList)
            {
                //system.debug('ctr.Name.substring(0,5):'+ctr.Name.length());
                if(ctr.Name.length()>=5 && ctr.Name.substring(0,5) == wu.u.Speciality__c.substring(0,5))
                {
                    system.debug('ctrid:'+ctr.Id);
                    system.debug('ctr.Name.substring(0,5):'+ctr.Name.substring(0,5));
                    ctm.MemberId = wu.u.Id;
                    ctm.ParentId = caseId;
                    ctm.TeamRoleId = ctr.Id;
                }
            }
        }
       // insert ctm;
        system.debug('ctm:'+ctm);
    }
    public Class WrapperUser
    {
        @AuraEnabled
        public User u{get;set;}
        @AuraEnabled
        public boolean flag{get;set;}
        public WrapperUser(User u,boolean flag)
        {
            this.u = u;
            this.flag = flag;
            
        }
    }
}