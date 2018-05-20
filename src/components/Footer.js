import './Footer.styl';

import React from 'react'
import { Link } from 'react-router-dom'
import { Container, List, Icon } from 'semantic-ui-react'

class Footer extends React.Component {
  render() {
    return (
      <div className='Footer'>
        <Container text textAlign='center'>
          <List horizontal divided link>
            <List.Item>Blockchain Event &copy; {(new Date()).getFullYear()}</List.Item>
            <List.Item as={Link} to='https://cryptojobslist.typeform.com/to/klhneI' target='_blank'>
              Submit an Event
            </List.Item>
          </List>
        </Container>
      </div>
    );
  }
}

export default Footer;
