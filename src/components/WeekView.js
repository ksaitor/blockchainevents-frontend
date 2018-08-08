import './WeekView.styl'

import _ from 'lodash'
import { get as ENV } from 'react-global-configuration'
import React from 'react'
import moment from 'moment'
import { get } from 'axios'
import { Container, Grid, Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'
import { Form, Radio } from 'formsy-semantic-ui-react'
import { Link } from 'react-router-dom'

import HeadMenu from './HeadMenu'

const API = ENV('apiDomain')
const errorLabel = <Label color="red" pointing/>


const Day = ({date, events}) => {
  return <div>
    <Header as='h2' content={moment(date).format('dddd, MMMM Do')} />
    { events.map(EventOverview) }
  </div>
}

const EventOverview = ({time, title, description, seoSlug}) => (
  <div className='EventOverview' key={Math.random()}>
    <Link to={'/'+seoSlug}><Header as='h3'><i>{time}</i> - {title}</Header></Link>
    <p>{description}</p>
  </div>
);

class WeekView extends React.Component {
  constructor(props) {
    super(props);
    document.title = ''
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

  render() {
    const { city, events } = this.state;
    if (_.size(events) < 1) { return 'Loading…' }
    const days = _.groupBy(events, (e) => { return moment(e.date).format('L') })
    return (
      <Container className="WeekView" text>
        <Header as='h1'>Blockchain Events <br/> in {city}</Header>
        <HeadMenu />

        {_.map(days, (events, date) => {
          return <Day date={date} events={events} key={Math.random()} />
        })}

        <Divider horizontal />
        <HeadMenu />
      </Container>
    );
  }
}

export default WeekView
