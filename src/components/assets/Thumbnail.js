import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Thumbnail.css'

function Thumbnail ({url, fileName, description, width = 70, height = 70}) {
  if (/^\/\/images\./.test(url)) {
    return <img
      src={`${url}?w=${width}&h=${height}&fit=thumb`}
      alt={fileName}
      title={fileName}
      width={width}
      height={height} />
  } else if (fileName) {
    const style = {
      width: width + 'px',
      height: height + 'px'
    }
    return <div styleName='file-icon' title={description || fileName} style={style}>
      {fileName}
    </div>
  }
  return ''
}

export default CSSModules(Thumbnail, styles)
