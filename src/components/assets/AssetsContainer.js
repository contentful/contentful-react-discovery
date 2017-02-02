import React from 'react'
import { getClient } from '../../services/contentfulClient'
import Assets from './Assets'
import Search from './Search'
import styles from './AssetsContainer.css'
import CSSModules from 'react-css-modules'
import update from 'react-addons-update'

class AssetsContainer extends React.Component {
  constructor () {
    super()
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.state = {
      assets: {},
      phase: 'loading'
    }
  }

  componentDidMount () {
    getClient().getAssets()
      .then((assets) => {
        this.initialAssets = assets.toPlainObject()
        this.setState({
          assets: assets.toPlainObject(),
          phase: 'loaded'
        })
      })
  }

  onChangeHandler (filter) {
    filter = filter.trim().toLowerCase()
    const newItems = this.initialAssets.items.filter((asset) => {
      return asset.fields.title.trim().toLowerCase().match(filter)
    })
    const newState = update(this.state, {
      assets: {
        items: {
          $set: newItems
        }
      }
    })
    this.setState(newState)
  }

  render () {
    if (this.state.phase === 'loading') {
      return <div>
        <p>Loading your Assets...</p>
      </div>
    } else if (this.state.assets.length === 0) {
      return <div>
        <p>No assets are available.</p>
      </div>
    }
    return <div>
      <Search itemCount={this.state.assets.items.length} label='media assets' onChange={this.onChangeHandler} />
      <Assets items={this.state.assets.items} location={this.props.location} />
    </div>
  }
}

export default CSSModules(AssetsContainer, styles)
