module.exports = {
  'todo.create': {
    fn: function (content) {
      this.set('todo', { content })
    },
    first: true
  }
}