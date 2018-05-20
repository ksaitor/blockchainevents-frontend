import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, Button, Icon } from 'semantic-ui-react'

const newEventBtn = <Button inverted color='green' as={Link} to='https://cryptojobslist.typeform.com/to/klhneI' target='_blank'>
  <Icon name='plus'/> Post an Event
</Button>

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
