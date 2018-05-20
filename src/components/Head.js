import React from 'react';
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Head = () => {
  return <Container text>
    <Header as='h1'>
      🔗📍
    </Header>
    <Link to='https://cryptojobslist.typeform.com/to/klhneI' target='_blank'>
      Submit an Event
    </Link>
  </Container>
}

export default Head;
