import * as contentTypeServie from '../services/contentTypeStore'
import * as entriesService from '../services/entriesStore'
import { store } from '../store'
import axios from 'axios'
import { longNameShort } from '../utils/long-name-short.js'

// since we are using promises already we can make redux-promise-middlware create
// so actions automatically for us so if we pass in a promise in the payload ti will
// dispatch ACTION_TYPE_PENDING, ACTION_TYPE_FULFILLED and ACTION_TYPE_REJECTED automatically
export function getContentTypes () {
  return {
    type: 'FETCH_CONTENT_TYPES',
    payload: contentTypeServie.getContentTypes().then((payload) => {
      const path = '/content_types/?access_token=<ACCESSTOKEN>&skip=0&limit=100&order=sys.createdAt'
      const url = getRawRequestUrl(path)
      store.dispatch(appendRequest(url, path, payload))
      return payload
    })
  }
}

export function toggleAPIMode (isPreview) {
  return {
    type: 'TOGGLE_API_PREVIEW',
    isPreview
  }
}

export function loadEntries (entries, {entryId, contentTypeId, contentTypeChanged} = {}) {
  return {
    type: 'FETCH_ENTRIES',
    payload: entriesService.loadEntries(entries, {entryId, contentTypeId, contentTypeChanged}).then((payload) => {
      const path = `/entries/${entryId || ''}?content_type=${contentTypeId}&access_token=<ACCESSTOKEN>`
      const url = getRawRequestUrl(path)
      store.dispatch(appendRequest(url, path, payload))
      return payload
    })
  }
}
export function resetRequests () {
  return {
    type: 'RESET_REQUESTS'
  }
}
export function appendRequest (url, path, payload) {
  return {
    type: 'APPEND_REQUEST',
    payload: axios.get(url).then((response) => {
      return {
        parsedPayload: payload,
        rawPayload: response.data,
        path: longNameShort(path, 20),
        time: new Date().toLocaleTimeString(undefined, {hour12: false}).split(' ')[0],
        url
      }
    })
  }
}

function getRawRequestUrl (path) {
  const {space, selectedApi} = store.getState().api
  const accessToken = selectedApi === 'preview' ? store.getState().api.previewAccessToken : store.getState().api.deliveryAccessToken
  let host = selectedApi === 'preview' ? '//preview.contentful.com' : '//cdn.contentful.com'
  let url = 'https:' + host + `/spaces/${space}${path}`.replace(/<ACCESSTOKEN>/i, accessToken)
  return url
}
