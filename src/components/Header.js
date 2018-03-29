import './Header.styl';

import React from 'react';
import { Container, Divider, Grid } from 'semantic-ui-react'
import { Header as H }  from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <Grid className='Header' columns='equal' divided padded>
        <Container className="WeekView" text>
          <Link to='/'><H as='h1'>ABE</H></Link>
          <Link to='/submit'>Add an Event</Link>
          <Divider horizontal />
        </Container>
      </Grid>
    )
  }
}

export default Header;
