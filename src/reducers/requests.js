export function requests (state = [], action) {
  switch (action.type) {
    case 'APPEND_REQUEST_FULFILLED':
      // last request should appear first
      return [action.payload].concat(state.slice())
    case 'RESET_REQUESTS':
      return state.filter(() => { return false })
  }
  return state
}
