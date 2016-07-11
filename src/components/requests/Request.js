import React from 'react'
import JSONTree from 'react-json-tree'
import Tabs from '../tabs/Tabs'
import Pane from '../tabs/Pane'
export default function Request ({request, location}) {
  return (
    <div>
      <Tabs selected={0}>
        <Pane label='Raw JSON Output'>
          <div><JSONTree data={request.rawPayload} /></div>
        </Pane>
        <Pane label='Contentful.js Output'>
          <div><JSONTree data={request.parsedPayload} /></div>
        </Pane>
      </Tabs>

    </div>
  )
}
