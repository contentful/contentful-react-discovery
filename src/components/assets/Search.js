import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Search.css'

function Search ({itemCount, label, onChange}) {
  function _onChangeHandler (e) {
    onChange(e.target.value)
  }
  return <div styleName='search-container'>
    <input type='search' styleName='search' placeholder='Type to search' onChange={_onChangeHandler} />
    <span>{itemCount} {label}</span>
  </div>
}

export default CSSModules(Search, styles)
