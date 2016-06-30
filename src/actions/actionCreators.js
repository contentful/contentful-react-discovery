import {getContentTypes, findContentTypeInList} from '../../services/contentTypeStore'

// since we are using promises already we can make redux-promise-middlware create
// so actions automatically for us so if we pass in a promise in the payload ti will
// dispatch ACTION_TYPE_PENDING, ACTION_TYPE_FINISH and ACTION_TYPE_ERROR automatically
export function getContentTypeAction () {
  return {
    type: 'FETCH_CONTENT_TYPES',
    payload: getContentTypes()
  }
}

export function findContentTypeInListAction (contentTypes, id) {
  return {
    type: 'FIND_CONTENT_TYPE_IN_LIST',
    payload: findContentTypeInList(contentTypes, id)
  }
}

export function findContentTypeAction (id) {
  return {
    type: 'FIND_CONTENT_TYPE',
    id
  }
}
