import 'semantic-ui-css/semantic.min.css';
import '../styles/index.styl';
import './config';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'
import { get as ENV } from 'react-global-configuration';

import WeekView from './components/WeekView';
import EventView from './components/EventView';
import NewEvent from './components/NewEvent';
import Crisp from './components/Crisp.Chat';
import Head from './components/Head';
import Footer from './components/Footer';

// if (ENV('crispChat')) {
//   Crisp(ENV('crispChat'))
// }


ReactDOM.render((
  <Router history={browserHistory}>
    <div>
      <Route path='/' exact component={WeekView} />
      <Route path='/events/:city' component={WeekView} />
      <Route path='/:seoSlug-event' component={EventView} />
      <Route path='/submit' component={NewEvent}/>
      <Footer />
    </div>
  </Router>
), document.getElementById('app'));
