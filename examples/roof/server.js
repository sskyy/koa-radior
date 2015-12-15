
const app = require('koa')()

const Radior = require('../../server.js')
const radio= new Radior
radio.load(require('./server/listeners/todo.js'))

app.use( radio.middleware() )

app.listen(3000)
console.log('Listening 3000')
