import { observable, action } from 'mobx'
import { get } from 'axios'

class GeoLocationStore {
  @observable error = false
  @observable loading = false
  @observable geo = null

  @action fetch = () => {
    this.loading = true
    get('https://us-central1-cryptojobslist.cloudfunctions.net/geoIP')
    .then(res => {
      console.log(res.data)
      this.geo = res.data

      this.loading = false
      this.error = false
    })
    .catch(err => {
      this.loading = false
      this.error = err
    })
  }
}

export default new GeoLocationStore()
