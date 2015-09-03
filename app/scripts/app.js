$(document).ready(function(){

  var listo = [];

  var Task = function(task){
    this.task = task;
    this.id = 'new';
  }
  function addTask(task, state){
    if(!state) {
      state = 'new';
    }
    if(task){
      task = new Task(task);
      task.id = state;
      listo.push(task);

      $('#newItemInput').val('');
      $('#'+state+'List').append('<li class="list-group-item" id="item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li>');
      saveData();
    }
  }

  function loadArray(arry, state){
    for (var i=0;i<arry.length;i++){
      addTask(arry[i], state);
    }
  }

  function loadData(){
    var newArry = localStorage['new'].split(" |||");
    var inProgressArry = localStorage['new'].split(" |||");
    var archivedArry = localStorage['new'].split(" |||");

    loadArray(newArry,'new');
    loadArray(inProgressArry,'inProgress');
    loadArray(archivedArry,'archived');
  }

  function saveData(){
    localStorage['new'] = listo.filter(function(item){return item.id==='new'}).map(function(item){return item.task}).join(' |||');
    localStorage['inProgress'] = listo.filter(function(item){return item.id==='inProgress'}).map(function(item){return item.task}).join(' |||');
    localStorage['archived'] = listo.filter(function(item){return item.id==='archived'}).map(function(item){return item.task}).join(' |||');
  }
  loadData();

  $('#saveNewItem').on('click' , function(event){
    event.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    saveData();
    this.id = 'inProgress';
    $('#currentList').append($(this));
  });
  $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        saveData();
        task.id = "archived";
        $('#archivedList').append($(this));
  });
  $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        saveData();
        task.id = "archived";
        $(this).remove();
        console.log(listo);
  });

  function advanceTask(task){
    var taskOrder = {
      'new': 'inProgress',
      'inProgress':"archived",
      'archived':''
    }
    var listoItem = pluck(listo, 'task', $(task).text());
    var nextState = taskOrder[listoItem.id];
    if (nextState){
      listoItem.id = nextState
    }else{
      listo = listo.filter(function(item){
        console.log(item);
        console.log(listoItem);
        console.log(item == listoItem);
        return item!=listoItem;
      });
    }
  }
});

//select object by attribute.
function pluck(arryOfObj, attr, search){
  for (var i=0;i<arryOfObj.length;i++){
    if (arryOfObj[i][attr] === search){
      return arryOfObj[i];
    }
  }
  return {};
}