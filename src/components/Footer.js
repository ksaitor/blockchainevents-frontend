import './Footer.styl';

import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react'

class Footer extends React.Component {
  render() {
    return (
      <Grid className='Footer' columns='equal' divided inverted padded>
        <Grid.Row color='black' textAlign='center'>
          <Grid.Column>
            <Segment color='black' inverted >Blockchain Event &copy; {(new Date()).getFullYear()}</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color='black' inverted></Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color='black' inverted></Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Footer;
