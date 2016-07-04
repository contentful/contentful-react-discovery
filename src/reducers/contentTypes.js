export function contentTypes (state = {}, action) {
  switch (action.type) {
    case 'FETCH_CONTENT_TYPES_PENDING':
      return Object.assign({}, state, {fetching: true})
    case 'FETCH_CONTENT_TYPES_FULFILLED':
      console.log(action)
      return Object.assign({}, state, {fetching: false, payload: action.payload})
    case 'FETCH_CONTENT_TYPES_REJECTED':
      return Object.assign({}, state, {fetching: false, payload: null, validationError: action.payload})
    case '@@router/LOCATION_CHANGE':
      const {query} = action.payload
      return Object.assign({}, state, {fetching: false,
                                      deliveryAccessToken: query.delivery_access_token || '',
                                      space: query.space_id || '',
                                      previewAccessToken: query.preview_access_token || '',
                                      selectedApi: (query.preview && query.preview === 'true') ? 'preview' : 'production'
                          })
  }
  return state
}
