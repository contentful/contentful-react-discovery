export function requests (state = [], action) {
  switch (action.type) {
    case 'APPEND_REQUEST_FULFILLED':
      return state.concat([action.payload])
  }
  return state
}
