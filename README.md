# Koa-radior

Integrate Radior with Koa. Use this middleware to listen to front-end Radior event.

## Usage

On server:

```javascript
const app = require('koa')()

const Radior = require('koa-radior')
const radio= new Radior

//listen on front-end event
Radior.on('Client:user.login', function(){
  this.set('user', {id:1, name:'John'}
})

app.use( radio.middleware() )

app.listen(3000)
```

on page:

```javascript
const Radior = require('koa-radior/client.js')
const radior = new Radior('Client')

//connect to server
radior.connect().then(function(){
  radior.fire('user.login').then(function(){

    //receive data from server-side listener
    console.log( this.get('user') )
  })
})

```