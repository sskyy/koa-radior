import React from 'react'
import Roof from 'roof'
import List from './List'
import Input from './Input'
import Message from './Message'


const Radior = require('../../../../client.js')

export default class RoofRadior extends Radior{
  constructor( domain, options, store){
    super(domain, options)
    this.store = store
    this.on( /.+/, {fn:function(){
      if( !this.getGlobal('state')){
        this.setGlobal('state', store.getState())
        console.log( 'global Set', store.getState())

      }
    },first:true})

  }
  fire(...args){

    const promise = super.fire.call(this, ...args)
    const radior = this
    promise.then(function(){
      console.log('set state after fire', this.getGlobal('state'))
      radior.store.setState(this.getGlobal('state'))
    })
    return promise
  }
}



const App = React.createClass({
  contextTypes : {
    'store' : React.PropTypes.any.isRequired
  },
  getInitialState(){
    console.log(this.context.store)
    this.radior =new RoofRadior('Client',{},this.context.store)

    return {}
  },


  componentDidMount(){

    const todoListeners = require('../../client/listeners/todo.js')

    this.radior.connect().then(()=>{
      this.radior.load('todo', todoListeners)
    })

  },

  render() {
    return <div>
      <h1>Todo List</h1>
      <Input radior = {this.radior}/>
      <List />
      <Message />
      </div>

  },

});

export default Roof.createRootContainer({
  todos : [],
  message : 'Try to create a new Todo.'
})(React.createClass({
  render(){
    return <App />
  }
}));
