const db = []

module.exports = {

  'Client:todo.create': function ( content ) {
    const todo = {content, id : db.length}
    db.push(todo)
    //TODO error 演示

    this.set('todo', todo )
  }
}