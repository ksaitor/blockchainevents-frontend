import omit from 'lodash/omit'
import groupBy from 'lodash/groupBy'
import { get as ENV } from 'react-global-configuration'
import { post, get } from 'axios'
import { observable, action, computed } from 'mobx'
import moment from 'moment'

const API = ENV('apiDomain')

class Events {
  constructor () {
    this.fetchThisWeek()
    this.fetchAllEvents()
    this.fetchStats()
  }

  @observable stats = {}
  @observable events = []
  @observable allEvents = []

  @action fetchThisWeek = () => {
    this._loading = true
    get(`${API}/event/thisWeek`)
    // get(`https://api.blockchainevent.co/event/thisWeek`)
    .then(res => {
      this.events = res.data.events
      this._loading = false
    })
    .catch(this.handleError)
  }

  @action fetchAllEvents = () => {
    get(`https://api.blockchainevent.co/event`)
    .then(res => {
      this.allEvents = res.data
    })
  }

  @action fetchOne = (urlSlug) => {
    this._loading = true
    get(`${API}/event`, {urlSlug})
    .then(res => {
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

  @computed get eventsByDay () {
    return groupBy(this.events, e => {
      return moment(e.dateTime).format('dddd - MMMM, Do')
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
