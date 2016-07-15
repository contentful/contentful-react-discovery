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
    const {params: currentParams} = this.props
    const {params: nextParams} = nextProps
    if (currentParams.entryId !== nextParams.entryId ||
        currentParams.contentTypeId !== nextParams.contentTypeId
    ) {
      this.props.loadEntries(this.props.entries, {
        entryId: nextParams.entryId,
        contentTypeId: nextParams.contentTypeId,
        contentTypeChanged: currentParams.contentTypeId !== nextParams.contentTypeId
      })
    }
  },
  loadEntries () {
    const {params} = this.props
    this.props.loadEntries(this.props.entries, {entryId: params.entryId,
                                                contentTypeId: params.contentTypeId,
                                                contentTypeChanged: false})
  },
  render () {
    const {entries} = this.props
    if (entries.fetching === true) {
      return <p>Loading your Entries....</p>
    } else if (entries.payload.len() === 0) {
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

    if (entries.payload.len() < entries.total) {
      loadMoreElement = <FeaturelessButton label='Load more' action={this.loadEntries}/>
    }
    return <TwoPanelList
      items={[{items: this.props.contentTypes.payload, TitleView: contentTypeListTitle, ListView: ContentTypeListItem},
              {items: entries.payload.value, TitleView: entriesListTitle, ListView: EntryListItem}]}
      ContentView={contentElement}
      location={this.props.location}
      />
  }
})
