({
    fetchData: function (cmp,event,helper) {
        var action = cmp.get("c.getAllAccounts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                for (var i = 0; i < data.length; i++){
                    var d = data[i];
                    d.linkName = '/'+d.Id;
                	if (d.Owner) d.OwnerName = d.Owner.Name;
                }
                cmp.set('v.data',data);
                cmp.set("v.filteredData", data);
                cmp.set("v.isLoading",false);
            }
            // error handling when state is "INCOMPLETE" or "ERROR"
        });
        $A.enqueueAction(action);
    },sortData : function(component,fieldName,sortDirection){
        var data = component.get("v.filteredData");
        //function to return the value stored in the field
        if(fieldName === 'linkName')
        {
            fieldName = 'Name';
        }
        var key = function(a) { return a[fieldName]; }
        var reverse = sortDirection == 'asc' ? 1: -1;
        data.sort(function(a,b){ 
            var a = key(a) ? key(a).toLowerCase() : '';//To handle null values , uppercase records during sorting
            var b = key(b) ? key(b).toLowerCase() : '';
            return reverse * ((a>b) - (b>a));
        });    
        //set sorted data to accountData attribute
        component.set("v.filteredData",data);
    },
  	
})