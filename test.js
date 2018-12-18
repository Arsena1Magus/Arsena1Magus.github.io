(function () {
   let todos = {
           current: [{    //текущие задачи
               todoId: doId(),   //универсальные id задачи
               todoContent: "Todo 1",  //контент
               todoState: "current"  //принаджлежность
           }, {
               todoId: doId(),
               todoContent: "Todo 2",
               todoState: "current"
           }],
           done: [{     //выполненные задачи
               todoId: doId(),  //универсальные id задачи
               todoContent: "Todo 3", //контент
               todoState: "done" //принаджлежность
           }],
           get allTodos() {  //возвращает длину массива
               return this.current.length + this.done.length;
           },
           get doneTodos() { //возвращает длину массива
               return this.done.length;
           }
       },
       todosList = document.getElementById("app__list"),
       allTodos = document.getElementById("js-all-tasks"),
       doneTodos = document.getElementById("js-done-tasks"),
       addNewTodoField = document.getElementById("app__task-new");

  function INIT() {  //цикл по текущим задачам, смотрит выполнена она или нет
       for (const item of todos.current){
       createItem(item);
     }
     for (const item of todos.done){
     createItem(item);
   }
   allTodos.innerHTML = todos.allTodos;
   doneTodos.innerHTML = todos.doneTodos;
  }

  function createItem(el) { //создаем todo
    let item = document.createElement('li'),
        remove = document.createElement('div'),  //крестик
        text = document.createElement('span'); //содержимое
      remove.classList.add('app__list-remove');
      remove.addEventListener('click', function () {
        removeTodo(this);
      })
      text.classList.add('app__list-text');
      text.addEventListener('click', function(){
        doneTodo(this);
      })
      switch (el.todoState) {  //обработка массива
        case 'done':
          item.classList.add('app-list-item','app__list-item--done')
          break;
        default:
          item.classList.add('app-list-item');
      }
      item.id = el.todoId;
      text.innerHTML = el.todoContent;
      item.appendChild(text);
      item.appendChild(remove);
      todosList.appendChild(item);
  }

  function doneTodo(el) {
    let elem = el.parentNode,
        elemId = elem.id,
        elemState = elem.classList.contains('app__list-item--done');

    const [itemsRemove, itemsAdd]  = elemState ? [todos.done, todos.current] : [todos.current, todos.done];
    elem.classList.toggle('app__list-item--done');
    for(const [index,item] of itemsRemove.entries()) {
      if(item.todoId !== elemId) continue;
      itemsAdd.push(item);
      itemRemove.splice(index,1);
    }
    doneTodos.innerHTML = todos.doneTodos;
  }  //выполненная задача

  function removeTodo (el) {
    let removeEl = el.parentNode,
        removeElId = removeEl.id,
        removeElState = removeEl.classList.contains('app__list-item--done');

      removeEl.remove();
      const items = removeElState ? todos.done : todos.current;
      for(const [index, item] of items.entries()){
          if(item.todoId !== removeElId) continue;
          items.splice(index, 1);
      }
      allTodos.innerHTML = todos.allTodos;
      doneTodos.innerHTML = todos.doneTodos;
  } //удаление задачи

  function addTodos(str) { //добавление
    let elem = {
      todoId : doId,
      todoContent : str,
      todoState : "current"
    };
    todos.current.push(elem);
    createItem(elem);
    allTodos.innerHTML = todos.allTodos;
  }

       function doId() {   //алгоритм универсального id
         return Math.random().toString(36).substr(2,16);
       }

       INIT();

       document.querySelector('input').addEventListener('keydown', function(e) {
          if (e.keyCode === 13) {
            addTodos(this.value);
            this.value = "";
          }
        });

  /*  addNewTodoField.addEventListener('keyup', function (e) {
        if(e.keyCode == 13){
          addTodos(this.value);
          this.value = "";
        }
      }); */
    })();
