import './NewEvent.styl';

import _ from 'lodash';
import { get as ENV } from 'react-global-configuration';
import React from 'react';
import { post } from 'axios';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'
import { Form, Radio } from 'formsy-semantic-ui-react'
import logoUrl from '../../public/images/cjl-logo-night.png'

const API = ENV('apiDomain')
const errorLabel = <Label color="red" pointing/>

// @observer
class NewEvent extends React.Component {
  // @observable title = ''

  constructor(props){
    super(props);
    document.title = 'New Event';
    this.state = {
      loading: false,
      error: false,
      submitted: false,
      supportMethod: 2,
      eventType: 'event'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.imgUpload = this.imgUpload.bind(this)
    this.updateSupportMethod = this.updateSupportMethod.bind(this)
  }

  componentDidMount () { }

  handleChange (e, { name, value }) {
    console.log(name, value)
    this.setState({ [name]: value })
  }

  imgUpload (e) {
    const self = this
    const file = e.target.files[0]
    const name = e.target.name
    const formData = new FormData()
    formData.append('file', file)
    const config = { headers: { 'content-type': 'multipart/form-data' }};
    return post(`${API}/job/imgUpload`, formData, config).then(res => {
      this.setState({[name]: res.data.secure_url})
    })
  }

  updateSupportMethod (supportMethod) {
    this.setState({supportMethod})
  }

  handleStripeToken (token) {
    console.log({token})
    this.setState({customerToken: token})
    this.handleSubmit()
  }

  handleSubmit () {
    this.setState({loading: true})
    const data = _.omit(this.state, ['submitted', 'loading', 'error'])
    post(`${API}/job`, data)
    .then(res => {
      this.setState({loading: false, error: false, submitted: true})
    })
    .catch(err => {
      this.setState({loading: false, error: true})
    })
  }

  render() {
    const {loading, error, companyLogo, bossPicture, supportMethod, eventType} = this.state
    const formState = {loading, error}
    return (
      <Container className="NewEvent" text>
        {this.state.submitted ?
          <div>
            <Header as='h1' textAlign='center'>Please check your email!</Header>
            <Header as='h3' textAlign='center'>Your job posting was submitted for review.</Header>
            <Divider horizontal />
            <Divider horizontal />
            <Image src="https://reactiongifs.me/wp-content/uploads/2013/10/i-wingman-successfully-leonardo-dicaprio.gif" centered rounded size='massive' />
            <Divider horizontal />
            <center>
              <Button content={<span>
                New Event <Icon name="arrow right" />
              </span>} size='huge' color='green' href='/' />
            </center>
          </div>
        :
        <Form size='large' widths='equal' {...formState}>
          <Header as='h1'>New Event <Label content="FREE" color='green' size='mini' /></Header>
          <Divider horizontal />
          <Form.Input name='title' label='Title' placeholder='e.g. Awesome Blockchain Event' validations="minLength:3,maxLength:60" required onChange={this.handleChange} />
          <Form.TextArea
              name='description' label='Short Description' placeholder='In 2-3 sentances, describe this event about?' rows='3'
              validations="maxLength:310"
              validationErrors={{ minLength: 'Up to 300 characters, please…' }}
              required
              errorLabel={ errorLabel }
              onChange={this.handleChange} />
          <Form.Group>
            <Form.Input name='city' label='City' placeholder='New York' validations="minLength:3" required onChange={this.handleChange} />
            <Form.TextArea
              name='location' label='Where exactly?' placeholder='Please be specific, where exactly the …' rows='3'
              validations="minLength:10"
              validationErrors={{ minLength: '200 words, please…' }}
              required
              errorLabel={ errorLabel }
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Input name='time' label='Start Time' placeholder='14:00' required onChange={this.handleChange} />
            <Form.Input name='date' label='Date' placeholder='27/04/2018'  required onChange={this.handleChange} />
          </Form.Group>

          <Divider horizontal />


          <Form.Field>
            <Radio name='eventType' label='Meetup' value='meetup' checked={eventType === 'meetup'} onChange={this.handleChange} />
            <Radio name='eventType' label='Conference' value='conference' checked={eventType === 'conference'} onChange={this.handleChange} />
            <Radio name='eventType' label='Event' value='event' checked={eventType === 'event'} onChange={this.handleChange} />
          </Form.Field>


          <Divider horizontal />
          <Form.Input name='eventUrl' label='Link to this event' placeholder='e.g. https://eventbrite.com/event/...' validations="isUrl" onChange={this.handleChange} />
          <Form.Input name='submitterEmail' label='Your email' placeholder='your@email.com' type='email'
            validations="isEmail"
            validationErrors={{ isEmail: 'Email is not valid' }}
            required
            errorLabel={ errorLabel } onChange={this.handleChange} validations="isEmail" />

          <Divider horizontal />
          <Message error header='Something went wrong' content='Please check all fields and ensure they are filled!' />
          <Button content='Submit this Event' size='huge' color='green' />
        </Form>
        }

      </Container>
    );
  }
}

export default NewEvent;
