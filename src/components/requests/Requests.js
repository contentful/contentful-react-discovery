import React from 'react'
import TwoPanelList, {Placeholder} from '../TwoPanelList'
import RequestListItem from './RequestListItem'
import Request from './Request'

export default class Requests extends React.Component {

  render () {
    const listTitle = <h3>Requests History</h3>
    let content = <Placeholder content='Please select your Request.' />
    const {requestId} = this.props.params
    const {requests} = this.props
    const request = (requestId && requestId <= requests.length - 1) ? requests[requestId] : undefined

    if (request) {
      content = <Request request={request} location={this.props.location} />
    }
    return <TwoPanelList
      items={[{items: this.props.requests, TitleView: listTitle, ListView: RequestListItem}]}
      ContentView={content}
      location={this.props.location}
      />
  }
}
