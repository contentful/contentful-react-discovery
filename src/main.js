import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, useRouterHistory } from 'react-router'

import { createHistory } from 'history'

import { initClient, getClient } from './services/contentfulClient'

import App from './components/App'
import SettingsContainer from './components/settings/SettingsContainer'
import ContentTypesContainer from './components/content-types/ContentTypesContainer'
import EntriesContainer from './components/entries/EntriesContainer'
import Entry from './components/entries/Entry'
import AssetsContainer from './components/assets/AssetsContainer'
import AssetContainer from './components/assets/AssetContainer'
import Error from './components/Error'
import NoMatch from './components/NoMatch'
import isPreviewSetInQuery from './utils/is-preview-set-in-query'
import {Provider} from 'react-redux'
import {store, history} from './store'

const browserHistory = useRouterHistory(createHistory)({
  basename: (process.env.NODE_ENV && process.env.NODE_ENV === 'production') ? '/discovery-app-react/' : '/'
})
let credentials = {
  accessToken: '',
  space: ''
}

const router = ((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={SettingsContainer} />
      <Route path='entries/by-content-type' component={ContentTypesContainer} onEnter={requireCredentials}/>
      <Route path='entries/by-content-type/:contentTypeId' component={EntriesContainer} onEnter={requireCredentials}>
        <Route path=':entryId' component={Entry} onEnter={requireCredentials}/>
      </Route>
      <Redirect from='entries' to='entries/by-content-type'/>
      <Route path='assets' component={AssetsContainer} onEnter={requireCredentials}/>
      <Route path='assets/:assetId' component={AssetContainer} onEnter={requireCredentials}/>
      <Route path='error' component={Error}/>
      <Route path='*' component={NoMatch}/>
    </Route>
  </Router>
))

render(router, document.getElementsByTagName('main')[0])

/**
 * Checks if client has been initialized.
 * If not, initializes it, and in case of failure redirects to login page
 * If the client is already initialized, proceeds to the actual route
 */
function requireCredentials (nextState, replace, next) {
  const query = nextState.location.query
  const isPreview = isPreviewSetInQuery(query)
  const newCredentials = {
    accessToken: isPreview ? query.preview_access_token : query.delivery_access_token,
    previewAccessToken: query.preview_access_token,
    deliveryAccessToken: query.delivery_access_token,
    space: query.space_id,
    preview: isPreview
  }
  if (credentialsExist(newCredentials) && (!getClient() || credentialsAreDifferent(credentials, newCredentials))) {
    initializeClient(newCredentials, next, replace)
  } else if (!query.space_id && !query.access_token) {
    replace('/')
    next()
  } else {
    next()
  }
}

function credentialsExist (credentials) {
  return credentials.accessToken && credentials.space
}

function credentialsAreDifferent (credentials, newCredentials) {
  return !(
    credentials.accessToken === newCredentials.accessToken &&
    credentials.space === newCredentials.space
  )
}

/**
 * Initializes the client and proceeds to the actual route.
 * In case of failure redirects to error page with message
 */
function initializeClient (newCredentials, next, replace) {
  initClient(newCredentials.space, newCredentials.accessToken, newCredentials.preview)
  .then(
    () => {
      credentials = newCredentials
      next()
    },
    (err) => {
      replace({
        pathname: '/error',
        state: {
          message: err.message
        }
      })
      next()
    }
  )
}
