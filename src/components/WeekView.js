import './WeekView.styl';

import _ from 'lodash';
import { get as ENV } from 'react-global-configuration';
import React from 'react';
import { Container, Grid } from 'semantic-ui-react'
import { Header, Label, Divider, Image, Message, Button, Segment, Icon } from 'semantic-ui-react'
import { Form, Radio } from 'formsy-semantic-ui-react'

const API = ENV('apiDomain')
const errorLabel = <Label color="red" pointing/>

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
      </Container>
    );
  }
}

export default WeekView;
