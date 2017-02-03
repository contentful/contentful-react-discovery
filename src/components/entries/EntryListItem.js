import React from 'react'
import { Link } from 'react-router'
import { current } from '../List.css'

export default function EntryListItem ({item, location}) {
  const contentType = item.sys.contentType
  function getClassIfCurrentlySelected () {
    const pathnames = location.pathname.split('/')
    if (pathnames.indexOf(contentType.sys.id) >= 0 && pathnames.indexOf(item.sys.id) >= 0) {
      return current
    }
    return ''
  }
  return (
    <li className={getClassIfCurrentlySelected()}>
      <Link to={{pathname: `/entries/by-content-type/${contentType.sys.id}/${item.sys.id}`, query: location.query}}>
        {item.fields[contentType.displayField] || 'Untitled'}
      </Link>
    </li>
  )
}
