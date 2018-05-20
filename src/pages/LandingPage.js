import './LandingPage.styl'
import { get as ENV } from 'react-global-configuration'
import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Divider, Button, Segment, Icon, Input } from 'semantic-ui-react'

class LandingPage extends React.Component {
  componentDidMount () {
    this.emailInput.focus()
  }

  render() {
    return (
      <Container className="LandingPage" text>
        <center>
          <Header as='h1'>🔗 📅📍<br/>Blockchain Events<br/>in Singapore</Header>
          <Header as='h2'>a Weekly Newsletter</Header>

          <Input size='large' className='subscribe' name='email' placeholder='your@email.com' action>
            <input ref={(c) => { this.emailInput = c;}} />
            <Button color='green' type='submit' size='huge'>Subscribe me!</Button>
          </Input>

        </center>

        <Divider />
        <center>
          <Button color='blue' content='Post an Event' as={Link} to='https://cryptojobslist.typeform.com/to/klhneI' target='_blank' />
        </center>
      </Container>
    );
  }
}

export default LandingPage;
