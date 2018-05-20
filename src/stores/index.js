import { get as ENV } from 'react-global-configuration'
import { RouterStore } from 'mobx-react-router'

import firebase from 'firebase/app'
import 'firebase/firestore'
import { initFirestorter, Collection, Document } from 'firestorter'
if (!firebase.apps.length) {
  firebase.initializeApp(ENV('firebase'));
  initFirestorter({firebase});
}

export default {
  GeoLocationStore: require('./GeoLocationStore'),
  Events: new Collection('events'),
  Subscriber: require('./Subscriber'),
  routingStore: new RouterStore()
}
