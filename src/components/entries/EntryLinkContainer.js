import React, {createClass, PropTypes} from 'react'
import {Link} from 'react-router'
import {findContentType} from '../../services/contentTypeStore'

export default createClass({
  propTypes: {
    entryLink: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      phase: 'loading'
    }
  },

  componentDidMount () {
    findContentType(this.props.entryLink.sys.contentType.sys.id)
    .then((contentType) => {
      this.setState({
        contentType: contentType,
        phase: 'loaded'
      })
    })
  },

  render () {
    if (this.state.phase === 'loading') {
      return <p>Loading Link...</p>
    } else {
      const displayField = this.props.entryLink.fields[this.state.contentType.displayField]
      const entryLinkSys = this.props.entryLink.sys
      return <Link to={{pathname: `/entries/by-content-type/${entryLinkSys.contentType.sys.id}/${entryLinkSys.id}`, query: this.props.location.query}}>
        {displayField || "untitled"}
      </Link>
    }
  }
})
