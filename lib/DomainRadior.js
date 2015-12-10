'use strict'

const _ = require('lodash')
const Radior = require('radior')
const assign = require('lodash').extend
const co = require('co')

function isGenerator(fn) {
  return fn.constructor.name === 'GeneratorFunction'
}


class DomainRadior extends Radior{
  constructor( options ){
    super()
    this.options = options || {}
    this._domainSplitor = ':'
    this._domainListeners = {}
    this._listenedDomains = {}
    this._domain = ''
    this._domainListenerIndex = 0
    this._domainDelegateEvent = '__domain_radior__.call'

    this._domainMonitors = {}
    this.makeDelegateEvent()
  }
  makeDelegateEvent(){
    this.on(this._domainDelegateEvent, function( eventArgs, data, listenerFn ){

      Object.keys( data.shared).forEach( key=>{
        console.log('set data', key,data.shared[key])
        this.set(key, data.shared[key])
      })

      Object.keys( data.global).forEach( key=>{
        this.setGlobal(key, data.global[key])
      })

      return  co(function *(){
        return isGenerator(listenerFn) ? yield listenerFn.apply(this, eventArgs ) : listenerFn.apply(this, eventArgs)
      }.bind(this))
    })
  }
  fireDelegateEvent( eventArgs, data, listenerFn ){
    return this.fire(this._domainDelegateEvent, eventArgs, data, listenerFn)
  }
  domain( name ){
    if( name ) this._domain = name

    return this._domain
  }
  makeDelegateListener(){
    throw new Error('Radior being monitored should implement this')
  }
  on( rawEventName, rawListener ){
    const exp = new RegExp(this._domainSplitor)
    if( !exp.test(rawEventName) ){
      console.log('register normal listeners', rawEventName)
      return super.on( rawEventName, rawListener )
    }

    const arr = rawEventName.split(this._domainSplitor)
    const domain = arr[0]
    const eventName = arr[1]

    const listener = {}
    if( typeof rawListener === 'function'){
      listener.fn = rawListener
    }else{
      _.extend(listener, rawListener)
    }


    listener.name  = listener.name || `anonymous_${this._domainListenerIndex++}`

    console.log('register domain listeners', domain, eventName, listener.fn.toString())
    if(this._domainListeners[domain] === undefined) this._domainListeners[domain] = {}
    if(this._domainListeners[domain][eventName] === undefined) this._domainListeners[domain][eventName] = {}
    this._domainListeners[domain][eventName][listener.name] = listener

  }
  load( rawModuleName, rawListeners ){
    const moduleName = rawListeners=== undefined ? undefined : rawModuleName
    const listeners = rawListeners === undefined ? rawModuleName : rawListeners

    if( moduleName ) this._module.set(moduleName)

    for( var eventName in listeners ){
      this.on( eventName, listeners[eventName])
    }
  }
  call( sourceDomain, eventName, listener ){
    throw new Error('should be implement by sub class')
  }
  getMonitorListeners( sourceDomain ){
    return assign({}, this._domainListeners[sourceDomain] )
  }
  destory(){
    throw new Error('should be implement by sub class')
  }
}

module.exports = DomainRadior