import './NewEvent.styl'

import { get as ENV } from 'react-global-configuration'
import React from 'react'
import ReactGA from 'react-ga'
import moment from 'moment'
import { post } from 'axios'
import { observer, inject } from 'mobx-react'
import { Container, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'
import { Form, Radio } from 'formsy-semantic-ui-react'
import MaskedInput from 'react-text-mask'

const API = ENV('apiDomain')
ReactGA.initialize(ENV('GA'))
const errorLabel = <Label color="red" pointing/>

@inject('NewEventStore')
@inject('GeoLocationStore')
@observer
class NewEvent extends React.Component {

  componentDidMount () {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    const { handleChange, submit, newEvent } = this.props.NewEventStore
    const { dateTime, _loading, _error, _submitted, DATE_FORMAT } = this.props.NewEventStore
    const formState = { loading: _loading, error: _error }
    const geo = this.props.GeoLocationStore.geo
    let cityPlaceholder = ''
    if (geo) {
      const { city, regionName, country } = geo.geo1
      cityPlaceholder = `${city}, ${regionName || ''}, ${country}`
    }
    return (
      <Container className="NewEvent" text>
        {_submitted ?
          <div>
            <Header as='h1' textAlign='center'>Please check your email!</Header>
            <Header as='h3' textAlign='center'>Your event was submitted.</Header>
            <Divider horizontal />
            <Divider horizontal />
            <Image src="https://reactiongifs.me/wp-content/uploads/2013/10/i-wingman-successfully-leonardo-dicaprio.gif" centered rounded size='massive' />
            <Divider horizontal />
            <center>
              <Button as={Link} to='/' content={<span>
                <Icon name="arrow left" /> Home
              </span>} size='huge' />
              <Button content={<span>
                Submit another Event <Icon name="arrow right" />
              </span>} size='huge' color='green' onClick={newEvent} />
            </center>
          </div>
        :
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>New Blockchain Event <Label content="FREE" color='green' size='mini' /></Header>
          <Divider horizontal />
          <Form.Input name='title' label='Title' placeholder='e.g. Awesome Blockchain Event' validations="minLength:3,maxLength:160" required onChange={handleChange} />
          <Form.Input
              name='shortDescription' label='Short Description' placeholder='In 2-3 sentances, describe what this event is about …'
              validations="maxLength:510"
              validationErrors={{ maxLength: 'Up to 500 characters, please…' }}
              required
              errorLabel={errorLabel}
              onChange={handleChange} />
          <Form.Group>
            <Form.TextArea
              name='venue' label='Venue' placeholder='Be specific, where exactly the event is …' rows='3'
              validations="minLength:10"
              validationErrors={{ minLength: 'Be more specific, please…' }}
              required
              errorLabel={errorLabel}
              onChange={handleChange} />
            <Form.Input name='city' label='City' placeholder='New York' validations="minLength:3" required onChange={handleChange} value={cityPlaceholder} disabled />
          </Form.Group>
          <Form.Group>
            <Form.Input name='dateTime' label='Date and Time' placeholder={DATE_FORMAT} required onChange={handleChange}/>
            <Form.Input name='dateTime' label='Does this look right?' disabled value={moment(dateTime).format('LLLL')} />
          </Form.Group>
          <Form.Group className='hide'>
            <Form.Input name='time' label='Start Time' placeholder='14:00' required onChange={handleChange} />
            <Form.Input name='date' label='Date' placeholder='DD/MM/2018'  required onChange={handleChange} />
          </Form.Group>
          <Form.Input name='url' label='Event URL' placeholder='e.g. https://meetup.com/event/...' validations="isUrl" onChange={handleChange} />

          <Divider horizontal />

          {/*<Form.Field>
            <Form.Radio name='eventCategory' label='Meetup' value='meetup' checked={eventCategory === 'meetup'} onChange={handleChange} />
            <Form.Radio name='eventCategory' label='Conference' value='conference' checked={eventCategory === 'conference'} onChange={handleChange} />
            <Form.Radio name='eventCategory' label='Event' value='event' checked={eventCategory === 'event'} onChange={handleChange} />
          </Form.Field>*/}


          <Divider horizontal />
          <Form.Input name='createdBy' label='Your email' placeholder='your@email.com' type='email'
            validations="isEmail"
            validationErrors={{ isEmail: 'Email is not valid' }}
            required
            errorLabel={errorLabel} onChange={handleChange} validations="isEmail" />

          <Divider horizontal />
          <Message error header='Something went wrong' content='Please check all fields and ensure they are filled!' />
          <Button content='Submit' size='huge' color='green' onClick={submit} />
        </Form>
        }

      </Container>
    );
  }
}

export default NewEvent;
