import './NewEvent.styl';

import _ from 'lodash';
import { get as ENV } from 'react-global-configuration';
import React from 'react';
import { post } from 'axios';
import { observer, inject } from 'mobx-react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'
import { Form, Radio } from 'formsy-semantic-ui-react'

const API = ENV('apiDomain')
const errorLabel = <Label color="red" pointing/>

@inject('NewEventStore')
@inject('GeoLocationStore')
@observer
class NewEvent extends React.Component {
  // @observable title = ''

  constructor(props){
    super(props);
    document.title = 'New Event';
    this.state = {
      loading: false,
      error: false,
      submitted: false,
      eventType: 'event'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () { }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit () {
    this.setState({loading: true})
    const data = _.omit(this.state, ['submitted', 'loading', 'error'])
    post(`${API}/event/create`, data)
    .then(res => {
      this.setState({loading: false, error: false, submitted: true})
    })
    .catch(err => {
      this.setState({loading: false, error: true})
    })
  }

  render() {
    const { handleChange, submit } = this.props.NewEventStore
    const {loading, error, companyLogo, bossPicture, supportMethod, eventType} = this.state
    const formState = {loading, error}
    return (
      <Container className="NewEvent" text>
        {this.state.submitted ?
          <div>
            <Header as='h1' textAlign='center'>Please check your email!</Header>
            <Header as='h3' textAlign='center'>Your event was submitted.</Header>
            <Divider horizontal />
            <Divider horizontal />
            <Image src="https://reactiongifs.me/wp-content/uploads/2013/10/i-wingman-successfully-leonardo-dicaprio.gif" centered rounded size='massive' />
            <Divider horizontal />
            <center>
              <Button content={<span>
                Submit another Event <Icon name="arrow right" />
              </span>} size='huge' color='green' href='/' />
            </center>
          </div>
        :
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>New Blockchain Event <Label content="FREE" color='green' size='mini' /></Header>
          <Divider horizontal />
          <Form.Input name='title' label='Title' placeholder='e.g. Awesome Blockchain Event' validations="minLength:3,maxLength:60" required onChange={handleChange} />
          <Form.TextArea
              name='shortDescription' label='Short Description' placeholder='In 2-3 sentances, describe this event about?' rows='3'
              validations="maxLength:510"
              validationErrors={{ maxLength: 'Up to 500 characters, please…' }}
              required
              errorLabel={errorLabel}
              onChange={handleChange} />
          <Form.Group>
            <Form.Input name='city' label='City' placeholder='New York' validations="minLength:3" required onChange={handleChange} />
            <Form.TextArea
              name='venue' label='Venue' placeholder='Please be specific, where exactly the …' rows='3'
              validations="minLength:10"
              validationErrors={{ minLength: 'Be more specific, please…' }}
              required
              errorLabel={errorLabel}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Input name='time' label='Start Time' placeholder='14:00' required onChange={handleChange} />
            <Form.Input name='date' label='Date' placeholder='MM / DD / 2018'  required onChange={handleChange} />
          </Form.Group>

          <Divider horizontal />


          {/*<Form.Field>
            <Form.Radio name='eventType' label='Meetup' value='meetup' checked={eventType === 'meetup'} onChange={handleChange} />
            <Form.Radio name='eventType' label='Conference' value='conference' checked={eventType === 'conference'} onChange={handleChange} />
            <Form.Radio name='eventType' label='Event' value='event' checked={eventType === 'event'} onChange={handleChange} />
          </Form.Field>*/}


          <Divider horizontal />
          <Form.Input name='eventUrl' label='Link to this event' placeholder='e.g. https://eventbrite.com/event/...' validations="isUrl" onChange={handleChange} />
          <Form.Input name='submitterEmail' label='Your email' placeholder='your@email.com' type='email'
            validations="isEmail"
            validationErrors={{ isEmail: 'Email is not valid' }}
            required
            errorLabel={errorLabel} onChange={handleChange} validations="isEmail" />

          <Divider horizontal />
          <Message error header='Something went wrong' content='Please check all fields and ensure they are filled!' />
          <Button content='Submit this Event' size='huge' color='green' onClick={submit}/>
        </Form>
        }

      </Container>
    );
  }
}

export default NewEvent;
