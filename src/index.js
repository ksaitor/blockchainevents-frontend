import 'semantic-ui-css/semantic.min.css';
import '../styles/index.styl';
import './config';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'
import { get as ENV } from 'react-global-configuration';

import WeekView from './components/WeekView';
import NewEvent from './components/NewEvent';
import Crisp from './components/Crisp.Chat';
import Header from './components/Header';
import Footer from './components/Footer';

if (ENV('crispChat')) {
  Crisp(ENV('crispChat'))
}


ReactDOM.render((
  <Router history={browserHistory}>
    <div>
      <Header />
      <Route exact path='/' component={WeekView} />
      <Route path='/submit' component={NewEvent}/>
      <Route path='/new-event' component={NewEvent}/>
      <Footer />
    </div>
  </Router>
), document.getElementById('app'));
