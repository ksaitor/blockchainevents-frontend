import { observable, action } from 'mobx'
import { get } from 'axios'

class GeoLocationStore {
  constructor () {
    this.fetch()
  }

  @observable geo = null

  @action fetch = () => {
    this.loading = true
    get('https://us-central1-cryptojobslist.cloudfunctions.net/geoIP')
    .then(res => {
      this.geo = res.data
      this.loading = false
      this.error = false
    })
    .catch(err => {
      this.loading = false
      this.error = err
    })
  }

  @observable error = false
  @observable loading = false
}

module.exports = new GeoLocationStore()
