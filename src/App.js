import React, { Component } from 'react';
import './css/App.css';
import { IonApp } from '@ionic/react';
import NavBar from './components/NavBar';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import axios from 'axios';

Amplify.configure(awsmobile);

class App extends Component {
  state = {
    username: null,
    id: null
  };

  componentDidMount = () => {
    const { username } = this.props.authData;
    this.fetchUserByUsername(username);
  };

  fetchUserByUsername = username => {
    return axios
      .get(`https://tralebackend.herokuapp.com/api/users?username=${username}`)
      .then(({ data: { users } }) => {
        this.setState({ username: username, id: users[0].id });
      });
  };

  render() {
    const { id, username } = this.state;
    return (
      <IonApp>
        <NavBar username={username} id={id} />
      </IonApp>
    );
  }
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
    signUpFields: [
      //{ label: "username", key: "username", required: true, type: "string" },
      {
        label: 'Date of Birth',
        key: 'birthdate',
        required: true,
        type: 'date'
      }
    ]
  }
});
