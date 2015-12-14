/* eslint-disable no-console */
const app = require('koa')()

const RadiorMiddleware = require('../../server.js')
const radioMiddleware = new RadiorMiddleware
radioMiddleware.radior.load(require('./server/listeners/todo.js'))

app.use( radioMiddleware.middleware() )

app.listen(3000)
console.log('Listening 3000')
