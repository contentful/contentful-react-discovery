import React from 'react'
import scour from 'scourjs'
import CSSModules from 'react-css-modules'
import styles from './Field.css'
import Field from './Field'

function Entry ({entry, location}) {
  const contentType = scour(entry.sys.contentType)
  const displayFieldId = contentType.get('displayField')
  const fieldsData = contentType.go('fields')
  const fieldsWithoutDisplay = fieldsData.filter((field) => {
    return field.get('id') !== displayFieldId
  })
  const fields = []

  if (displayFieldId) {
    const displayField = fieldsData.find({id: contentType.get('displayField')}).value

    fields.push(
      <Field key={displayFieldId} definition={displayField} content={entry.fields[displayFieldId]} styleName='field' location={location} />
    )
  }

  fieldsWithoutDisplay.forEach((field) => {
    const id = field.get('id')
    fields.push(
      <Field key={id} definition={field.value} content={entry.fields[id]} location={location} />
    )
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
      {fields}
    </div>
  )
}

export default CSSModules(Entry, styles)
