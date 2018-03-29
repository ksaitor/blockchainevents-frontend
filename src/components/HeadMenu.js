import './HeadMenu.styl';

import React from 'react';
import { Container, Divider, Grid, List, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import NewsletterSignup from './NewsletterSignup'

class HeadMenu extends React.Component {
  render() {
    return <Container className="HeadMenu">
      <Divider horizontal />
      <List bulleted horizontal>
        <List.Item><Link to='/submit'>Add an Event</Link></List.Item>
        <List.Item><Link to='/cities'>Other Cities</Link></List.Item>
      </List>
      <NewsletterSignup city='singapore' />
      <Divider horizontal />
    </Container>
  }
}

export default HeadMenu;
