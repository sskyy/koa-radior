
function message(msg){
  document.getElementById('todo-message').innerHTML = msg
}

function refreshList(todos){
  document.getElementById('todo-list').innerHTML = todos.map(todo=>`<li>${todo.content}</li>`).join('')
}

module.exports = {
  message,
  refreshList
}