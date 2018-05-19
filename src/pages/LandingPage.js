import { get as ENV } from 'react-global-configuration'
import React from 'react'
import { Container, Grid, Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'

class LandingPage extends React.Component {
  render() {
    return (
      <Container className="WeekView" text>
        <center>
          <Header as='h1'>Blockchain Events Weekly<br/>in Singapore</Header>
        </center>
      </Container>
    );
  }
}

export default LandingPage;
