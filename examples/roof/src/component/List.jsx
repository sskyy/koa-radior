import React from 'react'
import Roof from 'roof'



const List = React.createClass({
  componentDidMount(){
  },
  render() {
    return <ul>
      {this.props.todos.map(todo=>{
        return <li key={todo.id}>{todo.content}</li>
        })}
    </ul>
  },
});

export default Roof.createContainer({
  todos : 'todos'
})(List);
