
import React from 'react';
import { post } from 'axios';
import { Input } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'

const style = {
  display: 'inline-block',
  float: 'right'
}

const NewsletterSignup = ({city}) => {
  const submit = (event) => {
    if (event.key === 'Enter'){
      console.log('enter press here! ', event.target.value, city)
      const email = event.target.value

      post(`${API}/event/create`, data)
      .then(res => {
        this.setState({loading: false, error: false, submitted: true})
      })
      .catch(err => {
        this.setState({loading: false, error: true})
      })
    }
  }

  return <Form {...{style}}>
    <Form.Field inline>
      <label>Weekly Newsletter</label>
      <Input
        name='email'
        placeholder='your@email.com'
        size='mini'
        icon='mail outline'
        onKeyPress={submit} />
     </Form.Field>
   </Form>
}

export default NewsletterSignup;
