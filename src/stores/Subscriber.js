import { observable, action } from 'mobx'
import { Collection, Document } from 'firestorter'

const subscribers = new Collection('eventNewsletterSubscribers');

class Subscriber {
  @observable subscribed = false
  @observable email = null
  @observable city = null

  @action handleChange = (e, { name, value, checked }) => {
    this[name] = value
  }

  @action subscribe = () => {
    let that = this
    this.subscribed = true
    subscribers.add({
      email: this.email,
      city: this.city
    })
    setTimeout(()=>{
      that.subscribed = false
    }, 3000)
  }

  @observable _error = false
  @observable _loading = false
}

module.exports = new Subscriber()
