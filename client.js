const request = require('superagent')
const Radior = require('radior/dist/generator')
const assign = require('object-assign')
require('regenerator/runtime')

class HttpClientRadior extends Radior {
  constructor(domain) {
    super()
    this.domain = domain
  }

  connect() {
    return new Promise((resolve, reject)=> {
      request.get('/radior/monitors')
        .query({ domain: this.domain })
        .end((err, res)=> {
          if (err) return reject(err)
          console.log(res.body)


          this.load(this.makeDelegateListener(res.body))
          return resolve(res.body)
        })
    })

  }

  makeDelegateListener(events) {

    const output = {}
    for (let eventName in events) {
      let listeners = events[eventName]
      listeners.forEach( listener =>{
        let callFn = function(){
          let eventArgs = Array.prototype.slice.call( arguments, 0)
          return this._delegateCall(eventName, listener.name, eventArgs)
        }

        output[eventName] = assign({fn:callFn},listener)
      })

    }

    return output
  }

  _delegateCall( eventName, listenerName, eventArgs ){


    //找到当前的 runtime data

    return new Promise((resolve,reject)=>{
      request.post('/radior/call')
        .send({
          event : eventName,
          listener : listenerName,
          args : eventArgs,
          data : this._runtime.data.data
        }).end((err, res)=>{
        console.log( err, res.body)
        console.log( this._runtime, this._eventRuntimeKey, this._runtime.getRuntime(this._eventRuntimeKey) )
        if( err ) return reject(err)

        //TODO 拿到数据后合并 runtime
        //1. 合并data
        const serverRuntime = res.body.runtime.data
        const runtime = this._runtime.getRuntime(this._eventRuntimeKey)
        const serverListenerName = Object.keys(serverRuntime.listeners)[0]
        runtime.data = serverRuntime.data
        //2. 替换服务器端 listener 信息
        runtime.listeners[serverListenerName].childEvents = serverRuntime.listeners[serverListenerName].childEvents

          return resolve(res.body)
      })
    })

  }

  load(rawModuleName, rawListeners) {
    const moduleName = rawListeners === undefined ? undefined : rawModuleName
    const listeners = rawListeners === undefined ? rawModuleName : rawListeners

    if (moduleName) this._module.set(moduleName)

    for (var eventName in listeners) {
      this.on(eventName, listeners[ eventName ])
    }
  }
}


module.exports = HttpClientRadior