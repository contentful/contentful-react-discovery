import React from 'react'
import JSONTree from 'react-json-tree'
export default function Request ({request, location}) {
  return (
    <JSONTree data={request.payload} />
  )
}
