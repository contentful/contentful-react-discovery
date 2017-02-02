import React, {createClass} from 'react'
import {getClient} from '../../services/contentfulClient'
import Asset from './Asset'

export default createClass({
  getInitialState () {
    return {
      phase: 'loading'
    }
  },

  componentDidMount () {
    getClient().getAsset(this.props.params.assetId)
    .then((asset) => {
      this.setState({
        asset: asset.toPlainObject(),
        phase: 'loaded'
      })
    })
  },

  render () {
    if (this.state.phase === 'loading') {
      return <p>Loading your Asset...</p>
    } else {
      return <Asset asset={this.state.asset} />
    }
  }
})
