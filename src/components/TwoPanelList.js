import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './TwoPanelList.css'
import List from './List'

function TwoPanelList ({items, ContentView, location}) {
  const lists = []
  console.log(items)
  items.forEach((topItem, index) => {
    const list = topItem.items.map((innerItem) => <topItem.ListView key={innerItem.sys.id} item={innerItem} location={location}/>)
    lists.push(<List key={index} TitleView={topItem.TitleView} list={list} ListActionView={topItem.ListActionView}/>)
  })
  return (
    <div styleName='two-panel-list'>
      {lists}
      <div styleName='list-item-contents'>{ContentView}</div>
    </div>
  )
}

TwoPanelList.propTypes = {
  items: PropTypes.array.isRequired,
  ContentView: PropTypes.element,
  location: PropTypes.object.isRequired
}

export default CSSModules(TwoPanelList, styles)

export const Placeholder = CSSModules(({content}) => {
  return <div styleName='placeholder'>
    <img src='../../contentful_logo_120x90@2x.png' />
    <p>{content}</p>
  </div>
}, styles)
