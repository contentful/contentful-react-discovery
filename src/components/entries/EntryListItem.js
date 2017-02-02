import React from 'react'
import { Link } from 'react-router'
import { current, disabled } from '../List.css'

export default function EntryListItem ({item, location}) {
  function getClassIfCurrentlySelected () {
    const pathnames = location.pathname.split('/')
    if (pathnames.indexOf(contentType.sys.id) >= 0 && pathnames.indexOf(item.sys.id) >= 0) {
      return current
    }
    return ''
  }
  const contentType = item.sys.contentType
  let content
  let className = getClassIfCurrentlySelected()

  if (item.fields[contentType.displayField]) {
    content = (
      <Link to={{pathname: `/entries/by-content-type/${contentType.sys.id}/${item.sys.id}`, query: location.query}}>
        {item.fields[contentType.displayField]}
      </Link>
    )
  } else {
    content = (
      <p>No Content</p>
    )
    className = disabled
  }

  return (
    <li className={className}>
      {content}
    </li>
  )
}
