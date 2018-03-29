import './config';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'


import NewEvent from './components/NewEvent';
import Footer from './components/Footer';


class Router extends React.Component {
  render() {
    return <Router history={browserHistory}>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/submit' component={NewEvent}/>
      </div>
    </Router>
  }
}

export default Router;
