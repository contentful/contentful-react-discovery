import {createClient} from 'contentful'

let client
let authorized
let currentSpace
function initClient (space, accessToken, preview) {
  client = createClient({
    space: space,
    accessToken: accessToken,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com'
  })
  return client.getSpace()
  .then((space) => {
    authorized = true
    currentSpace = space
    return space
  })
}

function getClient () {
  return authorized && client
}

function getCurrentSpaceName () {
  let currentSpaceName = (currentSpace && currentSpace.name) ? currentSpace.name : ''
  if (currentSpaceName.length > 13) {
    currentSpaceName = currentSpaceName.substring(0, 10)
    currentSpaceName += '...'
  }
  return currentSpaceName
}
function resetClient () {
  window.sessionStorage.clear()
  authorized = false
}

export {
  initClient,
  getClient,
  resetClient,
  getCurrentSpaceName
}
