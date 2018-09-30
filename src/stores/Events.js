import omit from 'lodash/omit'
import { get as ENV } from 'react-global-configuration'
import { post, get } from 'axios'
import { observable, action } from 'mobx'

const API = ENV('apiDomain')

class Events {
  constructor () {
    this.fetchThisWeek()
    this.fetchStats()
  }

  @observable stats = {}
  @observable events = []

  @action fetchThisWeek = () => {
    this._loading = true
    // get(`${API}/event/thisWeek`)
    get(`https://api.blockchainevent.co/event/thisWeek`)
    .then(res => {
      console.log(res)
      this.events = res.data
      this._loading = false
    })
    .catch(this.handleError)
  }

  @action fetchOne = (urlSlug) => {
    this._loading = true
    get(`${API}/event`, {urlSlug})
    .then(res => {
      console.log(res)
      this.event = res.data
      this._loading = false
    })
    .catch(this.handleError)
  }

  @action fetchStats = () => {
    get(`${API}/event/stats`)
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

module.exports = new Events()
