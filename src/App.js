import React, { Component } from "react";
import "./css/App.css";
import SplashScreen from "./components/splashScreen.jsx";
import { IonApp, IonPage } from "@ionic/react";
import NavBar from "./components/NavBar";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import axios from "axios";

Amplify.configure(awsmobile);

class App extends Component {
  state = {
    username: null
  };

  componentDidMount = () => {
    this.fetchUserByUsername();
  };

  fetchUserByUsername = () => {
    const { username } = this.props.authData;
    return axios
      .get(`https://tralebackend.herokuapp.com/api/users/${username}`)
      .then(data => {
        console.log(data);
        //set the state with valid usename
      });
  };

  render() {
    console.log(this.props.authData.username);

    return (
      <IonApp>
        {/* <SplashScreen /> */}
        <NavBar />
      </IonApp>
    );
  }
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
    signUpFields: [
      //{ label: "username", key: "username", required: true, type: "string" },
      {
        label: "Date of Birth",
        key: "birthdate",
        required: true,
        type: "date"
      }
    ]
  }
});
