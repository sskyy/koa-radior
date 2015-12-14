const util = require('../util')

module.exports = {
  'todo.create': {
    fn: function (content) {
      this.set('todo', { content })
    },
    last: true
  }
}