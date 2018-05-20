import 'semantic-ui-css/semantic.min.css'
import '../styles/index.styl'
import './config'

window.log = console.log
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'mobx-react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore as syncHistory} from 'mobx-react-router'

import LandingPage from './pages/LandingPage'
import WeekView from './components/WeekView'
import EventView from './components/EventView'
import NewEvent from './components/NewEvent'

import Crisp from './components/Crisp.Chat'
import Head from './components/Head'
import Footer from './components/Footer'

import stores from './stores'
const history = syncHistory(createBrowserHistory(), stores.routingStore)

stores.GeoLocationStore.fetch()

ReactDOM.render((
  <Provider {...stores}>
    <Router key={Math.random()} history={history}>
      <div>
        <Head />
        <Route path='/' exact component={LandingPage} />
        <Route path='/events/:city' component={WeekView} />
        <Route path='/:seoSlug-event' component={EventView} />
        <Route path='/submit' component={NewEvent}/>
        <Footer />
      </div>
    </Router>
  </Provider>
), document.getElementById('app'));
