export function contentTypes (state = {}, action) {
  switch (action.type) {
    case 'FETCH_CONTENT_TYPES_PENDING':
      return Object.assign({}, state, {fetching: true})
    case 'FETCH_CONTENT_TYPES_FULFILLED':
      console.log(action)
      return Object.assign({}, state, {fetching: false, payload: action.payload})
    case 'FETCH_CONTENT_TYPES_REJECTED':
      return Object.assign({}, state, {fetching: false, payload: null, validationError: action.payload})
  }
  return state
}
