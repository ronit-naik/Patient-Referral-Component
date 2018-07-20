({
    handleSelect : function(component, event, helper)
    {
        var name = event.getParam("input_name");
        var city = event.getParam("input_city");
        var speciality = event.getParam("input_speciality");
        var con_id = event.getParam("cont_id");
        
        console.log('name2: '+name);
        console.log('city2: '+city);
        console.log('speciality2: '+speciality);
        console.log('url in 2nd compo: '+window.location.pathname);
        //var id = component.get('v.recordId');
        console.log('id in handle select:'+con_id);
        component.set("v.conId",con_id);
        
        
        document.getElementById('tab1').style.display = 'block';
        
        var action = component.get("c.getUsers");
        action.setParams({"na" : name , "ci" : city , "sp" : speciality});
        action.setCallback(this, function(response) {
            console.log(response.getReturnValue());
            var rec = response.getReturnValue();
            component.set("v.result", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    checkedValue : function(component,event)
    {
        var sel = component.get("v.result");
        console.log(sel);
        var select = [];
        var select_mul = [];
        console.log('in checked: '+sel[0].flag);
        var temp = component.get("v.selected");
        console.log(temp);
        for(var i=0;i<sel.length;i++)
        {
            console.log(sel[i].flag+' '+temp.length);
            if(sel[i].flag==true)
            {                
                console.log('true2');
                select.push(sel[i]);
            }
        }
        document.getElementById('tab2').style.display = 'block';
        console.log('new list:'+select[0].flag);
        
        if(temp.length>0)
        {
            for(var k=0;k<temp.length;k++)
                select_mul.push(temp[k]);
            
            console.log('in if length>0'+select.length);
            for(var i=0;i<select.length;i++)
            {
                var count=0;
                //select_mul.push(temp[i]);
                for(var j=0;j<temp.length;j++)
                {
                    console.log('j val:'+j)
                    if(select[i]==temp[j])
                    {
                        console.log('it is true');
                        break;
                    }
                    else
                    {
                        console.log('in else count');
                        count++;
                    }
                }
                if(count==temp.length)
                    select_mul.push(select[i]);
            }
        }
        else
        {
            for(var i=0;i<select.length;i++)
                select_mul.push(select[i]);
        }
        
        /* for(var i=0;i<temp.length;i++)
        {
            if(temp[i]!=null)
            {
                console.log('inside if');
            	select.push(temp[i]);
            }
        }*/
        console.log(select_mul);
        component.set("v.selected",select_mul);
        
        /*console.log('in check');
        var ch = event.currentTarget;
        var recId = ch.dataset.record;
        console.log('id: '+recId);
        console.log('get: '+component.get("v.selected"));
        var sel = [];
        var getVal = component.get("v.selected");
        if(getVal!=null)
        {
            console.log('not null');
        }
        component.set("v.selected",recId);*/
    },
    saveReferral : function(component,event,helper)
    {
        var save = component.get("v.selected");
        var ids = [];
        for(var i=0;i<save.length;i++)
        {
            ids.push(save[i].u.Id);
            console.log('save: '+save[i].u.Id);
        }
        var id = component.get('v.conId');
        console.log('id in save:'+id);
        var idListJSON=JSON.stringify(save);
        var action = component.get("c.saveUsers");
        action.setParams({"arr" : idListJSON , "cId" : id });
        action.setCallback(this, function(response) {
            console.log(response.getReturnValue());
            var rec = response.getReturnValue();
                
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "message": "Physician added to the Care Plan.",
                "type" : "success"
            });
            toastEvent.fire();
            location.reload();
        
            //helper.navigate();
            //window.reload(true);
        });
        $A.enqueueAction(action);
    },
    clearReferral : function(component,event)
    {
        var clr = [];
        component.set("v.selected",clr);
        console.log(component.get("v.selected"));
    },
    navigate : function(componenr,event,helper)
    {
        console.log('in navigate');
        //event.getSource().get("v.label");
        var id = event.target.id;
        console.log('id:'+id);
        var navEvt = $A.get("e.force:navigateToSObject");
        console.log(navEvt);
        navEvt.setParams({
            "recordId": id,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
    deleteReferral : function(component,event)
    {
        var id = event.target.id;
        console.log('id in del: '+id);
        var del = component.get("v.selected");
        var list = [];
        for(var i=0;i<del.length;i++)
        {
            if(id != del[i].u.Id)
            {
                console.log('in if');
                list.push(del[i]);
            }
            else
            {
                console.log('in else');
            }
        }
        component.set("v.selected",list);
    }
})