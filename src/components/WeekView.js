import './WeekView.styl';

import _ from 'lodash';
import { get as ENV } from 'react-global-configuration';
import React from 'react';
import moment from 'moment';
import { get } from 'axios';
import { Container, Grid, Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'
import { Form, Radio } from 'formsy-semantic-ui-react'
import { Link } from 'react-router-dom'

import HeadMenu from './HeadMenu';

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
  constructor(props) {
    super(props);
    document.title = '';
    this.state = {
      events: [],
      city: _.upperFirst(props.match.params.city)
    }
  }

  componentWillMount () {
    let that = this;
    const { city } = this.state;
    const startDate = moment().startOf('week').format();
    const endDate = moment().endOf('week').format();

    get(`${API}/event/find`, {
      params: { startDate, endDate, city }
    })
    .then(function (res) {
      that.setState({events: res.data})
    })
  }

  componentDidMount () {

  }

  render() {
    const { city, events } = this.state;
    console.log(events)
    return (
      <Container className="WeekView" text>
        <Header as='h1'>Blockchain Events <br/> in {city}</Header>
        <HeadMenu />

        <Header as='h2' content='Monday, March 29th' />
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
        <Divider horizontal />
        <HeadMenu />
      </Container>
    );
  }
}

export default WeekView;
