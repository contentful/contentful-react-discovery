import * as contentTypeServie from '../services/contentTypeStore'
import * as entriesService from '../services/entriesStore'
import {store} from '../store'
// since we are using promises already we can make redux-promise-middlware create
// so actions automatically for us so if we pass in a promise in the payload ti will
// dispatch ACTION_TYPE_PENDING, ACTION_TYPE_FULFILLED and ACTION_TYPE_REJECTED automatically
export function getContentTypes () {
  return {
    type: 'FETCH_CONTENT_TYPES',
    payload: contentTypeServie.getContentTypes().then((payload) => {
      store.dispatch(appendRequest({path: '/content_types', payload}))
      return payload
    })
  }
}

export function loadEntries (entries, {entryId, contentTypeId, contentTypeChanged} = {}) {
  return {
    type: 'FETCH_ENTRIES',
    payload: entriesService.loadEntries(entries, {entryId, contentTypeId, contentTypeChanged}).then((payload) => {
      store.dispatch(appendRequest({path: `/content_types/${contentTypeId}/entries/${entryId || ''}?access_token=<ACCESSTOKEN>`, payload}))
      return payload
    })
  }
}
export function appendRequest (request) {
  return {
    type: 'APPEND_REQUEST',
    request: request
  }
}
