import React, {createClass} from 'react'
import TwoPanelList, {Placeholder} from '../TwoPanelList'
import EntryListItem from './EntryListItem'
import Entry from './Entry'
import FeaturelessButton from '../FeaturelessButton'
import ContentTypeListItem from '../content-types/ContentTypeListItem'

export default createClass({
  componentDidMount () {
    this.props.loadEntries(this.props.entries, {entryId: this.props.params.entryId,
                                                contentTypeId: this.props.params.contentTypeId,
                                                contentTypeChanged: false})
  },

  componentWillReceiveProps (nextProps) {
    if (this.props.params.entryId !== nextProps.params.entryId ||
        this.props.params.contentTypeId !== nextProps.params.contentTypeId
    ) {
      this.props.loadEntries(this.props.entries, {
        entryId: nextProps.params.entryId,
        contentTypeId: nextProps.params.contentTypeId,
        contentTypeChanged: this.props.params.contentTypeId !== nextProps.params.contentTypeId
      })
    }
  },
  loadEntries () {
    this.props.loadEntries(this.props.entries, {entryId: this.props.params.entryId,
                                                contentTypeId: this.props.params.contentTypeId,
                                                contentTypeChanged: false})
  },
  render () {
    const {entries} = this.props
    if (this.props.fetching === true) {
      return <p>Loading your Entries...</p>
    } else if (entries.entries.len() === 0) {
      return <p>No entries are available.</p>
    }
    let contentElement, loadMoreElement
    const contentTypeListTitle = <h3>Content Types</h3>
    const entriesListTitle = <h3>Entries</h3>
    if (entries.entry) {
      contentElement = <Entry entry={entries.entry.value} location={this.props.location}/>
    } else {
      contentElement = <Placeholder content='Please select your Entry.' />
    }

    if (entries.entries.len() < entries.total) {
      loadMoreElement = <FeaturelessButton label='Load more' action={this.loadEntries}/>
    }
    return <TwoPanelList
      items={[{items: this.props.contentTypes.payload, TitleView: contentTypeListTitle, ListView: ContentTypeListItem},
              {items: entries.entries.value, TitleView: entriesListTitle, ListView: EntryListItem}]}
      ContentView={contentElement}
      location={this.props.location}
      />
  }
})
