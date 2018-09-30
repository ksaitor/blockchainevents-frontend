import './LandingPage.styl'

import React from 'react'
import ReactGA from 'react-ga'
import pluralize from 'pluralize'
import map from 'lodash/map'
import { get as ENV } from 'react-global-configuration'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Container, Header, Divider, Button, Icon, Input, Step, Popup, Image } from 'semantic-ui-react'
import moment from 'moment'
import Typed from 'react-typed'
import Helmet from 'react-helmet'
ReactGA.initialize(ENV('GA'))

import ogImage from '../../public/images/opengraph-image.png'

const isPast = (timestamp) => {
  if (moment().diff(timestamp) > 0) {
    return 'past'
  } else {
    return ''
  }
}
const Day = ({dayTitle, events}) => (
  <div className='day' key={dayTitle}>
    <h2>{dayTitle}</h2>
    {events.map(e => <EventPreview key={e.id} {...e} />)}
  </div>
)

const EventPreview = ({id, title, shortDescription, url, time, dateTime, city}) => (
  <div className={'EventPreview '+isPast(dateTime)} key={id}>
    <Header as='h3'>
      <a href={url} target='_blank'>
        {moment(time, 'H:mm').isValid() ? moment(time, 'H:mm').format('h:mma') : null} - {title}
      </a>
    </Header>
    <p>{shortDescription}</p>
  </div>
)

@inject('EventsStore')
@inject('User')
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
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }
  typed1ref (ref) { this.typed1 = ref }
  typed2ref (ref) { this.typed2 = ref }

  onComplete () {
    // this.typed2.start()
  }


  changeLocation () {
    const { handleChange, city } = this.props.User
    const loc = prompt(`[This is not working yet] What city you'd like to receive updates for?`)
    handleChange(null, {name: 'city', value: loc})
    this.typed1.reset()
  }

  render() {
    const { handleChange, handleEnterKey, subscribe } = this.props.User
    const { subscribed, city, stats: userStats, _loading, _error } = this.props.User
    const { events, eventsByDay, stats: eventStats } = this.props.EventsStore

    const geo = this.props.GeoLocationStore.geo
    let fullLocationName =  'your city'
    if (city) {
      fullLocationName = city
    } else if (!city && geo && geo.geo1) {
      fullLocationName = `${geo.geo1.city}, ${geo.geo1.country}`
      handleChange(null, {name: 'city', value: fullLocationName})
    }

    return <React.Fragment>
      <Helmet>
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content='Blockchain Events' />
        <meta name="twitter:description" content="Onward Flight Ticket Generator - Travel to your next destination without the need to buy expensive tickets in advance." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
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
            : <React.Fragment>
                <Input size='large' className='subscribe' name='email' placeholder='your@email.com' action onChange={handleChange}>
                  <input ref={(c) => { this.emailInput = c;}} onKeyPress={handleEnterKey} />
                  <Button content='Subscribe' color='green' onClick={subscribe} size='huge' loading={_loading} />
                </Input>
                {userStats && <p className='subscribed-stats'>{userStats.usersQty}+ blockchain enthusiasts subscribed!</p>}
              </React.Fragment>
          }
        </Container>
      </div>
      <div className='Events'>
        <Container text>
          <Header as='h2' content='Events this week' textAlign='center' />
          {map(eventsByDay, (events, dayTitle) => {
            if (dayTitle === 'Invalid date') {
              return null
            } else {
              return <Day {...{dayTitle, events}}/>
            }
          })}
          {events.length ? null :<div>
            No events yet… Why not <Link to='/submit'> add a few events </Link>?
          </div>}
          {eventStats && eventStats.eventsTotalQty && <p className='event-stats'>
            {pluralize('blockchain event', eventStats.eventsTotalQty, true)} 🌎globaly.<br/>
            {pluralize('blockchain event', eventStats.eventsInYourCityQty, true)} 📍in your city.<br/>
            <Link to='/submit'>Submit an event</Link>
          </p>}
        </Container>
      </div>
    </React.Fragment>
  }
}

export default LandingPage;
