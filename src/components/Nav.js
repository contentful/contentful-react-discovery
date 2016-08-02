import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { getCurrentSpaceName } from '../services/contentfulClient'

export default class Nav extends React.Component {
  render () {
    const q = this.props.location.query
    return (
      <ul>
        <li>
          {getCurrentSpaceName()} [
          <Link to={{pathname: '/', query: q}}> Change
          </Link>]
        </li>
        <li>
          <Link to={{pathname: '/entries', query: q}}> Entries
          </Link>
        </li>
        <li>
          <Link to={{pathname: '/assets', query: q}}> Media Library
          </Link>
        </li>
      </ul>
    )
  }
}

Nav.propTypes = {
  location: PropTypes.object.isRequired
}

Nav.contextTypes = {
  router: PropTypes.object.isRequired
}
