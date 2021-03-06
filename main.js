document.addEventListener("DOMContentLoaded", function() {
    Window.localStorage;
    let todos = [],
        todosList = document.getElementById("app__list"),
        footer = document.querySelector('.footer'),
        addNewTodoField = document.getElementById("in");
    var allBtn = document.querySelector('.all');
    allBtn.classList.add('selected');
    var activeBtn = document.querySelector('.active');
    var completedBtn = document.querySelector('.completed');
    var clear = document.querySelector('.clear-completed');
    display_clear();
    addNewTodoField.addEventListener('keyup', function(e) {
      var text;
        if (e.keyCode === 13) {

          if(this.value != "" && this.value.match(/^[ ]+$/) != false) {
            addTodos(this.value);
            this.value = "";
          }
        }
    })

    function addTodos(str) {
        let elem = {
            todoId: doId(),
            todoContent: str,
            todoState: "current"
        };
        todos.push(elem);
        createItem(elem);
        for (var i = localStorage.length;; i++) {
            localStorage.setItem('todo' + [i], JSON.stringify(elem));
            break;
        }
    }

    function todosload() {
        var el;
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem("todo" + [i])) {
                el = JSON.parse(localStorage.getItem("todo" + [i]));
                todos.push(el);
                createItem(el);
            }
        }
    }
    todosload();

    function doId() {
        return Math.random().toString(36).substr(2, 16);
    }

    function createItem(el) {
        let item = document.createElement('li'),
            done = document.createElement('div'),
            text = document.createElement('label'),
            remove = document.createElement('div');
        var length = el.todoContent.length;
        var quere = Math.floor(length/30);
        footer.classList.add('footer');
        done.classList.add('toggle');
        remove.classList.add('app__list-remove');
        remove.addEventListener('click', function() {
            removeTodo(this);
        });
        text.classList.add('app__list-text');
        done.addEventListener('click', function() {
            done.classList.toggle('toggle');
            done.classList.toggle('toggle--done');
            var flag = done.classList.contains('toggle');
            if (quere == 0){
              if(done.classList.contains('toggle')== true)
               done.style.marginTop = 15 + "px";
               else done.style.marginTop = 13 + "px";
             }
              else
              {
                if(done.classList.contains('toggle')== true)
                 done.style.marginTop = 15 + 10*quere + "px";
                else done.style.marginTop = 13 + 10*quere + "px";
           }
            doneTodo(this);
        });
        switch (el.todoState) {
            case 'done':
                item.classList.add('app__list-item', 'app__list-item--done');
                done.classList.toggle('toggle');
                done.classList.toggle('toggle--done');
                break;
            default:
                item.classList.add('app__list-item');
        }
        item.id = el.todoId;
       if (quere == 0)
       {
         if(done.classList.contains('toggle')== true) {
          done.style.marginTop = 15 + "px"; }
          else done.style.marginTop = 13 + "px";
          text.innerHTML = el.todoContent;
        }
         else
         {
           if(done.classList.contains('toggle')== true) {
            done.style.marginTop = 15 + 10*quere + "px"; }
           else done.style.marginTop = 13 + 10*quere + "px";
      }
        text.innerHTML = el.todoContent;
        item.appendChild(done);
        item.appendChild(remove);
        item.appendChild(text);
        todosList.appendChild(item);
        footer.style.display = "block";
        currentTodos();
        display_clear();
        update_list();
    }

    function doneTodo(el) {
        let elem = el.parentNode,
            elemId = elem.id,
            elemState = elem.classList.contains('app__list-item--done');
        elem.classList.toggle('app__list-item--done');
        currentTodos();
        display_clear();
        var item;
        for (var i = 0; i < localStorage.length; i++) {
            item = JSON.parse(localStorage.getItem("todo" + [i]));
            if (elemId == item.todoId)
                if (item.todoState == "current") {
                    item.todoState = "done";
                    localStorage.setItem('todo' + [i], JSON.stringify(item));
                    break;
                } else {
                    item.todoState = "current";
                    localStorage.setItem('todo' + [i], JSON.stringify(item));
                    break;
                }
        }
        update_list();
    }

    function removeTodo(el) {
        let removeEl = el.parentNode,
            removeElId = removeEl.id,
            removeElState = removeEl.classList.contains('app__list-item--done');
        removeEl.remove();
        currentTodos();
        display_footer();
        var item;
        var i, j;
        for (i = 0; i < localStorage.length; i++) {
            item = JSON.parse(localStorage.getItem('todo' + [i]));
            if (removeElId == item.todoId) {
                for (j = i + 1; j < localStorage.length; j++, i++) {
                    item = JSON.parse(localStorage.getItem('todo' + [j]));
                    localStorage.setItem('todo' + [i], JSON.stringify(item));
                }
                break;
            }
        }
        localStorage.removeItem('todo' + [i]);
    }

    function currentTodos() {
        var allTodos = document.querySelectorAll('.app__list-item');
        var currentTodos = document.getElementById("js-current-todos");
        var doneTodos = document.querySelectorAll('.app__list-item--done');
        currentTodos.innerHTML = allTodos.length - doneTodos.length;
        if ((allTodos.length - doneTodos.length) > 1)
        document.querySelector(".todo-count").innerHTML = "items left";
        else document.querySelector(".todo-count").innerHTML = "item left";
        if ((allTodos.length - doneTodos.length) == 0)
        document.querySelector(".todo-count").innerHTML = "items left";
        if ((allTodos.length - doneTodos.length) > 9)
        document.querySelector(".todo-count").style.marginLeft = "10px";
        else document.querySelector(".todo-count").style.marginLeft = "0px";
    }
    var alldone = document.querySelector('.toggle-all');
    alldone.onclick = function() {
        var item;
        var todos = document.querySelectorAll('.app__list-item');
        if (alldone.checked == true) {
            for (var i = 0; i < todos.length; i++) {
                if (document.querySelector('.toggle')) {
                    document.querySelector('.toggle').classList.add('toggle--done');
                    document.querySelector('.toggle').classList.remove('toggle');
                    item = JSON.parse(localStorage.getItem("todo" + [i]));
                    item.todoState = "done";
                    localStorage.setItem('todo' + [i], JSON.stringify(item));
                }
                display_clear();
            }
            for (var i = 0; i < todos.length; i++) {
                todos[i].classList.add('app__list-item--done');
            }
        } else {
            for (var i = 0; i < todos.length; i++) {
                if (document.querySelector('.toggle--done')) {
                    todos[i].classList.remove('app__list-item--done');
                    document.querySelector('.toggle--done').classList.add('toggle');
                    document.querySelector('.toggle--done').classList.remove('toggle--done');
                    item = JSON.parse(localStorage.getItem("todo" + [i]));
                    item.todoState = "current";
                    localStorage.setItem('todo' + [i], JSON.stringify(item));
                }
                display_clear();
            }
            for (var i = 0; i < todos.length; i++) {
                todos[i].classList.remove('app__list-item--done');
            }
        }
        currentTodos();
        display_clear();
    }
    allBtn.onclick = function() {
        allBtn.classList.add('selected');
        activeBtn.classList.remove('selected');
        completedBtn.classList.remove('selected');
        var todos = document.querySelectorAll('.app__list-item');
        for (var i = 0; i < todos.length; i++) {
            todos[i].style.display = "block";
        }
    }
    activeBtn.onclick = function() {
        allBtn.classList.remove('selected');
        activeBtn.classList.add('selected');
        completedBtn.classList.remove('selected');
        var todos = document.querySelectorAll('.app__list-item');
        for (var i = 0; i < todos.length; i++) {
            todos[i].style.display = "block";
        }
        var doneTodos = document.querySelectorAll('.app__list-item--done');
        for (var i = 0; i < doneTodos.length; i++) {
            doneTodos[i].style.display = "none";
        }
    }
    completedBtn.onclick = function() {
        allBtn.classList.remove('selected');
        activeBtn.classList.remove('selected');
        completedBtn.classList.add('selected');
        var todos = document.querySelectorAll('.app__list-item');
        var doneTodos = document.querySelectorAll('.app__list-item--done');
        for (var i = 0; i < todos.length; i++)
        todos[i].style.display = "none";
        for (var j = 0; j < doneTodos.length; j++)
        doneTodos[j].style.display = "block";
    }

    function update_list() {
        var todos = document.querySelectorAll('.app__list-item');
        var doneTodos = document.querySelectorAll('.app__list-item--done');
        var i, j;
        if (activeBtn.classList.contains('selected') == true) {
            for (i = 0; i < todos.length; i++)
            todos[i].style.display = "block";
            for (j = 0; j < doneTodos.length; j++)
            doneTodos[j].style.display = "none";
        }
        if (completedBtn.classList.contains('selected') == true) {
            for (var i = 0; i < todos.length; i++)
            todos[i].style.display = "none";
            for (var j = 0; j < doneTodos.length; j++)
            doneTodos[j].style.display = "block";
        }
        if (allBtn.classList.contains('selected') == true) {
        for (var i = 0; i < todos.length; i++)
        todos[i].style.display = "block";
      }
    }

    function display_clear() {
        var doneTodos = document.querySelectorAll('.app__list-item--done');
        if (doneTodos.length == 0) {
            document.querySelector('.clear-completed').style.display = "none";
        } else {
            document.querySelector('.clear-completed').style.display = "block";
        }
    }

    function display_footer() {
        var todos = document.querySelectorAll('.app__list-item');
        if (todos.length == 0) {
            document.querySelector('.footer').style.display = "none";
        } else {
            document.querySelector('.footer').style.display = "block";
        }
    }

    clear.onclick = function() {
        var doneTodos = document.querySelectorAll('.app__list-item--done');
        var item, i, j, k;
        for (i = 0; i < doneTodos.length; i++) {
            doneTodos[i].remove();
            for (j = 0; j < localStorage.length; j++) {
                item = JSON.parse(localStorage.getItem('todo' + [j]));
                if (item.todoState == "done") {
                    for (k = j + 1; k < localStorage.length; j++, k++) {
                        item = JSON.parse(localStorage.getItem('todo' + [k]));
                        localStorage.setItem('todo' + [j], JSON.stringify(item));
                    }
                    localStorage.removeItem('todo' + [j]);
                    break;
                }
            }
        }
        display_clear();
        display_footer()
    }

    document.querySelector(".app__list").addEventListener("dblclick", function(event) {
            var flag = 0;
        if (event.target && event.target.nodeName == "LABEL") {
            flag++;
            var input = document.createElement('textarea');
            var text = event.target, it = event.target.parentNode, local_item;
						let removeEl = it,
								removeElId = it.id;
            var done = it.querySelector(".toggle"), remove = it.querySelector(".app__list-remove");
            if (done == null)
              done = it.querySelector(".toggle--done");
            input.classList.add('app__list-input');
            it.appendChild(input);
            var item_input = it.querySelector(".app__list-input");
            addNewTodoField.blur();
            input.focus();
            var length = text.innerHTML.length;
            var quere = Math.floor(length/30);
            if(quere == 0) {
            item_input.style.height = 54 + "px";
          }
          else if (quere == 1) {
            item_input.style.height = 27 + 50*quere + "px";
            item_input.style.marginTop = -58 - quere*20 + "px";
          }
            else {
            item_input.style.height = 54 + 20*quere + "px";
            item_input.style.marginTop = -54 - quere * 20 + "px";
          }
          item_input.value = text.innerHTML;
            input.addEventListener('keydown', function(e) {
                    if (e.keyCode === 13) {
                      flag = flag - 1;
                      for (var i = 0; i < localStorage.length; i++) {
                        local_item = JSON.parse(localStorage.getItem("todo"+[i]));
                          if (text.innerHTML == local_item.todoContent){
                              local_item.todoContent = input.value;
                              localStorage.setItem('todo'+ [i], JSON.stringify(local_item));
                              break;
                            }}
                          var length = this.value.length, txt = this.value;
                           var quere = Math.floor(length/30), size = 0;
                           if (quere == 0)
                           {
                             if(done.classList.contains('toggle')== true) {
                              done.style.marginTop = 15 + "px"; }
                             else done.style.marginTop = 13 + "px";
                            }
                             else
                             {
                               if(done.classList.contains('toggle')== true) {
                                done.style.marginTop = 15 + 10*quere + "px"; }
                               else done.style.marginTop = 13 + 10*quere + "px";
                          }
                        text.innerHTML = this.value;
                        this.value = "";
                        input.remove();
                        if (text.innerHTML == "") {
                            removeEl.remove();
                            currentTodos();
                            display_footer();
                            var i, j;
                            for (i = 0; i < localStorage.length; i++) {
                                it = JSON.parse(localStorage.getItem('todo' + [i]));
                                if (removeElId == it.todoId) {
                                    for (j = i + 1; j < localStorage.length; j++, i++) {
                                        it = JSON.parse(localStorage.getItem('todo' + [j]));
                                        localStorage.setItem('todo' + [i], JSON.stringify(it));
                                    }
                                    break;
                                }
                            }
                            localStorage.removeItem('todo' + [i]);
                        }
                    }
                })
                	 document.addEventListener('mouseup', function (e)
                			{
                        flag++;
                        if(flag == 2) {
                          flag = 0;
                				for (var i = 0; i < localStorage.length; i++) {
                					local_item = JSON.parse(localStorage.getItem("todo"+[i]));
                						if (text.innerHTML == local_item.todoContent){
                								local_item.todoContent = input.value;
                								localStorage.setItem('todo'+ [i], JSON.stringify(local_item));
                								break;
                							}}
                              var length = input.value.length;
                              var quere = Math.floor(length/30);
                             if (quere == 0){
                               if(done.classList.contains('toggle') == true) {
                                done.style.marginTop = 15 + "px"; }
                               else done.style.marginTop = 13 + "px";
                              }
                               else{
                                 if(done.classList.contains('toggle')== true) {
                                  done.style.marginTop = 15 + 10*quere + "px"; }
                                 else done.style.marginTop = 13 + 10*quere + "px";
                            }
                				  text.innerHTML = input.value;
                					input.value = "";
                					input.remove();
                					if(text.innerHTML == "") {
														removeEl.remove();
														currentTodos();
														display_footer();
														var i, j;
														for (i = 0; i < localStorage.length; i++) {
																it = JSON.parse(localStorage.getItem('todo' + [i]));
																if (removeElId == it.todoId) {
																		for (j = i + 1; j < localStorage.length; j++, i++) {
																				it = JSON.parse(localStorage.getItem('todo' + [j]));
																				localStorage.setItem('todo' + [i], JSON.stringify(it));
																		}
																		break;
																}
														}
														localStorage.removeItem('todo' + [i]);
													}
                        }
                        flag = flag-1;
                			})

        }
    })
});
