import scour from 'scourjs'
import {getClient} from './contentfulClient'
import {getContentTypes, findContentTypeInList} from './contentTypeStore'
import concat from 'unique-concat'

export function loadEntries (state, {entryId, contentTypeId, contentTypeChanged} = {}) {
  const skip = contentTypeChanged ? 0 : state.skip// TODO replace state.skip to the correct value
  Promise.all([
    getClient().getEntries({
      content_type: contentTypeId,
      skip: skip,
      limit: 100,
      order: 'sys.createdAt'
    }),
    getContentTypes(),
    findEntry(entryId, state)
  ]).then(([entriesResponse, contentTypes, entry]) => {
    entriesResponse = scour(entriesResponse)
                      .set('items', appendAndAugmentEntries(
                        contentTypeChanged ? [] : state.entries.value, // TODO change this to the correct value
                        entriesResponse.items,
                        contentTypes
                      ))
    return {
      entry: entry ? scour(addContentTypeToEntry(entry, contentTypes)) : entry,
      entries: entriesResponse.go('items'),
      skip: skip + entriesResponse.limit,
      contentTypes: contentTypes,
      total: entriesResponse.total
    }
  })
}

function findEntry (id, state) {
  if (!id) return Promise.resolve(undefined)
  const entry = state.entries.find({'sys.id': {'$eq': id}})
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
}

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
