import './LandingPage.styl'

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Container, Header, Divider, Button, Segment, Icon, Input } from 'semantic-ui-react'
import Typed from 'react-typed'

const EventPreview = ({id, city, title}) => (
  <div className='EventPreview' key={id}>
    <p>{title}</p>
  </div>
);

@inject('Events')
@inject('GeoLocationStore')
@observer
class LandingPage extends React.Component {
  componentDidMount () {
    this.emailInput.focus()
  }

  onComplete () { this.typed2.start() }
  typed2ref (ref) { this.typed2 = ref }

  render() {
    const events = this.props.Events.docs
    const geo = this.props.GeoLocationStore.geo
    const cityName = geo ? geo.geo1.city : 'your city'
    return [
      <div className="LandingPage">
        <Container text textAlign='center'>
          <Header as='h1'>
            🔗 📅📍<br/>Blockchain Events<br/>
            <Typed strings={[`in ${cityName}!`, `in ${cityName}`]} showCursor={false} typeSpeed={70} onComplete={this.onComplete.bind(this)} />
          </Header>
          <Header as='h2'>
          <Typed className='typed'
            stopped
            typedRef={this.typed2ref.bind(this)}
            startDelay={3000} typeSpeed={70} backSpeed={10} loop
            fadeOut={true}
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
        </Container>
      </div>,
      <div className='Events'>
        <Container text>
          {false && events.map(e => <EventPreview key={e.id} {...e.data} />)}
        </Container>
      </div>
    ]
  }
}

export default LandingPage;
