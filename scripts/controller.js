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