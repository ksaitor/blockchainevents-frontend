import './LandingPage.styl'

import { get as ENV } from 'react-global-configuration'
import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Divider, Button, Segment, Icon, Input } from 'semantic-ui-react'
import Typed from 'react-typed'

class LandingPage extends React.Component {
  componentDidMount () {
    this.emailInput.focus()
  }

  render() {
    const cityName = 'Singapore' || 'your city'
    const cityTyped = <Typed strings={[`in ${cityName}`]} showCursor={false} typeSpeed={70} />
    return (
      <Container className="LandingPage" text>
        <center>
          <Header as='h1'>🔗 📅📍<br/>Blockchain Events<br/> {cityTyped}</Header>
          <Header as='h2'>
          <Typed className='typed'
            startDelay={1500} typeSpeed={70} backSpeed={10} loop
            strings={[
              `a Weekly Newsletter <i> </i> `,
              `It's <strong>FREE</strong>! <i> </i> `,
              `No spam. Unsubscribe any time.`
            ]}/>
          </Header>

          <Input size='large' className='subscribe' name='email' placeholder='your@email.com' action>
            <input ref={(c) => { this.emailInput = c;}} />
            <Button color='green' type='submit' size='huge'>Subscribe me</Button>
          </Input>

        </center>

      </Container>
    );
  }
}

export default LandingPage;
