({
	doInit : function(component, event, helper) 
    {
		console.log('init called');
        
        
        var opts = [
            { class: "optionClass", label: "-Select a Speciality-", value: "", selected: "true" },
            { class: "optionClass", label: "Cardiology", value: "Cardiology" },
            { class: "optionClass", label: "Endocrinology", value: "Endocrinology" },
            { class: "optionClass", label: "Gastroenterology", value: "Gastroenterology" },
            { class: "optionClass", label: "Neurology", value: "Neurology" },
            { class: "optionClass", label: "Ophthalmology", value: "Ophthalmology" },
            { class: "optionClass", label: "Orthopaedics", value: "Orthopaedics" }            
        ];
        component.find("InputSelectDynamic").set("v.options", opts);
	},
    loadFunc : function(component, event, helper) {
        console.log('inside');
        
        //Modal Open
        $('#toggleBtn').click(function(){
            $('#backdrop').addClass('slds-backdrop--open');
            $('#modal').addClass('slds-fade-in-open');
        });
        
    },
    closeModal : function(component,event,helper)
    {
        console.log('in');
        $('#modal').removeClass('slds-fade-in-open');
        $('#backdrop').removeClass('slds-backdrop--open');
    },
    onSelectChange : function(component, event, helper) {
        var selected = component.find("InputSelectDynamic").get("v.value");
        console.log('selected: '+selected);
        component.set("v.phy_select",selected);
    },
    fetchValues : function(component,event,helper)
    {
        var name = component.find("name").get("v.value");
        var city = component.find("city").get("v.value");
        console.log('name: '+name);
        console.log('city: '+city);
        var speciality = component.get("v.phy_select");
        console.log('speciality: '+speciality);
        var id = component.get('v.recordId');
        console.log('id in fetch:'+id);
        
        var InputEvent = $A.get("e.c:DE_InputValues");
        InputEvent.setParams({input_name:name});
        InputEvent.setParams({input_city:city});
        InputEvent.setParams({input_speciality:speciality});
        InputEvent.setParams({cont_id:id});
        InputEvent.fire();
    }
})