module.exports = {

  'Client:todo.create': function (arg) {
    console.log(this._runtime.getRuntime(this._eventRuntimeKey).data)
    console.log('server get data', this.get('todo'), arg)
    this.set('server','no')
  },
  'todo.delete': function () {

  },
  'todo.update': function () {

  }
}