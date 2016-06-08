import React from 'react'
import { Link } from 'react-router'

export default function ContentTypeListItem ({item, location}) {
  return (
    <li>
      <Link to={{pathname: `/entries/by-content-type/${item.sys.id}`, query: location.query}}>{item.name}</Link>
    </li>
  )
}
