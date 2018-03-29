import './Footer.styl';

import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react'

class Footer extends React.Component {
  render() {
    return (
      <Container className='Footer' text>
        <Grid columns='equal' divided padded>
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <Segment>Blockchain Event &copy; {(new Date()).getFullYear()}</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Footer;
