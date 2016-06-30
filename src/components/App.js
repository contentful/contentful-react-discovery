import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import Nav from './Nav'
import ApiStore from '../stores/ApiStore'

class App extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleApiSelectionChange = this.handleApiSelectionChange.bind(this)
  }
  componentWillMount () {
    ApiStore.addListener('API_SELECTION_CHANGE', this.handleApiSelectionChange)
  }

  componentWillUnmount () {
    ApiStore.removeListener('API_SELECTION_CHANGE', this.handleApiSelectionChange)
  }

  handleApiSelectionChange (event) {
    console.log(this.context)
  }

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
App.contextTypes = {
  router: PropTypes.object.isRequired
}

export default CSSModules(App, styles)
