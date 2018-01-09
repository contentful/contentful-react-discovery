import React, { PropTypes } from 'react'
import { wrapper, spinner, text } from './LoadingIndicator.css'

class LoadingIndicator extends React.Component {
  render () {
    return (
      <div className={wrapper}>
        <div>
          <img className={spinner} src='/contentful_logo_120x90@2x.png' />
        </div>
        <div className={text}>
          {this.props.text}
        </div>
      </div>
    )
  }
}

LoadingIndicator.propTypes = {
  text: PropTypes.string.isRequired
}

export default LoadingIndicator
