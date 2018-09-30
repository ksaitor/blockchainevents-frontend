import { get as ENV } from 'react-global-configuration'
import { RouterStore } from 'mobx-react-router'

export default {
  GeoLocationStore: require('./GeoLocationStore'),
  User: require('./User'),
  NewEventStore: require('./NewEvent'),
  EventsStore: require('./Events'),
  routingStore: new RouterStore()
}
