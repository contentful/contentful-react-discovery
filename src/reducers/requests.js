export function requests (state = [], action) {
  switch (action.type) {
    case 'APPEND_REQUEST':
      return state.concat([action.request])
  }
  return state
}
