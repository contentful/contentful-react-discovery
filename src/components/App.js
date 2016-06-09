import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import Nav from './Nav'
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
            <Nav query={this.props.location.query} />
          </div>
        </nav>
        <div styleName='content-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
