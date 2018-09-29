import omit from 'lodash/omit'
import { get as ENV } from 'react-global-configuration'
import { post, get } from 'axios'
import { observable, action } from 'mobx'

const API = ENV('apiDomain')

class NewEvent {
  @observable title = false
  @observable shortDescription = null
  @observable city = null
  @observable venue = null
  @observable url = null
  @observable createdBy = null

  @observable _submitted = false

  @action handleChange = (e, { name, value, checked }) => {
    this[name] = value
  }

  @action submit = () => {
    this._loading = true
    const data = omit(this, ['_loading', '_submitted', '_error', 'DATE_FORMAT'])
    post(`${API}/event/create`, data)
    .then(res => {
      alert('your was successfully submited!')
      this._submitted = true
      this._loading = false
    })
    .catch(this.handleError)
  }

  handleError (err) {
    console.error(err)
    this._error = err
    this._loading = false
  }

  @observable _error = false
  @observable _loading = false

  DATE_FORMAT = 'HH:mm DD/MM/YYYY'
}

module.exports = new NewEvent()
