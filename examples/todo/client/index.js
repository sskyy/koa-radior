'use strict'

const Radior = require('../../../client.js')
const radior = new Radior('Client')

const todoListeners = require('./listeners/todo.js')

console.log( radior)

radior.connect().then(function(){
  radior.load('todo', todoListeners)
  console.log('firing todo.create')
  radior.fire('todo.create', 'hahaha').then(function(){
    console.log( this.get('server'))
  })
})

module.exports = radior