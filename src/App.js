import React, { Component } from "react";
import "./css/App.css";
import SplashScreen from "./components/splashScreen.jsx";
import { IonApp } from "@ionic/react";
import NavBar from "./components/NavBar";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";

//import { Auth } from "aws-amplify";
import { withAuthenticator, Authenticator } from "aws-amplify-react";
//import { CognitoUser } from "@aws-amplify/auth";
//import { CognitoUser } from "aws-amplify-react/dist/Auth";

Amplify.configure(awsmobile);

class App extends Component {
  state = {
    username: null,
    signedIn: false
  };

  render() {
    return (
      <IonApp>
        {console.log(this.props)}
        <SplashScreen />
        <NavBar />
      </IonApp>
    );
  }
}

export default withAuthenticator(App, false);
