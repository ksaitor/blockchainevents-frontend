import omit from 'lodash/omit'
import moment from 'moment'
import { get as ENV } from 'react-global-configuration'
import { post, get } from 'axios'
import { observable, action } from 'mobx'

const API = ENV('apiDomain')

class NewEvent {
  constructor () {
    this.handleError = this.handleError.bind(this)
  }
  @observable title = false
  @observable shortDescription = null
  @observable city = null
  @observable venue = null
  @observable url = null
  @observable createdBy = null
  @observable dateTime = null

  @observable _submitted = false

  @action handleChange = (e, { name, value, checked }) => {
    this[name] = value
  }

  @action newEvent = () => {
    this._submitted = false
  }

  @action submit = () => {
    // this._loading = true
    const data = omit(this, ['_loading', '_submitted', '_error', 'DATE_FORMAT'])
    data.dateTime = moment(data.dateTime).valueOf()
    post(`${API}/event/create`, data)
    .then(res => {
      this._submitted = true
      this._loading = false
    })
    .catch(this.handleError)
  }

  handleError (err) {
    this._loading = false
    this._error = err
    console.error(err)
  }

  @observable _error = false
  @observable _loading = false

  DATE_FORMAT = moment().format('lll')
}

module.exports = new NewEvent()
