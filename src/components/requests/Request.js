import React from 'react'
import JSONTree from 'react-json-tree'
import Tabs from '../tabs/Tabs'
import Pane from '../tabs/Pane'
import styles from './Request.css'
import CSSModules from 'react-css-modules'

function Request ({request, location}) {
  function parseUrl (urlWithParams) {
    const urlSections = urlWithParams.split('?')
    const url = urlSections[0]
    const params = urlSections[1].split('&').map((item) => {
      const param = item.split('=')
      let paramObj = {}
      paramObj[`${param[0]}`] = param[1]
      return paramObj
    })
    return {
      url,
      params
    }
  }
  const urlData = parseUrl(request.url)
  return (
    <div>
      <div styleName='request-meta'>
        <p> <strong>Request URL</strong>: {urlData.url} </p>
        <p> <strong>Request Method</strong>: GET </p>
        <p> <strong>Request Paramaters</strong>: </p>
        <JSONTree data={urlData.params} />
      </div>
      <Tabs selected={0}>
        <Pane label='Response'>
          <div><JSONTree data={request.rawPayload} /></div>
        </Pane>
        <Pane label='Contentful.js Output'>
          <div><JSONTree data={request.parsedPayload} /></div>
        </Pane>
      </Tabs>

    </div>
  )
}

export default CSSModules(Request, styles)
