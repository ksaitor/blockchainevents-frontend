import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Menu, Button } from 'semantic-ui-react'

const newEventBtn = <Button inverted color='green' content={`Post an Event`} as={Link} to='https://cryptojobslist.typeform.com/to/klhneI' target='_blank'/>

const Head = () => {
  return (
    <Container>
      <Menu secondary>
        <Menu.Menu position='right'>
          <Menu.Item content={newEventBtn} />
        </Menu.Menu>
      </Menu>
    </Container>
  )
}

export default Head;
