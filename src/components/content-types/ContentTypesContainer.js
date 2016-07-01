import React, {createClass} from 'react'
import {getClient} from '../../services/contentfulClient'
import {storeContentTypes} from '../../services/contentTypeStore'
import TwoPanelList, {Placeholder} from '../TwoPanelList'
import ContentTypeListItem from './ContentTypeListItem'

export default createClass({

  componentDidMount () {
    this.props.getContentTypes()
  },

  render () {
    if (this.props.contentTypes.fetching === true) {
      return <p>Loading your Content Types...</p>
    } else {
      console.log(this.props.contentTypes)
      const listTitle = <h3>Content Types</h3>
      const placeholder = <Placeholder content='Please select your Content Type.' />
      return <TwoPanelList
        items={[{items: this.props.contentTypes.payload, TitleView: listTitle, ListView: ContentTypeListItem}]}
        ContentView={placeholder}
        location={this.props.location}
        />
    }
  }
})
