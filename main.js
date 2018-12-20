document.addEventListener("DOMContentLoaded", function ()
{
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

	addNewTodoField.addEventListener('keyup', function (e)
	{
		if (e.keyCode === 13)
		{
			addTodos(this.value);
			this.value = "";
		}
	})

	function addTodos(str)
	{
		let elem = {
			todoId: doId(),
			todoContent: str,
			todoState: "current"
		};
		todos.push(elem);
		createItem(elem);
		for (var i = localStorage.length; ;i++) {
		localStorage.setItem('todo' + [i],JSON.stringify(elem));
		break;
		}
	}

		function todosload() {
			var el;
			for(var i = 0; i < localStorage.length; i++) {
				if (localStorage.getItem("todo"+[i])) {
					el = JSON.parse(localStorage.getItem("todo"+[i]));
					todos.push(el);
					createItem(el);
				}
			}
		}
 todosload();

	function doId()
	{
		return Math.random().toString(36).substr(2, 16);
	}


	function createItem(el)
	{
		let item = document.createElement('li'),
			done = document.createElement('div'),
			text = document.createElement('label'),
			remove = document.createElement('div');
		footer.classList.add('footer');
		done.classList.add('toggle');
		remove.classList.add('app__list-remove');
		remove.addEventListener('click', function ()
		{
			removeTodo(this);
		});
		text.classList.add('app__list-text');
		done.addEventListener('click', function ()
		{
			done.classList.toggle('toggle');
			done.classList.toggle('toggle--done');
			doneTodo(this);
		});
		switch (el.todoState)
		{
			case 'done':
				item.classList.add('app__list-item', 'app__list-item--done');
				done.classList.toggle('toggle');
				done.classList.toggle('toggle--done');
				break;
			default:
				item.classList.add('app__list-item');
		}
		item.id = el.todoId;
		text.innerHTML = el.todoContent;
		item.appendChild(done);
		item.appendChild(remove);
		item.appendChild(text);
		todosList.appendChild(item);
		footer.style.display = "block";
		currentTodos();
		display_clear();
	}

	function doneTodo(el)
	{
		let elem = el.parentNode,
			elemId = elem.id,
			elemState = elem.classList.contains('app__list-item--done');
		elem.classList.toggle('app__list-item--done');
		currentTodos();
		display_clear();
		var item;
		for (var i = 0; i < localStorage.length; i++) {
			item = JSON.parse(localStorage.getItem("todo"+[i]));
				if (elemId == item.todoId)
					if(item.todoState == "current") {
						item.todoState = "done";
						localStorage.setItem('todo'+ [i], JSON.stringify(item));
						break;
					}
					else {
						item.todoState = "current";
						localStorage.setItem('todo'+ [i], JSON.stringify(item));
						break;
					}
		}
	}

	function removeTodo(el)
	{
		let removeEl = el.parentNode,
			removeElId = removeEl.id,
			removeElState = removeEl.classList.contains('app__list-item--done');
		removeEl.remove();
		currentTodos();
		display_footer();
		var item;
		var i,j;
		for (i = 0; i < localStorage.length; i++) {
			item = JSON.parse(localStorage.getItem('todo'+ [i]));
			if (removeElId == item.todoId){
				localStorage.removeItem('todo'+[i]);
				break;
			}
		}
		for (j=i,i=i+1; i <= localStorage.length; i++, j++) {
			item = JSON.parse(localStorage.getItem('todo'+ [i]));
			localStorage.setItem('todo' + [j],JSON.stringify(item));
		}
	}



	function currentTodos()
	{
		var allTodos = document.querySelectorAll('.app__list-item');
		var currentTodos = document.getElementById("js-current-todos");
		var doneTodos = document.querySelectorAll('.app__list-item--done');
		currentTodos.innerHTML = allTodos.length - doneTodos.length;
		if ((allTodos.length - doneTodos.length) > 1)
			document.querySelector(".todo-count").innerHTML = "items left";
		else document.querySelector(".todo-count").innerHTML = "item left";
		if ((allTodos.length - doneTodos.length) == 0)
			document.querySelector(".todo-count").innerHTML = "items left";
	}

	var alldone = document.querySelector('.toggle-all');
	alldone.onclick = function ()
	{
		var item;
		var todos = document.querySelectorAll('.app__list-item');
		if (alldone.checked == true)
		{
			for (var i = 0; i <= todos.length; i++)
			{
				if (document.querySelector('.toggle')){
				todos[i].classList.add('app__list-item--done');
				document.querySelector('.toggle').classList.add('toggle--done');
				document.querySelector('.toggle').classList.remove('toggle');
				item = JSON.parse(localStorage.getItem("todo"+[i]));
				item.todoState = "done";
				localStorage.setItem('todo'+ [i], JSON.stringify(item));
			}
				display_clear();
			}
		}
		else
		{
			for (var i = 0; i <= todos.length; i++)
			{
				if(document.querySelector('.toggle--done')){
				todos[i].classList.remove('app__list-item--done');
				document.querySelector('.toggle--done').classList.add('toggle');
				document.querySelector('.toggle--done').classList.remove('toggle--done');
				item = JSON.parse(localStorage.getItem("todo"+[i]));
				item.todoState = "current";
				localStorage.setItem('todo'+ [i], JSON.stringify(item));
			}
				display_clear();
			}
		}

	}

	allBtn.onclick = function ()
	{
		allBtn.classList.add('selected');
		activeBtn.classList.remove('selected');
		completedBtn.classList.remove('selected');
		var todos = document.querySelectorAll('.app__list-item');
		for (var i = 0; i <= todos.length; i++)
		{
			todos[i].style.display = "block";
		}

	}

	activeBtn.onclick = function ()
	{
		allBtn.classList.remove('selected');
		activeBtn.classList.add('selected');
		completedBtn.classList.remove('selected');
		var todos = document.querySelectorAll('.app__list-item');
		for (var i = 0; i <= todos.length; i++)
		{
			todos[i].style.display = "block";
		}
		var doneTodos = document.querySelectorAll('.app__list-item--done');
		for (var i = 0; i <= doneTodos.length; i++)
		{
			doneTodos[i].style.display = "none";
		}

	}

	completedBtn.onclick = function ()
	{
		allBtn.classList.remove('selected');
		activeBtn.classList.remove('selected');
		completedBtn.classList.add('selected');
		var todos = document.querySelectorAll('.app__list-item');
		for (var i = 0; i < todos.length; i++)
		{
			todos[i].style.display = "block";
		}
		var doneTodos = document.querySelectorAll('.app__list-item--done');
		for (var i = 0; i <= todos.length; i++)
			todos[i].style.display = "none";
		for (var j = 0; j <= doneTodos.length; j++)
			doneTodos[j].style.display = "block";

	}


	function display_clear()
	{
		var doneTodos = document.querySelectorAll('.app__list-item--done');
		if (doneTodos.length == 0)
		{
			document.querySelector('.clear-completed').style.display = "none";
		}
		else
		{
			document.querySelector('.clear-completed').style.display = "block";
		}

	}

	function display_footer()
	{
		var todos = document.querySelectorAll('.app__list-item');
		if (todos.length == 0)
		{
			document.querySelector('.footer').style.display = "none";
		}
		else
		{
			document.querySelector('.footer').style.display = "block";
		}
	}

	clear.onclick = function ()
	{
		var doneTodos = document.querySelectorAll('.app__list-item--done');
		var item;
		for (var i = 0; i <= doneTodos.length; i++) {
			doneTodos[i].remove();
		}
		display_clear();
		display_footer()
	}


		document.querySelector(".app__list").addEventListener("dblclick", function(event) {
				if(event.target && event.target.nodeName == "LABEL") {
				var input = document.createElement('input');
				var text =	event.target;
				var item = event.target.parentNode;
				input.classList.add('app__list-input');
				item.appendChild(input);
				addNewTodoField.blur();
				input.focus();
				input.value = text.innerHTML;
				input.addEventListener('keydown', function (e)
				{
					if (e.keyCode === 13)
					{
						text.innerHTML = this.value;
						this.value = "";
						input.remove();
					}
				})
			}})
});
