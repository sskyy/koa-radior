
const app = require('koa')()

const RadiorMiddleware = require('../../server.js')
const radioMiddleware = new RadiorMiddleware
radioMiddleware.load(require('./server/listeners/todo.js'))

app.use( radioMiddleware.middleware() )



const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackMiddleware = require('koa-webpack-dev-middleware')
app.use(webpackMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath
}))


const send = require('koa-send')
app.use(function*(req, res) {
  if( this.request.url === '/')
    yield send(this, './index.html');
})


app.listen(3000)
console.log('Listening 3000')
