export function api (state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_API_PREVIEW':
      return Object.assign({}, state, {selectedApi: action.isPreview ? 'preview' : 'delivery'})
    case '@@router/LOCATION_CHANGE':
      const {query} = action.payload
      return Object.assign({}, state, {
        deliveryAccessToken: query.delivery_access_token || '',
        space: query.space_id || '',
        previewAccessToken: query.preview_access_token || '',
        selectedApi: (query.preview && query.preview === 'true') ? 'preview' : 'delivery'
      })

  }
  return state
}
