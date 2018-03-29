import './WeekView.styl';

import _ from 'lodash';
import { get as ENV } from 'react-global-configuration';
import React from 'react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'
import { Form, Radio } from 'formsy-semantic-ui-react'
import { Link } from 'react-router-dom'

const API = ENV('apiDomain')
const errorLabel = <Label color="red" pointing/>

const EventOverview = ({time, title, description, seoSlug}) => (
 <div className='EventOverview'>
  <Link to={'/'+seoSlug}><Header as='h3'><i>{time}</i> - {title}</Header></Link>
  <p>{description}</p>
 </div>
);


// @observer
class WeekView extends React.Component {
  // @observable title = ''

  constructor(props){
    super(props);
    document.title = '';
  }

  componentDidMount () { }

  render() {
    return (
      <Container className="WeekView" text>
        <Divider horizontal />
        <Header as='h1' content='in Singapore' />

        <Header as='h2' content='Monday' />
          <EventOverview {...{
            time: '4pm',
            title: 'Blockchain and the Decentralized Web',
            description: 'SGInnovate and the Infocomm Media Development Authority (IMDA) are co-hosting this session for parties to come together to both learn more about the transformative potential of Blockchain and its impact on the digital economy. IMDA will also share more about its plans for a Blockchain Challenge for further exploration.'
          }} />

        <Header as='h2' content='Tuesday' />
        <Header as='h2' content='Wednesday' />
        <Header as='h2' content='Thursday' />
        <Header as='h2' content='Friday' />
        <Header as='h2' content='Saturday' />
        <Header as='h2' content='Sunday' />
        <Link to='/submit'>Add an Event</Link>
      </Container>
    );
  }
}

export default WeekView;
