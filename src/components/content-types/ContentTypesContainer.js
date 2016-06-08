import React, {createClass} from 'react'
import {getClient} from '../../services/contentfulClient'
import {storeContentTypes} from '../../services/contentTypeStore'
import TwoPanelList, {Placeholder} from '../TwoPanelList'
import ContentTypeListItem from './ContentTypeListItem'

export default createClass({
  getInitialState () {
    return {
      contentTypes: {},
      phase: 'loading'
    }
  },

  componentDidMount () {
    getClient().getContentTypes()
    .then((contentTypes) => {
      storeContentTypes(contentTypes.items)
      this.setState({
        contentTypes: contentTypes,
        phase: 'loaded'
      })
    })
  },

  render () {
    if (this.state.phase === 'loading') {
      return <p>Loading your Content Types...</p>
    } else {
      const listTitle = <h3>Content Types</h3>
      const placeholder = <Placeholder content='Please select your Content Type.' />
      return <TwoPanelList
        items={[{items: this.state.contentTypes.items, TitleView: listTitle, ListView: ContentTypeListItem}]}
        ContentView={placeholder}
        location={this.props.location}
        />
    }
  }
})
