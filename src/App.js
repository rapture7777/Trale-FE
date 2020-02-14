import React, { Component } from 'react';
import './css/App.css';
import { IonApp, IonPage, IonSpinner } from '@ionic/react';
import NavBar from './components/NavBar';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import axios from 'axios';
// import '@ionic/react/css/core.css';
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

Amplify.configure(awsmobile);

class App extends Component {
  state = {
    username: null,
    id: null,
    loading: true
  };

  componentDidMount = () => {
    const { username } = this.props.authData;
    this.fetchUserByUsername(username);
  };

  fetchUserByUsername = username => {
    return axios
      .get(`https://tralebackend.herokuapp.com/api/users?username=${username}`)
      .then(({ data: { users } }) => {
        this.setState({ username: username, id: users[0].id, loading: false });
      });
  };

  render() {
    const { id, username, loading } = this.state;
    return loading ? (
      <IonPage className="Loading-Page">
        <IonSpinner className="Loading-Spinner" name="lines" />
      </IonPage>
    ) : (
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
