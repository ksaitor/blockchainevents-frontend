import './LandingPage.styl'

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Container, Header, Divider, Button, Icon, Input, Step, Popup, Image } from 'semantic-ui-react'
import moment from 'moment'
import Typed from 'react-typed'
import Helmet from 'react-helmet'

import ogImage from '../../public/images/opengraph-image.png'

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
  }
  typed1ref (ref) { this.typed1 = ref }
  typed2ref (ref) { this.typed2 = ref }

  onComplete () {
    // this.typed2.start()
  }


  changeLocation () {
    const { handleChange, city } = this.props.Subscriber
    const loc = prompt(`What city you'd like to receive updates for?`)
    handleChange(null, {name: 'city', value: loc})
    this.typed1.reset()
  }

  render() {
    const { handleChange, handleEnterKey, subscribe } = this.props.Subscriber
    const { subscribed, city, _loading, _error } = this.props.Subscriber
    const events = this.props.Events.docs

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
            : <Input size='large' className='subscribe' name='email' placeholder='your@email.com' action onChange={handleChange}>
                <input ref={(c) => { this.emailInput = c;}} onKeyPress={handleEnterKey} />
                <Button content='Subscribe' color='green' onClick={subscribe} size='huge' loading={_loading} />
              </Input>
          }
        </Container>
      </div>
      <div className='Events'>
        <Container text textAlign='center'>
          <Header as='h2' content='🚧 Under construction 🚧' textAlign='center'/>
          If you really like the idea & want it to exist — please sign up and spread the word!<br/>
          Your support will inpire me to launch this faster. 😘
          <br/><br/>
          <Image src='https://media1.tenor.com/images/fce2523cef65546c2bbe9788a181bfa8/tenor.gif?itemid=5475353' rounded centered/>
        </Container>
        <Container text>
          <Header as='h2' content='Events this week:' />
          {events.map(e => <EventPreview key={e.id} {...e.data} />)}
          {events.length ? null :<div>
            No events yet… Why not <Link className='hide' to='https://cryptojobslist.typeform.com/to/klhneI' target='_blank'>
              add a few events
            </Link>?
          </div>}
        </Container>
      </div>
    </React.Fragment>
  }
}

export default LandingPage;
