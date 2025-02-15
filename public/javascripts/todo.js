 
 var tasks = [];
 function newTask() {
     
     // Create a checkbox
     var checkbox = document.createElement("input");
     checkbox.type = "checkbox";
    var li = document.createElement("li");
    var task = document.getElementById("taskInput").value;
    var date = document.getElementById("dateInput").value;
    var priority = document.getElementById("priorityInput").value;
   
    var t = document.createTextNode( " "+task + " (Due: " + date + ", Priority: " + priority + ")");
    li.appendChild(checkbox);
    li.appendChild(t);
    
      // Set class based on priority
      if (priority === "High") {
        li.className = "high-priority";
    } else if (priority === "Medium") {
        li.className = "medium-priority";
    } else {
        li.className = "low-priority";
    }


    
    if (task === '') {
        alert("You must write something!");
    } else {
        
        document.getElementById("taskList").appendChild(li);
        
        
   
    }
       
    
    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("priorityInput").value = "High";

    var deleteBtn = document.createElement("BUTTON");
    deleteBtn.className="delete-btn ";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = function() {
        var li = this.parentElement;
        li.parentNode.removeChild(li);
        var index = tasks.indexOf(taskObj);
        if (index > -1) {
            tasks.splice(index, 1);
        }
    }
    li.appendChild(deleteBtn);

//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//    li.appendChild(span);
   
   

    // var close = document.getElementsByClassName("close");
    // for (var i = 0; i < close.length; i++) {
    //     close[i].onclick = function() {
    //         var div = this.parentElement;
    //         div.style.display = "none";
    //     }
    // }

    li.onclick = function() {
        this.classList.toggle('completed');
    }
    // Create an unordered list for subtasks
    var ul = document.createElement('ul');
    li.appendChild(ul);

    // Add a button to add subtasks
    var addSubtaskBtn = document.createElement('button');
    addSubtaskBtn.innerHTML = 'Add Subtask';
    addSubtaskBtn.onclick = function() {
        var subtask = prompt('Enter subtask:');
        if (subtask) {
            var subLi = document.createElement('li');
            subLi.innerHTML = subtask;
            ul.appendChild(subLi); // Append the subtask to the unordered list
        }
    };
    li.appendChild(addSubtaskBtn);

    
    var taskObj = {
        task: task,
        date: date,
        priority: priority,
        completed: false
    };

    tasks.push(taskObj);
}


function exportTasks() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "tasks.json");
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
function goBack() {
    window.history.back();
  }