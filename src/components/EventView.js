// import './EventView.styl';

import _ from 'lodash';
import { get as ENV } from 'react-global-configuration';
import React from 'react';
import moment from 'moment';
import { get } from 'axios';
import { Container, Grid, Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import HeadMenu from './HeadMenu';

const API = ENV('apiDomain')


// @observer
class EventView extends React.Component {
  // @observable title = ''
  constructor(props) {
    super(props);
    document.title = '';

    this.state = {
      seoSlug: props.match.params.seoSlug,
      event: false
    }
  }

  componentWillMount () {
    let that = this;
    const { seoSlug } = this.state;

    get(`${API}/event/findOne`, {
      params: { seoSlug }
    })
    .then(function (res) {
      that.setState({event: res.data})
    })
  }

  componentDidMount () { }

  render() {
    if (!this.state.event) { return null }
    const { title, description, where, when, time, } = this.state.event;

    return (
      <Container className="EventView" text>
        <Header as='h1'>{title}</Header>
        <HeadMenu />
        <Header as='h3'>Desciption</Header>
        <p>{description}</p>

        <Header as='h3'>Where</Header>
        <p>{where}</p>

        <Divider horizontal />
        <HeadMenu />
      </Container>
    );
  }
}

export default EventView;
