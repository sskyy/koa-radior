const db = []

module.exports = {

  'Client:todo.create': function ( content ) {
    const todo = {content, id : db.length}
    const state = this.getGlobal('state')

    db.push(todo)

    state.todos.push(todo)
    state.message = `you created new Todo, id: ${todo.id}`
    this.setGlobal('state', state)
  }
}