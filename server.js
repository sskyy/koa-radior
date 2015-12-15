'use strict'
const _ = require('lodash')
const RequestRadior = require('./lib/RequestRadior')
const parser = require('co-body')


class RadioMiddleware extends RequestRadior {
  constructor( rawOptions ) {
    super()
    this.options = _.defaults(rawOptions||{},{
      apiPrefix : '/radior'
    })

    this.domain('Server')
  }

  middleware() {

    const options = this.options
    const radior = this
    return function* (next) {

      console.log('request coming', this.request.path)

      if (this.request.path === `${options.apiPrefix}/call`) {
        const query = yield parser.json(this.req)
        const eventName = query.event
        const listenerName = query.listener
        const eventArgs = query.args
        const data = query.data
        let error = null
        let runtime = null
        try {
          runtime = yield radior.call( 'Client', eventName, listenerName, eventArgs, data )

        } catch (e) {
          console.error(e)
          console.log( e.stack)
          error = e
        }

        this.body = {runtime,error}

      }else if(this.request.path === `${options.apiPrefix}/monitors`){

        this.body = radior.makeDelegateListeners(radior._domainListeners[this.request.query.domain])

      } else {
        yield next
      }

    }
  }
  makeDelegateListeners( events ){
    return _.mapValues( events,listeners=>_.values(listeners))
  }
}


module.exports = RadioMiddleware
