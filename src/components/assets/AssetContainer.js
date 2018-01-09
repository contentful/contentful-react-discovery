import React, {createClass} from 'react'
import {getClient} from '../../services/contentfulClient'
import Asset from './Asset'
import LoadingIndicator from '../LoadingIndicator'

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
      return <LoadingIndicator text='Loading your Asset...' />
    } else {
      return <Asset asset={this.state.asset} />
    }
  }
})
