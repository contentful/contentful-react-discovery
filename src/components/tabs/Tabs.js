import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Tabs.css'
const Tabs = React.createClass({
  displayName: 'Tabs',
  propTypes: {
    selected: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired
  },
  getDefaultProps () {
    return {
      selected: 0
    }
  },
  getInitialState () {
    return {
      selected: this.props.selected
    }
  },
  handleClick (index, event) {
    event.preventDefault()
    this.setState({
      selected: index
    })
  },
  _renderTitles () {
    function labels (child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '')
      return (
        <li key={index}>
          <a href='#'
            styleName={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      )
    }
    return (
      <ul styleName='tabs__labels'>
        {this.props.children.map(labels.bind(this))}
      </ul>
    )
  },
  _renderContent () {
    return (
      <div styleName='tabs__content'>
        {this.props.children[this.state.selected]}
      </div>
    )
  },
  render () {
    return (
      <div styleName='tabs'>
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    )
  }
})
export default CSSModules(Tabs, styles)
