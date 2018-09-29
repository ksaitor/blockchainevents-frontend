import { get as ENV } from 'react-global-configuration'
import { post, get } from 'axios'
import { observable, action } from 'mobx'

const API = ENV('apiDomain')

class Subscriber {
  constructor () {
    this.fetchStats()
  }

  @observable stats = {}
  @observable subscribed = false
  @observable email = null
  @observable city = null

  @action handleChange = (e, { name, value, checked }) => {
    this[name] = value
  }

  @action handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      this.subscribe()
    }
  }

  @action subscribe = () => {
    let email = this.email
    let that = this
    this._loading = true

    post(`${API}/user/subscribe`, {email})
    .then(res => {
      this.subscribed = true
      this._loading = false
      setTimeout(() => {
        this.subscribed = false
      }, 3000)
    })
    .catch(this.handleError)
  }

  @action fetchStats = () => {
    get(`${API}/user/stats`)
    .then(res => {
      this.stats = res.data
    })
  }

  handleError (err) {
    console.error(err)
    this._error = err
    this._loading = false
  }

  @observable _error = false
  @observable _loading = false
}

module.exports = new Subscriber()
