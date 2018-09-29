import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, Button, Icon } from 'semantic-ui-react'
const to = 'https://cryptojobslist.typeform.com/to/klhneI'
const newEventBtn = <Button inverted color='green' as={Link} to='/submit' target='_blank'>
  <Icon name='plus'/> Post an Event
</Button>

const Head = () => {
  return (
    <Container>
      <Menu secondary>
        <Menu.Menu position='right' {...{style: {marginTop: 10}}}>
          <Menu.Item content={newEventBtn} />
        </Menu.Menu>
      </Menu>
    </Container>
  )
}

export default Head;
