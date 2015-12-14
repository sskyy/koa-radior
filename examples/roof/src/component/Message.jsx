import React from 'react'
import Roof from 'roof'


const Message = React.createClass({
  render() {
    return this.props.message ? <div>Message : {this.props.message}</div> : null
  },
});

export default Roof.createContainer({
  message: 'message'
})(Message);
