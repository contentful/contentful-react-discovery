import React from 'react'
import JSONTree from 'react-json-tree'
export default function Request ({request, location}) {
  return (
    <div>
      <JSONTree data={request.rawPayload} />
    </div>
  )
}
