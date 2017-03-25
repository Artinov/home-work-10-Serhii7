// var inputText = document.querySelector("#todoText");
var todosList = document.querySelector("#todoList");
// var todosLeft = document.querySelector("#todosLeft");
// var clearCompleted = document.querySelector("#clearCompleted");
// var markAllCompleted = document.querySelector("#markAllCompleted");

// var showAll = document.querySelector("#showAll");
// var showActive = document.querySelector("#showActive");
// var showCompleted = document.querySelector("#showCompleted");

var todoIndexValue = 0;
var globalTodoFilter = null;

var todos = [];

$("#todoText").keypress(function(e) {
    if (e.keyCode == 13) {
        todoIndexValue++;
        todos.push({
            text:$("#todoText").val(),
            isDone: false,
            index: todoIndexValue
        });
        updateLocalStorage();
        $("#todoText").val("");
        renderTodos(globalTodoFilter);
        markedAll();
        countActiveTodos();
    }
});

$("#clearCompleted").click( function() {
    todos.forEach(function(todo, i) {
        if (todo.isDone == true) {
            var li = $("li[todo-index='" + todo.index + "']");
            todosList.removeChild(li[0]);
        }
    });

    todos = todos.filter(function(todo) {
        return todo.isDone == false;
    });

    updateLocalStorage();
    markedAll();
});

$("#markAllCompleted").click( function() {
    var activeTodos = todos.filter(function(todo) {
        return todo.isDone == false;
    }).length;

    if (activeTodos == 0) {
        todos.forEach(function(todo) {
            changeTodoStatus(todo, "", false);
        });
    } else {
        todos.forEach(function(todo) {
            changeTodoStatus(todo, "todo-done", true);
        });
    }
    /*-----------*/
    markedAll();
    /*-----------*/

    countActiveTodos();
});





/*-----------------------------------------------------*/
function showClearCompluted(){
	var markedAll = todos.filter(function(el){
    	return el.isDone == true;
    });
    $('#clearCompleted').removeClass('show');
    if(markedAll.length > 0){
    	$('#clearCompleted').addClass('show');
    }
}
function markedAll(){
	var markedAll = todos.filter(function(el){
    	return el.isDone == true;
    });
    $('#markAllCompleted').removeClass('full');
    if(markedAll.length == todos.length && todos.length != 0){
    	$('#markAllCompleted').addClass('full');
    };
    showClearCompluted();
}
/* ? */
function changeTodoStatus(todo, liClass, todoState) {
    var li = document.querySelector("li[todo-index='" + todo.index + "']");
    var checkbox = li.querySelector("input");

    todo.isDone = todoState;
    checkbox.checked = todoState;
    li.setAttribute("class", "" + liClass);
    updateLocalStorage();
    markedAll();
}

$('#showActive').click( function() {
    renderTodos(false);
});

$('#showAll').click( function() {
    renderTodos(null);
    markedAll();
});

$('#showCompleted').click( function() {
    renderTodos(true);
    markedAll();
});


/*---------------------------------------------------*/
// function todusDone(){

// 	todos.forEach(function(todo) {
//         var todoElementTemplate = document.querySelector("div#hollow li").cloneNode(true);

//         todoElementTemplate.querySelector("span").innerText = todo.text;
//         todoElementTemplate.setAttribute("todo-index", todo.index)

//         if (todo.isDone == true) {
//             todoElementTemplate.setAttribute("class", " todo-done")
//             todoElementTemplate.querySelector("input").checked = true;
//         }
// });
// }
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
    // todusDone();
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

function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function init() {
    var localStorageTodos = localStorage.todos;

    if (localStorageTodos != undefined) {
        todos = JSON.parse(localStorageTodos);
    }

    renderTodos(null);
    countActiveTodos();
    markedAll();
}
init();
