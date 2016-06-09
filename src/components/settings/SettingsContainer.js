import React, {PropTypes} from 'react'
import SettingsForm from './SettingsForm'
import {resetClient} from '../../services/contentfulClient'
import isPreviewSetInQuery from '../../utils/is-preview-set-in-query'
import ApiStore from '../../stores/ApiStore'

export default class SettingsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleApiSelectionChange = this.handleApiSelectionChange.bind(this)
    let q = this.props.location.query
    this.state = {
      space: q.space_id || '',
      deliveryAccessToken: q.delivery_access_token || '',
      previewAccessToken: q.preview_access_token || '',
      selectedApi: isPreviewSetInQuery(q) ? 'preview' : 'delivery',
      validationError: null
    }
  }
  componentWillMount () {
    ApiStore.addListener('API_SELECTION_CHANGE', this.handleApiSelectionChange)
  }

  componentWillUnmount () {
    ApiStore.removeListener('API_SELECTION_CHANGE', this.handleApiSelectionChange)
  }

  loadSpace (event) {
    event.preventDefault()
    if (!this.state.space) {
      return this.showError('You need to provide a Space ID')
    } else if (this.previewSelected() && !this.state.previewAccessToken) {
      return this.showError('You need to provide a Preview API Access Token if you want to use the Preview API')
    } else if (!this.previewSelected() && !this.state.deliveryAccessToken) {
      return this.showError('You need to provide a Delivery API Access Token if you want to use the Delivery API')
    }
    resetClient()
    const query = {
      preview_access_token: this.state.previewAccessToken,
      delivery_access_token: this.state.deliveryAccessToken,
      preview: ApiStore.get('isPreview'),
      space_id: this.state.space
    }
    if (this.previewSelected()) {
      query.preview = true
    }
    this.context.router.push({
      pathname: '/entries/by-content-type',
      query: query
    })
  }

  handleApiSelectionChange (event) {
    this.setState({
      selectedApi: ApiStore.get('isPreview') ? 'preview' : 'production',
      validationError: null
    })
  }

  handleChange (event) {
    switch (event.target.id) {
      case 'space':
        this.setState({ space: event.target.value })
        break
      case 'selectedAccessToken':
        this.handleAccessTokenChange(event.target.value)
        break
    }
  }

  showError (message) {
    this.setState({ validationError: message })
  }

  handleAccessTokenChange (accessToken) {
    if (this.previewSelected()) {
      this.setState({
        previewAccessToken: accessToken,
        validationError: null
      })
    } else {
      this.setState({
        deliveryAccessToken: accessToken,
        validationError: null
      })
    }
  }

  previewSelected () {
    return ApiStore.get('isPreview')
  }

  render () {
    return <SettingsForm
      space={this.state.space}
      selectedAccessToken={this.previewSelected() ? this.state.previewAccessToken : this.state.deliveryAccessToken}
      deliveryAccessToken={this.state.deliveryAccessToken}
      previewAccessToken={this.state.previewAccessToken}
      selectedApi={this.state.selectedApi}
      handleChange={this.handleChange}
      loadSpace={this.loadSpace.bind(this)}
      validationError={this.state.validationError}
      />
  }
}
SettingsContainer.contextTypes = {
  router: PropTypes.object.isRequired
}
