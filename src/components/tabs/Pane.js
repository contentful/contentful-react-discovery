import React from 'react'
const Pane = React.createClass({
  displayName: 'Pane',
  propTypes: {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

export default Pane
