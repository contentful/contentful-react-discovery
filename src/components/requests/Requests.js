import React from 'react'
import TwoPanelList, {Placeholder} from '../TwoPanelList'
import RequestListItem from './RequestListItem'

export default class Requests extends React.Component {

  render () {
    const listTitle = <h3>Requests History</h3>
    const placeholder = <Placeholder content='Please select your Request.' />
    return <TwoPanelList
      items={[{items: [], TitleView: listTitle, ListView: RequestListItem}]}
      ContentView={placeholder}
      location={this.props.location}
      />
  }
}
