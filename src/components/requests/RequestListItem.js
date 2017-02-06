import React from 'react'
import { Link } from 'react-router'
import {current} from '../List.css'

export default function RequestListItem ({item, i, location}) {
  function getClassIfCurrentlySelected () {
    const pathnames = location.pathname.split('/')
    if (pathnames.indexOf(`${i}`) >= 0) {
      return current
    }
    return ''
  }

  return (
    <li className={getClassIfCurrentlySelected()}>
      <Link to={{pathname: `/requests/${i}`, query: location.query}}>{`[${item.time}] ${item.path}`}</Link>
    </li>
  )
}
