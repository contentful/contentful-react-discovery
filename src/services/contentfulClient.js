import {createClient} from 'contentful'

let client
let authorized

function initClient (space, accessToken, preview) {
  client = createClient({
    space: space,
    accessToken: accessToken,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com'
  })
  return client.getSpace()
  .then(() => {
    authorized = true
    return authorized
  })
}

function getClient () {
  return authorized && client
}

function resetClient () {
  window.sessionStorage.clear()
  authorized = false
}

export {
  initClient,
  getClient,
  resetClient
}
