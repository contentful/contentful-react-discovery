import React, {createClass, PropTypes} from 'react'
import {Link} from 'react-router'
import {findContentType} from '../../services/contentTypeStore'
import LoadingIndicator from '../LoadingIndicator'

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
      return <LoadingIndicator text='Loading your Link...' />
    } else {
      const displayField = this.props.entryLink.fields[this.state.contentType.displayField]
      const entryLinkSys = this.props.entryLink.sys
      return <Link to={{pathname: `/entries/by-content-type/${entryLinkSys.contentType.sys.id}/${entryLinkSys.id}`, query: this.props.location.query}}>
        {displayField || "untitled"}
      </Link>
    }
  }
})
