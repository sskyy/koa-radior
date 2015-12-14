import React from 'react'



const Input = React.createClass({
  onKeyUp(e){
    if( e.which ===13 ){
      this.props.radior.fire('todo.create', this.refs.input.value)
    }

  },
  render() {
    return <input onKeyUp={this.onKeyUp} ref='input'/>
  }
});

export default Input
