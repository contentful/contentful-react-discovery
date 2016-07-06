import React from 'react'
import scour from 'scourjs'
import CSSModules from 'react-css-modules'
import styles from './Field.css'
import Field from './Field'

function Entry ({entry, location}) {
  const contentType = scour(entry.sys.contentType)
  const fields = contentType.go('fields')
  const fieldsWithoutDisplay = fields.filter((field) => {
    return field.get('id') !== contentType.get('displayField')
  })
  const displayField = fields.find({id: contentType.get('displayField')}).value
  const remainingFields = fieldsWithoutDisplay.map((field) => {
    const id = field.get('id')
    return <Field key={id} definition={field.value} content={entry.fields[id]} location={location}/>
  })
  return (
    <div>
      <section styleName='edit-section'>
        <a styleName='edit-link'
          target='_blank'
          href={'https://app.contentful.com/spaces/' +
          location.query.space_id + '/entries/' +
          entry.sys.id}>Edit in Contentful Web App</a>
      </section>
      <Field key={displayField.id} definition={displayField} content={entry.fields[displayField.id]} styleName='field' location={location}/>
      {remainingFields}
    </div>
  )
}

export default CSSModules(Entry, styles)
