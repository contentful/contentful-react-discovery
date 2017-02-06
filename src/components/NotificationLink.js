import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './NotificationLink.css'
import { Link } from 'react-router'

class NotificationLink extends React.Component {
  render () {
    return (
      <div>
        <div styleName='counter'>
          <span styleName='badge'>{this.props.count}</span>
        </div>
        <Link to={this.props.to}>
          {this.props.label}
        </Link>
      </div>
    )
  }
}

NotificationLink.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  to: PropTypes.object.isRequired
}

export default CSSModules(NotificationLink, styles)
