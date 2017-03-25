function renderTodos(todoFilter) {
	
    highlighButton(todoFilter);
    globalTodoFilter = todoFilter;

    var filteredTodos = todos;
    todosList.innerHTML = "";

    if (todos.length == 0) {
        todosList.innerHTML = "";
        return;
    }

    if (todoFilter != null) {
        todosList.innerHTML = "";
        filteredTodos = filteredTodos.filter(function(todo) {
            return todo.isDone == todoFilter;
        });
    }

    filteredTodos.forEach(function(todo) {
        var todoElementTemplate = document.querySelector("div#hollow li").cloneNode(true);

        todoElementTemplate.querySelector("span").innerText = todo.text;
        todoElementTemplate.setAttribute("todo-index", todo.index)

        if (todo.isDone == true) {
            todoElementTemplate.setAttribute("class", " todo-done")
            todoElementTemplate.querySelector("input").checked = true;
        }

        todoElementTemplate.querySelector("input").onchange = function(e) {
            var li = e.path[1];
            var todoIndex = li.getAttribute("todo-index");
            var todo = todos.filter(function(todo) {
                return todo.index == todoIndex;
            });

            todo = todos.indexOf(todo[0]);
            todo = todos[todo];

            if (e.path[0].checked) {
                li.setAttribute("class", " todo-done");
                todo.isDone = true;
            } else {
                li.setAttribute("class", " ");
                todo.isDone = false;
            }
            countActiveTodos();
            updateLocalStorage();
        }
        todoElementTemplate.querySelector("button").onclick = function(e) {
            var li = e.path[1];
            var todoIndex = li.getAttribute("todo-index");
            var todo = todos.filter(function(todo) {
                return todo.index == todoIndex;
            });

            todoIndex = todos.indexOf(todo[0]);
            todos.splice(Number(todoIndex), 1);

            todosList.removeChild(li);
            countActiveTodos();
            updateLocalStorage();
        }
        todosList.appendChild(todoElementTemplate);
    });
}

function highlighButton(todoFilter) {
    document.querySelectorAll("#bottom_menu button").forEach(function(button) {
        button.setAttribute("class", "button-bottom");
    });

    switch (todoFilter) {
        case true:
           $('#showCompleted').attr("class", "btn-b");
            break;
        case false:
            $('#showActive').attr("class", "btn-b");
            break;
        case null:
            $('#showAll').attr("class", "btn-b 093475");
            break;
    }
}
function countActiveTodos() {
    var activeTodos = todos.filter(function(todo) {
        return todo.isDone == false;
    });

    $('#todosLeft').text(activeTodos.length);
    markedAll();
}

