$(document).ready(function(){
var taskList = [];

var todoApp;
var todoForm;
var todoAddItem;
var todoInput;
var todoClear;
var lists = [];

var taskTemplate;

var stateList = ['new','working','complete']

setUpForm();



function Task(text, state){
  if (!state)
    {state = 0;}
  //0 - new 
  //1 - working
  //2 - complete
  console.log("Here");
  this.text = text;
  this.state = state;
  this.element = taskTemplate.clone();
  this.element.text(text);
  this.element.on('click', this.advance.bind(this));
  lists[state].append(this.element);
}

Task.prototype = {
  advance:function(){
    this.state +=1;
    
    if (this.state===3){
      ////TODO put code to delete from master list
      this.element.remove();
      removeCompletedTasks();
      saveStateList(2);
      console.log(taskList);
    }else{
      lists[this.state].append(this.element);
      saveStateList(this.state);
      saveStateList(this.state-1);
    }

  }
}



console.log(todoClear);

  function setUpForm(){
    console.log("HERE");
    todoApp = $("#todo-app");
    todoForm = $("<form></form>");
    todoAddItem = $("<button>New</button>");
    todoInput = $("<input></input>");
    todoClear = $("<button>Cancel</button>")
    taskTemplate = $("<li></li>");

    todoForm.append(todoInput);
    todoForm.append(todoAddItem);
    todoForm.append(todoClear); 
    todoApp.append(todoForm);

    lists[0] = $("<ul class = 'panel'>New Tasks</ul>");
    lists[1] = $("<ul class = 'panel'>Working Tasks</ul>");
    lists[2] = $("<ul class = 'panel'>Completed Tasks</ul>");

    for (var i=0;i<3;i++){
      todoApp.append(lists[i]);
    }



    
    //------------------------------- Add Event Listeners

    todoAddItem.on('click', function(){
      var todoText = todoInput.val();
      if (todoText){
        todoInput.val('');
        var task = new Task(todoText, 0);
        taskList.push(task);
      }
    });

    todoClear.on('click', function(){
      for (var i=0;i<3;i++){
        loadStateList(i);
      }
    });

    
  }
  function saveStateList(state){
    var stateFiltered = taskList.filter(function(item){
      return item.state ===state;
    });
    var arryToCombine = stateFiltered.map(function(item){
      return item.text;
    });
    localStorage['ToDoAppStateString' + state] = arryToCombine.join(" |||");
  }
  function loadStateList(state){
    console.log(localStorage['ToDoAppStateString' + state]);
    var str = localStorage['ToDoAppStateString' + state] || "";
    var stateArry = str.split(" |||");

    for (var i=0;i<stateArry.length;i++){
      console.log(stateArry[i]);
      var task = new Task(stateArry[i], state);
      //taskList.push(task);
    }

  }
  function removeCompletedTasks(){
  taskList = taskList.filter(function(item){
    return item.state<3;
  });
}
});



