import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './Field.css'
import formatDate from '../../utils/format-date'
import Thumbnail from '../assets/Thumbnail'
import EntryLinkContainer from './EntryLinkContainer'
import marked from 'marked'

function Field ({definition, content, location}) {
  return (
    <div styleName='field'>
      <h2>{definition.name}</h2>
      {renderContent(content, definition, location)}
    </div>
  )
}

/**
 * Determines how to render content for the different kinds of fields
 * https://www.contentful.com/developers/docs/references/content-management-api/#/reference/content-types
 */
function renderContent (content, definition, location) {
  const {type, linkType} = definition
  if (typeof content === 'undefined' || content === null) {
    return <p>No content</p>
  } else if (type === 'Link' && linkType === 'Entry' && content.sys.type === 'Entry') {
    return renderEntryLink(content, location)
  } else if (type === 'Link' && linkType === 'Asset' && content.sys.type === 'Asset') {
    return renderAssetLink(content, location)
  } else if (type === 'Link' && linkType === 'Entry' && content.sys.type === 'Link') {
    return <p>Link to {content.sys.id} is missing.</p>
  } else if (type === 'Link' && linkType === 'Asset' && content.sys.type === 'Link') {
    return <Thumbnail url='missing' fileName='Missing' description={`Link to ${content.sys.id} is missing.`} />
  } else if (type === 'Array' && Array.isArray(content)) {
    return renderList(content, definition.items, location)
  } else if (type === 'Location' && isLocation(content)) {
    return renderLocation(content)
  } else if (type === 'Date') {
    return <p>{formatDate(content)}</p>
  } else if (type === 'Object') {
    return renderObject(content)
  } else if (type === 'Boolean') {
    return renderBoolean(content)
  } else if (type === 'Text') {
    return <p dangerouslySetInnerHTML={renderMarkdown(content)} />
  } else if (content.sys || content.fields) {
    return <div>
      <p>Error rendering field {definition.id} with content:</p>
      {renderObject(content)}
    </div>
  } else {
    return <p>{content}</p>
  }
}

function renderMarkdown (content) {
  return {
    __html: marked(removeIvalidDataURL(content), {sanitize: true})
  }
}
function removeIvalidDataURL (content) {
  let regex = /data:\S+;base64\S*/gm 
  return content.replace(regex, '#')
}
function renderEntryLink (content, location) {
  return <EntryLinkContainer entryLink={content} location={location} />
}

function renderAssetLink (content, location) {
  return <Link styleName='image-link' to={{pathname: `/assets/${content.sys.id}`, query: location.query}}>
    <Thumbnail url={content.fields.file.url} fileName={content.fields.file.fileName} />
  </Link>
}

function renderList (list, definition, location) {
  const listStyle = determineListStyle(definition)
  const items = list.map((item, idx) => {
    return <div styleName={`${listStyle}-item`} key={idx}>
      {renderContent(item, definition, location)}
    </div>
  })
  return <div styleName={`${listStyle}-list`}>{items}</div>
}

function determineListStyle (definition) {
  if (definition.type === 'Link') {
    if (definition.linkType === 'Entry') {
      return 'entries'
    } else if (definition.linkType === 'Asset') {
      return 'asset'
    }
  } else if (definition.type === 'Symbol') {
    return 'symbol'
  }
}

function renderLocation (content) {
  return (
    <div>
      <p>Latitude: {content.lat}</p>
      <p>Longitude: {content.lon}</p>
    </div>
  )
}

function renderObject (content) {
  const stringified = content.stringifySafe ? content.stringifySafe(null, '  ') : JSON.stringify(content, null, '  ')
  return <pre><code>{stringified}</code></pre>
}

function renderBoolean (content) {
  return content ? 'Yes' : 'No'
}

function isLocation (obj) {
  return obj && obj.lat && obj.lon
}

export default CSSModules(Field, styles)
