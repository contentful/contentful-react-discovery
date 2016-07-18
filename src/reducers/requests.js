export function requests (state = [], action) {
  switch (action.type) {
    case 'APPEND_REQUEST_FULFILLED':
      return state.concat([action.payload])
    case 'RESET_REQUESTS':
      return state.filter(() => { return false })
  }
  return state
}
