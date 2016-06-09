import React, {createClass} from 'react'
import scour from 'scourjs'
import concat from 'unique-concat'
import {getClient} from '../../services/contentfulClient'
import {getContentTypes, findContentTypeInList} from '../../services/contentTypeStore'
import TwoPanelList, {Placeholder} from '../TwoPanelList'
import EntryListItem from './EntryListItem'
import Entry from './Entry'
import FeaturelessButton from '../FeaturelessButton'
import ContentTypeListItem from '../content-types/ContentTypeListItem'

export default createClass({
  getInitialState () {
    return {
      entry: undefined,
      entries: scour([]),
      contentTypes: [],
      skip: 0,
      total: undefined,
      phase: 'loading'
    }
  },

  componentDidMount () {
    this.loadEntries()
  },

  componentWillReceiveProps (nextProps) {
    if (this.props.params.entryId !== nextProps.params.entryId ||
        this.props.params.contentTypeId !== nextProps.params.contentTypeId
    ) {
      this.loadEntries({
        entryId: nextProps.params.entryId,
        contentTypeId: nextProps.params.contentTypeId,
        contentTypeChanged: this.props.params.contentTypeId !== nextProps.params.contentTypeId
      })
    }
  },

  loadEntries ({entryId, contentTypeId, contentTypeChanged} = {}) {
    const skip = contentTypeChanged ? 0 : this.state.skip
    Promise.all([
      getClient().getEntries({
        content_type: contentTypeId || this.props.params.contentTypeId,
        skip: skip,
        limit: 100,
        order: 'sys.createdAt'
      }),
      getContentTypes(),
      this.findEntry(entryId || this.props.params.entryId)
    ]).then(([entriesResponse, contentTypes, entry]) => {
      entriesResponse = scour(entriesResponse)
                        .set('items', appendAndAugmentEntries(
                          contentTypeChanged ? [] : this.state.entries.value,
                          entriesResponse.items,
                          contentTypes
                        ))
      this.setState({
        entry: entry ? scour(addContentTypeToEntry(entry, contentTypes)) : entry,
        entries: entriesResponse.go('items'),
        skip: skip + entriesResponse.limit,
        contentTypes: contentTypes,
        total: entriesResponse.total,
        phase: 'loaded'
      })
    })
  },

  findEntry (id) {
    if (!id) return Promise.resolve(undefined)
    const entry = this.state.entries.find({'sys.id': {'$eq': id}})
    if (entry) {
      return Promise.resolve(entry.value)
    } else {
      return getClient().getEntries({'sys.id': id})
      .then((response) => {
        if (response.total > 0) {
          return response.items[0]
        } else {
          throw new Error('Entry not found')
        }
      })
    }
  },

  render () {
    if (this.state.phase === 'loading') {
      return <p>Loading your Entries...</p>
    } else if (this.state.entries.len() === 0) {
      return <p>No entries are available.</p>
    }
    let contentElement, loadMoreElement
    const contentTypeListTitle = <h3>Content Types</h3>
    const entriesListTitle = <h3>Entries</h3>
    if (this.state.entry) {
      contentElement = <Entry entry={this.state.entry.value} location={this.props.location}/>
    } else {
      contentElement = <Placeholder content='Please select your Entry.' />
    }

    if (this.state.entries.len() < this.state.total) {
      loadMoreElement = <FeaturelessButton label='Load more' action={this.loadEntries}/>
    }
    return <TwoPanelList
      items={[{items: this.state.contentTypes, TitleView: contentTypeListTitle, ListView: ContentTypeListItem},
              {items: this.state.entries.value, TitleView: entriesListTitle, ListView: EntryListItem}]}
      ContentView={contentElement}
      location={this.props.location}
      />
  }
})

function appendAndAugmentEntries (existingEntries, newEntries, contentTypes) {
  return concat(
    existingEntries,
    addContentTypesToEntries(newEntries, contentTypes),
    (entry) => entry.sys.id
  )
}

function addContentTypesToEntries (entries, contentTypes) {
  return entries.map((entry) => addContentTypeToEntry(entry, contentTypes))
}

function addContentTypeToEntry (entry, contentTypes) {
  const contentTypeId = entry.sys.contentType.sys.id
  entry.sys.contentType = findContentTypeInList(contentTypes, contentTypeId)
  return entry
}
