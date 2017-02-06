import scour from 'scourjs'

export function entries (state = {}, action) {
  switch (action.type) {
    case 'FETCH_ENTRIES_PENDING':
      return Object.assign({}, state, {fetching: true})
    case 'FETCH_ENTRIES_FULFILLED':
      const {payload} = action
      return Object.assign({}, state, {fetching: false,
        entry: payload.entry,
        payload: payload.entries,
        skip: payload.skip,
        total: payload.total})
    case 'FETCH_ENTRIES_REJECTED':
      return Object.assign({}, state, {fetching: false, error: action.payload, payload: scour([])})
  }
  return state
}
