import './LandingPage.styl'

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Container, Header, Divider, Button, Icon, Input, Step, Popup } from 'semantic-ui-react'
import moment from 'moment'
import Typed from 'react-typed'

const EventPreview = ({id, title, description, url, time, when, formattedCity}) => (
  <div className='EventPreview' key={id}>
    <Header as='h3'>
      <a href={url} target='_blank'>
        {moment(time, 'Hmm').isValid() ? moment(time, 'Hmm').format('h:mma') : null} - {title}
      </a>
    </Header>
    <p>
      {description}
      <br/>
      {moment(when).format('dddd, Do MMMM')} - {formattedCity}
    </p>

  </div>
);

@inject('Events')
@inject('Subscriber')
@inject('GeoLocationStore')
@observer
class LandingPage extends React.Component {
  constructor (props) {
    super()
    props.GeoLocationStore.fetch()
  }
  componentDidMount () {
    if (this.emailInput) {
      this.emailInput.focus()
    }
    this.props.Events.query = (ref) => {
      const cityFilter = false
      let newRef = ref.orderBy('when', 'asc')
        .startAt(moment().startOf('week').toDate())
        .endAt(moment().endOf('week').toDate())

      if (cityFilter) {
        newRef = newRef.where('formattedCity', '==', cityFilter)
      }

      return newRef
    }
  }
  typed1ref (ref) { this.typed1 = ref }
  typed2ref (ref) { this.typed2 = ref }

  onComplete () {
    // this.typed2.start()
  }


  _handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.props.Subscriber.subscribe()
    }
  }

  changeLocation () {
    const { handleChange, city } = this.props.Subscriber
    const loc = prompt(`What city you'd like to receive updates for?`)
    handleChange(null, {name: 'city', value: loc})
    this.typed1.reset()
  }

  render() {
    const { handleChange, subscribed, subscribe, city } = this.props.Subscriber
    const events = this.props.Events.docs

    const geo = this.props.GeoLocationStore.geo
    let fullLocationName =  'your city'
    if (city) {
      fullLocationName = city
    } else if (!city && geo && geo.geo1) {
      fullLocationName = `${geo.geo1.city}, ${geo.geo1.country}`
      handleChange(null, {name: 'city', value: fullLocationName})
    }

    return [
      <div className="LandingPage">
        <Container text>
          <Header as='h1'>
            🔗 📅📍<br/>Blockchain Events in<br/>
            <Popup trigger={<span className='cityName' onClick={this.changeLocation.bind(this)}>
              <Typed
                typedRef={this.typed1ref.bind(this)}
                strings={[fullLocationName, fullLocationName, fullLocationName]}
                showCursor={false} typeSpeed={70}
                onComplete={this.onComplete.bind(this)} />
            </span>}
            content='Change the city'
            position='bottom center'
            size='tiny'
            inverted />
          </Header>

          <Header as='h2'>
            <Typed className='typed'
              key={Math.random()}
              showCursor={false}
              typedRef={this.typed2ref.bind(this)}
              startDelay={3000} typeSpeed={70} backSpeed={10} loop
              fadeOut={true}
              strings={[
                `a Weekly Newsletter 📨 `,
                `It's 🤑 <strong>FREE</strong>`,
                `No spam 👍 Guaranteed`
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
                <Button content='Subscribe' color='green' onClick={subscribe} size='huge'/>
              </Input>
          }
        </Container>
      </div>,
      <div className='Events'>
        <Container text>
          <Header as='h2' content='This week:' />
          {events.map(e => <EventPreview key={e.id} {...e.data} />)}
        </Container>
      </div>
    ]
  }
}

export default LandingPage;
