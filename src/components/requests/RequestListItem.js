import React from 'react'
import { Link } from 'react-router'
// import {current} from '../List.css'
export default function RequestListItem ({item, i, location}) {
  function getClassIfCurrentlySelected () {
    return ''
  }
  return (
    <li className={getClassIfCurrentlySelected()}>
      <Link to={{pathname: `/requests/${i}`, query: location.query}}>{item.path}</Link>
    </li>
  )
}
