document.getElementById('exerciseButton').addEventListener('click',function(event){     	
  var entryForm = document.getElementById("entryForm");              
  var req = new XMLHttpRequest();
  var arg = "name="+entryForm.elements.name.value +    //parameters for get request.
    "&reps="+entryForm.elements.reps.value+
    "&weight="+entryForm.elements.weight.value+
    "&date="+entryForm.elements.date.value;
	
    if(entryForm.elements.unit.checked){
      arg += "&unit=1";                                     //pounds = 1
    } else {
      arg += "&unit=0";
    }
    req.open("GET", "/insert?" + arg, true);                 
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    req.addEventListener('load', function(){                        
      if(req.status >= 200 && req.status < 400){			
        var reply = JSON.parse(req.responseText);            
        var id = reply.inserted;			
        var table = document.getElementById("workoutTable");   
	var row = table.insertRow(-1);
                         
	var exercise = document.createElement('td');                
        exercise.textContent = entryForm.elements.name.value;  
        row.appendChild(exercise);
			
        var repNum = document.createElement('td');
        repNum.textContent = entryForm.elements.reps.value;
        row.appendChild(repNum);

        var weightNum = document.createElement('td');
        weightNum.textContent = entryForm.elements.weight.value;
        row.appendChild(weightNum);

        var day = document.createElement('td');
        day.textContent = entryForm.elements.date.value;
        row.appendChild(day);
            
        var unitBool = document.createElement('td');
        if(entryForm.elements.unit.checked){               
          unitBool.textContent = "lbs";
        } else {
          unitBool.textContent = "kg";           
        }
        row.appendChild(unitBool);
      
        var editForm = document.createElement('td');   
        var update = document.createElement('a');
        update.setAttribute('href', '/editWorkout?id=' + id);     
        var editB = document.createElement('input');         
        editB.setAttribute('value','Edit');       
        editB.setAttribute('type','button');         
        update.appendChild(editB);
        editForm.appendChild(update);
        row.appendChild(editForm);                                     
            
        var dCell = document.createElement('td');                 
        var dButton = document.createElement('input');           
        dButton.setAttribute('type','button');
        dButton.setAttribute('name','delete');                   
        dButton.setAttribute('value','Delete');
        dButton.setAttribute('onClick', 'removeData("dataTable",' + id +')');
        var dHidden = document.createElement('input');             
        dHidden.setAttribute('type','hidden');
        dHidden.setAttribute('id', 'delete' + id);
        dCell.appendChild(dButton);                           
        dCell.appendChild(dHidden);
        row.appendChild(dCell);                                   
      } else {
        console.log("error");
      }
    });
  req.send("/insert?" + arg);                              
  event.preventDefault();                                    
});

function removeData(tableId, id){                               
  var removeItem = "delete" + id;                            	
  var t = document.getElementById("workoutTable");       
  var rowNum = t.rows.length;

  for(var i = 1; i < rowNum; i++){                          
    var row = t.rows[i];
    var find = row.getElementsByTagName("td");		    
    var erase = find[find.length -1];		        
    if(erase.children[1].id === removeItem){             
      t.deleteRow(i);
    }
  }

  var req = new XMLHttpRequest();
	
  req.open("GET", "/delete?id=" + id, true);              

  req.addEventListener("load",function(){
    if(req.status >= 200 && req.status < 400){          
      console.log('success');
    } else {
      console.log('error');
    }
  });
  req.send("/delete?id=" + id);                         
}