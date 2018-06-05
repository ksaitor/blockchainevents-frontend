import './LandingPage.styl'

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Container, Header, Divider, Button, Icon, Input, Step } from 'semantic-ui-react'
import Typed from 'react-typed'

const EventPreview = ({id, city, title}) => (
  <div className='EventPreview' key={id}>
    <p>{title}</p>
  </div>
);

@inject('Events')
@inject('Subscriber')
@inject('GeoLocationStore')
@observer
class LandingPage extends React.Component {
  componentDidMount () {
    if (this.emailInput) {
      this.emailInput.focus()
    }
  }

  onComplete () {
    // this.typed2.start()
  }
  typed2ref (ref) { this.typed2 = ref }

  _handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.props.Subscriber.subscribe()
    }
  }

  render() {
    const { handleChange, subscribed, subscribe, city } = this.props.Subscriber
    const events = this.props.Events.docs
    const geo = this.props.GeoLocationStore.geo
    const cityName = geo ? geo.geo1.city : 'your city'
    const coutryName = geo ? geo.geo1.country : ''
    const fullLocationName = `${cityName}, ${coutryName}`
    handleChange(null, {name: 'city', value: cityName})
    return [
      <div className="LandingPage">
        <Container text textAlign='center'>
          <Header as='h1'>
            🔗 📅📍<br/>Blockchain Events<br/>
            <Typed strings={[`in ${cityName}`, `in ${fullLocationName}`]} showCursor={false} typeSpeed={70} onComplete={this.onComplete.bind(this)} />
          </Header>
          <Header as='h2'>
          <Typed className='typed'
            key={Math.random()}
             showCursor={false}
            typedRef={this.typed2ref.bind(this)}
            startDelay={3000} typeSpeed={70} backSpeed={10} loop
            fadeOut={true}
            strings={[
              `a Weekly Newsletter <i>🎉</i> `,
              `It's <strong>FREE.</strong> <i> </i> `,
              `No spam. Guaranteed.`
            ]}/>
          </Header>

          {subscribed
            ? <Step.Group ordered size='large'>
                <Step completed>
                  <Step.Content>
                    <Step.Title>Subscribed</Step.Title>
                    <Step.Description>Check your email please</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
            : <Input size='large' className='subscribe' name='email' placeholder='your@email.com' action onChange={handleChange}>
                <input ref={(c) => { this.emailInput = c;}} onKeyPress={this._handleKeyPress.bind(this)} />
                <Button content='Subscribe me' color='green' onClick={subscribe} size='huge'/>
              </Input>
          }
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
