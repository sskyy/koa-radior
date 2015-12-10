'use strict'

const DomainRadior = require('./DomainRadior')
const co = require('co')


class RequestRadior extends DomainRadior{

  call( sourceDomain, eventName, listenerName, eventArgs, data ){

    console.log('calling', sourceDomain, eventName, listenerName, eventArgs, data)

    const runtimeRadior = this.clone()
    const listener  = this._domainListeners[sourceDomain][eventName][listenerName]
    console.log( this._domainListeners )
    console.log( this._domainListeners[sourceDomain][eventName][listenerName])
    const fn = listener.fn

    return runtimeRadior.fireDelegateEvent(eventArgs, data, fn).then(function(){

      //TODO runtime 中的深度数据也要返回,不能只是简单的 data
      //runtime 的序列化和反序列化
      return runtimeRadior._runtime

    })
  }
  registerMonitor(){
    throw new Error('RequestRadior can not be monitored')
  }

}

module.exports = RequestRadior