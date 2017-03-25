var todosList = document.querySelector("#todoList");

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



