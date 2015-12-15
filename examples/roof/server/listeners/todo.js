const db = []

module.exports = {

  'Client:todo.create': function ( content ){
    const state = this.getGlobal('state')

    const todo = {content, id : db.length}
    db.push(todo)

    state.todos.push(todo)
    state.message = `you created new Todo, id: ${todo.id}`
    this.setGlobal('state', state)
  }
}