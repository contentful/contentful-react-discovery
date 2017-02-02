import React, { PropTypes } from 'react'
import styles from './ToggleButton.css'
import CSSModules from 'react-css-modules'
import getID from '../utils/getID'

class ToggleButton extends React.Component {
  componentWillMount () {
    this.state = {isChecked: this.props.checked, disabled: !!this.props.disabled}
    this.onChange = this.onChange.bind(this)
    this.toggleId = getID()
  }
  isSelectedWhen (flag) {
    if (this.state.isChecked === flag) {
      return 'selected'
    }
    return 'idle'
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.checked !== nextProps.checked || this.props.disabled !== nextProps.disabled) {
      this.setState({isChecked: nextProps.checked, disabled: nextProps.disabled})
    }
  }
  onChange (e) {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }
    let nextVal = !this.state.isChecked
    this.setState({
      isChecked: nextVal
    })
    this.props.changeHandler(nextVal)
  }
  render () {
    return (
      <ul>
        <li styleName={this.isSelectedWhen(false)}>
          {this.props.unCheckedLabel}
        </li>
        <li>
          <div styleName='onoffswitch'>
            <input
              type='checkbox'
              name='onoffswitch'
              styleName='onoffswitch-checkbox'
              id={this.toggleId}
              checked={this.state.isChecked}
              onChange={this.onChange} />
            <label styleName='onoffswitch-label' htmlFor={this.toggleId}>
              <span styleName='onoffswitch-inner' />
              <span styleName='onoffswitch-switch' />
            </label>
          </div>
        </li>
        <li styleName={this.isSelectedWhen(true)}>
          {this.props.checkedLabel}
        </li>
      </ul>
    )
  }
}

ToggleButton.propTypes = {
  changeHandler: PropTypes.func,
  unCheckedLabel: PropTypes.string.isRequired,
  checkedLabel: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool
}

export default CSSModules(ToggleButton, styles)
