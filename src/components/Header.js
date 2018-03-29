import './Header.styl';

import React from 'react';
import { Container, Divider, Grid } from 'semantic-ui-react'
import { Header as H1 }  from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <Grid className='Header' columns='equal' divided padded>
        <Container className="WeekView" text>
          <Link to='/'>
            <H1 as='h1'>ABE</H1>
          </Link>
          <p>All Blockchain Events in one place</p>
          <Link to='/submit'>Submit</Link>
          <Divider horizontal />
        </Container>
      </Grid>
    )
  }
}

export default Header;
