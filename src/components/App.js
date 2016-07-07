import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import Nav from './Nav'
import NotificationLink from './NotificationLink'

class App extends React.Component {
  render () {
    return (
      <div styleName='app-container'>
        <nav>
          <div styleName='nav-container'>
            <div styleName='logo'>
              <img src='./contentful_logo_120x90@2x.png' height='32'/>
              <span>Discovery App</span>
            </div>
            <NotificationLink styleName='requests-link' label='Requests' to={{pathname: '/requests', query: this.props.location.query}}/>
            <Nav query={this.props.location.query} />
          </div>
        </nav>
        <div styleName='content-container'>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
}
App.contextTypes = {
  router: PropTypes.object.isRequired
}

export default CSSModules(App, styles)
